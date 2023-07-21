import { register } from "controllers/user.controller";
import express from "express";

const router = express.Router();

router.post("/register", register);

export default router;
