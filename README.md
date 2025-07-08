# AI-Powered Trading Assistant with Model Context Protocol (MCP)

## Table of Contents

* [Introduction](#introduction)
* [The Problem & MCP's Solution](#the-problem--mcps-solution)
* [Features](#features)
* [Demo Video](#demo-video)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Future Scope](#future-scope)


## Introduction

This project demonstrates a cutting-edge **AI-powered trading assistant** built by integrating a custom **Model Context Protocol (MCP)** server with **GitHub Copilot**. It transforms GitHub Copilot from a mere coding assistant into a dynamic, real-time trading companion capable of executing trades, fetching live market data, and managing portfolio details through natural language commands.

## The Problem & MCP's Solution

**Problem:** Retail traders often face challenges with manual, time-consuming market analysis and emotionally driven trading decisions. Traditional AI integrations also suffer from fragmentation, context loss, and limited real-world actionability.

**MCP's Solution:** The Model Context Protocol (MCP) provides a **standardized communication layer** between AI clients (like GitHub Copilot) and external tools/services. It allows AIs to **discover and execute external tools** (such as our custom trading functions via Zerodha Kite API) and access **real-time context**. This eliminates fragmented integrations, prevents context loss, and enables GitHub Copilot to perform tangible actions in the real world, streamlining trading workflows and reducing manual effort.

## Features

* **Intelligent Trade Execution:** Buy and sell stocks on the market using natural language commands.
* **Real-time Market Information:** Fetch live stock prices, market trends, and company news.
* **Personalized Portfolio Management:** Check profile details, trade history, and current portfolio status.
* **AI-Driven Insights:** Get context-aware responses and execute actions directly within your development environment.
* **Modular & Scalable:** Built on MCP, allowing for easy expansion with new tools and data sources.

## Demo Video

Watch the full demo on YouTube to see the AI Trading Assistant in action!
[Watch the demo video](https://youtu.be/mHQUtX1jBtI)


## Tech Stack

* **AI Interface:** GitHub Copilot (leveraging its interactive capabilities), Cursor IDE
* **MCP Server Framework:** [Next.js](https://nextjs.org/)
* **Programming Language:** [TypeScript](https://www.typescriptlang.org/)
* **Deployment:** [Vercel](https://vercel.com/) (for remote MCP server hosting)
* **AI-Assisted Development:** [GitHub Copilot](https://copilot.github.com/) (used during development)
* **Communication Protocol:** Streamable HTTP Protocol (for MCP server)
* **Trading API:** [Zerodha Kite API](https://kite.trade/) (for data fetching and order placement)

## Architecture

The project's architecture involves three main components:

1.  **GitHub Copilot/ Cursor (Client):** The AI interface where users issue natural language commands.
2.  **Custom MCP Server (Middle-tier):**
    * Developed with Next.js and TypeScript.
    * Deployed on Vercel.
    * Exposes trading capabilities (tools) via the Model Context Protocol (Streamable HTTP).
    * Acts as an intermediary, receiving requests from Copilot, translating them, and interacting with the Zerodha Kite API.
3.  **Zerodha Kite API (External Service):**
    * Provides real-time market data, order placement, and account information.
    * The MCP server authenticates and interacts with this API.

## Future Scope

The potential for this project is immense, building upon the foundational AI-powered trading assistant you've developed. Here are a few key areas for future development:

* **Advanced Trading Strategies:** Implement more complex algorithms (e.g., arbitrage, swing trading, option strategies, high-frequency trading components) accessible via new MCP tools, allowing users to define and execute sophisticated strategies through natural language.
* **Sentiment & News Integration:** Develop new MCP tools to fetch and analyze real-time news sentiment, social media trends, and financial news feeds for specific stocks and broader market sectors. This would allow the AI to factor in qualitative data for trading decisions.
* **Backtesting Capabilities:** Integrate a robust backtesting engine. This would allow users to define and test trading strategies in natural language, with the MCP server running simulations against historical data and reporting performance metrics (e.g., profit/loss, drawdown, Sharpe ratio) directly back to GitHub Copilot.
* **Portfolio Optimization & Risk Management:** Enhance the AI to provide intelligent, data-driven suggestions for portfolio rebalancing based on user-defined risk tolerance, identify over-exposed positions, calculate various risk metrics (e.g., VaR, CVaR), and propose hedging strategies.
* **Multi-Asset Class Support:** Expand the project's capabilities beyond traditional stocks to cover a broader range of financial instruments, including commodities, forex (foreign exchange), cryptocurrencies, bonds, and derivatives (futures, options), each potentially requiring specific API integrations through new MCP tools.
* **Voice Integration:** Explore integrating voice input
