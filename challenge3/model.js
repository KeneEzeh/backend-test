import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }, // Materialized Path
});

export const Category = mongoose.model("Category", categorySchema);
