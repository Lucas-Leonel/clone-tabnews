import Head from "next/head";
import { PageLayout, Header, Text } from "@primer/react";

export default function DefaultLayout({ children, metadata = {} }) {
  return (
    <PageLayout>
      <Head>
        <title>
          {metadata.title ? `${metadata.title} · FinTab` : "Lucas-Leonel"}
        </title>
        {metadata.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>
      <PageLayout.Header>
        <Header>
          <Header.Item full>
            <Header.Link href="/">Lucas-Leonel</Header.Link>
          </Header.Item>
          <Header.Item>
            <Header.Link href="/login">Login</Header.Link>
          </Header.Item>
          <Header.Item>
            <Header.Link href="/cadastro">Cadastro</Header.Link>
          </Header.Item>
        </Header>
      </PageLayout.Header>

      <PageLayout.Content>{children}</PageLayout.Content>

      <PageLayout.Footer divider="line">
        <Text size="small">© {new Date().getFullYear()} Lucas-Leonel </Text>
      </PageLayout.Footer>
    </PageLayout>
  );
}
