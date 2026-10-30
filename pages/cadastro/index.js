import { useState } from "react";
import { Button, TextInput } from "@primer/react";
import DefaultLayout from "../../interface/DefaultLayout";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const requestBody = { username, email, password };

    await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (status === 201) {
      location.href = "/cadastro/confirmar";
    }
  }

  return (
    <DefaultLayout
      metadata={{
        title: "Cadastro",
        description: "Crie sua conta de forma simples e segura",
      }}
    >
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Usuário:
          <TextInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          Email:
          <TextInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          Senha:
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <Button type="submit">Criar Cadastro</Button>
      </form>
    </DefaultLayout>
  );
}
