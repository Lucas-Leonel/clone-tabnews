import email from "infra/email.js";
import orquestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send", async () => {
    await orquestrator.deleteAllEmails();

    await email.send({
      from: "FinTab <contato@fintab.com>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "FinTab <contato@fintab.com>",
      to: "contato@curso.dev",
      subject: "Ultimo email enviado",
      text: "Corpo do ultimo email.",
    });

    const lastEmail = await orquestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@fintab.com>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("Ultimo email enviado");
    expect(lastEmail.text).toBe("Corpo do ultimo email.\n");
  });
});
