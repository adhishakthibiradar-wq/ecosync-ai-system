import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateProductMetadata = async (productName: string, productDescription: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Product Name: ${productName}\nProduct Description: ${productDescription}`,
    config: {
      systemInstruction: "You are an AI assistant for a sustainable e-commerce platform. Analyze the product and generate structured metadata. Return ONLY JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: "Primary e-commerce category" },
          subcategory: { type: Type.STRING, description: "Specific subcategory" },
          seo_tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "5-10 SEO tags" },
          sustainability_filters: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Sustainability attributes like plastic-free, vegan, etc." }
        },
        required: ["category", "subcategory", "seo_tags", "sustainability_filters"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateCorporateProposal = async (companyType: string, purpose: string, budget: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Company Type: ${companyType}\nPurpose: ${purpose}\nBudget: ${budget}`,
    config: {
      systemInstruction: "You are an AI assistant that generates sustainable corporate product proposals. Suggest a mix of products, allocate budget, and provide an impact summary. Return ONLY JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                quantity: { type: Type.INTEGER },
                unit_price: { type: Type.NUMBER },
                total_cost: { type: Type.NUMBER }
              },
              required: ["name", "quantity", "unit_price", "total_cost"]
            }
          },
          budget_breakdown: {
            type: Type.OBJECT,
            properties: {
              total_budget: { type: Type.NUMBER },
              allocated_budget: { type: Type.NUMBER }
            },
            required: ["total_budget", "allocated_budget"]
          },
          impact_summary: { type: Type.STRING }
        },
        required: ["products", "budget_breakdown", "impact_summary"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
