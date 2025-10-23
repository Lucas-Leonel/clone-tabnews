const { version } = require("react");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // Teste validando que a data existe e está no formato ISO
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);

  //Validando versão do Postgres
  const versionPostgres = responseBody.version;
  expect(versionPostgres).toEqual("PostgreSQL 16.0 on x86_64-pc-linux-musl");
  expect(versionPostgres).not.toBeNull();

  //Validando quantidade maxima de conexões ao banco
  const maxconnections = responseBody.maxconnections;
  expect(maxconnections).toEqual("100");
  expect(maxconnections).not.toBeNull;

  //Valida conexão existente
  expect(responseBody.activeConnections).toBeDefined();
  expect(Number(responseBody.activeConnections)).toBeGreaterThan(0);
});
