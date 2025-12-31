
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAnnouncementSummary = async (topic: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a professional and engaging investment announcement about: ${topic}. 
    Keep it concise (max 100 words) and suitable for a financial platform dashboard.`,
    config: {
      temperature: 0.7,
      topP: 0.8
    }
  });
  return response.text || "Failed to generate summary.";
};
