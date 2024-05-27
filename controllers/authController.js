const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Op } = require('sequelize');



exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Find the user by username or email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or email' });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    if (!user.refreshToken) {
      // Generate refresh token
      const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, { expiresIn: '7d' });

      // Store refresh token in the database
      await user.update({ refresh_token: refreshToken });
    }

    // Return JWT token and refresh token to the user
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
    try {
      // Extract user input from request body
      const { username, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }]
        }
      });
  
      // If user already exists, return an error
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the new user
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });
  
      // Return success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle any errors
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};