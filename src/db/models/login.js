import mongoose from "mongoose";
import Validator from "validator";
import bcrypt from "bcrypt";

import { initializeLogger } from "../../utils/logger";

const logger = initializeLogger("login-model-js");

const LoginSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!Validator.isEmail(value)) {
          throw new Error("Provided email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      async validate(value) {
        const comparison = await bcrypt.compare("password", value);
        if (comparison) {
          throw new Error("Entered password is not allowed");
        }
      },
    },
    lastLoggedIn: {
      type: String,
    },
    isLoggedIn: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Login = mongoose.model("Login", LoginSchema);

export default Login;
