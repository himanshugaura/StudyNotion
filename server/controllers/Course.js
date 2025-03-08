const Tags = require("../models/Tags");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.createCourse = async (req , res) =>
{
    try {
        const {courseName , courseDescription , whatYouWillLearn , price , tag} = req.body;

        const thumbnail = req.files.thumbnail;
        
        if(!courseName || !courseDescription || ! whatYouWillLearn || !price || !tag || !thumbnail)
        {
            return res.status(400).json({
                success : false,
                message : "All fields are required " 
            })
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        
        if(!instructorDetails)
        {
            return res.status(404).json({
                success : false,
                message : "instructor details not found"
            })
        }

        const tagDetails = await Tags.findById(tag);

        if(!tagDetails)
            {
                return res.status(404).json({
                    success : false,
                    message : "tag details not found"
                })
            }

        const thumbnailImg = uploadFileToCloudinary(thumbnail , process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName , courseDescription , instructor: instructorDetails._id , whatYouWillLearn, price , tag : tagDetails._id,
            thumbnail : thumbnailImg.secure_url,
        })

        await User.findByIdAndUpdate({_id : instructorDetails._id} , 
            {$push: {
                courses : newCourse._id,
            }},
            {
                new : true
            }
        );

        return res.status(200).json({
            success : true,
            message : "course created successfully",
            data : newCourse,
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success : false ,
            message : "Failed to create course",
            error : error.message
        })
    }
}


exports.showAllCourses = async (req , res) =>
{
    try {
        const allCourses = await Courses.find({} , 
        {courseName : true , 
         price : true,
         thumbnail : true,
         instructor : true,
         ratingAndReview : true,
         studentsEnrolled : true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "Data for all courses fetched successfully",
            data : allCourses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json(
            {
                success : false,
                message : "cannot fetch course data",
                error : error.message
            }
        )
    }
}
