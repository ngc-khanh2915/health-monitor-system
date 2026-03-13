const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase config
const supabaseUrl = "https://bducrozjrbdkueytgzsv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdWNyb3pqcmJka3VleXRnenN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMzgwNDYsImV4cCI6MjA4ODgxNDA0Nn0.zw-G1eX0Wh-MIJUNgc2ow2s_CRsMIDQQA9sSGPvfniM";

const supabase = createClient(supabaseUrl, supabaseKey);

// test server
app.get("/", (req, res) => {
  res.send("Health Monitor API is running");
});

// API 1
app.get("/benhnhan", async (req, res) => {
  const { data, error } = await supabase.from("benhnhan").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// API 2
app.get("/sinh-ton", async (req, res) => {
  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// API 3
app.get("/sinh-ton/:mabenhnhan", async (req, res) => {
  const { mabenhnhan } = req.params;

  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .eq("mabenhnhan", mabenhnhan)
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
