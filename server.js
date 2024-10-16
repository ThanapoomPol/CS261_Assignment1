require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/api/auth", (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ error: "Username and password are required." });
	}

	fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Application-Key": process.env.TU_API_KEY,
		},
		body: JSON.stringify({ UserName: username, PassWord: password }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return res.status(200).json(data);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ message: "An error occurred while processing your request." });
		});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
