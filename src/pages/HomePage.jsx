import { useState } from "react";
import axios from "axios";

function HomePage() {
  const [mood, setMood] = useState(""); // State for user input
  const [quote, setQuote] = useState(""); // State for the fetched quote
  const [theorist, setTheorist] = useState(""); // Set theorist

  // Fetch the quote from the API
  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://zenquotes.io/api/random"); // Full API URL for production
      const quotes = response.data;

      // ZenQuotes returns an array, pick the first quote
      const randomQuote = quotes[0];
      setQuote(randomQuote.q); // Set the quote text
      setTheorist(randomQuote.a); // Set the theorist (author) name
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setQuote("Sorry, we couldn't find a quote right now...");
    }
  };

  // Handle the input change from the user
  const handleInputChange = (e) => {
    setMood(e.target.value); // Update the mood state with user input
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (mood) {
      fetchQuote(); // Fetch a quote when the user submits their mood
    } else {
      alert("Please enter a mood.");
    }
  };

  // Display the quote and theorist
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
          >
            Get Quote
          </button>
        </form>
        <div
          className={`mt-6 text-left transition-opacity duration-1000 ease-in ${
            quote ? "opacity-100" : "opacity-0"
          }`}
        >
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
