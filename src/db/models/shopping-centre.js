import mongoose from "mongoose";
import Validator from "validator";

import { initializeLogger } from "../../utils/logger";

const logger = initializeLogger("shopping-centre-model-js");

const ShoppingCentreSchema = new mongoose.Schema({
  identifier: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    streetNumber: { type: String, trim: true },
    streetName: { type: String, trim: true, required: true },
    suburb: { type: String, trim: true, required: true },
    postCode: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
  },
  assets: {
    type: [String],
  },
});

const ShoppingCentres = mongoose.model("ShoppingCentre", ShoppingCentreSchema);

export default ShoppingCentres;
