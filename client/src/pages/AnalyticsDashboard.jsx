import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const analyticsSectionRef = useRef(null);
  const BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${BASE}/api/analytics`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching analytics", err));
  }, [BASE]);

  if (!data) return <p>Loading...</p>;

  // Prepare data for charts and export
  const followerData = Array.isArray(data.followers)
    ? data.followers.map((value, index) => ({
        day: `Day ${index + 1}`,
        followers: value,
      }))
    : [];

  const engagementData = Array.isArray(data.engagement)
    ? data.engagement.map((item, index) => ({
        post: `Post ${index + 1}`,
        likes: item.likes,
        comments: item.comments,
      }))
    : [];

  const csvData = Array.isArray(data.engagement)
    ? data.engagement.map((item, index) => ({
        post: index + 1,
        likes: item.likes,
        comments: item.comments,
      }))
    : [];

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("analytics", file);

    try {
      await axios.post("/api/analytics/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Analytics data uploaded! Reloading...");
      window.location.reload();
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  const exportPDF = () => {
    const input = analyticsSectionRef.current;
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 160);
      pdf.save("analytics.pdf");
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold">Instagram Analytics</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Upload New Analytics JSON
        </label>
        <input type="file" accept=".json" onChange={handleUpload} />
      </div>

      <div className="flex gap-4 my-4">
        <CSVLink
          data={csvData}
          filename={"engagement.csv"}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>

      <div ref={analyticsSectionRef}>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">
            📈 Follower Growth (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={followerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">📊 Engagement on Recent Posts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="post" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" fill="#3b82f6" />
              <Bar dataKey="comments" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">⏰ Best Time to Post</h3>
          <p className="text-lg">{data.bestPostTime || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
