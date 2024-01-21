import express from 'express'
import {
    changeUserPassword,
    deleteUserProfile,
    loginUser,
    registerUser,
    updateUserProfile,
    getLikedMovies,
    addLikedMovie,
    deleteLikedMovies,
    getUsers,
    deleteUser
} from '../Controllers/UserController.js'
import { protect, admin } from '../middlewares/Auth.js';

const router = express.Router();

// =======================PUBLIC ROUTES=======================
// register
router.post('/', registerUser);
// login
router.post('/login', loginUser);

// =======================PRIVATE ROUTES=======================
// Update profile
router.put('/', protect, updateUserProfile);
// delete profile 
router.delete('/', protect, deleteUserProfile);
// change password
router.put('/password', protect, changeUserPassword);
// get all liked movies
router.get('/favorites', protect, getLikedMovies);
// add liked movies
router.post('/favorites', protect, addLikedMovie);
//delete all liked movies
router.delete('/favorites', protect, deleteLikedMovies);

// =======================ADMIN ROUTES=======================
// get all users
router.get('/', protect, admin, getUsers);
// delete users
router.delete('/:id', protect, admin, deleteUser);



export default router;