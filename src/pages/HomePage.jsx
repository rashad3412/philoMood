import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [mood, setMood] = useState(""); // State for user input
  const [quote, setQuote] = useState(""); // State for the fetched quote
  const [theorist, setTheorist] = useState(""); // State for the theorist (author)
  const [loading, setLoading] = useState(false); // Loading state for button feedback

  const fetchQuote = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.get("/.netlify/functions/quote");
      console.log("Response data:", response.data); // Log the full response for debugging

      // Access the nested structure correctly
      if (response.data && response.data.quote) {
        const quoteObject = response.data.quote; // The parent quote object
        const nestedQuote = quoteObject.quote; // Access the actual quote inside

        console.log("Quote object:", quoteObject);
        console.log("Nested quote:", nestedQuote);

        // Ensure the nested quote has both `body` and `author`
        if (nestedQuote.body && nestedQuote.author) {
          setQuote(nestedQuote.body); // Set the quote text
          setTheorist(nestedQuote.author); // Set the theorist (author)
        } else {
          throw new Error("Nested quote structure is incomplete."); // Throw error if keys are missing
        }
      } else {
        throw new Error("Quote object is not present in the response.");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Sorry, we couldn't fetch a quote at this time."); // Fallback for quote
      setTheorist(""); // Clear theorist in case of error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Log the updated state values (for debugging)
  useEffect(() => {
    console.log("Quote:", quote); // Logs after state update
    console.log("Theorist:", theorist); // Logs after state update
  }, [quote, theorist]); // Runs whenever quote or theorist changes

  // Handle input change
  const handleInputChange = (e) => {
    setMood(e.target.value); // Update the mood state with user input
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (mood) {
      fetchQuote(); // Fetch a quote when the user submits their mood
    } else {
      alert("Please enter a mood.");
    }
  };

  // Display fallback message if no quote is set
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
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Get Quote"}
          </button>
        </form>
        {/* Conditionally render the quote and theorist */}
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
