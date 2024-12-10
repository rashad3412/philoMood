import axios from "axios";

export async function handler() {
  try {
    // Call the third-party API to fetch the quote
    const response = await axios.get("https://favqs.com/api/qotd", {
      headers: {
        Authorization: "Token token=004883ce10cf809d8a42f5334b311e09", // Replace with your API key
      },
    });

    // Structure the response data correctly
    return {
      statusCode: 200,
      body: JSON.stringify({
        quote: {
          body: response.data.quote.body,
          author: response.data.quote.author,
        },
      }),
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch quote" }),
    };
  }
}
