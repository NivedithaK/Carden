import express from "express";
import models from "../../model/Entity.js";

const VidField = models.VidField;
const router = express.Router();

/**
 * @route       GET api/vidfields
 * @description Get all vidfields
 * @access      public
 */
router.get("/", async (req, res) => {
  await VidField.find()
    .then((vidfields) => res.json(vidfields))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/vidfields/:id
 * @description Get a vidfield with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await VidField.findById(req.params.id)
    .then((vidfield) => res.json(vidfield))
    .catch((e) => res.status(404).json({ error: "VidField does not exist" }));
});

/**
 * @route       POST api/vidfields
 * @description Add a vidfield to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await VidField.create(req.body)
    .then((vidfield) => res.json(vidfield))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/vidfields/:id
 * @description Find the vidfield with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  VidField.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((vidfield) => res.json(vidfield))
    .catch((e) => res.status(404).json({ error: "VidField does not exist" }));
});

/**
 * @route       DELETE api/vidfields/:id
 * @description Get and delete a vidfield with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await VidField.findByIdAndRemove(req.params.id)
    .then((vidfield) => res.json(vidfield))
    .catch((e) => res.status(404).json({ error: "VidField does not exist" }));
});

export default router;
