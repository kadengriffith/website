const firebase = require("firebase/app");

require("firebase/firestore");

class Client {
  constructor() {
    this.config = {
      apiKey: "AIzaSyBk1rKRhKkZnGzhvq3zL0eOGqKdr5wKhV0",
      authDomain: "wilsonslandl-mo.firebaseapp.com",
      databaseURL: "https://wilsonslandl-mo.firebaseio.com",
      projectId: "wilsonslandl-mo",
      storageBucket: "wilsonslandl-mo.appspot.com",
      messagingSenderId: "920809384091"
    };
    //
    firebase.initializeApp(this.config);
    //
    this.db = firebase.firestore();

    this.db
      .enablePersistence({
        synchronizeTabs: true
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  async addToCollection(collection, data) {
    return await this.db
      .collection(collection)
      .add(data)
      .then(docRef => docRef.id)
      .catch(err => {
        console.error(err);
      });
  }

  async setDocument(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .set(data)
      .then(docRef => docRef.id)
      .catch(err => {
        console.error(err);
      });
  }

  async update(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .update(data)
      .catch(err => {
        console.error(err);
      });
  }

  async addToRecord(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .set(data, {
        merge: true
      })
      .catch(err => {
        console.error(err);
      });
  }

  async delete(doc, collection) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .delete()
      .then(() => {
        return true;
      })
      .catch(err => {
        console.error(err);
      });
  }

  async read(collection, doc) {
    if (doc) {
      return await this.db
        .collection(collection)
        .doc(doc)
        .get()
        .then(snapshot => snapshot)
        .catch(err => {
          console.error(err);
        });
    } else {
      return await this.db
        .collection(collection)
        .get()
        .then(snapshot => snapshot)
        .catch(err => {
          console.error(err);
        });
    }
  }

  async search(searchObj) {
    let results = [];
    return await this.db
      .collection(searchObj.collection)
      .where(
        searchObj.key,
        searchObj.condition ? searchObj.condition : "==",
        searchObj.value
      )
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
        console.error(err);
      });
  }

  async getCollection(collection) {
    return await this.db
      .collection(collection)
      .orderBy("timestamp", "desc")
      .get()
      .then(posts => {
        let docs = [];

        posts.forEach(doc => {
          let data = doc.data();

          data.id = doc.id;

          docs.push(data);
        });

        return docs;
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getCollectionLength(collection) {
    return await this.db
      .collection(collection)
      .get()
      .then(snapshot => Number(snapshot.size))
      .catch(err => {
        console.error(err);
      });
  }

  async searchForRelated(searchObj) {
    let results = [];
    return await this.db
      .collection(searchObj.collection)
      .orderBy("timestamp", "desc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = doc.data(),
            regex = new RegExp(searchObj.value, "i"),
            searchFor = [searchObj.key],
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
        console.error(err);
      });
  }
}

export default new Client();
