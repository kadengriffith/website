const firebase = require("firebase/app");

require("firebase/firestore");
require("firebase/auth");
require("firebase/storage");

class Client {
  constructor() {
    this.config = {
      apiKey: "AIzaSyBNbinO2Na8BoldpUj7D4Fvj9s7bGN9O-Y",
      authDomain: "kadengriffith-fb.firebaseapp.com",
      databaseURL: "https://kadengriffith-fb.firebaseio.com",
      projectId: "kadengriffith-fb",
      storageBucket: "kadengriffith-fb.appspot.com",
      messagingSenderId: "318165461741",
      appId: "1:318165461741:web:a9d267752873f030"
    };
    //
    firebase.initializeApp(this.config);
    //
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.storage = firebase.storage();

    this.db
      .enablePersistence({
        synchronizeTabs: true
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  async uploadFile(location, file) {
    return await this.storage
      .ref(location)
      .put(file)
      .then(() => {
        return this.storage
          .ref(location)
          .getDownloadURL()
          .then(url => url);
      })
      .catch(err => err);
  }

  async getDownloadURL(folder, file) {
    return this.storage
      .ref(`${folder}/${file}`)
      .getDownloadURL()
      .then(url => url)
      .catch(err => err);
  }

  async addToCollection(collection, data) {
    return await this.db
      .collection(collection)
      .add(data)
      .then(docRef => docRef.id)
      .catch(err => err);
  }

  async setDocument(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .set(data)
      .then(docRef => docRef.id)
      .catch(err => err);
  }

  async update(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .update(data)
      .catch(err => err);
  }

  async addToRecord(collection, doc, data) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .set(data, {
        merge: true
      })
      .catch(err => err);
  }

  async delete(doc, collection) {
    return await this.db
      .collection(collection)
      .doc(doc)
      .delete()
      .then(() => {
        return true;
      })
      .catch(err => err);
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
        .catch(err => err);
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
      .catch(err => err);
  }

  async getCollection(collection, order = "asc") {
    return await this.db
      .collection(collection)
      .orderBy("timestamp", order)
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
      .catch(err => err);
  }

  async getCollectionLength(collection) {
    return await this.db
      .collection(collection)
      .get()
      .then(snapshot => Number(snapshot.size))
      .catch(err => err);
  }

  async searchForRelated(searchObj) {
    let results = [];
    return await this.db
      .collection(searchObj.collection)
      .orderBy("timestamp", "asc")
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
      .catch(err => err);
  }
}

export default new Client();
