import express from "express";
import models from "../../model/Entity.js";

const TextField = models.TextField;
const router = express.Router();

/**
 * @route       GET api/textfields
 * @description Get all textfields
 * @access      public
 */
router.get("/", async (req, res) => {
  await TextField.find()
    .then((textfields) => res.json(textfields))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/textfields/:id
 * @description Get a textfield with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await TextField.findById(req.params.id)
    .then((textfield) => res.json(textfield))
    .catch((e) => res.status(404).json({ error: "TextField does not exist" }));
});

/**
 * @route       POST api/textfields
 * @description Add a textfield to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await TextField.create(req.body)
    .then((textfield) => res.json(textfield))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/textfields/:id
 * @description Find the textfield with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  TextField.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((textfield) => res.json(textfield))
    .catch((e) => res.status(404).json({ error: "TextField does not exist" }));
});

/**
 * @route       DELETE api/textfields/:id
 * @description Get and delete a textfield with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await TextField.findByIdAndRemove(req.params.id)
    .then((textfield) => res.json(textfield))
    .catch((e) => res.status(404).json({ error: "TextField does not exist" }));
});

export default router;
