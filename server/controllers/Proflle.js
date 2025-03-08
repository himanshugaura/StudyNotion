const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");


exports.updateProfile = async (req , res) =>
{
    try {
        const {dateOfBirth="" , about="" , contactNumber , gender} = req.body;
        const id = req.user.id;
        
        if(!contactNumber || !gender || !id)
        {
            return res.status(400).json({
                success : false ,
                message : "All feilds are required"
            });
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success : true,
            message : "Profile updated successfully",
            profileDetails
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}


exports.deleteAccount = async (req , res) =>
{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if(!userDetails)
        {
            return res.status.json({
                success : false,
                message : "user not found"
            });
        }

        await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

            await Course.updateMany(
                { _id: { $in: userDetails.courses } },  
                { $pull: { studentEnrolled: id } }    
            );

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success : true,
            message : "Account deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Account cannot be deleted"
        })
    }
}

exports.getUserDetails = async (req , res) =>
{
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success : true,
            message : "user data fetched successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}