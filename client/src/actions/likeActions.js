import axios from 'axios';
import { returnErrors, clearErrors } from './errorActions';
import {
    USER_LOADING,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    LOADING_CARDS,
    CARDS_SUCCESS,
    CARDS_FAILURE,
} from './types';

// Register was successful.
const getUpdateSuccess = (data) => ({
    type: UPDATE_SUCCESS,
    payload: data,
});

// Register was a failure.
const getUpdateFailure = () => ({
    type: UPDATE_FAILURE,
});

export const adjustLikeTemplate = (templateId) => async (
    dispatch,
    getState
) => {
    var starredTemplates = getState().auth.user.starredTemplates;
    const userId = getState().auth.user._id;
    let inc = 1; // 1 for like, -1 for dislike
    // check if this is a like or dislike
    if (starredTemplates.includes(templateId)) {
        inc = -1;
    }
    const body = {
        id: templateId,
        data: { $inc: { stars: inc } },
    };
    // adjust like in template
    await axios
        .put(`/api/templates`, body)
        .then(async (res) => {
            // Update the user
            let updatedTemplates = [];
            if (inc === 1) {
                updatedTemplates = [...starredTemplates, templateId];
                // starredTemplates.push(templateId);
            } else {
                starredTemplates.forEach((tId) => {
                    if (tId != templateId) {
                        updatedTemplates.push(tId);
                    }
                });
            }
            await axios
                .put(`/api/users`, {
                    id: userId,
                    data: { starredTemplates: updatedTemplates },
                })
                .then((resUsr) => {
                    dispatch(getUpdateSuccess(resUsr.data));
                })
                .catch((err) => {
                    dispatch(
                        returnErrors(err.msg, err.status, 'Like Template')
                    );
                    dispatch(getUpdateFailure());
                });
        })
        .catch((err) => {
            dispatch(returnErrors(err.msg, err.status, 'Like Template'));
            dispatch(getUpdateFailure());
        });
    return inc;
};
