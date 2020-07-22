import { initializeLogger } from "../../utils/logger";
import Assets from "../models/asset";

const logger = initializeLogger("asset-operations-js");

const add = async (asset) => {
  return new Assets(asset).save();
};

const fetch = async (filter) => {
  return new Promise((resolve, reject) => {
    Assets.find(filter, (err, data) => {
      if (err) {
        reject({
          status: "Error",
          message: err.message,
          description: "unable to fetch asset(s)",
        });
      }
      resolve(data);
    });
  });
};

const update = async (asset) => {
  return new Promise((resolve, reject) => {
    Assets.findOneAndUpdate(
      { identifier: asset.identifier },
      asset,
      (err, doc) => {
        if (err) {
          reject({
            status: "Error",
            message: err.message,
            description: "unable to update asset",
          });
        }
        resolve(doc);
      }
    );
  });
};

const remove = async (identifier) => {
  return new Promise((resolve, reject) => {
    Assets.findOneAndDelete({ identifier }, (err, resp) => {
      if (err) {
        reject({
          status: "Error",
          message: err.message,
          description: "unable to delete asset",
        });
      }
      resolve(resp);
    });
  });
};

export default { add, update, remove, fetch };
