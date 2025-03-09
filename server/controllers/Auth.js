const OTP = require("../models/Otp");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");
require("dotenv").config();


exports.signUp = async (req , res) =>
{
    try {
    
    const { firstName , lastName , email , password, confirmPassword, accountType, contactNumber, otp } = req.body;

    if (!firstName || !lastName ||  !email  || !password || !confirmPassword || !accountType || !contactNumber || !otp ) {
        return res.status(403).json(
            {
                success : false,
                message : "All fields are required",
            }
        )
    }

    if(password !== confirmPassword)
    {
        return res.status(400).json(
            {
                success : false,
                message : "Password and Confirm Password value donot match , please try again"
            }
        )
    }

    const existingUser = await User.findOne({email});

    if(existingUser)
    {
        return res.status(400).json(
            {
                success : false,
                message : "User is already registered"
            }
        )
    }

    const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);

    if(recentOtp.length == 0)
    {
        return res.status(400).json(
            {
                success : false,
                message : "OTP not found"
            }
        )
    }

    else if( otp !== recentOtp.otp)
    {
        return res.status(400).json(
            {
                success : false,
                message : "invalid Otp"
            }
        )
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const profileDetails = await Profile.create(
        {
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null,
        }
    );

    const user = await User.create({
        firstName , 
        lastName ,
        email ,            
        contactNumber , 
        password : hashedPassword , 
        accountType , 
        additionalDetails : profileDetails._id , 
        image : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firstName + " " + lastName)}&backgroundColor=${getRandomColor()}`
    })

    return res.status(200).json(
        {
            success : true,
            message : "User is registered Sucessfullly"
        }
    )

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                success : false,
                message : "User cannot registered , please try again !"
            }
        )
    
    }
        
}

exports.sendotp = async (req, res) => {
	try {
		const { email } = req.body;

		const checkUserPresent = await User.findOne({ email });
		
		if (checkUserPresent) {false
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});

		const result = await OTP.findOne({ otp: otp });
		
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
        
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);

		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};



exports.login = async (req , res) => 
{
    try {
        const { email , password } = req.body;
        if(!email || !password)
        {
            return res.status(403).json(
                {
                    success : false,
                    message : "All fields are required , please try again"
                }
            )
        }

        const user = await User.finOne({email});
        if(!user)
        {
            return res.status(401).json(
                {
                    success : false,
                    message : "User is not registered"
                }
            )
        }

        const payload = 
        {
            email : user.email,
            id : user._id,
            accountType : user.accountType
        }

        if(await bcrypt.compare(password , user.password))
        {
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                expiresIn : "2h",
            })
            user.token = token;
            user.password = undefined;

            const options = 
            {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true,
            }

            res.cookie("token" , token , options).status(200).json({
                success : true,
                token , 
                user ,
                message : "Logged in successfully"
            })
        }

        else
        {
            return res.status(401).json({
                success : false,
                message : "password is incorrect"
            })
        }

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "login failure , please try again"
        })
        
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;

        
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again"
            });
        }


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(403).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "New passwords do not match"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        mailSender(email , "Password changed" , `Your password is changed at ${Date.now()}`);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to change password"
        });
    }
};
