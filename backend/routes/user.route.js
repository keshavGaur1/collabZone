import express from "express";
import { signup , signin ,signout} from "../controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import upload from "../middlewares/multer.js";

const router = express.Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').get(signout);
export default router;