import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    console.log("Model initialized (gemini-2.5-flash). Generating content...");
    const result = await model.generateContent("Explain JavaScript in one sentence.");
    console.log("Response text:");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error during generation:", error);
  }
}

run();
