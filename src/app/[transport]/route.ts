import { createMcpHandler } from "@vercel/mcp-adapter";
import z from "zod";
import { placeOrder, findingStocks, getProfile, isMarketOpen } from "@/lib/zerodha";



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
                    // Check if market is open
                    if (!isMarketOpen()) {
                        return {
                            content: [{ type: "text", text: `❌ Order failed: Market is currently closed.` }]
                        };
                    }
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
                    // Check if market is open
                    if (!isMarketOpen()) {
                        return {
                            content: [{ type: "text", text: `❌ Order failed: Market is currently closed.` }]
                        };
                    }
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

        server.tool(
            "Get_Profile",
            "Get user's Zerodha profile information",
            {},
            async () => {
                const result = await getProfile();
                if (result.success) {
                    return {
                        content: [{ 
                            type: "text", 
                            text: `✅ Profile retrieved successfully:\n${JSON.stringify(result.profile, null, 2)}` 
                        }]
                    };
                } else {
                    return {
                        content: [{ type: "text", text: `❌ Failed to get profile: ${result.error}` }]
                    };
                }
            }
        );
    },
    {
    capabilities: {
        tools:{
            "Buy_Stock": {
                description: "Place a market order to buy a specified quantity of a stock on the NSE using Zerodha. Requires trading symbol and quantity. Returns order status and order ID."
            },
            "Sell_Stock" : {
                description : "Place a market order to sell a specified quantity of a stock on the NSE using Zerodha. Requires trading symbol and quantity. Returns order status and order ID."
            },
            "Analyse_Stock" : {
                description : "Analyze all NIFTY 50 stocks and return the top 5 trading symbols with the highest potential for future ROI."
            },
            "Get_Profile" : {
                description : "Retrieve the user's Zerodha account profile, including account details and personal information."
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