import express from "express";
import Scene from "../../model/Scene.js";

const router = express.Router();

/**
 * @route       GET api/scenes
 * @description Get all scenes
 * @access      public
 */
router.get("/", async (req, res) => {
  await Scene.find()
    .then((scenes) => res.json(scenes))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/scenes/:id
 * @description Get a scene with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await Scene.findById(req.params.id)
    .then((scene) => res.json(scene))
    .catch((e) => res.status(404).json({ error: "Scene does not exist" }));
});

/**
 * @route       POST api/scenes
 * @description Add a scene to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await Scene.create(req.body)
    .then((scene) => res.json(scene))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/scenes/:id
 * @description Find the scene with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  Scene.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((scene) => res.json(scene))
    .catch((e) => res.status(404).json({ error: "Scene does not exist" }));
});

/**
 * @route       DELETE api/scenes/:id
 * @description Get and delete a scene with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await Scene.findByIdAndRemove(req.params.id)
    .then((scene) => res.json(scene))
    .catch((e) => res.status(404).json({ error: "Scene does not exist" }));
});

export default router;
