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

export const postTemplate = async (template, tops, lefts) => {
    var i = 0;
    var elemIds = [];
    template.props.children.forEach(function(entity) {
        const textfield = {
            top: tops[i],
            left: lefts[i],
            content: entity.props.children.props.children,
        };
        
        elemIds.push(postTextfield(textfield));
        i++;
    })

    var templateId;
    Promise.all(elemIds).then((values) => {
        postSceneAndTemplate(values);
    });
    return templateId;
}

export const postSceneAndTemplate = async (elemIds) => {
    console.log(elemIds);
    var sceneIds = [];
    const scene = {
        entities: elemIds,
    }
    await axios
        .post("http://localhost:5000/api/scenes", scene)
        .then((res) => {
            sceneIds.push(res.data._id);
        })
        .catch((err) => alert(err.response.data.msg));

    console.log(sceneIds);
    var templateId;
    const newTemplate = {
        scenes: sceneIds,
        numScenes: sceneIds.length,
    }
    await axios
        .post("http://localhost:5000/api/templates", newTemplate)
        .then((res) => {
            templateId = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return templateId;
}

export const postTextfield = async (textfield) => {
    var id;
    console.log(textfield);
    await axios
        .post("http://localhost:5000/api/textfields", textfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
}

