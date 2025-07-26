const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const Todo = require("./models/Todo");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    const existing = await Todo.findOne({ title: "Sample Task" });
    if (!existing) {
      const newTodo = new Todo({ title: "Sample Task" });
      await newTodo.save();
      console.log("📝 Todo inserted manually:", newTodo);
    } else {
      console.log("⚠️ Todo already exists. Skipping insert.");
    }
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("MongoDB Todo App Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

