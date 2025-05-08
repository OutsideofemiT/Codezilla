import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  prompt: string;
  difficulty: "easy" | "medium" | "hard";
}

const QuestionSchema: Schema = new Schema({
  prompt: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
});

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);