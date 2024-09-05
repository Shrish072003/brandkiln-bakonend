const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

//register routes || POST
router.post('/register', userController.registerController );

//login routes || POST
router.post('/login', userController.loginController );

//Auth || POST
router.post('/getUserData', authMiddleware, userController.getUserData );

// Route to get all users || GET
router.get('/all-users', authMiddleware, userController.getAllUsersController);


module.exports = router; // Export the router to be used in the server.js file.  // This allows us to use this router in our routes/userRoute.js file.  // This is a common practice in Node.js applications.  // We separate our routes into different files (e.g., userRoute.js) and then import and use them in our server.js file.  // This makes it easier to manage and maintain our code.  // We also don't need to export each route individually, instead we export the entire router object.  // This makes it easier to use and manage our routes in our server.js file.  // We can add more routes to this router object in the future, and they will automatically be included in our application.  // This is a good practice for managing and organizing our code.  // In a larger application, we would

module.exports = router