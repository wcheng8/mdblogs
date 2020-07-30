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

// Convert to pdf
app.get("/pdf/blog/:slug", (req, res) => {
	const slug = req.params.slug.toLowerCase();
	Blog.findOne({ slug })
		// .select("-photo")
		.populate("categories", "_id name slug")
		.populate("tags", "_id name slug")
		.populate("postedBy", "_id name username")
		.select(
			"_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt"
		)
		.exec((err, data) => {
			if (err) {
				return res.json({
					error: errorHandler(err),
				});
			}
			res.json(data);
		});

	fs.writeFile(`${blog.id}.md`, blog.content, (err) => {
		// throws an error, you could also catch it here
		if (err) throw err;

		// success case, the file was saved
		console.log("Note saved!");
	});

	(async () => {
		const pdf = await mdToPdf({ path: `./${blog.id}.md` }).catch(console.error);
		if (pdf) {
			fs.writeFileSync(`${blog.id}.pdf`, pdf.content);
			uploadFile(`./${blog.id}.pdf`);
		}
	})();
	res.send(`https://mdstoragenew.s3.amazonaws.com/folder/${blogid}.pdf`);
});

// Without Call Test

fs.writeFile(`hihi.md`, "# h1 ## h2 ### h3", (err) => {
	// throws an error, you could also catch it here
	if (err) throw err;

	// success case, the file was saved
	console.log("Note saved!");
});

fs.writeFile(`hihi.md`, "# h1 ## h2 ### h3", (err) => {
	// throws an error, you could also catch it here
	if (err) throw err;

	// success case, the file was saved
	console.log("Note saved!");
});

(async () => {
	const pdf = await mdToPdf({ path: `./hihi.md` }).catch(console.error);
	if (pdf) {
		fs.writeFileSync(`hihi.pdf`, pdf.content);
		uploadFile(`./hihi.pdf`);
	}
})();

// Convert to doc
// app.get("/pdf", notes.convertPdf);

// Convert to docx
// app.get("/pdf", notes.convertPdf);

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

module.exports = app;
