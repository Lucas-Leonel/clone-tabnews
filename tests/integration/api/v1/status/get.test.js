import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      // Teste validando que a data existe e está no formato ISO
      const responseBody = await response.json();

      const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdateAt);

      expect(responseBody.dependencies.database.max_connections).toBeDefined();
      expect(
        responseBody.dependencies.database.opened_connections,
      ).toBeDefined();
      expect(responseBody.dependencies.database).not.toHaveProperty("version");
    });
  });

  describe("Privileged user", () => {
    test("With `read:status:all`", async () => {
      const privilegedUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(privilegedUser);
      await orchestrator.addFeatureToUser(privilegedUser, ["read:status:all"]);
      const privilegedSession = await orchestrator.createSession(
        activatedUser.id,
      );

      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "GET",
        headers: {
          Cookie: `session_id=${privilegedSession.token}`,
        },
      });

      expect(response.status).toBe(200);

      // Teste validando que a data existe e está no formato ISO
      const responseBody = await response.json();

      const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdateAt);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
