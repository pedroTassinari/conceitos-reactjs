import React, {useEffect, useState} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const data = {
      title: `Novo projeto ${Date.now()}`,
      url: 'https://github.com/pedroTassinari/conceitos-reactjs',
      techs: [
        'React',
        'axios'
      ]
    }

    api.post('/repositories', data).then(response =>{
      setRepositories([...repositories, response.data]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response =>{
      if (response.status === 204){
        const notExcluded = repositories.filter(repository => repository.id != id);

        setRepositories(notExcluded);
      }
    })
  }

  useEffect(() =>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
