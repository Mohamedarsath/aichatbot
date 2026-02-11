require('dotenv').config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function checkApi() {
    if (!API_KEY) {
        console.error("No API Key found");
        return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    console.log(`Checking API access for key ending in ...${API_KEY.slice(-4)}`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("API Error Status:", response.status);
            console.error("Error Body:", JSON.stringify(data, null, 2));
            return;
        }

        console.log("Success! Available models:");
        if (data.models) {
            data.models.forEach(m => {
                // Log valuable models
                if (m.name.includes("gemini")) {
                    console.log(`- ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("No models found in response??", data);
        }

    } catch (error) {
        console.error("Network Error:", error.message);
    }
}

checkApi();
