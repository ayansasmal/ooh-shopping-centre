import mongoose from "mongoose";
import Validator from "validator";

import { initializeLogger } from "../../utils/logger";

const logger = initializeLogger("asset-model-js");

const AssetSchema = new mongoose.Schema({
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
  status: {
    type: String,
    trim: true,
    required: true,
  },
  dimension: {
    height: {
      type: String,
      trim: true,
      required: true,
    },
    width: {
      type: String,
      trim: true,
      required: true,
    },
    depth: {
      type: String,
      trim: true,
      required: true,
    },
  },
  shoppingCentre: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    level: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    geoCode: {
      lat: {
        type: String,
        trim: true,
      },
      long: {
        type: String,
        trim: true,
      },
    },
  },
  media: {
    type: [String],
  },
});

const Assets = mongoose.model("Assets", AssetSchema);

export default Assets;
