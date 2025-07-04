import { KiteConnect } from "kiteconnect";

const apiKey = "saxoq5yc86yfkla9";
// const apiSecret = "cuzqwpkn05mbteq6dg58yaum6rdeh6zj"
const access_token = "i7i6mviu518YRmK4pP6IgjcqX1j5tLEi";


const kc = new KiteConnect({ api_key: apiKey });

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

