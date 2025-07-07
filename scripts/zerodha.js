import { KiteConnect } from "kiteconnect";

const apiKey = "saxoq5yc86yfkla9";
const apiSecret =  "cuzqwpkn05mbteq6dg58yaum6rdeh6zj";
const requestToken =  "LuUTheCK5MC0mwkzgVBXAyB2nxaXyH3X";
const access_token = "";

const kc = new KiteConnect({ api_key: apiKey });
console.log(kc.getLoginURL());
// kc.setAccessToken(access_token);

async function init() {
  try {
    await generateSession();
    await getProfile();
  } catch (err) {
    console.error(err);

  }
}

async function generateSession() {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    console.log(response.access_token);
    kc.setAccessToken(access_token);
    console.log("Session generated:", response);
  } catch (err) {
    console.error("Error generating session:", err);
  }
}

async function getProfile() {
  try {
    const profile = await kc.getTrades();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}


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
// Initialize the API calls
init();