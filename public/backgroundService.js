// backgroundService.js

self.addEventListener('install', (event) => {
    console.log('Service Worker installed.');
    event.waitUntil(
        // Perform installation steps here if needed
        Promise.resolve()
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
    event.waitUntil(
        // Perform activation steps here if needed
        Promise.resolve()
    );
});

self.addEventListener('message', (event) => {
    const { type, payload } = event.data;

    if (type === 'STORE_DATA') {
        storeData(payload).then(() => {
            event.ports[0].postMessage({ type: 'STORE_SUCCESS' });
        }).catch((error) => {
            event.ports[0].postMessage({ type: 'STORE_ERROR', error: error.message });
        });
    } else if (type === 'FETCH_DATA') {
        fetchData().then((data) => {
            event.ports[0].postMessage({ type: 'FETCH_SUCCESS', data });
        }).catch((error) => {
            event.ports[0].postMessage({ type: 'FETCH_ERROR', error: error.message });
        });
    }
});

const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myDatabase', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('myStore', { keyPath: 'id' });
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const storeData = async (data) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('myStore', 'readwrite');
        const store = transaction.objectStore('myStore');
        const request = store.put(data);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const fetchData = async () => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('myStore', 'readonly');
        const store = transaction.objectStore('myStore');
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};
