import { GoogleGenAI, Type } from "@google/genai";
import { PENAL_CODE } from "../data/penalCode";
import { AiAnalysisResult } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Create a simplified list of codes for the prompt to save tokens and context
const penalCodeSummary = PENAL_CODE.map(c => `${c.id}: ${c.code} ${c.title} (${c.description})`).join('\n');

export const analyzeScenarioWithGemini = async (narrative: string): Promise<AiAnalysisResult> => {
  if (!narrative.trim()) {
    throw new Error("Narrative cannot be empty");
  }

  const prompt = `
    You are a Field Training Officer for the Los Santos Police Department.
    Review the following incident report narrative and suggest applicable charges from our specific Penal Code.

    Our Penal Code:
    ${penalCodeSummary}

    Narrative:
    "${narrative}"

    Instructions:
    1. Identify all crimes described in the narrative.
    2. Map them strictly to the IDs provided in the Penal Code list.
    3. Provide a brief reasoning for the selected charges.
    4. If no specific charges apply, return an empty list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedChargeIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of charge IDs that strictly match the provided Penal Code list."
            },
            reasoning: {
              type: Type.STRING,
              description: "A concise explanation of why these charges were selected based on the narrative."
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      suggestedChargeIds: result.suggestedChargeIds || [],
      reasoning: result.reasoning || "No reasoning provided."
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw new Error("Failed to analyze scenario. Please try again.");
  }
};