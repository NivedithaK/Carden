import express from "express";
import User from "../../model/User.js";

const router = express.Router();

/**
 * @route       GET api/users
 * @description Get all users
 * @access      public
 */
router.get("/", async (req, res) => {
  await User.find()
    .then((users) => res.json(users))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/users/:id
 * @description Get a user with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
  await User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((e) => res.status(404).json({ error: "User does not exist" }));
});

/**
 * @route       POST api/users
 * @description Add a user to the database
 * @access      public
 */
router.post("/", async (req, res) => {
  await User.create(req.body)
    .then((user) => res.json(user))
    .catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/users/:id
 * @description Find the user with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => res.json(user))
    .catch((e) => res.status(404).json({ error: "User does not exist" }));
});

/**
 * @route       DELETE api/users/:id
 * @description Get and delete a user with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then((user) => res.json(user))
    .catch((e) => res.status(404).json({ error: "User does not exist" }));
});

export default router;
