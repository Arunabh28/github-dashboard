// dbService.js

const dbName = 'settingsDB';
const storeName = 'settingsStore';

// Open IndexedDB
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore(storeName, { keyPath: '_id' });
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

// Fetch settings
export const getSettings = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get('settings_doc_id');

        request.onsuccess = async () => {
            if (request.result) {
                resolve(request.result);
            } else {
                // Document not found, create with default values
                const defaultSettings = {
                    _id: 'settings_doc_id',
                    GitHubToken: '',
                    Repos: [],
                    Schedule: []
                };

                // Use a readwrite transaction to add the default settings
                const writeTransaction = db.transaction(storeName, 'readwrite');
                const writeStore = writeTransaction.objectStore(storeName);
                const putRequest = writeStore.put(defaultSettings);

                putRequest.onsuccess = () => {
                    resolve(defaultSettings);
                };

                putRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            }
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

// Fetch GitHub token
export const getGitHubToken = async () => {
    const settings = await getSettings();
    return settings.GitHubToken;
};

// Update GitHub token
export const setGitHubToken = async (token) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get('settings_doc_id');

        getRequest.onsuccess = (event) => {
            const settings = event.target.result;
            settings.GitHubToken = token;
            const putRequest = store.put(settings);
            putRequest.onsuccess = () => {
                resolve(true);
            };
            putRequest.onerror = (event) => {
                reject("An exception has occurred while updating the token.");
            };
        };

        getRequest.onerror = (event) => {
            reject("An exception has occurred while retrieving settings.");
        };
    });
};

// Fetch all repositories
export const getAllRepos = async () => {
    const settings = await getSettings();
    return settings.Repos;
};

// Add a new repository
export const addRepo = async (repo) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get('settings_doc_id');

        getRequest.onsuccess = (event) => {
            const settings = event.target.result;
            settings.Repos.push(repo);
            const putRequest = store.put(settings);
            putRequest.onsuccess = () => {
                resolve(true);
            };
            putRequest.onerror = (event) => {
                reject("Error adding repository.");
            };
        };

        getRequest.onerror = (event) => {
            reject("An exception has occurred while retrieving settings.");
        };
    });
};

// Edit an existing repository
export const editRepo = async (repo) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get('settings_doc_id');

        getRequest.onsuccess = (event) => {
            const settings = event.target.result;
            settings.Repos = settings.Repos.map(r => r._id === repo._id ? repo : r);
            const putRequest = store.put(settings);
            putRequest.onsuccess = () => {
                resolve(true);
            };
            putRequest.onerror = (event) => {
                reject("Error editing repository.");
            };
        };

        getRequest.onerror = (event) => {
            reject("An exception has occurred while retrieving settings.");
        };
    });
};

// Delete a repository
export const deleteRepo = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const getRequest = store.get('settings_doc_id');

        getRequest.onsuccess = (event) => {
            const settings = event.target.result;
            settings.Repos = settings.Repos.filter(r => r._id !== id);
            const putRequest = store.put(settings);
            putRequest.onsuccess = () => {
                resolve(true);
            };
            putRequest.onerror = (event) => {
                reject("Error deleting repository.");
            };
        };

        getRequest.onerror = (event) => {
            reject("An exception has occurred while retrieving settings.");
        };
    });
};

// Update settings
export const updateSettings = async (settings) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const putRequest = store.put(settings);
        putRequest.onsuccess = () => {
            resolve(true);
        };
        putRequest.onerror = (event) => {
            reject("Error updating settings.");
        };
    });
};
