import { clearErrors } from "./errorActions";

export const headerErrorClear = () => (dispatch) => {
    console.log("Clearing Headers");
    dispatch(clearErrors());
};
