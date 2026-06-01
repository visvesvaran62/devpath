  import { GoogleGenerativeAI } from "@google/generative-ai";

  const MODEL_NAME = "gemini-2.5-flash";

 const getModel = () => {
  console.log("API Key Loaded:", !!process.env.GEMINI_API_KEY);

  const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });
};

  // ─────────────────────────────────────────────
  // BUILD PROMPTS
  // ─────────────────────────────────────────────

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
  Keep your reply focused and practical (max 4 paragraphs).
  Latest message: ${userMessage}
  `.trim();
  };

  const buildCodeReviewPrompt = ({ code, userRole = "learner", userName = "learner" }) => {
    return `
  You are DevPath AI Code Reviewer — a senior software engineer giving actionable, constructive feedback.
  You are reviewing code written by ${userName}, who identifies as a ${userRole}.

  Review the following code. Structure your response as:
  1. **Overall Assessment** (1-2 sentences)
  2. **What's Good** (bullet points)
  3. **Issues Found** (bullet points with brief explanations)
  4. **Suggested Improvements** (bullet points with code snippets where helpful)
  5. **Score**: X/10 — with a one-line reason

  Code to review:
  \`\`\`
  ${code}
  \`\`\`
  `.trim();
  };

  const buildGenerateTasksPrompt = ({ pathTitle, proficiency = "Intermediate", completedSteps = [] }) => {
    const completedList = completedSteps.length > 0
      ? completedSteps.map((s) => `- ${s}`).join("\n")
      : "None yet";

    return `
  You are DevPath AI, a developer learning path curator.
  A learner is on the "${pathTitle}" path at "${proficiency}" level.

  Already completed steps:
  ${completedList}

  Generate exactly 5 actionable, specific learning tasks for them to work on next.
  Each task should be a small, concrete milestone (not vague goals).

  Respond ONLY with a valid JSON array. No explanation, no markdown fences.
  Format:
  [
    {
      "title": "Task title (short, action-oriented)",
      "description": "What exactly to do and why it matters (1-2 sentences)",
      "difficulty": "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      "time": "e.g. 1h, 2h, 30m"
    }
  ]
  `.trim();
  };

  // ─────────────────────────────────────────────
  // CONTROLLERS
  // ─────────────────────────────────────────────

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

      const model = getModel();
      const mentorPrompt = buildMentorPrompt(req.body);
      const result = await model.generateContent(mentorPrompt);
      const response = result.response.text();

      res.status(200).json({ success: true, reply: response });
    } catch (error) {
      console.error("AI chat error:", error);
      res.status(500).json({
        success: false,
        message: "AI mentor could not respond right now. Please try again."
      });
    }
  };

  export const reviewCode = async (req, res) => {
    try {
      const { code, userRole, userName } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "GEMINI_API_KEY is not configured on the server."
        });
      }

      if (!code || !code.trim()) {
        return res.status(400).json({
          success: false,
          message: "Please provide code to review."
        });
      }

      const model = getModel();
      const reviewPrompt = buildCodeReviewPrompt({ code, userRole, userName });
      const result = await model.generateContent(reviewPrompt);
      const review = result.response.text();

      res.status(200).json({ success: true, review });
    } catch (error) {
      console.error("AI code review error:", error);
      res.status(500).json({
        success: false,
        message: "Code review could not be completed right now. Please try again."
      });
    }
  };

  export const generateTasks = async (req, res) => {
    try {
      const { pathTitle, proficiency, completedSteps } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          success: false,
          message: "GEMINI_API_KEY is not configured on the server."
        });
      }

      if (!pathTitle) {
        return res.status(400).json({
          success: false,
          message: "pathTitle is required to generate tasks."
        });
      }

      const model = getModel();
      const taskPrompt = buildGenerateTasksPrompt({ pathTitle, proficiency, completedSteps });
      const result = await model.generateContent(taskPrompt);
      let raw = result.response.text().trim();

      // Strip markdown code fences if Gemini wraps the JSON
      raw = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();

      let tasks;
      try {
        tasks = JSON.parse(raw);
      } catch (parseErr) {
        console.error("Failed to parse AI task JSON:", raw);
        return res.status(500).json({
          success: false,
          message: "AI returned an unexpected format. Please try again."
        });
      }

      if (!Array.isArray(tasks)) {
        return res.status(500).json({
          success: false,
          message: "AI returned an invalid task list."
        });
      }

      res.status(200).json({ success: true, tasks });
    } catch (error) {
      console.error("AI generate tasks error:", error);
      res.status(500).json({
        success: false,
        message: "AI task generation failed. Please try again."
      });
    }
  };
