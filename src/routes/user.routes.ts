import express from "express";
import { registerUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/registerr", registerUser);

export default router;
