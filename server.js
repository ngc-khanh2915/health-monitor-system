const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// CORS config - cho phép GitHub Pages & frontend gọi API
app.use(
  cors({
    origin: "*", // cho phép mọi domain
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// Supabase config
const supabaseUrl = "https://bducrozjrbdkueytgzsv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdWNyb3pqcmJka3VleXRnenN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzgwNDYsImV4cCI6MjA4ODgxNDA0Nn0.zw-G1eX0Wh-MIJUNgc2ow2s_CRsMIDQQA9sSGPvfniM";

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== Test server =====
app.get("/", (req, res) => {
  res.send("Health Monitor API is running");
});

// ===== API 1: danh sách bệnh nhân =====
app.get("/benhnhan", async (req, res) => {
  try {
    const { data, error } = await supabase.from("BenhNhan").select("*");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("API /benhnhan error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== API 2: dữ liệu sinh tồn mới nhất =====
app.get("/sinh-ton", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("LichSuSinhTon")
      .select("*")
      .order("ThoiGianDo", { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("API /sinh-ton error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== API 3: sinh tồn theo bệnh nhân =====
app.get("/sinh-ton/:mabenhnhan", async (req, res) => {
  try {
    const { mabenhnhan } = req.params;

    const { data, error } = await supabase
      .from("LichSuSinhTon")
      .select("*")
      .eq("MaBenhNhan", mabenhnhan)
      .order("ThoiGianDo", { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error("API /sinh-ton/:mabenhnhan error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===== Start server =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
