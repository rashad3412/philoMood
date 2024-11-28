import axios from "axios";

function HomePage() {
  const fetchQuote = async () => {
    try {
      const response = await axios.get("/api/quotes"); // This now goes through Vite's proxy
      console.log(response.data); // Logs the quote
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  fetchQuote();

  return (
    <div className="flex items-center justify-center bg-gradient-to-b from-teal-100 to-amber-500 h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <h1 className="text-cyan-600 font-mono text-2xl font-bold tracking-wider">
          PhiloMood
        </h1>
        <p className="text-gray-600 mt-2 italic">
          A guide to the philosophy of emotions.
        </p>
        <input
          type="text"
          placeholder="Enter your mood..."
          className="mt-4 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-gray-700">Quote:</h2>
          <p className="text-gray-600 italic mt-1">
            Example quote will go here.
          </p>
          <h2 className="text-lg font-semibold text-gray-700 mt-4">
            Practical Tip:
          </h2>
          <p className="text-gray-600 mt-1">
            Example practical advice will go here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
