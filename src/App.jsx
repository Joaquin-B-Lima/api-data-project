import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const username = "Joaquin-B-Lima" 

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true)
        setErrorMessage(null)
        
        // 1. Consome dados do perfil
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        
        if (!userResponse.ok) {
          if (userResponse.status === 404) {
            throw new Error(`Usuário "${username}" não foi encontrado no GitHub (Erro 404).`)
          } else if (userResponse.status === 403) {
            throw new Error("Limite de requisições da API do GitHub atingido para o seu IP. Tente novamente mais tarde (Erro 403).")
          } else {
            throw new Error(`Falha na API do GitHub: Status ${userResponse.status}`)
          }
        }
        
        const userDataJson = await userResponse.json()

        // 2. Consome dados dos repositórios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
        
        if (!reposResponse.ok) {
          throw new Error(`Não foi possível carregar os repositórios (Status ${reposResponse.status}).`)
        }

        const reposDataJson = await reposResponse.json()
        
        if (Array.isArray(reposDataJson)) {
          setRepos(reposDataJson)
        } else {
          throw new Error("A API do GitHub retornou um formato de repositórios inválido.")
        }

        setUserData(userDataJson)

      } catch (error) {
        console.error("Erro capturado:", error.message)
        setErrorMessage(error.message)
      } final {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return <div className="loading">Consultando API do GitHub em tempo real...</div>
  }

  if (errorMessage) {
    return (
      <div className="error-screen">
        <div className="error-box">
          <h2>❌ Erro de Conexão com a API</h2>
          <p>{errorMessage}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>📊 Conexão Front-end & Dados</h1>
        <p>Consumindo dados em tempo real da API do GitHub</p>
      </header>

      {userData && (
        <section className="profile-card">
          <img src={userData.avatar_url} alt={userData.name} className="avatar" />
          <div className="profile-info">
            <h2>{userData.name || username}</h2>
            <p className="bio">{userData.bio || "Sem biografia definida no perfil do GitHub."}</p>
            
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
                <strong>{userData.location || "Não informada"}</strong>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="repos-section">
        <h3>📂 Repositórios Públicos Disponíveis ({repos.length})</h3>
        <div className="repos-grid">
          {repos.length === 0 ? (
            <p className="no-repos">Nenhum repositório público encontrado neste perfil.</p>
          ) : (
            repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <div>
                  <h4>{repo.name}</h4>
                  <p>{repo.description || "Sem descrição informada no repositório."}</p>
                </div>
                <div className="repo-footer">
                  <span className="lang">⭐ {repo.stargazers_count} stars</span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                    Acessar Código ↗
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default App