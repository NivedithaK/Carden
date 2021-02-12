import express from "express";
import models from "../../model/Entity.js";

const ImgField = models.ImgField;
const router = express.Router();

/**
 * @route       GET api/imgfields
 * @description Get all imgfields
 * @access      public
 */
router.get("/", async (req, res) => {
  await ImgField.find()
    .then((imgfields) => res.json(imgfields))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/imgfields/:id
 * @description Get a imgfield with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await ImgField.findById(req.params.id)
    .then((imgfield) => res.json(imgfield))
    .catch((e) => res.status(404).json({ error: "ImgField does not exist" }));
});

/**
 * @route       POST api/imgfields
 * @description Add a imgfield to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await ImgField.create(req.body)
    .then((imgfield) => res.json(imgfield))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/imgfields/:id
 * @description Find the imgfield with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  ImgField.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((imgfield) => res.json(imgfield))
    .catch((e) => res.status(404).json({ error: "ImgField does not exist" }));
});

/**
 * @route       DELETE api/imgfields/:id
 * @description Get and delete a imgfield with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await ImgField.findByIdAndRemove(req.params.id)
    .then((imgfield) => res.json(imgfield))
    .catch((e) => res.status(404).json({ error: "ImgField does not exist" }));
});

export default router;
