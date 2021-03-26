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
		.then((templates) => res.json(templates))
		.catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       GET api/templates/:id
 * @description Get a template with the specified id
 * @access      public
 */
router.get("/:id", async (req, res) => {
	await Template.findById(req.params.id)
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
});

/**
 * @route       GET api/templates/alphabetical
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
		.sort({ stars: 1 })
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
 * @route       PUT api/templates/:id
 * @description Find the template with the specified id and update them
 * @access      public
 */
router.put("/:id", async (req, res) => {
	Template.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((template) => res.json(template))
		.catch((e) =>
			res.status(404).json({ error: "template does not exist" })
		);
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
