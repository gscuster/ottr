import { MongoClient } from 'mongodb';
import * as Authentication from './Authentication.js'

/**
 * Connects to a mongo database and returns the collection 'default'. Returns
 * null if something goes wrong.
 * @returns {MongoClient, Collection}
 */
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
    return client;
  }
  catch {
    return null;
  }
}

export const getCollection = async (client, collectionName) => {
  try {
    const collection = await (await client).db('ottr').collection(collectionName);
    return collection;
  }
  catch {
    return null;
  }
}

/**
 * Gets document with id, adds value to an array represented by key in the 
 * collection.
 * @param {Collection<Document>} collection 
 * @param {String} id 
 * @param {String} key 
 * @param {*} value 
 */
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
  catch (error) {
    // Do nothing
    console.log(error);
    console.log(`Failed to update ${id}.${key} with ${value}`);
  }
  
}

