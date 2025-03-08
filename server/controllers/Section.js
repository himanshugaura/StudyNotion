const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req , res) =>
{
    try {
        
    const {sectionName , courseId} = req.body;

    if(!sectionName || !courseId)
    {
        return res.status(400).json({
            success : false,
            message : "Missing Properties"
        })
    }

    const newSection = await Section.create({sectionName});

    const updatedCourse = await Course.findByIdAndUpdate(courseId,
        {
            $push:{
                courseContent : newSection._id,
            }
        }
        ,{new : true}
    ).populate("courseContent");


    return res.status(200).json({
        success : true,
        message : "section created successfully",
        updatedCourse
    })

    } catch (error) {
           return res.status(500).json({
            success : false,
            message : "unable to create section please try again",
            error  : error.message
           }) 
    }
}


exports.updateSection = async (req , res) =>
{
    try {
        const {sectionName , sectionId} = req.body;

        if(!sectionName || !sectionId)
            {
                return res.status(400).json({
                    success : false,
                    message : "Missing Properties"
                })
            }

        const updatedSection = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new : true});


    return res.status(200).json({
        success : true,
        message : "section updated successfully",
        updatedSection
    })


    } catch (error) { 
        return res.status(500).json({
            success : false,
            message : "unable to update section please try again",
            error  : error.message
           }) 
    }
}



exports.updateSection = async (req , res) =>
{
    try {
        const {sectionId} = req.params;

        await Section.findByIdAndDelete(sectionId);


        return res.status(200).json({
            success : true,
            message : "section delete successfully",
        })


    } catch (error) { 
        return res.status(500).json({
            success : false,
            message : "unable to delete section please try again",
            error  : error.message
            }) 
    }
}