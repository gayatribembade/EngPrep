// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // @desc    Register user
// // @route   POST /api/auth/register
// // @access  Public
// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Create user
//     const user = await User.create({
//       username,
//       email,
//       password
//     });

//     // Create token
//     sendTokenResponse(user, 201, res);
//   } catch (error) {
//     if (error.code === 11000) {
//       // Duplicate key error
//       return res.status(400).json({
//         success: false,
//         error: 'Username or email already exists'
//       });
//     }
//     // Handle validation errors
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate email & password
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         error: 'Please provide email and password'
//       });
//     }

//     // Check for user
//     const user = await User.findOne({ email }).select('+password');

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials'
//       });
//     }

//     // Check if password matches
//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid credentials'
//       });
//     }

//     // Create token
//     sendTokenResponse(user, 200, res);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// // @desc    Get current logged in user
// // @route   GET /api/auth/me
// // @access  Private
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     res.status(200).json({
//       success: true,
//       data: user
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// // @desc    Log user out / clear cookie
// // @route   GET /api/auth/logout
// // @access  Private
// exports.logout = async (req, res) => {
//   res.cookie('token', 'none', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true
//   });

//   res.status(200).json({
//     success: true,
//     data: {}
//   });
// };

// // Helper function to send token response
// const sendTokenResponse = (user, statusCode, res) => {
//   // Create token
//   const token = user.getSignedJwtToken();

//   const options = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true
//   };

//   // Add secure flag in production
//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true;
//   }

//   res
//     .status(statusCode)
//     .cookie('token', token, options)
//     .json({
//       success: true,
//       token
//     });
// };


const User = require('../models/User');
const jwt = require('jsonwebtoken');

// List of admin emails
const adminEmails = ["bembadegayatree15@gmail.com", "dapkeriddhi@gmail.com"];

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Assign role based on email
    const role = adminEmails.includes(email) ? "admin" : "user";

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role // Store role in database
    });

    // Create token
    sendTokenResponse(user, role, 201, res);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Username or email already exists'
      });
    }
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Assign role dynamically
    const role = adminEmails.includes(email) ? "admin" : "user";

    // Create token
    sendTokenResponse(user, role, 200, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: { email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};

// Helper function to send token response
const sendTokenResponse = (user, role, statusCode, res) => {
  // Create token with role
  const token = jwt.sign(
    { id: user._id, email: user.email, role }, 
    process.env.JWT_SECRET, 
    { expiresIn: "1h" }
  );

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    role
  });
};
