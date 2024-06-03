import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";
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
    if (!newAccount) throw new Error();

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        password,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error: any | unknown) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any | unknown) {
    console.log(error);
    throw new Error(error);
  }
}
