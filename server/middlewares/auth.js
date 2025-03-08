const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req , res , next) => 
{
    try {
        const token = req.cookies.token || req.body.token || req.header("authorisation").replace("Bearer " ,"");

        if(!token)
        {
            return res.status(401).json(
                {
                    success : false,
                    message : "token is missing"
                }
            )
        }

        try {
            const decode = await jwt.verify(token , process.env.JWT_SECRET);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success : false ,
                message : "token is invalid"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json(
            {
                success : false,
                messsage : "something went wrong while validating token"
            }
        )
    }
}


exports.isStudent = async (req , res) => 
{
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success : false,
                message : "this is a protected route for students only"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified , please try again'
        })
    }
}

exports.isAdmin = async (req , res) => 
{
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success : false,
                message : "this is a protected route for Admin only"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified , please try again'
        })
    }
}

exports.isInstructor = async (req , res) => 
{
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success : false,
                message : "this is a protected route for Instructor only"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : 'User role cannot be verified , please try again'
        })
    }
}