import mongoose from "mongoose";

const multipleGallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [Object]
});

const multipleGallery = mongoose.model("multipleGallery", multipleGallerySchema);

export default multipleGallery;
