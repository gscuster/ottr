import { MongoClient } from 'mongodb';
import * as Authentication from './Authentication.js'

export const connect = async () => {
  const dbName = Authentication.getDatabaseName();
  const username = Authentication.getUsername();
  const password = Authentication.getPassword();
  // Connection URI
  const uri = `mongodb://${username}:${password}@127.0.0.1:27017/${dbName}?writeConcern=majority`;

  // Create a new MongoClient
  const client = new MongoClient(uri);
  
  try {
    await client.connect()

  const collection = await client.db('ottr').collection('default');
  return collection;
  }
  catch {
    return null;
  }
}

export const updateArray = async (collection, id, key, value) => {
  const filter = { _id: id };
  const options = { upsert: true };
  const updateDoc = {
    $addToSet: {
      [key]: value
    }
  };
  try {
    (await collection).updateOne(filter, updateDoc, options);
  }
  catch {
    // Do nothing
  }
  
}

