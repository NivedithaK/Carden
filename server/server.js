// This is the server file
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path, { dirname } from "path";
import users from "./routes/api/users.js";
import templates from "./routes/api/templates.js";
import scenes from "./routes/api/scenes.js";
import puzzles from "./routes/api/puzzles.js";
import textfields from "./routes/api/textfields.js";
import imgfields from "./routes/api/imgfields.js";
import audfields from "./routes/api/audfields.js";
import vidfields from "./routes/api/vidfields.js";
import animators from "./routes/api/animators.js";

import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
	const result = dotenv.config();
	if (result.error) {
		throw result.error;
	}
}

const app = express();
app.disable("x-powered-by");

// Body parser
app.use(express.json());
// allow request to come from any endpoint with any header
// need to remove this if we do security
app.use(cors());
// Setup routes
app.use("/api/users", users);
app.use("/api/templates", templates);
app.use("/api/scenes", scenes);
app.use("/api/puzzles", puzzles);
app.use("/api/textfields", textfields);
app.use("/api/imgfields", imgfields);
app.use("/api/audfields", audfields);
app.use("/api/vidfields", vidfields);
app.use("/api/animators", animators);

// Connect to MongoDB
mongoose
	.connect(process.env.mongoURI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

const db = mongoose.connection;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "build")));
	app.get("/*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "build", "index.html"));
	});
}

// const port =
// 	process.env.NODE_ENV == "production"
// 		? // ? process.env.PORT || 8081
// 		  process.env.PORT || 5000
// 		: process.env.PORT || 5000;

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
