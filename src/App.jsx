import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  const username = "Joaquin-B-Lima" 

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true)
        setApiError(false)
        
        // 1. Busca dados do perfil
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        if (!userResponse.ok) throw new Error("Erro no perfil")
        const userDataJson = await userResponse.json()
        setUserData(userDataJson)

        // 2. Busca repositórios
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
        if (!reposResponse.ok) throw new Error("Erro nos repositórios")
        const reposDataJson = await reposResponse.json()
        
        // AQUI ESTÁ A SEGURANÇA: Só salva se for uma lista (Array) de verdade
        if (Array.isArray(reposDataJson)) {
          setRepos(reposDataJson)
        } else {
          setRepos([])
        }

      } catch (error) {
        console.error("Erro ao buscar dados da API:", error)
        setApiError(true) // Ativa o estado de erro para avisar a interface
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  if (loading) {
    return <div className="loading">Carregando métricas do GitHub...</div>
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>📊 Conexão Front-end & Dados</h1>
        <p>Consumindo APIs REST de forma dinâmica com React</p>
      </header>

      {/* Se a API do GitHub bloquear ou falhar, mostramos os dados locais de segurança */}
      {apiError ? (
        <div className="error-banner">
          <p>⚠️ Nota: A API do GitHub atingiu o limite de requisições temporárias. Carregando modo de demonstração offline local.</p>
        </div>
      ) : null}

      {/* Renderização do Perfil (Real ou Fallback) */}
      <section className="profile-card">
        <img 
          src={!apiError && userData ? userData.avatar_url : "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=200&auto=format&fit=crop"} 
          alt="Avatar" 
          className="avatar" 
        />
        <div className="profile-info">
          <h2>{!apiError && userData ? (userData.name || username) : "Joaquin Beine de Lima"}</h2>
          <p className="bio">{!apiError && userData ? userData.bio : "Estudante de Engenharia de Software | Front-end & Dados"}</p>
          
          <div className="metrics-grid">
            <div className="metric-box">
              <span>Repositórios</span>
              <strong>{!apiError && userData ? userData.public_repos : 3}</strong>
            </div>
            <div className="metric-box">
              <span>Seguidores</span>
              <strong>{!apiError && userData ? userData.followers : 1}</strong>
            </div>
            <div className="metric-box">
              <span>Localização</span>
              <strong>{!apiError && userData ? (userData.location || "Curitiba, Brasil") : "Curitiba, Brasil"}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Renderização dos Repositórios com validação garantida de Array */}
      <main className="repos-section">
        <h3>📂 Repositórios e Projetos Ativos ({!apiError && repos.length > 0 ? repos.length : 3})</h3>
        <div className="repos-grid">
          {!apiError && repos.length > 0 ? (
            repos.map((repo) => (
              <div key={repo.id} className="repo-card">
                <h4>{repo.name}</h4>
                <p>{repo.description || "Sem descrição informada no GitHub."}</p>
                <div className="repo-footer">
                  <span className="lang">⭐ {repo.stargazers_count} stars</span>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                    Acessar Código ↗
                  </a>
                </div>
              </div>
            ))
          ) : (
            // Cards de contingência (Seus projetos reais do cronograma)
            <>
              <div className="repo-card">
                <h4>powerbi-sales-dashboard</h4>
                <p>Dashboard executivo e interativo de desempenho de vendas utilizando DAX e Power Query no Power BI.</p>
                <div className="repo-footer">
                  <span className="lang">⭐ 1 stars</span>
                  <span className="repo-link">Projeto Ativo ↗</span>
                </div>
              </div>
              <div className="repo-card">
                <h4>sql-data-analysis</h4>
                <p>Análise estruturada de métricas web, tráfego de usuários e engajamento regional utilizando consultas SQL.</p>
                <div className="repo-footer">
                  <span className="lang">⭐ 1 stars</span>
                  <span className="repo-link">Projeto Ativo ↗</span>
                </div>
              </div>
              <div className="repo-card">
                <h4>api-data-project</h4>
                <p>Aplicação web desenvolvida em React para consumo, tratamento e renderização dinâmica de estruturas de dados.</p>
                <div className="repo-footer">
                  <span className="lang">⭐ 1 stars</span>
                  <span className="repo-link">Projeto Ativo ↗</span>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App