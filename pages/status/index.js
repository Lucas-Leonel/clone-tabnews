import useSWR from "swr";
import styles from "./Status.module.css";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export function normalizeStatusData(data) {
  if (!data?.dependencies?.database) {
    return {
      dbVersion: "Carregando...",
      maxConnections: "Carregando...",
      activeConnections: "Carregando...",
    };
  }

  return {
    dbVersion: data.dependencies.database.version,
    maxConnections: data.dependencies.database.max_connections,
    activeConnections: data.dependencies.database.opened_connections,
  };
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div className={styles.badge}>
      <div className={styles.dot}></div>
      Última atualização: {updatedAtText}
    </div>
  );
}

function DatabaseInfo() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let Database = {
    dbVersion: "Carregando...",
    maxConnections: "Carregando...",
    activeConnections: "Carregando...",
  };

  if (!isLoading && data) {
    const database = data.dependencies?.database;
    Database = {
      dbVersion: database?.version ?? "Carregando...",
      maxConnections: database?.max_connections ?? "Carregando...",
      activeConnections: database?.opened_connections ?? "Carregando...",
    };
  }

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <span className={styles.cardTitle}>Versão do banco</span>
        <strong className={styles.cardValue}>{Database.dbVersion}</strong>
      </div>

      <div className={styles.card}>
        <span className={styles.cardTitle}>Número máximo de conexões</span>
        <strong className={styles.cardValue}>{Database.maxConnections}</strong>
      </div>

      <div className={styles.card}>
        <span className={styles.cardTitle}>Conexões ativas</span>
        <strong className={styles.cardValue}>
          {Database.activeConnections}
        </strong>
      </div>
    </div>
  );
}

export default function StatusPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Status</h1>
        <UpdatedAt />
      </header>

      <DatabaseInfo />
    </div>
  );
}
