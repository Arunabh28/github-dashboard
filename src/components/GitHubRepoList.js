import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function getRepos() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('repos');
}

async function saveRepo(repo) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put('repos', repo, repo.id);
}

async function deleteRepo(id) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.delete('repos', id);
}

function GitHubRepoList() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      const repoList = await getRepos();
      setRepos(repoList);
    }
    fetchRepos();
  }, []);

  const handleAdd = () => {
    const name = prompt('Enter repository name:');
    const id = Date.now().toString();
    saveRepo({ id, name }).then(() => {
      setRepos([...repos, { id, name }]);
    });
  };

  const handleDelete = (id) => {
    deleteRepo(id).then(() => {
      setRepos(repos.filter(repo => repo.id !== id));
    });
  };

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <button onClick={handleAdd}>Add Repo</button>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            {repo.name}
            <button onClick={() => handleDelete(repo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubRepoList;
