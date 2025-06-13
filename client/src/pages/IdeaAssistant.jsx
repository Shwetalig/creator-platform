import React, { useState, useEffect } from "react";
import axios from "axios";

function IdeaAssistant() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE}/api/analytics`)
      .get("${BASE}/api/idea/saved")
      .then((res) => setSavedIdeas(res.data))
      .catch((err) => console.error("Failed to fetch saved ideas", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE}/api/idea/${id}`);
      setSavedIdeas((prev) => prev.filter((idea) => idea._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/api/idea", {
        topic,
        niche,
      });
      setResult(res.data);
    } catch (err) {
      setError("Failed to generate idea. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select niche</option>
            <option value="fashion">Fashion</option>
            <option value="fitness">Fitness</option>
            <option value="finance">Finance</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Idea"}
          </button>
        </form>

        {error && <p className="text-red-500">{error}</p>}

        {result && (
          <div className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="text-lg font-bold">📹 Reel Idea:</h3>
            <p>{result.idea}</p>
            <h3 className="font-bold">🧠 Hook:</h3>
            <p>{result.hook}</p>
            <h3 className="font-bold">📄 Caption:</h3>
            <p>{result.caption}</p>
            <h3 className="font-bold">🏷 Hashtags:</h3>
            <p>{result.hashtags.join(" ")}</p>
          </div>
        )}
      </div>

      {savedIdeas.length > 0 && (
        <>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">📚 Saved Ideas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {savedIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded shadow space-y-2"
                >
                  <h4 className="font-bold text-blue-600">
                    {idea.topic} ({idea.niche})
                  </h4>
                  <p>
                    <span className="font-semibold">🎥 Idea:</span> {idea.idea}
                  </p>
                  <p>
                    <span className="font-semibold">🧠 Hook:</span> {idea.hook}
                  </p>
                  <p>
                    <span className="font-semibold">📝 Caption:</span>{" "}
                    {idea.caption}
                  </p>
                  <p>
                    <span className="font-semibold">🏷 Hashtags:</span>{" "}
                    {idea.hashtags.join(" ")}
                  </p>
                  <button
                    onClick={() => handleDelete(idea._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default IdeaAssistant;
