import { initializeLogger } from "../utils/logger";
import { loginUser, whoami } from "./controllers/login-controller";
import {
  createUser,
  removeUser,
  updateUser,
  fetchUser,
  fetchAllUsers,
} from "./controllers/user-controller";
import {
  createRole,
  fetchAllRoles,
  fetchRole,
  removeRole,
} from "./controllers/roles-controller";
import {
  addAsset,
  fetchAllAssets,
  fetchAsset,
  removeAsset,
  toggleAssetStatus,
  updateAsset,
} from "./controllers/assets-controller";
import {
  addAssetsForShoppingCentre,
  addShoppingCentre,
  fetchAllShoppingCentres,
  fetchAssetsForShoppingCentre,
  fetchShoppingCentre,
  removeAssetsForShoppingCentre,
  removeShoppingCentre,
  updateShoppingCentre,
} from "./controllers/shopping-centre-controller";

const logger = initializeLogger("api-index");

const healthCheck = (req, res) => {
  logger.debug("Healthcheck");
  res.json({ status: "The application is up and running" });
};

export default {
  healthCheck,
  loginUser,
  createUser,
  removeUser,
  updateUser,
  fetchUser,
  fetchAllUsers,
  whoami,
  createRole,
  getAllRoles: fetchAllRoles,
  getRole: fetchRole,
  removeRole,
  addAsset,
  fetchAllAssets,
  fetchAsset,
  removeAsset,
  toggleAssetStatus,
  updateAsset,
  addAssetsForShoppingCentre,
  addShoppingCentre,
  fetchAllShoppingCentres,
  fetchAssetsForShoppingCentre,
  fetchShoppingCentre,
  removeAssetsForShoppingCentre,
  removeShoppingCentre,
  updateShoppingCentre,
};
