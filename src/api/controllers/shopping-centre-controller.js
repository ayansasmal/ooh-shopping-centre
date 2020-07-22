import { initializeLogger } from "../../utils/logger";
import ShoppingCentre from "../../db/operations/shopping-centre";
import Asset from "../../db/operations/asset";

const logger = initializeLogger("shopping-centre-controller");

export const fetchAllShoppingCentres = async (req, res) => {
  const centres = await ShoppingCentre.fetch({});
  if (!centres) {
    res.status(404).json({ status: "Unable to fetch Shopping centres" });
    return;
  }
  res.status(200).json(centres);
};

export const fetchShoppingCentre = async (req, res) => {
  const centres = await ShoppingCentre.fetch({
    identifier: req.params.shoppingCentreId.toLowerCase(),
  });
  if (!centres || !centres[0]) {
    res.status(404).json({ status: "Unable to fetch Shopping centres" });
    return;
  }
  res.status(200).json(centres[0]);
};

export const addShoppingCentre = async (req, res) => {
  logger.debug(`req ::  ${JSON.stringify(req.body)}`);
  const centre = await ShoppingCentre.add(req.body);
  logger.debug(`response :: ${JSON.stringify(centre)}`);
  res.status(201).json(centre);
};

export const updateShoppingCentre = async (req, res) => {
  const centre = await ShoppingCentre.update(req.body);
  logger.debug(`response :: ${JSON.stringify(centre)}`);
  res.status(201).json(centre);
};

export const removeShoppingCentre = async (req, res) => {
  const centres = await ShoppingCentre.fetch({
    identifier: req.params.shoppingCentreId.toLowerCase(),
  });
  logger.debug(centres);
  if (!centres[0]) {
    res.status(404).json({ status: "unable to find asset" });
    return;
  }
  const resp = await ShoppingCentre.remove(
    req.params.shoppingCentreId.toLowerCase()
  );
  logger.debug(`resp : ${JSON.stringify(resp)}`);
  res.status(200).json({ status: "shopping centre deleted" });
};

export const fetchAssetsForShoppingCentre = async (req, res) => {
  const centres = await ShoppingCentre.fetch({
    identifier: req.params.shoppingCentreId.toLowerCase(),
  });
  if (!centres[0]) {
    res.status(404).json({ status: "unable to find shopping centre" });
    return;
  }
  const assetIds = centres[0].assets;
  const assets = await assetIds.map(async (id) => {
    const fetchedAssets = await Asset.fetch({ identifier: id.toLowerCase() });
    logger.debug(
      `${JSON.stringify(id)} fetched assets ${JSON.stringify(fetchedAssets)}`
    );
    if (fetchedAssets[0]) {
      return fetchedAssets[0];
    }
  });
  const fetchedAssetDetails = await Promise.all(assets);
  logger.debug(`'fetched assets ${JSON.stringify(fetchedAssetDetails)}'`);
  res.status(200).json(fetchedAssetDetails);
};

export const addAssetsForShoppingCentre = async (req, res) => {
  const centres = await ShoppingCentre.fetch({
    identifier: req.params.shoppingCentreId.toLowerCase(),
  });
  logger.debug(`centres ${JSON.stringify(centres)}`);
  if (!centres[0]) {
    res.status(404).json({ status: "unable to find shopping centre" });
    return;
  }
  const assetIds = centres[0].assets;
  const assets = await Asset.fetch({
    identifier: req.params.assetId.toLowerCase(),
  });
  if (assets[0]) {
    assetIds.push(assets[0].identifier);
  }
  const fromDB = centres[0];
  const updatedData = {};
  updatedData.identifier = fromDB.identifier;
  updatedData.name = fromDB.name;
  const addrs = {};
  addrs.streetNumber = fromDB.address.streetNumber;
  addrs.streetName = fromDB.address.streetName;
  addrs.suburb = fromDB.address.suburb;
  addrs.postCode = fromDB.address.postCode;
  addrs.state = fromDB.address.state;
  addrs.country = fromDB.address.country;
  updatedData.address = addrs;
  updatedData.assets = assetIds;
  const resp = await ShoppingCentre.update(
    req.params.shoppingCentreId,
    updatedData
  );
  logger.debug(`response :: ${JSON.stringify(resp)}`);
  res.status(201).json(resp);
};

export const removeAssetsForShoppingCentre = async (req, res) => {
  const centres = await ShoppingCentre.fetch({
    identifier: req.params.shoppingCentreId.toLowerCase(),
  });
  if (!centres[0]) {
    res.status(404).json({ status: "unable to find shopping centre" });
    return;
  }
  let assetIds = [];
  const assets = await Asset.fetch({
    identifier: req.params.assetId.toLowerCase(),
  });

  if (assets[0]) {
    assetIds = centres[0].assets.filter(
      (id) => id.toLowerCase() === req.params.assetId.toLowerCase()
    );
  }
  const fromDB = centres[0];
  const updatedData = {};
  updatedData.identifier = fromDB.identifier;
  updatedData.name = fromDB.name;
  const addrs = {};
  addrs.streetNumber = fromDB.address.streetNumber;
  addrs.streetName = fromDB.address.streetName;
  addrs.suburb = fromDB.address.suburb;
  addrs.postCode = fromDB.address.postCode;
  addrs.state = fromDB.address.state;
  addrs.country = fromDB.address.country;
  updatedData.address = addrs;
  updatedData.assets = assetIds;
  const resp = await ShoppingCentre.update(
    req.params.shoppingCentreId,
    updatedData
  );
  logger.debug(`response :: ${JSON.stringify(resp)}`);
  res.status(200).json(resp);
};
