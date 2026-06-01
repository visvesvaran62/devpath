import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const buildMentorPrompt = ({
  message,
  prompt,
  userRole = "learner",
  pendingTaskCount = 0,
  conversationHistory = []
}) => {
  const userMessage = message || prompt;
  const recentHistory = Array.isArray(conversationHistory)
    ? conversationHistory
        .slice(-8)
        .map((item) => `${item.sender === "user" ? "Learner" : "Mentor"}: ${item.text}`)
        .join("\n")
    : "";

  return `
You are DevPath AI Mentor, a concise and practical learning coach for software developers.
The learner's current goal or role is: ${userRole || "learner"}.
They currently have ${pendingTaskCount || 0} pending tasks.

Recent conversation:
${recentHistory || "No previous messages."}

Reply to the learner's latest message with clear next steps, useful examples, and a friendly tone.
Latest message: ${userMessage}
`.trim();
};

export const aiChat = async (req, res) => {
  try {
    const { message, prompt } = req.body;
    const userMessage = message || prompt;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "GEMINI_API_KEY is not configured on the server."
      });
    }

    if (!userMessage || !userMessage.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please send a message for the AI mentor."
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const mentorPrompt = buildMentorPrompt(req.body);
    const result = await model.generateContent(mentorPrompt);
    const response = result.response.text();

    res.status(200).json({
      success: true,
      reply: response
    });
  } catch (error) {
    console.error("AI chat error:", error);

    res.status(500).json({
      success: false,
      message: "AI mentor could not respond right now."
    });
  }
};
