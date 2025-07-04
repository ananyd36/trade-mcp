import { KiteConnect } from "kiteconnect";
import { GoogleGenAI } from "@google/genai";

const apiKey = "saxoq5yc86yfkla9";
// const apiSecret = "cuzqwpkn05mbteq6dg58yaum6rdeh6zj"
const access_token = "i7i6mviu518YRmK4pP6IgjcqX1j5tLEi";
const gemini_api_key = "AIzaSyC9RcGRQ_Myk544etFx7qAwerhNH9sh7vY";


const kc = new KiteConnect({ api_key: apiKey });
const ai = new GoogleGenAI({apiKey : gemini_api_key});


export async function placeOrder(tradingSymbol: string, quantity : number, type : "BUY" | "SELL") {
    try{
        kc.setAccessToken(access_token);
        await kc.placeOrder("regular",{
            exchange: "NSE" ,
            tradingsymbol: tradingSymbol,
            transaction_type : type,
            quantity,
            product: "CNC",
            order_type: "MARKET"
        })

    }
    catch (err) {
        console.error(err)
    }
    
}

export async function findingStocks(): Promise<string[]>  {

    try{
        const prompt = `
        You are a stock market analyst. Analyze all stocks in the NIFTY 50 index and select 5 stocks with the strongest potential for high return on investment (ROI) over the next quarter. 
        For each, return only the official trading symbol (as used on NSE, e.g., "RELIANCE", "TCS", "INFY", etc.), in a JSON array. 
        Do not include any explanation or extra text—just the array of 5 trading symbols.
        `.trim();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
        });
        const text = response.text?.trim();
        if (!text) throw new Error("No response text from Gemini API");
        const symbols = JSON.parse(text);
        return symbols;
      
}
catch (err) {
    console.error(err)
}
    return []
}

