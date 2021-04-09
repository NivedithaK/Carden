import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
	USER_LOADED,
	USER_LOADING,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTER_START,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
    PROFILE_START,
    PROFILE_SUCCESS,
    PROFILE_FAILURE,
	LOGOUT,
	AUTH_ERROR,
	LOADING_CARDS,
	CARDS_SUCCESS,
	CARDS_FAILURE,
} from "./types";

// Start the register.
const getRegisterStart = () => ({
    type: REGISTER_START,
});

// Register was successful.
const getRegisterSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

// Register was a failure.
const getRegisterFailure = () => ({
    type: REGISTER_FAILURE,
});
// Start the login.
const getLoginStart = () => ({
    type: LOGIN_START,
});

// Login was successful.
const getLoginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

// Login was a failure.
const getLoginFailure = () => ({
    type: LOGIN_FAILURE,
});

// Loading cards
const getLoadingCards = () => ({
	type: LOADING_CARDS,
});

// Loading cards Success
const getCardsSuccess = (templates, cards) => ({
	type: CARDS_SUCCESS,
	payload: { templates, cards },
});
// Loading cards Success
const getCardsFailure = () => ({
	type: CARDS_FAILURE,
});

// Start the profile update.
const updateUserProfileStart = () => ({
    type: PROFILE_START,
});

// Profile update was successful.
const getProfileSuccess = (user) => ({
    type: PROFILE_SUCCESS,
    payload: user,
});
// Profile update was a failure.
const getProfileFailure = () => ({
    type: PROFILE_FAILURE,
});
/**
 * A thunk to register users asynchronously.
 * @param user: The user to register
 */
export const registerUser = (user) => async (dispatch) => {
    // Start the register
    dispatch(getRegisterStart());
    await axios
        .post("/api/users", user)
        .then((res) => {
            dispatch(clearErrors());
            dispatch(getRegisterSuccess(res.data));
            console.log(res.data);
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    REGISTER_FAILURE
                )
            );
            dispatch(getRegisterFailure());
            console.log(err.response.data);
        });
};

/**
 * A thunk to updater users profiles asynchronously.
 * @param user: The user to update
 */
export const updateProfile = (user, id) => async (dispatch) => {
    // Start the update
    dispatch(updateUserProfileStart());
    await axios
        .post(`/api/users/profile/${id}`, user)
        .then((res) => {
            dispatch(clearErrors());
            dispatch(getProfileSuccess(res.data));
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data.msg,
                    err.response.status,
                    PROFILE_FAILURE
                )
            );
            dispatch(getProfileFailure());
        });
};

/**
 * A thunk which logs in the user asynchronously.
 *
 * @param user: The filter for this user.
 * Dispatches getLoginSuccess with the user data on success.
 * Dispatches getLoginFailure with the error on failure.
 */
export const loginUser = (user) => async (dispatch) => {
    // Start the login
    dispatch(getLoginStart());
    // Make the request to the server to see if there is a user with the matching credentials.
    await axios
        .post("/api/users/login", user)
        .then((res) => {
            dispatch(clearErrors());
            dispatch(getLoginSuccess(res.data));
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    LOGIN_FAILURE
                )
            );
            dispatch(getLoginFailure());
        });
};

/**
 * Check token & load user
 * Dispatches user loading.
 * On success, dispatches user loaded and sends the token and user data
 * On failure, dispatches auth error and sends the errors to the error reducer.
 */
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    await axios
        .get("/api/auth/user", tokenConfig(getState))
        .then((res) => {
            dispatch(clearErrors);
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(
                returnErrors(err.response.data, err.response.status, AUTH_ERROR)
            );
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

/**
 * Logout the user, this clears all of the user information from the auth state.
 * Also resets all of the redux states back to initialState.
 */
export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};

/**
 * Generates a config containing the approprite headers, with the token if it exists.
 * @param getState Redux property in order to get access to current state
 */
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
};

/**
 * Query the templates schema to get all of the templates which belong to this user.
 * @returns the templates of this user by their username
 */
export const getUserTemplates = () => async (dispatch, getState) => {
	// Start loading cards
	dispatch(getLoadingCards());
	// Get the username from redux
	if (
		!getState().auth ||
		!getState().auth.user ||
		!getState().auth.user.username
	) {
		dispatch(
			returnErrors("The username is not present!", "400", "templates")
		); // Something is null
		dispatch(getCardsFailure());
	}

	const user = getState().auth.user;
	axios
		.post("/api/templates/user", { postUser: user.username })
		.then((res) => {
			dispatch(clearErrors());
			const templates = [];
			const cards = [];
			res.data.forEach((template) => {
				if (user.cards.includes(template["_id"])) {
					cards.push(template);
				} else {
					templates.push(template);
				}
			});
			dispatch(getCardsSuccess(templates, cards)); // Send cards to redux
		})
		.catch((err) => {
			dispatch(returnErrors(err.data, err.status, "templates"));
			dispatch(getCardsFailure());
		});
};
