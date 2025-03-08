const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        title : 
        {
            type : String,
        },
        timeDuration : 
        {
            type : String,
        },
        description : 
        {
             type : String,
        },
        videoUrl : 
        { 
            type : String,
        }
    }
);

module.exports = mongoose.model("Section" , sectionSchema);