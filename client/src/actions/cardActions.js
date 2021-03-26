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

// Loading cards
const getLoadingCards = () => ({
    type: LOADING_CARDS,
});

const getUserLoading = () => ({
    type: USER_LOADING,
});

export const getTemplate = async (id) => {
    var template;
    await axios
        .get(`api/templates/${id}`)
        .then((res) => {
            template = res.data;
        })
        .catch((err) => null);
    return template;
};

export const postTemplate = async (template) => {
    var elemIds = [];
    template.forEach(function (scene) {
        var sceneElemIds = [];
        Object.values(scene).forEach(function (entity) {
            if (entity.props.children.type == 'p') {
                const textfield = {
                    top: entity.props.top,
                    left: entity.props.left,
                    content: entity.props.children.props.children,
                };
                sceneElemIds.push(postTextfield(textfield));
            } else if (typeof entity.props.children.type != 'string') {
                //TODO CHANGE THIS, catches all components that do not have a string for type
                const buttonfield = {
                    top: entity.props.top,
                    left: entity.props.left,
                    content: entity.props.children.props.children,
                };
                sceneElemIds.push(postButtonfield(buttonfield));
            } else if (entity.props.children.type == 'img') {
                const imgfield = {
                    top: entity.props.top,
                    left: entity.props.left,
                    link: entity.props.children.props.src,
                };
                sceneElemIds.push(postImgfield(imgfield));
            }
        });
        elemIds.push(sceneElemIds);
    });
    Promise.all(
        elemIds.map(function (sceneElemIds) {
            return Promise.all(sceneElemIds);
        })
    ).then((values) => {
        return postSceneAndTemplate(values);
    });
};

export const postSceneAndTemplate = async (elemIds) => {
    const sceneIds = await elemIds.map(async (sceneElemIds) => {
        const scene = {
            entities: sceneElemIds,
        };
        const sceneId = await axios
            .post('/api/scenes', scene)
            .then((res) => {
                return res.data._id;
            })
            .catch((err) => alert(err.response.data.msg));
        return sceneId;
    });

    var templateId;
    Promise.all(sceneIds).then(async (values) => {
        const newTemplate = {
            scenes: values,
            numScenes: values.length,
        };

        await axios
            .post('/api/templates', newTemplate)
            .then((res) => {
                templateId = res.data._id;
            })
            .catch((err) => alert(err.response.data.msg));
    });
    Promise.resolve(templateId).then((newTemplateId) => {
        return newTemplateId;
    });
};

export const postTextfield = async (textfield) => {
    var id;
    await axios
        .post('/api/textfields', textfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
};

export const postButtonfield = async (buttonfield) => {
    var id;
    await axios
        .post('/api/buttonfields', buttonfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
};

export const postImgfield = async (imgfield) => {
    var id;
    await axios
        .post('/api/imgfields', imgfield)
        .then((res) => {
            id = res.data._id;
        })
        .catch((err) => alert(err.response.data.msg));
    return id;
};

export const loadTemplate = async (templateId) => {
    var template = {
        scenes: [],
        numScenes: 0,
    };
    await axios
        .get(`/api/templates/${templateId}`)
        .then((res) => {
            template.numScenes = res.data.numScenes;
            res.data.scenes.forEach(function (sceneId) {
                template.scenes.push(loadScene(sceneId));
            });
        })
        .catch((err) => alert(err.response.data.msg));
    return template;
};

export const loadScene = async (sceneId) => {
    var scene = {
        entities: [],
    };
    await axios
        .get(`/api/scenes/${sceneId}`)
        .then((res) => {
            res.data.entities.forEach(function (entityId) {
                scene.entities.push(loadEntity(entityId));
            });
        })
        .catch((err) => alert(err.response.data.msg));
    return scene;
};

export const loadEntity = async (entityId) => {
    var entity;
    await axios
        .get(`/api/entities/${entityId}`)
        .then((res) => {
            entity = res.data;
        })
        .catch((err) => alert(err.response.data.msg));
    return entity;
};
