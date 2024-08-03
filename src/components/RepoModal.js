import React, { useState, useEffect } from 'react';
import './RepoModal.css'; // Import CSS for styling

function RepoModal({ isOpen, onClose, repo, onSave }) {
  const [owner, setOwner] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (repo) {
      setOwner(repo.owner);
      setName(repo.name);
    } else {
      setOwner('');
      setName('');
    }
  }, [repo]);

  const handleSave = () => {
    if (owner.trim() === '' || name.trim() === '') {
      alert('Owner and Repo Name are required.');
      return;
    }
    onSave({ ...repo, owner, name });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{repo ? 'Edit Repository' : 'Add Repository'}</h2>
        <div>
          <label>
            Owner:
            <input
              type="text"
              value={owner}
              onChange={e => setOwner(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Repo Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleSave}>{repo ? 'Save Changes' : 'Add Repo'}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default RepoModal;
