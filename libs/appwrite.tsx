import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.newlookorg.aora-app",
  projectId: "674c13ca001c197f1770",
  databaseId: "674c1453002af5be0d5f",
  userCollectionId: "674c1471001fe88e1cbc",
  videoCollectionId: "674c148400103fa5f69e",
  storageId: "674c162c0014cbb394c4",
};

//destructuring the config object
const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

// Register a new user
export const registerUser = async (
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

    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);
    await signIn(email, password);
    const newUser = await db.createDocument(
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
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

// Sign in a user
export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  } finally {
  }
};

// Get the current user
export const getCurrentUser = async () => {
  try {
    // Get the current account
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // Get the user details
    const currentUser = await db.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0]; //since we need info of only one user
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

// Get all videos
export const getVideos = async () => {
  try {
    const videos = await db.listDocuments(databaseId, videoCollectionId);
    return videos.documents;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//get latest posts
export const getLatestVideos = async () => {
  try {
    const videos = await db.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);
    return videos.documents;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//search videos
export const searchPosts = async (query: string) => {
  try {
    const posts = await db.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    console.log("searched posts", posts);
    return posts.documents;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//get user posts
export const getUserPosts = async (userId: string) => {
  try {
    const posts = await db.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
    ]);
    console.log("searched posts", posts);
    return posts.documents;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error(error);
  }
};

//logout
export const logout = async () => {
  try {
    const response = await account.deleteSession("current");
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

//upload file
export async function uploadFile(file: any, type: any) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
    console.log("uploadedFile", uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    console.log("fileUrl", fileUrl);
    return fileUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId: any, type: any) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error:any) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form: any) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await db.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error: any) {
    throw new Error(error);
  }
}
