import express from "express";
import models from "../../model/Entity.js";

const AudField = models.AudField;
const router = express.Router();

/**
 * @route       GET api/audfields
 * @description Get all audfields
 * @access      public
 */
router.get("/", async (req, res) => {
  await AudField.find()
    .then((audfields) => res.json(audfields))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/audfields/:id
 * @description Get a audfield with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await AudField.findById(req.params.id)
    .then((audfield) => res.json(audfield))
    .catch((e) => res.status(404).json({ error: "AudField does not exist" }));
});

/**
 * @route       POST api/audfields
 * @description Add a audfield to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await AudField.create(req.body)
    .then((audfield) => res.json(audfield))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/audfields/:id
 * @description Find the audfield with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  AudField.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((audfield) => res.json(audfield))
    .catch((e) => res.status(404).json({ error: "AudField does not exist" }));
});

/**
 * @route       DELETE api/audfields/:id
 * @description Get and delete a audfield with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await AudField.findByIdAndRemove(req.params.id)
    .then((audfield) => res.json(audfield))
    .catch((e) => res.status(404).json({ error: "AudField does not exist" }));
});

export default router;
