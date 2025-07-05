// import { KiteConnect } from "kiteconnect";
import { GoogleGenAI } from "@google/genai";


// const apiKey = "saxoq5yc86yfkla9";
// const apiSecret = "cuzqwpkn05mbteq6dg58yaum6rdeh6zj"
// const access_token = "i7i6mviu518YRmK4pP6IgjcqX1j5tLEi";
const gemini_api_key = "AIzaSyC9RcGRQ_Myk544etFx7qAwerhNH9sh7vY";

const ai = new GoogleGenAI({apiKey : gemini_api_key});



// const kc = new KiteConnect({ api_key: apiKey });


async function init() {
  try {
    await findingStocks();
  } catch (err) {
    console.error(err);
  }
}

// async function generateSession() {
//   try {
//     const response = await kc.generateSession("3coJ5y76HPx0KQjtYUm5aPyNvthhX456", apiSecret);
//     kc.setAccessToken(response.access_token);
//     console.log(response.access_token)
//     console.log("Session generated:", response);
//   } catch (err) {
//     console.error("Error generating session:", err);
//   }
// }

export async function findingStocks(){

  try{
      const prompt = `
      You are a stock market analyst. Analyze all stocks in the NIFTY 50 index and select 5 stocks with the strongest potential for high return on investment (ROI) over the next quarter. 
      For each, return only the official trading symbol (as used on NSE, e.g., "RELIANCE", "TCS", "INFY", etc.), in a JSON array. 
      Do not include any explanation or extra text—just the array of 5 trading symbols.
      
      IMPORTANT: Return ONLY the raw JSON array. Do NOT use markdown formatting, code blocks, backticks, or any other formatting.
      Do NOT wrap the response in \`\`\`json or \`\`\` blocks.
      
      Example of valid response format:
      ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK"]
      `.trim();
      
      const response = await ai.models.generateContent({
          model: "gemini-2.5-pro",
          contents: prompt,
      });
      
      // Debug: Log the full response
      console.log('Full Gemini response:', JSON.stringify(response, null, 2));
      
      // Extract text from the response
      const text = response.text?.trim();
      console.log('Extracted text:', text);
      
      if (!text) throw new Error("No response text from Gemini API");
      
      // Try to parse as JSON
      const symbols = JSON.parse(text);
      console.log('Parsed symbols:', symbols);
      
      // Validate that it's an array of strings
      if (Array.isArray(symbols) && symbols.every(s => typeof s === "string")) {
          return symbols;
      } else {
          throw new Error("Response is not a valid array of strings");
      }
    
  } catch (err) {
      console.error('Error in findingStocks:', err);
      return [];
  }
}

// // Initialize the API calls
init();