'use strict';

const $ = require('kbrew_hypertxt'),
    firebase = require("firebase/app");

require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

class Client {
    constructor() {
        this.config = {
            apiKey: "AIzaSyAv8iyQlhk0IJR5n65vq2g4lUkMk8e-D9A",
            authDomain: "bytewave-wy.firebaseapp.com",
            databaseURL: "https://bytewave-wy.firebaseio.com",
            projectId: "bytewave-wy",
            storageBucket: "bytewave-wy.appspot.com",
            messagingSenderId: "710300398584"
        };
        //
        firebase.initializeApp(this.config);
        //
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.storage = firebase.storage();
        //
        this.db.settings({
            timestampsInSnapshots: true
        });

        this.db.enablePersistence()
            .catch(err => {
                console.error(err.message);
            });
    }

    async addToCollection(collection, data) {
        return await this.db.collection(collection).add(data)
            .then(docRef => {
                // Saved
                return docRef.id;
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    async update(collection, doc, data) {
        return await this.db.collection(collection).doc(doc).update(data)
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    async addToRecord(collection, doc, data) {
        return await this.db.collection(collection).doc(doc).set(data, {
                merge: true
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    async delete(doc, collection) {
        return await this.db.collection(collection).doc(doc).delete()
            .then(() => {
                return true;
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    async read(collection, doc) {
        if (doc) {
            return await this.db.collection(collection).doc(doc).get()
                .then(snapshot => snapshot)
                .catch(err => {
                    displayMessage(`e:${err.message}`);
                    return err;
                });
        } else {
            return await this.db.collection(collection).get()
                .then(snapshot => snapshot)
                .catch(err => {
                    displayMessage(`e:${err.message}`);
                    return err;
                });
        }

    }

    async search(searchObj) {
        let results = [];
        return await this.db.collection(searchObj.collection)
            .where(searchObj.key, searchObj.condition ? searchObj.condition : '==', searchObj.value)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    results.unshift({
                        key: doc.id,
                        data: doc.data()
                    });
                });
                return results;
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                console.error(err.message);
                return err;
            });
    }

    async getCollectionLength(collection) {
        return await this.db.collection(collection).get().then(snapshot => parseInt(snapshot.size))
            .catch(err => {
                displayMessage(`e:${err.message}`);
            });
    }

    async searchForRelated(searchObj) {
        let results = [];
        return await this.db.collection(searchObj.collection).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    let data = doc.data(),
                        regex = new RegExp(searchObj.value),
                        searchFor = ['first', 'last', 'email', 'bus-name', 'phone', 'merchantId'],
                        filtered = Object.keys(data)
                        .filter(key => searchFor.includes(key))
                        .reduce((obj, key) => {
                            obj[key] = data[key];
                            return obj;
                        }, {});

                    for (let prop in filtered) {
                        if (regex.test(filtered[prop])) {
                            results.push({
                                key: doc.id,
                                data: doc.data()
                            });
                            break;
                        }
                    }
                });
                return results;
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    login(email, password) {
        this.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                location.href = '/profile';
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    logout() {
        this.auth.signOut().then(() => {
                location.href = '/';
            })
            .catch(err => {
                displayMessage(`e:${err.message}`);
                return err;
            });
    }

    resetPassword(email) {
        if (!email) {
            displayMessage(`e:Please enter your email.`);
        } else {
            this.auth.sendPasswordResetEmail(email).then(() => {
                    displayMessage(`s:Please check your email for reset instructions.`);
                })
                .catch(err => {
                    displayMessage(`e:${err.message}`);
                    return err;
                });
        }
    }

    async registerUser() {
        let confirmed = true,
            userData = {},
            passwordRequested = $.get('#password').value;

        if (passwordRequested !== $.get('#password-2').value) {
            confirmed = false;
            displayMessage('e:Passwords do not match.');
        }

        for (let el of $.queryAll('input')) {
            if (el && el.hasAttribute('value') || el.value) {
                if (!/password/.test(el.id)) {
                    userData[el.id] = el.value;
                }
            }
            if (el.hasAttribute('required')) {
                if (el.value.length === 0) {
                    confirmed = false;
                    displayMessage(`e:${el.placeholder} cannot be empty.`);
                }
            }
        }

        if (confirmed) {
            toggleLoading(true);

            userData.agree = true;
            userData.timestamp = new Date();
            this.getCollectionLength('users').then(length => {
                userData.order = length + 1;
                this.auth.createUserWithEmailAndPassword(userData.email, passwordRequested)
                    .then(() => {
                        this.addToCollection('users', userData).then(() => {
                            this.auth.currentUser.updateProfile({
                                displayName: `${userData.first} ${userData.last}`
                            }).then(() => {
                                location.href = '/profile';
                            }).catch(err => {
                                displayMessage(`e:${err.message}`);
                            });
                        });
                    })
                    .catch(err => {
                        displayMessage(`e:${err.message}`);
                    });
            });
        }
    }
}

module.exports = new Client();