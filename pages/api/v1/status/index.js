import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const dbversion = await database.query(
    `SELECT split_part(version(), ',', 1) AS version;`,
  );
  const maxconnections = await database.query("SHOW max_connections;");
  const activeConnections = await database.query(
    `SELECT count(*) FROM pg_stat_activity;`,
  );

  response.status(200).json({
    updated_at: updatedAt,
    version: dbversion.rows[0].version,
    maxconnections: maxconnections.rows[0].max_connections,
    activeConnections: activeConnections.rows[0].count,
  });
}

export default status;
