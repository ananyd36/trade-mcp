import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <section className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">AutoTrade: Zerodha Order Placement</h1>
        <p className="mb-4 text-gray-700">
          <b>AutoTrade</b> is a demo platform that allows users to authenticate with Zerodha and place stock orders directly using the official Kite Connect API.<br/>
          <span className="text-sm text-gray-500">(For demonstration purposes only. Do not use real credentials on public/shared servers.)</span>
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-600">
          <li>Login securely with your Zerodha account</li>
          <li>Obtain your access token after authentication</li>
          <li>Place equity orders using the Kite Connect API</li>
        </ul>
      </section>
      <footer className="text-center text-gray-400 text-xs mt-8">
        &copy; {new Date().getFullYear()} AutoTrade Demo. Powered by Next.js & Kite Connect.
      </footer>
    </main>
  );
}
