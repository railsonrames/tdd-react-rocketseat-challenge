import React, {useState, useEffect}  from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(result => setRepositories(result.data));
  }, []);


  async function handleAddRepository() {
    var result = await api.post('repositories', {
      title: "Nega maluca",
      descriptio: "Projeto para o controle de vendas de teta de nega",
      url: "https://github.com/nega-maluca/controle-de-vendas",
      techs: [".NET", "React"]
    });

    setRepositories([...repositories, result.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <>
            <li key={repository.id}><strong>Id:</strong> {repository.id}</li>
            <li><strong>Title:</strong> {repository.title}</li>
            <li><strong>Url:</strong> {repository.url}</li>
            <li><strong>Description:</strong> {repository.description}</li>
            <li><strong>Likes:</strong> {repository.likes}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
