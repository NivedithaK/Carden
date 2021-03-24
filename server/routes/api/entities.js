import express from "express";
import models from "../../model/Entity.js";

const Entity = models.Entity;
const router = express.Router();

/**
 * @route       GET api/entities
 * @description Get all entities
 * @access      public
 */
router.get("/", async (req, res) => {
  await Entity.find()
    .then((entities) => res.json(entities))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/entities/:id
 * @description Get a entity with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await Entity.findById(req.params.id)
    .then((entity) => res.json(entity))
    .catch((e) => res.status(404).json({ error: "entity does not exist" }));
});

/**
 * @route       POST api/entities
 * @description Add a entity to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await Entity.create(req.body)
    .then((entity) => res.json(entity))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/entities/:id
 * @description Find the entity with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((entity) => res.json(entity))
    .catch((e) => res.status(404).json({ error: "entity does not exist" }));
});

/**
 * @route       DELETE api/entities/:id
 * @description Get and delete a entity with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await Entity.findByIdAndRemove(req.params.id)
    .then((entity) => res.json(entity))
    .catch((e) => res.status(404).json({ error: "entity does not exist" }));
});

export default router;
