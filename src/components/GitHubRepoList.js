import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import RepoModal from './RepoModal'; // Import RepoModal
import './GitHubRepoList.css'; // Import CSS for styling

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function getRepos() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('repos');
}

async function saveRepo(repo) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put('repos', repo);
}

async function deleteRepo(id) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.delete('repos', id);
}

function GitHubRepoList() {
  const [repos, setRepos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRepo, setCurrentRepo] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      const repoList = await getRepos();
      setRepos(repoList);
    }
    fetchRepos();
  }, []);

  const handleOpenModal = (repo = null) => {
    setCurrentRepo(repo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentRepo(null);
  };

  const handleSave = async (repo) => {
    const existingRepo = repos.find(r => r.owner === repo.owner && r.name === repo.name);
    if (existingRepo && (!currentRepo || (currentRepo.owner !== repo.owner || currentRepo.name !== repo.name))) {
      alert('A repository with this owner and name already exists.');
      return;
    }

    const newRepo = { ...repo, id: currentRepo ? currentRepo.id : Date.now().toString() };
    await saveRepo(newRepo);
    
    setRepos(prev => {
      if (currentRepo) {
        return prev.map(r => (r.id === newRepo.id ? newRepo : r));
      } else {
        return [...prev, newRepo];
      }
    });
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await deleteRepo(id);
    setRepos(repos.filter(repo => repo.id !== id));
  };

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <button onClick={() => handleOpenModal()}>Add Repo</button>
      {repos.length === 0 ? (
        <p>No repo added. Click on the Add Repo button.</p>
      ) : (
        <div className="repo-grid">
          {repos.map(repo => (
            <div key={repo.id} className="repo-item">
              <div className="repo-info">
                <span className="repo-owner">{repo.owner}</span>
                <span className="repo-name">{repo.name}</span>
              </div>
              <div className="repo-actions">
                <button onClick={() => handleOpenModal(repo)}>Edit</button>
                <button onClick={() => handleDelete(repo.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <RepoModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        repo={currentRepo}
        onSave={handleSave}
      />
    </div>
  );
}

export default GitHubRepoList;
