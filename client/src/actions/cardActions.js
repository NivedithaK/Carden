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
};

export const postTemplate = async (color, width, height, template, sceneRef) => {
  var elemIds = [];
  template.forEach(function (scene) {
    var sceneElemIds = [];
    Object.values(scene).forEach(function (entity) {
      if (entity.props.type == "Text") {
        const textfield = {
          style: entity.props.style,
          content: entity.props.content.content,
        };
        sceneElemIds.push(postTextfield(textfield));
      } else if (entity.props.type == "Button") {
		console.log(sceneRef[entity.props.id]);
        const buttonfield = {
          style: entity.props.style,
          content: entity.props.content.content,
		  src: entity.props.content.src,
		  sceneRef: sceneRef[entity.props.id],
        };
        sceneElemIds.push(postButtonfield(buttonfield));
      } else if (entity.props.type == "Image") {
        const imgfield = {
		  style: entity.props.style,
          src: entity.props.content.src,
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
    return postSceneAndTemplate(color, width, height, values);
  });
};

export const postSceneAndTemplate = async (color, width, height, elemIds) => {
  const sceneIds = await elemIds.map(async (sceneElemIds) => {
    const scene = {
      entities: sceneElemIds,
    };
    const sceneId = await axios
      .post("http://localhost:5000/api/scenes", scene)
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
	  canvasColor: color,
	  canvasWidth: width,
	  canvasHeight: height,
    };

    await axios
      .post("http://localhost:5000/api/templates", newTemplate)
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
    .post("http://localhost:5000/api/textfields", textfield)
    .then((res) => {
      id = res.data._id;
    })
    .catch((err) => alert(err.response.data.msg));
  return id;
};

export const postButtonfield = async (buttonfield) => {
  var id;
  await axios
    .post("http://localhost:5000/api/buttonfields", buttonfield)
    .then((res) => {
      id = res.data._id;
    })
    .catch((err) => alert(err.response.data.msg));
  return id;
};

export const postImgfield = async (imgfield) => {
  var id;
  await axios
    .post("http://localhost:5000/api/imgfields", imgfield)
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
    .get(`http://localhost:5000/api/templates/${templateId}`)
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
    .get(`http://localhost:5000/api/scenes/${sceneId}`)
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
    .get(`http://localhost:5000/api/entities/${entityId}`)
    .then((res) => {
      entity = res.data;
    })
    .catch((err) => alert(err.response.data.msg));
  return entity;
};
