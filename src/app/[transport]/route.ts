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
                await placeOrder(stock, qty, "BUY");
                return {
                    content: [{ type: "text", text: "Stock has been bought" }]
                };
            }
        );

        server.tool(
            "Sell_Stock",
            "Sell a stock at market price on Zerodha",
            { stock: z.string(), qty: z.number() },
            async ({ stock, qty }: { stock: string; qty: number }) => {
                await placeOrder(stock, qty, "SELL");
                return {
                    content: [{ type: "text", text: "Stock has been sold" }]
                };
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