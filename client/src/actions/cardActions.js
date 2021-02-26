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

export const putTemplate = async (template, tops, lefts) => {
    
    console.log(template);
    template.props.children.forEach(function(entity) {
        console.log(entity.props.children.props.children);
    })
    console.log("saved");
}

