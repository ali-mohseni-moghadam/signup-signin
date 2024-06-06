import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    requierd: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
