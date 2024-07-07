import { User } from "../model/model.js";

// password hashed handeler
import bcrypt from 'bcrypt';



// creating a signup 

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // checkiing input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // checking for name validation
        if (!/^[a-zA-Z\s'-]+$/.test(name)) {
            return res.status(400).json({ message: 'Invalid name format' });
        }

        // Email validation 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long'
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// creating a login post
export const userLogin = async (req,res) =>{
    const {email, password } = req.body;

    try {
        // Finding user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Compare passwords
        const matchUp = await bcrypt.compare(password, user.password);
        if (!matchUp) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
    
        res.json({ message: 'Login successful', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
};