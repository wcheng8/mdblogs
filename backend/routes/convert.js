const express = require("express");
const app = express.Router();
const Blog = require("../models/blog");
const AWS = require("aws-sdk");
const { mdToPdf } = require("md-to-pdf");
const fs = require("fs");
const path = require("path");

//configuring the AWS environment
AWS.config.update({
	accessKeyId: process.env.AWS_ID,
	secretAccessKey: process.env.AWS_KEY,
});
var s3 = new AWS.S3();

app.get("/pdf/convert/:slug", function (req, res) {
	const slug = req.params.slug;
	Blog.findOne({ slug }).exec((err, data) => {
		if (err) {
			return res.json({
				error: errorHandler(err),
			});
		}
		// res.json(data.body);
		console.log(data._id);
		// Converting the file and upload to AWS
		fs.writeFile(`${data._id}.md`, data.body, (err) => {
			// throws an error, you could also catch it here
			if (err) throw err;

			// success case, the file was saved
			console.log("Note saved!");
		});

		(async () => {
			const pdf = await mdToPdf({ path: `./${data._id}.md` }).catch(
				console.error
			);
			if (pdf) {
				fs.writeFileSync(`${data._id}.pdf`, pdf.content);
				uploadFile(`./${data._id}.pdf`);
			}
		})();
		console.log(data.body);
		res.send(data._id);
	});
});

// Uploading file to AWS
const uploadFile = (filePath) => {
	let params = {
		Bucket: "mdstoragenew",
		Body: fs.createReadStream(filePath),
		Key: "folder/" + path.basename(filePath),
		ACL: "public-read",
	};

	s3.upload(params, function (err, data) {
		//handle error
		if (err) {
			console.log("Error", err);
		}

		//success
		if (data) {
			console.log("Uploaded in:", data.Location);
		}
	});
};

app.get("/pdf/get/:slug", function (req, res) {
	const slug = req.params.slug;
	Blog.findOne({ slug }).exec((err, data) => {
		if (err) {
			return res.json({
				error: errorHandler(err),
			});
		}
		// res.json(data.body);
		console.log(data._id);
		res.send(`https://mdstoragenew.s3.amazonaws.com/folder/${data._id}.pdf`);
	});
});

module.exports = app;
