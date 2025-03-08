const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.createSubSection = async (req , res) =>
{
    try {
        const {sectionId , title , description , timeDuration} = req.body;

        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video)
        {
            return res.status(400).json({
                success : false,
                message : "All feilds are required"
            })
        }

        const uploadDetails = await uploadFileToCloudinary(video , process.env.FOLDER_NAME);

        const SubSectionDetails = await SubSection.create({title , timeDuration , description , videoUrl : uploadDetails.secure_url});

        const updatedSection = await Section.findByIdAndUpdate(sectionId , {
            $push: {
                subSection : SubSectionDetails._id,
            }
        } , {new : true});

        return res.status(200).json({
            success : true,
            message : "Sub Section created Successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Internal Server Error",
            error : error.message
        })
    }
}


exports.updateSubSection = async (req , res) =>
{
    try {
        const {subSectionId , title , description , timeDuration} = req.body;

        const video = req.files.videoFile;

        if(!subSectionId || !title || !timeDuration || !description || !video)
        {
            return res.status(400).json({
                success : false,
                message : "All feilds are required"
            })
        }

        const uploadDetails = await uploadFileToCloudinary(video , process.env.FOLDER_NAME);

        const SubSectionDetails = await SubSection.findByIdAndUpdate(subSectionId , {title , timeDuration , description , videoUrl : uploadDetails.secure_url});

        return res.status(200).json({
            success : true,
            message : "Sub Section Updated Successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Internal Server Error",
            error : error.message
        })
    }
}

exports.deleteSubSection = async (req , res) =>
{
    try {
        const { sectionId , subSectionId} = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Missing subSectionId or sectionId",
            });
        }

       await SubSection.findByIdAndDelete(subSectionId);

       const updatedSection = await Section.findByIdAndUpdate(
        sectionId,
        { $pull: { subSection: subSectionId } },
        { new: true }
    );

        return res.status(200).json({
            success : true,
            message : "Sub Section Delete Successfully",
            updatedSection,
        });

    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Internal Server Error",
            error : error.message
        })
    }
}