import app from "../src/app";
import request from "supertest";
import { initializeLogger } from "../src/utils/logger";

const testLogger = initializeLogger("assets-test-js");

let appServer;

beforeAll(async () => {
  appServer = await app;
});

const authWithAdminRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2VhZG1pbiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOlsiYXBwLWFkbWluIl0sImlhdCI6MTU5NTM3MTkyM30.0ePTLvgwS6UQg-bZZSllNTmKG9XYfoTf1yhNXE8zChc";

test("Test to fetch all assets", async () => {
  testLogger.debug("Test to fetch all assets");
  const response = await request(appServer)
    .get("/assets")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(response.body.length).toBe(5);
});

test("Test to fetch a assets", async () => {
  testLogger.debug("Test to fetch a assets");
  const response = await request(appServer)
    .get("/assets/A001")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(response.body.name).toBe("A001");
});

test("Test to create an asset", async () => {
  testLogger.debug("Test to create an asset");
  await request(appServer)
    .post("/assets")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .send({
      identifier: "A006",
      name: "Billboard",
      dimension: {
        height: "10 ft.",
        width: "5 ft.",
        depth: "4 in.",
      },
      shoppingCentre: "SC-001",
      location: {
        level: "l2",
        landmark: "shop no. 13",
        geoCode: {
          lat: "123",
          long: "123",
        },
      },
      media: ["src 1"],
      status: "offline",
    })
    .expect(201);
  const response = await request(appServer)
    .get("/assets/A006")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(response.body.identifier.toLowerCase()).toBe("a006");
});

test("Test to update an asset", async () => {
  testLogger.debug("Test to update an asset");
  await request(appServer)
    .post("/assets")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .send({
      identifier: "A007",
      name: "Billboard",
      dimension: {
        height: "10 ft.",
        width: "5 ft.",
        depth: "4 in.",
      },
      shoppingCentre: "SC-001",
      location: {
        level: "l2",
        landmark: "shop no. 13",
        geoCode: {
          lat: "123",
          long: "123",
        },
      },
      media: ["src 1"],
      status: "offline",
    })
    .expect(201);
  await request(appServer)
    .post("/assets/a007")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .send({
      identifier: "A007",
      name: "Banner",
      dimension: {
        height: "10 ft.",
        width: "5 ft.",
        depth: "4 in.",
      },
      shoppingCentre: "SC-001",
      location: {
        level: "l2",
        landmark: "shop no. 13",
        geoCode: {
          lat: "123",
          long: "123",
        },
      },
      media: ["src 1"],
      status: "offline",
    })
    .expect(201);
  const response = await request(appServer)
    .get("/assets/A007")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(response.body.name.toLowerCase()).toBe("banner");
});

test("Test to delete a assets", async () => {
  testLogger.debug("Test to delete a assets");
  await request(appServer)
    .delete("/assets/A005")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  await request(appServer)
    .get("/assets/A005")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(404);
});

test("Test to toggle status of a assets", async () => {
  testLogger.debug("Test to toggle status of a assets");
  await request(appServer)
    .post("/assets/A004/deactivate")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  const updateResponse = await request(appServer)
    .get("/assets/A004")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(updateResponse.body.status).toBe("offline");
});

test("Test to toggle status of a assets", async () => {
  testLogger.debug("Test to toggle status of a assets");
  await request(appServer)
    .post("/assets/A004/activate")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  const updateResponse = await request(appServer)
    .get("/assets/A004")
    .set("Accept", "application/json")
    .set("authorization", authWithAdminRole)
    .expect(200);
  expect(updateResponse.body.status).toBe("active");
});
