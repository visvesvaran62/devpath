import express from "express"
import { aiChat } from "../controller/aiController.js"

const router = express.Router()

router.post("/chat",aiChat)

export default router