import express from "express";
import Puzzle from "../../model/Puzzle.js";

const router = express.Router();

/**
 * @route       GET api/puzzles
 * @description Get all puzzles
 * @access      public
 */
router.get("/", async (req, res) => {
  await Puzzle.find()
    .then((puzzles) => res.json(puzzles))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/puzzles/:id
 * @description Get a puzzle with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await Puzzle.findById(req.params.id)
    .then((puzzle) => res.json(puzzle))
    .catch((e) => res.status(404).json({ error: "Puzzle does not exist" }));
});

/**
 * @route       POST api/puzzles
 * @description Add a puzzle to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await Puzzle.create(req.body)
    .then((puzzle) => res.json(puzzle))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/puzzles/:id
 * @description Find the puzzle with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  Puzzle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((puzzle) => res.json(puzzle))
    .catch((e) => res.status(404).json({ error: "Puzzle does not exist" }));
});

/**
 * @route       DELETE api/puzzles/:id
 * @description Get and delete a puzzle with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await Puzzle.findByIdAndRemove(req.params.id)
    .then((puzzle) => res.json(puzzle))
    .catch((e) => res.status(404).json({ error: "Puzzle does not exist" }));
});

export default router;
