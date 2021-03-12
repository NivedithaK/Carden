import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
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
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter all fields of information." });
    }
    // Check for existing user
    await User.findOne({ username }).then((existingUser) => {
        // If the user already exists, send an error message back.
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists." });
        }
        // Construct the new user
        const newUser = new User(req.body);
        // Generate the password
        newUser.setPassword(password);
        newUser.save().then((savedUser) => {
            // Sign the token with the unique user id
            jwt.sign(
                { id: savedUser._id },
                process.env.jwtSecret,
                // TODO {expiresIn: time} add this if we want the token to expire
                (err, token) => {
                    if (err) throw err;
                    const user = {
                        following: savedUser.following,
                        templates: savedUser.templates,
                        starredTemplates: savedUser.starredTemplates,
                        scoring: savedUser.scoring,
                        isAdmin: savedUser.isAdmin,
                        _id: savedUser._id,
                        username: savedUser.username,
                    };
                    res.status(200).json({ token, user });
                }
            );
        });
    });
});

/**
 * @route       POST api/users/login
 * @description Sign in a user using their username and password
 * @access      public
 */
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Check that we got an email and password
    if (!username || !password) {
        return res
            .status(400)
            .json({ msg: "Please enter all fields of information." });
    }

    // Check for existing user:
    await User.findOne({ username }).then((existingUser) => {
        // If the user does not exist.
        if (!existingUser) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        // Validate password
        if (!existingUser.validatePassword(password)) {
            return res.status(400).json({
                msg: "Invalid credentials",
            });
        }

        // Sign the token
        jwt.sign(
            { id: existingUser.id },
            process.env.jwtSecret,
            // {expiresIn: time} add this if we want the token to
            (err, token) => {
                if (err) throw err;
                const user = {
                    following: existingUser.following,
                    templates: existingUser.templates,
                    starredTemplates: existingUser.starredTemplates,
                    scoring: existingUser.scoring,
                    isAdmin: existingUser.isAdmin,
                    _id: existingUser._id,
                    username: existingUser.username,
                };
                res.status(200).json({ token, user });
            }
        );
    });
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

/**
 * @route       POST api/users/profile/:id
 * @description Update user from db
 * @access      public
 */
router.post("/profile/:id", async (req, res) => {
    const id = req.params.id;
    const { username, email, password } = req.body;
    let passwordUpdate = true;
    if (password == "") {
        passwordUpdate = false;
    }
    if (username == null || email == null || password == null) {
        return res
            .status(400)
            .json({ msg: "Please enter all fields of information." });
    }
    if (username.length < 5) {
        return res
            .status(400)
            .json({ msg: "Username must be at least 5 characters" });
    }
    if (password != "" && password.length < 5) {
        return res
            .status(400)
            .json({ msg: "Password must be at least 5 characters" });
    }

    // Update user
    await User.findOne({ _id: id }).then((eu) => {
        let updateUser = {};
        if (!eu) {
            return res.status(400).json({ msg: "User does not exist." });
        }
        if (eu.username != username) {
            updateUser.username = username;
            const check = async () => {
                // Check for existing username
                await User.findOne({ username }).then((existingUser) => {
                    // If the user already exists, send an error message back.
                    if (existingUser) {
                        return res
                            .status(400)
                            .json({ msg: "Username must be unique." });
                    }
                });
            };
            check();
        } else {
            updateUser.username = eu.username;
        }
        if (eu.email != email) {
            updateUser.email = email;
        } else {
            updateUser.email = eu.email;
        }
        if (passwordUpdate) {
            updateUser.password = password;
            let tempU = new User(updateUser);
            tempU.setPassword(updateUser.password);
            updateUser.salt = tempU.salt;
            updateUser.hash = tempU.hash;
        }
        console.log(updateUser);
        const update = async () => {
            User.findByIdAndUpdate(id, updateUser, { new: true })
                .then((user) => {
                    // return this to action.payload
                    const upUser = {
                        following: user.following,
                        templates: user.templates,
                        starredTemplates: user.starredTemplates,
                        scoring: user.scoring,
                        isAdmin: user.isAdmin,
                        _id: user._id,
                        username: user.username,
                    };
                    res.status(200).json(upUser);
                })
                .catch((e) =>
                    res.status(404).json({ error: "User does not exist" })
                );
        };
        update();
    });
});

export default router;
