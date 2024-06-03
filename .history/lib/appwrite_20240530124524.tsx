import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";
import { UserProps } from "./util";

export const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.usman.aoraa",
  projectId: "6656127c001dbcaeb54f",
  databaseId: "66576f380005969e1774",
  userCollectionId: "66576f8d0016064723ac",
  videoCollectionId: "665778080011457fc4ed",
  storageId: "66577a7a003aac951c72",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endPoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
// Register User

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    const avatarUrl = avatars.getInitials(username);
    if (!newAccount) throw new Error("failed to create account!");

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any | unknown) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const sessions = await account.get()
    if (sessions) {
        await account.deleteSessions()
    }
    
    const session = await account.createEmailPasswordSession(email, password);

    
    return session;
  } catch (error: any | unknown) {
    console.log(error);
    throw new Error(error);
  }
}


export const  getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}