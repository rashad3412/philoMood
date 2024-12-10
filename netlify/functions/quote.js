import axios from "axios";

export const handler = async (event, context) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/quotes");
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching quote", error }),
    };
  }
};
