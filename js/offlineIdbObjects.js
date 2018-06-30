/**
 * Created by Owden on 30/06/2018.
 */

//indexDB stuff now, let's roll with all the functions that we'll use later
const dbPromise = idb.open('conversionRates', 1, upgradeDB => {
        upgradeDB.createObjectStore('keyval');
});

const idbKeyval = {
    get(key) {
        return dbPromise.then(db => {
                return db.transaction('keyval')
                    .objectStore('keyval').get(key);
    });
    },
    set(key, val) {
        return dbPromise.then(db => {
                const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').put(val, key);
        return tx.complete;
    });
    },
    delete(key) {
        return dbPromise.then(db => {
                const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').delete(key);
        return tx.complete;
    });
    },
    clear() {
        return dbPromise.then(db => {
                const tx = db.transaction('keyval', 'readwrite');
        tx.objectStore('keyval').clear();
        return tx.complete;
    });
    },
    keys() {
        return dbPromise.then(db => {
                const tx = db.transaction('keyval');
        const keys = [];
        const store = tx.objectStore('keyval');

        // Because store.getAllKeys() and openKeyCursor aren't supported by Edge or Safari, let's fall back
        (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
            if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
    });

        return tx.complete.then(() => keys);
    });
    }
};


//idb.delete('conversion-rates').then(() => console.log('done!'));




