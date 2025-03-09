const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingsAndReviews = require("../models/RatingsAndReviews");

exports.createRating = async (req , res) =>
{
    try {
        const userId = req.user.id;

        const {rating , review , courseId} = req.body;

        const courseDetails = await Course.findOne({courseId ,
             studentsEnrolled : { elemMatch : {$eq: userId}}
            });

            if(!courseDetails)
            {
                return res.status(404).json({
                    success : false,
                    message : "student is not enrolled in the course"
                });
            }

            const alreadyReviewed = await RatingsAndReviews.findOne({
                user : userId,
                course : courseId,
            })

            if(alreadyReviewed)
            {
                return res.status(403).json({
                    success : false,
                    message : "course is already reviewed by the user"
                })
            }

            const ratingReview = await RatingsAndReviews.create({
                rating , review , course : courseId , user : userId,
            });

           const updatedCouseDetail =  await Course.findByIdAndUpdate(courseId , {
                $push : 
                {
                    ratingAndReviews : ratingReview._id,
                }
            },{new : true});

            console.log(updatedCouseDetail);

            return res.status(200).json({
                   success : true , 
                   message : "Rating and Review created Successfully",
                   ratingReview,
            })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            sucess : false,
            message : error.message
        })
    }
}

exports.getAverageRating = async (req , res) =>
{
    try {
        const courseId = req.body.courseId;

        const result = await RatingsAndReviews.aggregate([
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group : {
                    _id : null,
                    averageRating : { $avg : "$rating"}
                }
            }
        ])

        if(result.length > 0)
        {
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating,
            })
        }

        return res.status(200).json({
            success : true,
            message : "average rating is 0 no rating given till now",
            averageRating : 0
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            sucess : false,
            message : error.message
        })
    }
}


exports.getAllRatings = async (req , res) =>
{
    try {
        const allReviews = await RatingsAndReviews.find({}).sort({rating : "desc"}).populate({
            path: "user",
            select : "firstName lastName email image"
        }).populate({
            path : "course",
            select : "courseName"
        })

        return res.status(200).json({
            success : true,
            message : "all reviews fetched successfully",
            allReviews,
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            sucess : false,
            message : error.message
        })
    }
}