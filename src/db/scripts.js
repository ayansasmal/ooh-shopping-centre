import { initializeLogger } from "../utils/logger";
import Asset from "./operations/asset";
import Roles from "./operations/roles";
import Users from "./operations/user";
import Login from "./operations/login";
import ShoppingCentre from "./operations/shopping-centre";

const logger = initializeLogger("initial-data-load");
export const initialLoad = async () => {
  logger.debug("Loading initial data");
  await Roles.create("app-admin", "administrator of app");
  await createUsers();
  await createAssets();
  await createShoppingCentres();
  logger.debug("Loaded initial data");
};

const createUsers = async () => {
  await Users.create({
    username: "johndoeadmin",
    email: "test@test.com",
    role: ["app-admin"],
  });
  await Login.createLoginCreds({
    username: "johndoeadmin",
    password: "ooh@123",
  });
};

const createShoppingCentres = async () => {
  await ShoppingCentre.add({
    identifier: "SC-001",
    name: "Westfield",
    address: {
      streetNumber: "123",
      streetName: "pitt street",
      suburb: "sydney",
      postCode: "2000",
      state: "NSW",
      country: "AU",
    },
    assets: ["A001", "A002"],
  });
  await ShoppingCentre.add({
    identifier: "SC-002",
    name: "Westfield",
    address: {
      streetNumber: "123",
      streetName: "george street",
      suburb: "sydney",
      postCode: "2000",
      state: "NSW",
      country: "AU",
    },
    assets: ["A003", "A004"],
  });
  await ShoppingCentre.add({
    identifier: "SC-003",
    name: "Westfield",
    address: {
      streetNumber: "123",
      streetName: "george street",
      suburb: "sydney",
      postCode: "2000",
      state: "NSW",
      country: "AU",
    },
  });
};

const createAssets = async () => {
  await Asset.add({
    identifier: "A001",
    name: "A001",
    dimension: { height: "10 ft", width: "5 ft", depth: "4 in" },
    shoppingCentre: "SC-001",
    location: {
      level: "l2",
      landmark: "shop 12",
    },
    status: "active",
  });
  await Asset.add({
    identifier: "A002",
    name: "A002",
    dimension: { height: "10 ft", width: "5 ft", depth: "4 in" },
    shoppingCentre: "SC-001",
    location: {
      level: "l2",
      landmark: "shop 12",
    },
    status: "active",
  });
  await Asset.add({
    identifier: "A003",
    name: "A003",
    dimension: { height: "10 ft", width: "5 ft", depth: "4 in" },
    shoppingCentre: "SC-002",
    location: {
      level: "l2",
      landmark: "shop 12",
    },
    status: "active",
  });
  await Asset.add({
    identifier: "A004",
    name: "A004",
    dimension: { height: "10 ft", width: "5 ft", depth: "4 in" },
    shoppingCentre: "SC-002",
    location: {
      level: "l2",
      landmark: "shop 12",
    },
    status: "active",
  });
  await Asset.add({
    identifier: "A005",
    name: "A005",
    dimension: { height: "10 ft", width: "5 ft", depth: "4 in" },
    shoppingCentre: "SC-003",
    location: {
      level: "l2",
      landmark: "shop 12",
    },
    status: "offline",
  });
};
