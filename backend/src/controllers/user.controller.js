import { User } from '../model/user.model.js';

// Register
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password){
            return res.status(400).json({ message: "All field required!" })
        }

        // Existed User
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing){
            return res.status(400).json({ message: "This user is already existed!" });
        }

        // Create User
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            message: "User registered successful!",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error!", error: error.message })
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        // Check if the user existed
        const {email, password} = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: 'User not found!'
        });

        // Compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        res.status(200).json({
            message: "User logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export{
    registerUser,
    loginUser
}