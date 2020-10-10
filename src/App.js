import React, { useState, useEffect } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  const fetchRepos = () => {
    api.get("/repositories").then((response) => {
      setRepos(response.data);
    });
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo repositorio - ${new Date().toISOString()}`,
      url: "https://github.com/matheusgrigoletto",
      techs: ["React", "Node.js"],
    });

    const repo = response.data;

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepos(repos.filter((repo) => repo.id !== id));
    } catch (exception) {
      alert("Não foi possível excluir o repositório");
      console.error("Exception: ", exception);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer noopener"
              title={repo.url}
            >
              {repo.title}
            </a>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
}

export default App;
