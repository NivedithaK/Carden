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

export const getTemplateSearch = async (titletag) => {
    var templates = [];
    await axios
        .get(`/api/templates/tag/search`, {
            params: {
                titletag: titletag,
            },
        })
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

/*
 * Send server request for templates of user by id
 * sadge
 */
export const getTemplateByUser = async (id) => {
    let templates = [];
    await axios
        .get(`/api/templates/tag/user/${id}`)
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);

    return templates;
};

export const getTemplateByUserSearch = async (titletag, username) => {
    var templates = [];
    console.log('actipn', titletag, username);
    await axios
        .get(`/api/templates/tag/usersearch`, {
            params: {
                titletag: titletag,
                username: username,
            },
        })
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

export const getPopularTemplates = async (id) => {
    var templates = [];
    await axios
        .get(`/api/templates/tag/popular${id}`)
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

export const getNewTemplates = async (id) => {
    var templates = [];
    await axios
        .get(`api/templates/tag/newest${id}`)
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

export const getOldTemplates = async (id) => {
    var templates = [];
    await axios
        .get(`api/templates/tag/oldest${id}`)
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

export const getAlphabeticalTemplates = async (id) => {
    var templates = [];
    await axios
        .get(`api/templates/tag/alphabetical${id}`)
        .then((res) => {
            templates = res.data;
        })
        .catch((err) => null);
    return templates;
};

export const postTemplate = async (
    color,
    width,
    height,
    template,
    sceneRef,
    userid
) => {
    let tId = '';
    var elemIds = [];
    template.forEach(function (scene) {
        var sceneElemIds = [];
        Object.values(scene).forEach(function (entity) {
            if (entity.props.type == 'Text') {
                const textfield = {
                    style: entity.props.style,
                    content: entity.props.content.content,
                };
                sceneElemIds.push(postTextfield(textfield));
            } else if (entity.props.type == 'Button') {
                console.log(sceneRef[entity.props.id]);
                const buttonfield = {
                    style: entity.props.style,
                    content: entity.props.content.content,
                    src: entity.props.content.src,
                    sceneRef: sceneRef[entity.props.id],
                };
                sceneElemIds.push(postButtonfield(buttonfield));
            } else if (entity.props.type == 'Image') {
                const imgfield = {
                    style: entity.props.style,
                    src: entity.props.content.src,
                };
                sceneElemIds.push(postImgfield(imgfield));
            }
        });
        elemIds.push(sceneElemIds);
    });
    await Promise.all(
        elemIds.map(function (sceneElemIds) {
            return Promise.all(sceneElemIds);
        })
    ).then(async (values) => {
        tId = await postSceneAndTemplate(color, width, height, values, userid);
    });
    return tId;
};

export const postSceneAndTemplate = async (
    color,
    width,
    height,
    elemIds,
    userid
) => {
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
    await Promise.all(sceneIds).then(async (values) => {
        const newTemplate = {
            scenes: values,
            numScenes: values.length,
            canvasColor: color,
            canvasWidth: width,
            canvasHeight: height,
            postUser: userid,
        };

        await axios
            .post('/api/templates', newTemplate)
            .then((res) => {
                templateId = res.data._id;
            })
            .catch((err) => alert(err.response.data.msg));
    });
    // Promise.resolve(templateId).then((newTemplateId) => {
    //     console.log(newTemplateId);
    //     return newTemplateId;
    // });
    return templateId;
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
        canvasColor: {},
        canvasHeight: 500,
        canvasWidth: 500,
        scenes: [],
        numScenes: 0,
    };
    await axios
        .get(`/api/templates/${templateId}`)
        .then((res) => {
            template.canvasColor = res.data.canvasColor;
            template.canvasHeight = res.data.canvasHeight;
            template.canvasWidth = res.data.canvasWidth;
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
