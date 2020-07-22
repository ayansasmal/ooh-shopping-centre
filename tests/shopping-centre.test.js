import app from "../src/app";
import request from "supertest";
import { initializeLogger } from "../src/utils/logger";

const testLogger = initializeLogger("health-test-js");

let appServer;

const authWithAdminRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2VhZG1pbiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOlsiYXBwLWFkbWluIl0sImlhdCI6MTU5NTM3MTkyM30.0ePTLvgwS6UQg-bZZSllNTmKG9XYfoTf1yhNXE8zChc";

beforeAll(async () => {
  appServer = await app;
});

test("Test to fetch all shopping centres", async () => {
  testLogger.debug("Test to fetch all shopping centres");
  const resp = await request(appServer)
    .get("/shopping-centres")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(resp.body.length).toBe(3);
});

test("Test to fetch a shopping centres", async () => {
  testLogger.debug("Test to fetch a shopping centres");
  const resp = await request(appServer)
    .get("/shopping-centres/SC-001")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(resp.body.identifier.toLowerCase()).toBe("sc-001");
});

test("Test to create a shopping centre", async () => {
  await request(appServer)
    .post("/shopping-centres")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .send({
      identifier: "SC-004",
      name: "Westfield",
      address: {
        streetNumber: "123",
        streetName: "Pitt Street",
        suburb: "Sydney",
        postCode: "2000",
        state: "NSW",
        country: "AU",
      },
    })
    .expect(201);
  const response = await request(appServer)
    .get("/shopping-centres/sc-004")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(response.body.identifier.toLowerCase()).toBe("sc-004");
});

test("Test to delete a shopping centre", async () => {
  await request(appServer)
    .post("/shopping-centres")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .send({
      identifier: "SC-005",
      name: "Westfield",
      address: {
        streetNumber: "123",
        streetName: "Pitt Street",
        suburb: "Sydney",
        postCode: "2000",
        state: "NSW",
        country: "AU",
      },
    })
    .expect(201);
  await request(appServer)
    .delete("/shopping-centres/sc-005")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  await request(appServer)
    .get("/shopping-centres/SC-005")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(404);
  //expect(resp.body.identifier.toLowerCase()).toBe("sc-001");
});

test("Test to fetch assets for shopping centres", async () => {
  testLogger.debug("Test to fetch assets for shopping centres");
  const resp = await request(appServer)
    .get("/shopping-centres/SC-001/assets")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(resp.body.length).toBe(2);
});

test("Test to add assets for shopping centres", async () => {
  testLogger.debug("Test to add assets for shopping centres");
  const resp = await request(appServer)
    .get("/shopping-centres/SC-002")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(resp.body.identifier.toLowerCase()).toBe("sc-002");
  const resp1 = await request(appServer)
    .post("/shopping-centres/SC-002/addAsset/a001")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(201);
});

test("Test to remove assets from shopping centres", async () => {
  testLogger.debug("Test to remove assets from shopping centres");
  const resp = await request(appServer)
    .get("/shopping-centres/SC-002")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(resp.body.identifier.toLowerCase()).toBe("sc-002");
  const resp1 = await request(appServer)
    .delete("/shopping-centres/SC-002/removeAsset/a003")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
});
