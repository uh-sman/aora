import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";
import { UserProps } from "./util";
import { FormState } from "../app/(tabs)/create";
import * as DocumentPicker from "expo-document-picker"
import { Alert } from "react-native";

export const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.usman.aoraa",
  projectId: "6656127c001dbcaeb54f",
  databaseId: "66576f380005969e1774",
  userCollectionId: "66576f8d0016064723ac",
  videoCollectionId: "665778080011457fc4ed",
  storageId: "66577a7a003aac951c72",
};

const {
  endPoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(endPoint) // Your Appwrite Endpoint
  .setProject(projectId) // Your project ID
  .setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client)
// Register User


interface UploadFile {
  mimeType: string;
  name: string;
  size: number;
  uri: string;

}


interface Document {
  $id: string;
  $createdAt: string;
  [key: string]: any;
}

export const createUser = async (
  email: string,
  password: string,
  username: string
):Promise<Document> => {
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
      databaseId,
      userCollectionId,
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
    const sessions = await account.get();
    if (sessions) {
      await account.deleteSessions();
    }

    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error: any | unknown) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);
    return posts.documents
  } catch (error: any | unknown) {
    throw new Error(error);
  }
};


export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.orderDesc("$createdAt"), Query.limit(7)]);
    return posts.documents
  } catch (error: any | unknown) {
    throw new Error(error);
  }
}


export const searchPosts = async (query: any) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [Query.search("title", query)]);
    return posts.documents
  } catch (error: any | unknown) {
    throw new Error(error);
  }
}
export async function getUserPosts(userId: any) {
  try {
    const posts = await databases.listDocuments(
     databaseId,
      videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error: any | unknown) {
    throw new Error(error);
  }
}


export const signOut = async () => {
  try {
    const session = await account.deleteSession('current')
    return session 
  }  catch (error: any | unknown) {
    throw new Error(error);
  }
}
interface ImagePreviewOptions {
  width: number;
  height: number;
  position?: ImageGravity; // If ImageGravity is defined
  quality: number;
}

export const getFilePreview = async (fileId: string, type: 'video' | 'image') => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      const options: ImagePreviewOptions = {
        width: 2000,
        height: 2000,
        position: ImageGravity.Top, // Use the correct enum value
        quality: 100,
      };

      fileUrl = storage.getFilePreview(storageId, fileId, options.width, options.height, options.position, options.quality);
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) {
      throw Error;
    }
    return fileUrl;
  } catch (error: any) {
    Alert.alert("Error", error.message)
    throw new Error(error);
  }
};


export async function uploadFile(file:any, type:any) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error: any | unknown) {
    Alert.alert("Error", error.message)
    throw new Error(error);
  }
}

export const createVideo = async (form: FormState): Promise<void> => {
  if (!form.thmbnail || !form.video) {
    throw new Error("Thumbnail and video are required");
  }
  
  try {
    const [thmbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thmbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      video: videoUrl,
      thmbnail: thmbnailUrl,
      prompt: form.prompt,
      creator: form.userId,
    });
  } catch (error: any) {
    Alert.alert("Error", error.message)
    throw new Error(error.message);
  }
};