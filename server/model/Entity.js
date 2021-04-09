import mongoose from "mongoose";
const model = mongoose.model;

const Schema = mongoose.Schema;

const entitySchema = new Schema(
	{
		style: {
			type: Object,
			default: {},
		},
	},
	{ discriminatorKey: "kind" }
);

const Entity = mongoose.model("Entity", entitySchema);

const TextField = Entity.discriminator(
	"Text",
	new Schema({
		content: {
			type: String,
			default: "",
		},
	})
);

const ImgField = Entity.discriminator(
	"Image",
	new Schema({
		s3_id: {
			type: String,
			default: "",
		},
		src: {
			type: String,
			default: "",
		},
	})
);

const AudField = Entity.discriminator(
	"Audio",
	new Schema({
		s3_id: {
			type: String,
			default: "",
		},
		link: {
			type: String,
			default: "",
		},
	})
);

const VidField = Entity.discriminator(
	"Video",
	new Schema({
		s3_id: {
			type: String,
			default: "",
		},
		link: {
			type: String,
			default: "",
		},
	})
);

const ButtonField = Entity.discriminator(
	"Button",
	new Schema({
		content: {
			type: String,
			default: "",
		},
		src: {
			type: String,
			default: "",
		},
		sceneRef: {
			type: String,
			default: "",
		},
	})
);

const BoxField = Entity.discriminator(
	"Box",
	new Schema({
		onClick: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "",
		},
	})
);
export default {
    Entity,
	TextField,
	ImgField,
	AudField,
	VidField,
	ButtonField,
	BoxField,
};
