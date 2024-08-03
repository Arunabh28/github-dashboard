import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
    getAllRepos,
    addRepo,
    editRepo,
    deleteRepo
} from '../../services/dbService'; // Import dbService functions

const RepoTab = () => {
    const [repos, setRepos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentRepo, setCurrentRepo] = useState({ owner: '', repoName: '' });
    const [newRepo, setNewRepo] = useState({ owner: '', repoName: '' });

    useEffect(() => {
        // Load repositories from the service
        getAllRepos()
            .then(setRepos)
            .catch(console.error);
    }, []);

    const handleAddRepo = () => {
        addRepo(newRepo)
            .then(() => {
                setRepos([...repos, newRepo]);
                setNewRepo({ owner: '', repoName: '' });
                setShowModal(false);
            })
            .catch(console.error);
    };

    const handleEditRepo = (repo) => {
        setCurrentRepo(repo);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleSaveEdit = () => {
        editRepo(currentRepo)
            .then(() => {
                setRepos(repos.map(repo => repo._id === currentRepo._id ? currentRepo : repo));
                setCurrentRepo({ owner: '', repoName: '' });
                setShowModal(false);
            })
            .catch(console.error);
    };

    const handleDeleteRepo = (id) => {
        deleteRepo(id)
            .then(() => {
                setRepos(repos.filter(repo => repo._id !== id));
            })
            .catch(console.error);
    };

    return (
        <div>
            <h3>Repo</h3>
            <button onClick={() => { setModalMode('add'); setShowModal(true); }}>
                <FaPlus /> Add New Repo
            </button>
            <div className="repo-grid">
                {repos.map(repo => (
                    <div key={repo._id} className="repo-row">
                        <span>{repo.owner}/{repo.repoName}</span>
                        <FaEdit onClick={() => handleEditRepo(repo)} />
                        <FaTrash onClick={() => handleDeleteRepo(repo._id)} />
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>{modalMode === 'add' ? 'Add Repository' : 'Edit Repository'}</h4>
                        <input
                            type="text"
                            value={modalMode === 'add' ? newRepo.owner : currentRepo.owner}
                            onChange={(e) => {
                                if (modalMode === 'add') {
                                    setNewRepo({ ...newRepo, owner: e.target.value });
                                } else {
                                    setCurrentRepo({ ...currentRepo, owner: e.target.value });
                                }
                            }}
                            placeholder="Owner"
                        />
                        <input
                            type="text"
                            value={modalMode === 'add' ? newRepo.repoName : currentRepo.repoName}
                            onChange={(e) => {
                                if (modalMode === 'add') {
                                    setNewRepo({ ...newRepo, repoName: e.target.value });
                                } else {
                                    setCurrentRepo({ ...currentRepo, repoName: e.target.value });
                                }
                            }}
                            placeholder="Repo Name"
                        />
                        <button onClick={modalMode === 'add' ? handleAddRepo : handleSaveEdit}>
                            {modalMode === 'add' ? 'Save' : 'Save'}
                        </button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoTab;
