import { KiteConnect } from "kiteconnect";

const apiKey = "saxoq5yc86yfkla9";
const apiSecret = "cuzqwpkn05mbteq6dg58yaum6rdeh6zj"
const access_token = "i7i6mviu518YRmK4pP6IgjcqX1j5tLEi";


const kc = new KiteConnect({ api_key: apiKey });

console.log(kc.getLoginURL);

async function init() {
  try {
    // await generateSession();
    kc.setAccessToken(access_token);
    await getProfile();
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

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    console.log("Profile:", profile);
  } catch (err) {
    console.error("Error getting profile:", err);
  }
}
// // Initialize the API calls
init();