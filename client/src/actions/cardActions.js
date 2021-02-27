import axios from "axios";

export const getTemplate = async (id) => {
    var template;
    await axios
        .get(`api/templates/${id}`)
        .then((res) => {
            template = res.data;
        })
        .catch((err) => null);
    return template;
}

