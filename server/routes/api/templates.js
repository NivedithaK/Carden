import express from "express";
import Template from "../../model/Template.js";

const router = express.Router();

/**
 * @route       GET api/templates
 * @description Get all templates
 * @access      public
 */
router.get("/", async (req, res) => {
	await Template.find()
		.then((templates) => res.status(200).json(templates))
		.catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       POST api/templates
 * @description Find template by partial title match
 * @access      public
 */
router.post("/", async (req, res) => {
	await Template.create(req.body)
		.then((template) => res.json(template))
		.catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/templates/:id
 * @description Get a template with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
	console.log(req);
	await Template.findById(req.params.id)
		.then((template) => res.status(200).json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       POST api/templates/:username
 * @description Get all templates which belong to this user
 * @access      public
 */
router.post("/user", async (req, res) => {
	await Template.find(req.body)
		.then((templates) => res.status(200).json(templates))
		.catch((e) =>
			res.status(404).json({ data: "No templates from that user!" })
		);
});

/**
 * @route       GET api/templates/alphabetical
 * @route       GET api/templates/search
 * @description Get a list of templates as search results
 * @access      public
 */
router.get("/tag/search/", async (req, res) => {
	console.log(req);
	if (!req.query.titletag) {
		return res.status(400).json({ msg: "Missing search query." });
	}

	await Template.find({ $text: { $search: req.query.titletag } })
		.sort({ score: { $meta: "textScore" } })
		.then((template) => res.json(template))
		.catch((e) => res.status(404).json({ error: "Not found" }));
});

/**
 * @route       GET api/templates/usersearch
 * @description Get a list of templates as search results by a user
 * @access      public
 */
router.get("/tag/usersearch/", async (req, res) => {
	console.log(req.params);
	if (!req.query.titletag || !req.query.username) {
		return res.status(400).json({ msg: "Missing search query." });
	}

	await Template.find({ $text: { $search: req.query.titletag } })
		.sort({ score: { $meta: "textScore" } })
		.then((template) => res.json(template))
		.catch((e) => res.status(404).json({ error: "Not found" }));
});

/**
 * @route       GET api/templates/user/:id
 * @description Get a list of templates as search results by a user
 * @access      public
 */
router.get("/tag/user/:id", async (req, res) => {
	console.log(req.params.id);
	if (!req.params.id) {
		return res.status(400).json({ msg: "Missing search query." });
	}

	/*
	 * Find templates by the postUser given id
	 */
	await Template.find({ postUser: req.params.id })
		.then((template) => {
			res.json(template);
		})
		.catch((e) => res.status(404).json({ error: "Not found" }));
});

/**
 * @route       GET api/templates/tag/alphabetical
 * @description Get a list of templates in alphabetical order
 * @access      public
 */
router.get("/tag/alphabetical", async (req, res) => {
	await Template.find()
		.sort({ title: 1 })
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       GET api/templates/popular
 * @description Get a list of templates by number of favourites
 * @access      public
 */
router.get("/tag/popular", async (req, res) => {
	await Template.find()
		.sort({ stars: -1 })
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       GET api/templates/newest
 * @description Get a list of templates, newest first
 * @access      public
 */
router.get("/tag/newest", async (req, res) => {
	await Template.find({}, null, { sort: "-postDate" })
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       GET api/templates/oldest
 * @description Get a list of templates, oldest first
 * @access      public
 */
router.get("/tag/oldest", async (req, res) => {
	await Template.find({}, null, { sort: "postDate" })
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       PUT api/templates/:id
 * @description Find the template with the specified id and update them
 * @access      public
 */
router.put("/", async (req, res) => {
	console.log(req.body);
	Template.findByIdAndUpdate(req.body.id, req.body.data, { new: true })
		.then((template) => {
			console.log(template);
			res.status(200).json({ template });
		})
		.catch((e) => res.status(404).json({ msg: "template does not exist" }));
});

/**
 * @route       DELETE api/templates/:id
 * @description Get and delete a template with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
	await Template.findByIdAndRemove(req.params.id)
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

export default router;
