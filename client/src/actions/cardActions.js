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

//TODO implement storage of entities other than textfields
export const postTemplate = async (template) => {
    var i = 0;
    var elemIds = [];
    template.forEach(function(entity) {
        if (entity.props.children.type == "p") {
            const textfield = {
                top: entity.props.top,
                left: entity.props.left,
                content: entity.props.children.props.children,
            };
            elemIds.push(postTextfield(textfield));
        } else if ((typeof entity.props.children.type) != "string") { //TODO CHANGE THIS, catches all components that do not have a string for type
            const buttonfield = {
                top: entity.props.top,
                left: entity.props.left,
                content: entity.props.children.props.children,
            };
            elemIds.push(postButtonfield(buttonfield));
        } else if (entity.props.children.type == "img") {
            const imgfield = {
                top: entity.props.top,
                left: entity.props.left,
                link: entity.props.children.props.src,
            };
            elemIds.push(postImgfield(imgfield));
        }
        i++;
    })

    var templateId;
    Promise.all(elemIds).then((values) => {
        postSceneAndTemplate(values);
    });
    return templateId;
}

export const postSceneAndTemplate = async (elemIds) => {
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
    await axios
        .post("http://localhost:5000/api/textfields", textfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
}

export const postButtonfield = async (buttonfield) => {
    var id;
    await axios
        .post("http://localhost:5000/api/buttonfields", buttonfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
}

export const postImgfield = async (imgfield) => {
    var id;
    await axios
        .post("http://localhost:5000/api/imgfields", imgfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
}

export const loadTemplate = async (templateId) => {
    var template = {
        scenes: [],
        numScenes: 0,
    };
    await axios
        .get(`http://localhost:5000/api/templates/${templateId}`)
        .then((res) => {
            template.numScenes = res.data.numScenes;
            res.data.scenes.forEach(function(sceneId) {
                template.scenes.push(loadScene(sceneId));
            })
        })
        .catch((err) => alert(err.response.data.msg));
    return template;
}

export const loadScene = async (sceneId) => {
    var scene = {
        entities: []
    };
    await axios
        .get(`http://localhost:5000/api/scenes/${sceneId}`)
        .then((res) => {
            res.data.entities.forEach(function(entityId) {
                scene.entities.push(loadEntity(entityId));
            })
        })
        .catch((err) => alert(err.response.data.msg));
    return scene;
}

export const loadEntity = async (entityId) => {
    var entity;
    await axios
        .get(`http://localhost:5000/api/entities/${entityId}`)
        .then((res) => {
            entity = res.data;
        })
        .catch((err) => alert(err.response.data.msg));
    return entity;
}