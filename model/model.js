import { Schema, model } from "mongoose";

// creating a schema for the signup api



 const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  export const User = model('User', userSchema);