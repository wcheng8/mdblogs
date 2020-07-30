const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
<<<<<<< HEAD
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 100,
      max: 2000000,
    },
    excerpt: {
      type: String,
      max: 1000,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [{ type: ObjectId, ref: "Category", required: true }],
    tags: [{ type: ObjectId, ref: "Tag", required: true }],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
=======
	{
		title: {
			type: String,
			trim: true,
			min: 3,
			max: 160,
			required: true,
		},
		slug: {
			type: String,
			unique: true,
			index: true,
		},
		body: {
			type: {},
			required: true,
			min: 10,
			max: 2000000,
		},
		excerpt: {
			type: String,
			max: 100000,
		},
		mtitle: {
			type: String,
		},
		mdesc: {
			type: String,
		},
		photo: {
			data: Buffer,
			contentType: String,
		},
		categories: [{ type: ObjectId, ref: "Category", required: true }],
		tags: [{ type: ObjectId, ref: "Tag", required: true }],
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
>>>>>>> mdconvert
);

module.exports = mongoose.model("Blog", blogSchema);
