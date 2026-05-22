import './App.css'

function App() {
  const username = "Joaquin-B-Lima"
  
  const userData = {
    name: "Joaquin Beine de Lima",
    bio: "Estudante de Engenharia de Software | Setup Técnico & Dados",
    avatar_url: `https://github.com/${username}.png`, // Puxa sua foto real do perfil diretamente
    public_repos: 3,
    followers: 0,
    location: "Curitiba, PR"
  }

  // Seus repositórios da maratona renderizados de forma limpa e direta
  const repos = [
    {
      id: 1,
      name: "projeto-analise-dados-sql",
      description: "Modelagem de banco de dados e consultas estruturadas em SQL para análise de métricas regionais.",
      html_url: `https://github.com/Joaquin-B-Lima/sql-data-analysis`
    },
    {
      id: 2,
      name: "dashboard-vendas-powerbi",
      description: "Desenvolvimento de dashboard executivo interativo utilizando inteligência de dados com DAX.",
      html_url: `https://github.com/Joaquin-B-Lima/powerbi-sales-dashboard`
    },
    {
      id: 3,
      name: "api-data-project",
      description: "Aplicação web desenvolvida em React para consumo, tratamento e estruturação visual de dados.",
      html_url: `https://github.com/Joaquin-B-Lima/api-data-project`
    }
  ]

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>📊 Conexão Front-end & Dados</h1>
        <p>Portfólio de Engenharia de Software e Interfaces Modernas</p>
      </header>

      {/* Card de Perfil */}
      <section className="profile-card">
        <img src={userData.avatar_url} alt={userData.name} className="avatar" />
        <div className="profile-info">
          <h2>{userData.name}</h2>
          <p className="bio">{userData.bio}</p>
          
          <div className="metrics-grid">
            <div className="metric-box">
              <span>Repositórios</span>
              <strong>{userData.public_repos}</strong>
            </div>
            <div className="metric-box">
              <span>Seguidores</span>
              <strong>{userData.followers}</strong>
            </div>
            <div className="metric-box">
              <span>Localização</span>
              <strong>{userData.location}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Grade de Repositórios */}
      <main className="repos-section">
        <h3>📂 Repositórios e Projetos Ativos ({repos.length})</h3>
        <div className="repos-grid">
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <div>
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
              <div className="repo-footer">
                <span className="lang">⭐ 1 stars</span>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                  Acessar Código ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App