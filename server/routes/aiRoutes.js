import express from "express"
import { aiChat, reviewCode, generateTasks } from "../controller/aiController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Public: AI chat (no auth needed so the mentor works on first load)
router.post("/chat", aiChat)

// Protected: Code review
router.post("/review", authMiddleware, reviewCode)

// Protected: AI-powered task generation
router.post("/generate-tasks", authMiddleware, generateTasks)

export default router