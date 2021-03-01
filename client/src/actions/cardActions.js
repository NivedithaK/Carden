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

//TODO implement retrieval of entities other than textfields
export const loadEntity = async (entityId) => {
    var entity = {
        top: null,
        left: null,
        content: null,
    }
    await axios
        .get(`http://localhost:5000/api/entities/${entityId}`)
        .then((res) => {
            entity.top = res.data.top;
            entity.left = res.data.left;
            entity.content = res.data.content;
        })
        .catch((err) => alert(err.response.data.msg));
    return entity;
}