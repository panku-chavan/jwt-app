import express from "express";
import { loginUser, registerUser,deleteUser, updateUser, getUserList, getUseDetails } from "../controller/authController.js";
import protect from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.delete("/user/delete/:id",protect,deleteUser);

router.put("/user/update/:id",protect,updateUser);

router.get("/user/all", protect,getUserList);

router.get("/user/:id",protect,getUseDetails);

export default router;