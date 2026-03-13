const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// Supabase config
const supabaseUrl = "https://bducrozjrbdkueytgzsv.supabase.co";
const supabaseKey = "sb_publishable_XTytgJpK-o6NtTEonYkkZQ_uc9ZFfgg";

const supabase = createClient(supabaseUrl, supabaseKey);

// API 1: lấy danh sách bệnh nhân
app.get("/benhnhan", async (req, res) => {
  const { data, error } = await supabase.from("benhnhan").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// API 2: lấy lịch sử sinh tồn mới nhất
app.get("/sinh-ton", async (req, res) => {
  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// API 3: lấy dữ liệu sinh tồn theo bệnh nhân
app.get("/sinh-ton/:mabenhnhan", async (req, res) => {
  const { mabenhnhan } = req.params;

  const { data, error } = await supabase
    .from("lichsusinhton")
    .select("*")
    .eq("mabenhnhan", mabenhnhan)
    .order("thoigiando", { ascending: false })
    .limit(50);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// API 4: lấy nhật ký cảnh báo
app.get("/canh-bao", async (req, res) => {
  const { data, error } = await supabase
    .from("nhatkycanhbao")
    .select("*")
    .order("thoigianphathien", { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// API 5: lấy danh sách thiết bị
app.get("/thietbi", async (req, res) => {
  const { data, error } = await supabase.from("thietbi").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
