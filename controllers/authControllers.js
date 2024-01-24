const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const createNewUser = async (req, res,) => {
    try {
        // Get user input..
        const { firstName, lastName, userName, email, password } = req.body;
        // Validate user input..
        if (!(email && password && firstName && lastName && userName)) {
            return res.status(400).send("All input is required");
        }
        // Check if user already exists..
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ userName });

        if (existingUser) return res.status(409).send("User already exists. Please login or use another email address.");
        if (existingUsername) return res.status(409).send("Username already exists. Please choose another username.");

        // Encrypt user password...
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in the database...
        const user = await User.create({
            firstName,
            lastName,
            userName,
            email: email.toLowerCase(), // Convert to lowercase..
            password: encryptedPassword,
        });

        // Create token...
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        // Save user token...
        user.token = token;

        // Remove password from the response
        delete user.password;

        // Return new user...
        res.status(201).json(user);
        console.log(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, userName, password } = req.body;
        let user = '';

        // Validate user input..
        if (!(email && password || userName && password)) {
            return res.status(400).send("All input fields are required");
        }

        // Validate if user exists in the database..
        if (!userName) {
            user = await User.findOne({ email });
        } else {
            user = await User.findOne({ userName });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // Save user token...
            user.token = token;

            // Remove password from the response
            delete user.password;

            // User
            return res.status(200).json(user);
        }

        // Invalid credentials
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.error(err); // Use console.error() for error logging
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createNewUser,
    loginUser,
}