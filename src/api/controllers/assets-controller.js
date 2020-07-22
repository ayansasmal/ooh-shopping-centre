import { initializeLogger } from "../../utils/logger";
import Asset from "../../db/operations/asset";

const logger = initializeLogger("assets-controller");

const assetStatus = {
  activate: "active",
  deactivate: "offline",
};

export const fetchAllAssets = async (req, res) => {
  const assets = await Asset.fetch({});
  logger.debug(assets);
  if (!assets) {
    res.status(404).json({ status: "unable to find assets" });
  }
  let filteredAssets = assets;
  if (
    req.query.status &&
    (req.query.status === "active" || req.query.status === "inactive")
  ) {
    filteredAssets = assets.filter(
      (asset) => asset.status.toLowerCase() === req.query.status.toLowerCase()
    );
  }
  if (req.query.name) {
    filteredAssets = filteredAssets.filter(
      (asset) => asset.name.toLowerCase() === req.query.name.toLowerCase()
    );
  }
  if (req.query.shoppingCentre) {
    filteredAssets = filteredAssets.filter(
      (asset) =>
        asset.shoppingCentre.toLowerCase() ===
        req.query.shoppingCentre.toLowerCase()
    );
  }
  res.json(filteredAssets);
};

export const fetchAsset = async (req, res) => {
  const asset = await Asset.fetch({
    identifier: req.params.assetId.toLowerCase(),
  });
  logger.debug(asset);
  if (asset[0]) {
    res.json(asset[0]);
  } else {
    res.status(404).json({ status: "Unable to find the Asset" });
  }
};

export const addAsset = async (req, res) => {
  const asset = await Asset.add(req.body);
  logger.debug(`response :: ${JSON.stringify(asset)}`);
  res.status(201).json(asset);
};

export const updateAsset = async (req, res) => {
  const asset = await Asset.update(req.body);
  logger.debug(`response :: ${JSON.stringify(asset)}`);
  res.status(201).json(asset);
};

export const removeAsset = async (req, res) => {
  const assets = await Asset.fetch({
    identifier: req.params.assetId.toLowerCase(),
  });
  logger.debug(assets);
  if (!assets[0]) {
    res.status(404).json({ status: "unable to find asset" });
  }
  const resp = await Asset.remove(req.params.assetId.toLowerCase());
  logger.debug(`resp : ${JSON.stringify(resp)}`);
  res.status(200).json({ status: "asset deleted" });
};

export const toggleAssetStatus = async (req, res) => {
  if (assetStatus[req.params.operation.toLowerCase()] === undefined) {
    res.status(404).json({ status: "Invalid Operation" });
  }
  const assets = await Asset.fetch({
    identifier: req.params.assetId.toLowerCase(),
  });
  logger.debug(assets);
  if (!assets[0]) {
    res.status(404).json({ status: "unable to find asset" });
  }
  const fromDB = assets[0];
  const asset = {};
  asset.identifier = fromDB.identifier;
  asset.name = fromDB.name;
  asset.shoppingCentre = fromDB.shoppingCentre;
  asset.media = fromDB.media;
  const dim = {
    height: fromDB.dimension.height,
    width: fromDB.dimension.width,
    depth: fromDB.dimension.depth,
  };
  asset.dimension = dim;
  const gc = {
    lat: fromDB.location.geoCode.lat,
    long: fromDB.location.geoCode.long,
  };
  const loc = {
    level: fromDB.location.level,
    landmark: fromDB.location.landmark,
    geoCode: gc,
  };
  asset.location = loc;

  asset.status = assetStatus[req.params.operation.toLowerCase()];
  logger.debug(`Updated asset :: ${JSON.stringify(asset)}`);
  const resp = await Asset.update(asset);
  logger.debug(`Resp:: ${JSON.stringify(resp)}`);
  res.json(resp);
};
