const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Your email is not registered with us",
            });
        }

        const token = crypto.randomUUID();

        await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpiresIn: Date.now() + 5 * 60 * 1000
            },
            { new: true }
        );

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(email, "Password Reset", `Password Reset Link: ${url}`);

        return res.json({
            success: true,
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const userDetails = await User.findOne({ token });

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        if (userDetails.resetPasswordExpiresIn <= Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Token expired, please regenerate your token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: hashedToken },
            { password: hashedPassword, token: null, resetPasswordExpiresIn: null },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successful",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        });
    }
};
