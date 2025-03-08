const Tag = require("../models/Tags");

exports.createTag  = async (req , res) =>
{
    try {
        
    const {name , description} = req.body;

    if(!name || !description)
    {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    const tagDetails = await Tag.create({name , description});

    return res.status(200).json({
        success : true,
        message : "Tags created successfully"
    });

    } catch (error) {
         return res.status(500).json({
            success : false,
            message : error.message,
        })    
    }
};


exports.showAllTags = async (req , res) =>
{
    try {
        const allTags = await Tag.find({} , {name : true , description : true});
        
        res.status(200).json({
            success : true,
            message : "All tags fetched successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message,
        })    
    }
}