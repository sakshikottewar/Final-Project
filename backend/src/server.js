import "dotenv/config";

import express from "express";
import cors from "cors";

import { pool } from "./db.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import inspectionRoutes from "./routes/inspectionRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      status: "OK",
      message: "Smart Facility API is running"
    });

  } catch (error) {

    console.error("DATABASE ERROR:", error);

    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed"
    });
  }
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/inspections", inspectionRoutes);
app.use("/api/complaints", complaintRoutes);


// Error handler
app.use((err, req, res, next) => {

  console.error("================================");
  console.error("API ERROR:");
  console.error(err);
  console.error("================================");

  res.status(500).json({
    message: err.message || "Internal server error"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});