import { KiteConnect } from "kiteconnect";
import { GoogleGenAI } from "@google/genai";
// @ts-expect-error: No types for @zero65tech/indian-stock-market
import ism from "@zero65tech/indian-stock-market";

const apiKey = process.env.KITE_API_KEY;
if (!apiKey) throw new Error("KITE_API_KEY environment variable is required");
const access_token = process.env.KITE_ACCESS_TOKEN;
if (!access_token) throw new Error("KITE_ACCESS_TOKEN environment variable is required");
const gemini_api_key = process.env.GEMINI_API_KEY;
if (!gemini_api_key) throw new Error("GEMINI_API_KEY environment variable is required");

const kc = new KiteConnect({ api_key: apiKey });
const ai = new GoogleGenAI({apiKey : gemini_api_key});

export async function placeOrder(tradingSymbol: string, quantity : number, type : "BUY" | "SELL") {
    try{
        if (!access_token) throw new Error("Access token is required");
        kc.setAccessToken(access_token);
        const orderResponse = await kc.placeOrder("regular",{
            exchange: "NSE" ,
            tradingsymbol: tradingSymbol,
            transaction_type : type,
            quantity,
            product: "CNC",
            order_type: "MARKET"
        });

        // Check if order was successful
        if (orderResponse && orderResponse.order_id) {
            return {
                success: true,
                orderId: orderResponse.order_id,
                message: `${type} order placed successfully for ${quantity} shares of ${tradingSymbol}`
            };
        } else {
            return {
                success: false,
                error: "Order placement failed - no order ID received"
            };
        }

    }
    catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Order placement failed";
        return {
            success: false,
            error: errorMessage
        };
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

export async function getProfile() {
    try {
        if (!access_token) throw new Error("Access token is required");
        kc.setAccessToken(access_token);
        const profile = await kc.getProfile();
        return {
            success: true,
            profile: profile
        };
    } 
    catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to get profile";
        return {
            success: false,
            error: errorMessage
        };
    }
}

export function isMarketOpen(): boolean {
    return ism.isOpen();
}
  