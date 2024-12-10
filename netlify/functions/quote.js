// netlify/functions/quote.js

import axios from "axios";

export const handler = async () => {
  try {
    const apiKey = "004883ce10cf809d8a42f5334b311e09"; // Use your actual API key
    const apiUrl = `https://favqs.com/api/qotd`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Token token=${apiKey}`,
      },
    });

    const quote = response.data;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all domains
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote: quote }), // Return the quote data as JSON
    };
  } catch (error) {
    console.error("Error fetching quote:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
