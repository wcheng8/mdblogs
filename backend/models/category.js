const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            max: 30,
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            index: true,
        }
    },
    { timestamp: true },
);

module.exports = mongoose.model("Category", categorySchema);

