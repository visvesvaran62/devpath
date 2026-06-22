import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    // 1. Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub: googleId, picture } = payload;

    // 2. Check if user exists
    let user = await User.findOne({ email });

    // 3. If not, create user
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
        password: null,
      });
    }

    // 4. Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {
    console.log("Google Auth Error:", err);
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
      error: err.message,
      stack: err.stack
    });
  }
});

export default router;