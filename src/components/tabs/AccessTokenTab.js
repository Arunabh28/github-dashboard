import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { getGitHubToken, setGitHubToken } from '../../services/dbService'; // Import dbService functions

const AccessTokenTab = () => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [newToken, setNewToken] = useState('');
    const [gitToken, setGitToken] = useState('');

    useEffect(() => {
        // Load settings from the service
        getGitHubToken()
            .then(token => {
                setGitToken(token);
                setNewToken(token || '');
            })
            .catch(console.error);
    }, []);

    const handleSaveToken = () => {
        console.log(`Saving token: ${newToken}`);
        setGitHubToken(newToken)
            .then(() => {
                setIsEditing(false);
                setGitToken(newToken);
            })
            .catch(console.error);
    };

    const handleCancelEdit = () => {
        //setNewToken(settings.githubToken || '');
        setIsEditing(false);
    };

    return (
        <div>
            <h3>Access Token</h3>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={newToken}
                        onChange={(e) => setNewToken(e.target.value)}
                        placeholder="Enter new token"
                    />
                    <button onClick={handleSaveToken}>
                        <FaSave /> Save
                    </button>
                    <button onClick={handleCancelEdit}>
                        <FaTimes /> Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <span>{gitToken || 'No token set'}</span>
                    <FaEdit onClick={() => setIsEditing(true)} />
                </div>
            )}
        </div>
    );
};

export default AccessTokenTab;