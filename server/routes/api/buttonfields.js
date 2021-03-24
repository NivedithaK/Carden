import express from "express";
import models from "../../model/Entity.js";

const ButtonField = models.ButtonField;
const router = express.Router();

/**
 * @route       GET api/buttonfields
 * @description Get all buttonfields
 * @access      public
 */
router.get("/", async (req, res) => {
  await ButtonField.find()
    .then((buttonfields) => res.json(buttonfields))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/buttonfields/:id
 * @description Get a buttonfield with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await ButtonField.findById(req.params.id)
    .then((buttonfield) => res.json(buttonfield))
    .catch((e) => res.status(404).json({ error: "ButtonField does not exist" }));
});

/**
 * @route       POST api/buttonfields
 * @description Add a buttonfield to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await ButtonField.create(req.body)
    .then((buttonfield) => res.json(buttonfield))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/buttonfields/:id
 * @description Find the buttonfield with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  ButtonField.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((buttonfield) => res.json(buttonfield))
    .catch((e) => res.status(404).json({ error: "ButtonField does not exist" }));
});

/**
 * @route       DELETE api/buttonfields/:id
 * @description Get and delete a buttonfield with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await ButtonField.findByIdAndRemove(req.params.id)
    .then((buttonfield) => res.json(buttonfield))
    .catch((e) => res.status(404).json({ error: "ButtonField does not exist" }));
});

export default router;
