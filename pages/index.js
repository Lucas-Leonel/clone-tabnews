import Head from "next/head";

const UnderConstruction = () => {
  const siteTitle = "Lucas Leonel - Em Construção";
  const message =
    "Obrigado pela visita! Meu novo portfólio está em construção. Volte em breve para conferir as novidades e projetos.";
  const projectName = "lucas-leonel.dev.br";

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={message} />
        {/* Adicione outras tags Head se necessário */}
      </Head>

      <div className="container">
        <header className="header">
          <h1>{projectName}</h1>
        </header>

        <main className="main-content">
          <div className="status-box">
            <span className="emoji" role="img" aria-label="Engrenagens">
              ⚙️
            </span>
            <h2>Em Construção</h2>
            <p>{message}</p>
          </div>

          <div className="contact-info">
            <p>Enquanto isso, você pode me encontrar nas redes sociais:</p>
            <div className="social-links">
              {/* Substitua os '#' pelos seus links reais */}
              <a
                href="https://www.linkedin.com/in/lucas-leonel-nunes-56008a236/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Lucas-Leonel"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              {/* Adicione mais links se necessário */}
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Lucas Leonel. Todos os direitos
            reservados.
          </p>
        </footer>
      </div>

      <style jsx global>{`
        /* Reset básico e tipografia moderna */
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          background-color: #f4f7f9; /* Cor de fundo suave */
          color: #333;
          height: 100vh;
        }

        /* Estilos do Container */
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 20px;
        }

        /* Estilos do Cabeçalho */
        .header {
          width: 100%;
          padding: 1rem 0;
          position: absolute;
          top: 0;
          left: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .header h1 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2c3e50;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Estilos do Conteúdo Principal */
        .main-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
          width: 100%;
        }

        /* Estilos da Caixa de Status (Moderno) */
        .status-box {
          background: #ffffff;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* Sombra suave para efeito 'elevado' */
          margin-bottom: 30px;
          border-left: 5px solid #0070f3; /* Destaque moderno azul */
        }

        .status-box h2 {
          font-size: 2.5rem;
          color: #0070f3;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .status-box p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #666;
        }

        .emoji {
          font-size: 3rem;
          display: block;
          margin-bottom: 15px;
          animation: spin 3s linear infinite; /* Animação leve na engrenagem */
        }

        /* Estilos de Contato/Links Sociais */
        .contact-info p {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 15px;
        }

        .social-links a {
          color: #0070f3;
          text-decoration: none;
          font-weight: 500;
          margin: 0 10px;
          padding: 8px 15px;
          border: 1px solid #0070f3;
          border-radius: 6px;
          transition:
            background-color 0.3s,
            color 0.3s;
        }

        .social-links a:hover {
          background-color: #0070f3;
          color: #ffffff;
        }

        /* Estilos do Rodapé */
        .footer {
          padding: 1rem 0;
          width: 100%;
        }

        .footer p {
          font-size: 0.85rem;
          color: #999;
        }

        /* Keyframe para animação */
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsividade básica */
        @media (max-width: 600px) {
          .status-box {
            padding: 30px 20px;
          }
          .status-box h2 {
            font-size: 2rem;
          }
          .status-box p {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default UnderConstruction;
