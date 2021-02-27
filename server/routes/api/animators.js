import express from "express";
import Animator from "../../model/Animator.js";

const router = express.Router();

/**
 * @route       GET api/animators
 * @description Get all animators
 * @access      public
 */
router.get("/", async (req, res) => {
  await Animator.find()
    .then((animators) => res.json(animators))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/animators/:id
 * @description Get a animator with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await Animator.findById(req.params.id)
    .then((animator) => res.json(animator))
    .catch((e) => res.status(404).json({ error: "Animator does not exist" }));
});

/**
 * @route       POST api/animators
 * @description Add a animator to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await Animator.create(req.body)
    .then((animator) => res.json(animator))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/animators/:id
 * @description Find the animator with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  Animator.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((animator) => res.json(animator))
    .catch((e) => res.status(404).json({ error: "Animator does not exist" }));
});

/**
 * @route       DELETE api/animators/:id
 * @description Get and delete a animator with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await Animator.findByIdAndRemove(req.params.id)
    .then((animator) => res.json(animator))
    .catch((e) => res.status(404).json({ error: "Animator does not exist" }));
});

export default router;
