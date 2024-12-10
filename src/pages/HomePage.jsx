import { useState } from "react";
import axios from "axios";

function HomePage() {
  const [mood, setMood] = useState(""); // User input state
  const [quote, setQuote] = useState(""); // Fetched quote state
  const [theorist, setTheorist] = useState(""); // Theorist state
  const [loading, setLoading] = useState(false); // Loading state

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/.netlify/functions/quote");
      console.log("Response data:", response.data);

      if (response.data && response.data.quote && response.data.quote.quote) {
        const { body, author } = response.data.quote.quote; // Extract quote body and author
        setQuote(body);
        setTheorist(author);
      } else {
        throw new Error("Quote structure is incomplete.");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Sorry, we couldn't fetch a quote right now.");
      setTheorist("");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setMood(e.target.value); // Update mood state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mood.trim()) {
      fetchQuote();
    } else {
      alert("Please enter a mood.");
    }
  };

  const displayQuote = quote || "Your aphorism will appear here.";
  const displayTheorist = theorist || "A theorist will appear here.";

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-teal-100 to-amber-500 h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <h1 className="text-cyan-600 font-mono text-2xl font-bold tracking-wider">
          PhiloMood
        </h1>
        <p className="text-gray-400 mt-2 italic">
          Transforming moods into mindfulness.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={mood}
            onChange={handleInputChange}
            placeholder="Enter your mood..."
            className="mt-4 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Quote"}
          </button>
        </form>
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-gray-600">
            <span className="mr-2">💬</span>Aphorism:
          </h2>
          <p className="text-sm text-gray-600 font-mono mt-1 font-extralight tracking-wide border-solid border border-cyan-500 p-1 rounded">
            {displayQuote}
          </p>
          <h2 className="text-lg font-semibold text-gray-600 mt-4">
            <span className="mr-2">📚</span>Theorist:
          </h2>
          <p className="text-gray-600 mt-1 italic">{displayTheorist}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
