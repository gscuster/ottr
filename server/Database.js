import { MongoClient } from 'mongodb';
import * as Authentication from './Authentication.js'

export const connect = () => {

  const dbName = Authentication.getDatabaseName();
  const username = Authentication.getUsername();
  const password = Authentication.getPassword();
  // Connection URI
  const uri = `mongodb://${username}:${password}@127.0.0.1:27017/${dbName}?writeConcern=majority`;

  // Create a new MongoClient
  const client = new MongoClient(uri);

  client.connect()

  const db = client.db(dbName);

  if (db !== null) {
    console.log(`Connected to ${dbName}`);
  }

  return db;
}

export const addCollection = (db) => {
  db.listCollections({name: 'default'})
    .next(function(err, collinfo) {
      if (collinfo) {
          console.log('It alrready exists');
      }
      else {
        db.createCollection('default');
      }
    });
}

