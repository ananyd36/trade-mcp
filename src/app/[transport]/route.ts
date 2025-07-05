import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";
import { placeOrder, findingStocks } from "@/lib/zerodha";



const handler = createMcpHandler(
    server => {
        server.tool(
            "Buy_Stock",
            "Buy a stock at market price on Zerodha",
            { stock: z.string(), qty: z.number() },
            async ({ stock, qty }: { stock: string; qty: number }) => {
                const result = await placeOrder(stock, qty, "BUY");
                if (result.success) {
                    return {
                        content: [{ type: "text", text: `✅ ${result.message} (Order ID: ${result.orderId})` }]
                    };
                } else {
                    return {
                        content: [{ type: "text", text: `❌ Order failed: ${result.error}` }]
                    };
                }
            }
        );

        server.tool(
            "Sell_Stock",
            "Sell a stock at market price on Zerodha",
            { stock: z.string(), qty: z.number() },
            async ({ stock, qty }: { stock: string; qty: number }) => {
                const result = await placeOrder(stock, qty, "SELL");
                if (result.success) {
                    return {
                        content: [{ type: "text", text: `✅ ${result.message} (Order ID: ${result.orderId})` }]
                    };
                } else {
                    return {
                        content: [{ type: "text", text: `❌ Order failed: ${result.error}` }]
                    };
                }
            }
        );

        server.tool(
            "Analyse_Stocks",
            "Finding the best stocks for strong ROI",
            async () => {
                const stocks = await findingStocks();
                return {
                    content: [{ type: "text", text: "Here are the top 5 stocks for great ROI in future " +  stocks.join(", ") }]
                };
            }
        );
    },
    {
    capabilities: {
        tools:{
            "Buy_Stock": {
                description: "Buy a stock at market price on Zerodha",
        },
        "Sell_Stock" : {
            description : "Sell a stock at market price on Zerodha"
        },
        "Analyse_Stock" : {
            description : "Search for the top 5 of the Nifty 50 stocks for great future ROI."
        }
    },

}, 
    },
{
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
});

export { handler as GET, handler as POST , handler as DELETE };