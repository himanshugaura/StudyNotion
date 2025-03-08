const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");

const OtpSchema = new mongoose.Schema(
    {
     email : 
     {
        type : String,
        required : true
     },
     otp : 
     {
        type : String,
        required : true,
     },
     createdAt : 
     {
        type : Date,
        default : Date.now(),
        expires : 5 * 60
     }
    }
);

async function sendVerificationMail(email , otp)
{
    try {
        const mailResponse = await mailSender(email , "verification Email from StudyNotion" , otp);
        console.log("email sent succesfully" , mailResponse);
    } catch (error) {
        console.log("error occured while sending mail: " , error);
        throw error;
    }
}

OtpSchema.pre("save" , async function(next) {
    await sendVerificationMail(this.email , this.otp);
    next();
});

module.exports = mongoose.model("OTP" , OtpSchema)