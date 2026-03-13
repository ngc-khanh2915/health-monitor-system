const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// ===== Supabase config =====
const supabaseUrl = "https://bducrozjrbdkueytgzsv.supabase.co";
const supabaseKey = "sb_publishable_XTytgJpK-o6NtTEonYkkZQ_uc9ZFfgg";

const supabase = createClient(supabaseUrl, supabaseKey);

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("Health Monitor API is running");
});

// ===== API 1: danh sách bệnh nhân =====
app.get("/benhnhan", async (req, res) => {
  const { data, error } = await supabase.from("benhnhan").select("*");

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ===== API 2: lịch sử sinh tồn mới nhất =====
app.get("/sinh-ton", async (req, res) => {
  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ===== API 3: sinh tồn theo bệnh nhân =====
app.get("/sinh-ton/:mabenhnhan", async (req, res) => {
  const { mabenhnhan } = req.params;

  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .eq("mabenhnhan", mabenhnhan)
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ===== API 4: nhật ký cảnh báo =====
app.get("/canh-bao", async (req, res) => {
  const { data, error } = await supabase
    .from("nhatkycanhbao")
    .select("*")
    .order("thoigianphathien", { ascending: false });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ===== API 5: danh sách thiết bị =====
app.get("/thietbi", async (req, res) => {
  const { data, error } = await supabase.from("thietbi").select("*");

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ===== PORT =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
