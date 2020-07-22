import mongoose from "mongoose";
import Validator from "validator";

import { initializeLogger } from "../../utils/logger";

const logger = initializeLogger("user-model-js");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      validate(value) {
        if (!Validator.isEmail(value)) {
          logger.error("Provided email is not valid");
          throw new Error("Provided email is not valid");
        }
      },
    },
    role: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
