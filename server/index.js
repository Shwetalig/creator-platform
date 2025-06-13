const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const ideaRoute = require("./routes/idea");
app.use("/api/idea", ideaRoute);

const analyticsRoute = require("./routes/analytics");
app.use("/api/analytics", analyticsRoute);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);



const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

