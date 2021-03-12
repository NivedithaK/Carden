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
 * @route       POST api/templates
 * @description Add a template to the database
 * @access      public
 */
router.post("/", async (req, res) => {
	await Template.create(req.body)
		.then((template) => res.status(200).json(template))
		.catch((e) => res.status(500).json({ error: e.message }));
});

/**
 * @route       PUT api/templates/:id
 * @description Find the template with the specified id and update them
 * @access      public
 */
router.put("/", async (req, res) => {
	console.log(req.body);
	Template.findByIdAndUpdate(req.body.id, req.body.data, { new: true })
		.then((template) => res.status(200).json(template))
		.catch((e) => res.status(404).json({ msg: "template does not exist" }));
});

/**
 * @route       DELETE api/templates/:id
 * @description Get and delete a template with the specified id
 * @access      public
 */
router.delete("/:id", async (req, res) => {
	await Template.findByIdAndRemove(req.params.id)
		.then((template) => res.status(200).json(template))
		.catch((e) => res.status(404).json({ msg: "template does not exist" }));
});

export default router;
