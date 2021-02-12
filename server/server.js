// This is the server file
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/api/users.js"
import templates from "./routes/api/templates.js"
import scenes from "./routes/api/scenes.js"
import puzzles from "./routes/api/puzzles.js"
import textfields from "./routes/api/textfields.js"
import imgfields from "./routes/api/imgfields.js"
import audfields from "./routes/api/audfields.js"
import vidfields from "./routes/api/vidfields.js"
import animators from "./routes/api/animators.js"

const result = dotenv.config();
if (result.error) {
	throw result.error;
}

const app = express();
app.disable("x-powered-by");

// Body parser
app.use(express.json());

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

// function sleep(ms) {
// 	return new Promise((resolve) => setTimeout(resolve, ms));
// }

// while (1) {
// 	await sleep(2000);
// 	console.log("pls");
// }
