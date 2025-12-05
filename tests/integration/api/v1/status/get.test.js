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
      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdateAt);

      //Validando versão do Postgres
      const versionPostgres = responseBody.dependencies.version;
      expect(versionPostgres).toEqual("16.0");
      expect(versionPostgres).not.toBeNull();

      //Validando quantidade maxima de conexões ao banco
      const maxconnections = responseBody.dependencies.max_connections;
      expect(maxconnections).toEqual(100);
      expect(maxconnections).not.toBeNull();

      //Valida conexão existente
      expect(responseBody.dependencies.active_connections).toBeDefined();
      expect(responseBody.dependencies.active_connections).toEqual(1);
    });
  });
});
