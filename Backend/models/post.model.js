import mongoose from "mongoose";
const postSchemea = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png",

    },
    category: {
        type: String,
        /* The `default: "Technology"` property in the `category` field of the mongoose schema is setting a
        default value of "Technology" for the `category` field if no value is provided when creating a
        new document. */

        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true

    }
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchemea)