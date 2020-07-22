import { initializeLogger } from "../../utils/logger";
import ShoppingCentres from "../models/shopping-centre";

const logger = initializeLogger("shopping-centre-operations-js");

const add = async (data) => {
  return new ShoppingCentres(data).save();
};

const update = async (identifier, data) => {
  return new Promise((resolve, reject) => {
    ShoppingCentres.findOneAndUpdate({ identifier }, data, (err, doc) => {
      if (err) {
        reject({
          status: "Error",
          message: err.message,
          description: "unable to update shopping centre",
        });
      }
      resolve(doc);
    });
  });
};

const fetch = async (filter) => {
  return new Promise((resolve, reject) => {
    ShoppingCentres.find(filter, (err, data) => {
      if (err) {
        reject({
          status: "Error",
          message: err.message,
          description: "unable to fetch shopping centre",
        });
      }
      resolve(data);
    });
  });
};

const remove = async (identifier) => {
  return new Promise((resolve, reject) => {
    ShoppingCentres.findOneAndDelete({ identifier }, (err, doc) => {
      if (err) {
        reject({
          status: "Error",
          message: err.message,
          description: "unable to remove shopping centre",
        });
      }
      resolve(doc);
    });
  });
};

export default { add, fetch, update, remove };
