import email from "infra/email";
import database from "infra/database";
import webserver from "infra/webserver";

const EXPIRATION_TIME_IN_MILLISECONDS = 60 * 15 * 1000; // 24 hours

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_TIME_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const result = await database.query({
      text: `
    INSERT INTO
      user_activation_tokens (user_id, expires_at)
    VALUES 
      ($1, $2)
    RETURNING
      *
    ;`,
      values: [userId, expiresAt],
    });
    return result.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "Fintab <contato@fintab.com.br>",
    to: user.email,
    subject: "Ative seu cadastro no Fintab!",
    text: `${user.username}, clique no link abaixo para ativar seu cadastro no Fintab:

${webserver.origin}/cadastro/ativar/${activationToken.id}

Atenciosamente,
Equipe Fintab
`,
  });
}

const activation = {
  sendEmailToUser,
  create,
};

export default activation;
