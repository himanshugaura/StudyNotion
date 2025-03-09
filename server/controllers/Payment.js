const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mailTemplate/courseEnrollmentEmail");
const { mongoose } = require("mongoose");

exports.capturePayment  = async (req , res) =>
{
    const {course_id} = req.body;
    const userId = req.user.id;

    if(!course_id)
    {
        return res.json({
            success : false,
            message : "please provide valid course Id"
        })
        
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if(!course)
        {
            return res.json({
                success : false,
                message :"Could not find the course"
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);

        if(course.studentEnrolled.includes(uid))
        {
            return res.json({
                success : false,
                message : "student is already enrolled"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }


    const amount = course.price;
    const currency = "INR";

    const options = {
        amount : amount * 100,
        currency : currency,
        receipt : Math.random(Date.now()).toString,
        notes : 
        {
            courseId : course_id,
            userId,
        }
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
            success : true,
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : course.thumbnail,
            orderId : paymentResponse.id,
            currency : paymentResponse.currency,
            amount : paymentResponse.amount,
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "could no initiate order"
        })
    }
}

exports.verifySignature = async (req , res) =>
{
    const webHookSecret = "12345678";
    const signature = req.headers("x-razorpay-signature");
    const shasum =  crypto.createHmac("sha256" , webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature == digest)
    {
        console.log("Payment is authorised");

        const {courseId , userId} = req.body.payload.payment.entity.notes;

        try {
             const enrolledCourse = await Course.findByIdAndUpdate(courseId , {
                $push : {
                    studentEnrolled : userId,
                }
             } , {new : true});

             if (!enrolledCourse) {
                return res.status(500).json({
                    success : false,
                    message : "course not found"
                })
             }

             console.log(enrolledCourse);
             
             const enrolledStudent = await User.findByIdAndUpdate(userId , {
                $push : {
                    courses : courseId,
                }
             } , {new : true});

             console.log(studentEnrolled);

             const emailResponse = await mailSender(enrolledStudent.email , "you are enrolled" , "congrats you are onboarded to new course" );

             console.log(emailResponse);

             return res.status(200).json({
                success : true,
                message : "signature verified and course added"
             })
             
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success : false , 
                message : error.message,
            });
        }
    }

    else{
        return res.status(400).json({
            success : false,
            message : "Invalid request"
        })
    }
}