import { useState } from "react";
import { randomQuotes } from "..//quotes"; // Import randomQuotes

function HomePage() {
  const [mood, setMood] = useState(""); // State for user input
  const [quote, setQuote] = useState(""); // State for the fetched quote
  const [theorist, setTheorist] = useState(""); // Set theorist
  const [loading, setLoading] = useState(false); // Loading state for button feedback

  const fetchQuote = () => {
    setLoading(true); // Set loading to true when fetching the quote

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomQuotes.length);
      const selectedQuote = randomQuotes[randomIndex];
      setQuote(selectedQuote.body);
      setTheorist(selectedQuote.author);
      setLoading(false); // Set loading to false after the quote is fetched
    }, 1000); // Simulating a loading time
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (mood) {
      fetchQuote(); // Fetch a random quote when the user submits their mood
    } else {
      fetchQuote();
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
          <button
            type="submit"
            className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded hover:bg-cyan-600"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Get Quote"}
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
          <p className=" text-sm text-gray-600 font-mono mt-1 font-extralight tracking-wide border-solid border border-cyan-500 p-1 rounded">
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
