// This is the server file
import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
	throw result.error
}

const app = express();
app.disable("x-powered-by");

// Body parser
app.use(express.json());

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

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

while (1) {
	await sleep(2000);
	console.log("pls work");
}
