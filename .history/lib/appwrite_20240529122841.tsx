import {  Account, Client } from 'react-native-appwrite';
export const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.usman.aoraa",
  projectId: "6656127c001dbcaeb54f",
  databaseId: "66576f380005969e1774",
  userCollectionId: "66576f8d0016064723ac",
  videoCollectionId: "665778080011457fc4ed",
  storageId: "66577a7a003aac951c72"
};


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endPoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.



const account = new Account(client);

// Register User

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
      .then(function (response) {
          console.log(response);
      }, function (error) {
          console.log(error);
      });
}
