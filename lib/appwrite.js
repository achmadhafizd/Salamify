import {
  Account,
  Client,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.masjid.salamify",
  projectId: "663866f5000cece3c01f",
  databaseId: "6638c49b0034e65a9e1d",
  userCollectionId: "6638c4b50028db8b7c5d",
  articleCollectionId: "6638c4f2000ed88dcf2c",
  kasCollectionId: "6644b182002f130d7a53",
  ustadzCollectionId: "6646c297000b13d9935b",
  qurbanCollectionId: "66473424003b1c182488",
  contentCollectionId: "6685fcef0015075ec913",
  marqueeCollectionId: "668a9c6300324a40a68a",
  mosqueCollectionId: "668f12500027cf8cf619",
  timerCollectionId: "66a3b9ff00060d4d0744",
  storageId: "6638d6eb00091a82a666",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  articleCollectionId,
  storageId,
  kasCollectionId,
  ustadzCollectionId,
  qurbanCollectionId,
  contentCollectionId,
  mosqueCollectionId,
  marqueeCollectionId,
  timerCollectionId,
} = appWriteConfig;

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

export const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Account
export async function createUser({ email, password, username }) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatar.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

export async function updateEmail({ newEmail, password, id }) {
  try {
    const updateEmail = await account.updateEmail(newEmail, password);

    if (!updateEmail) throw Error;

    const newUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      id,
      {
        email: newEmail,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function updatePassword({ oldPassword, password }) {
  try {
    const UpdatePassword = await account.updatePassword(oldPassword, password);

    if (!UpdatePassword) throw Error;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export async function updateName({ name, id }) {
  try {
    const result = await account.updateName(name);
    if (!result) throw Error;

    const newUser = await databases.updateDocument(
      databaseId,
      userCollectionId,
      id,
      {
        username: name,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
}

export const signIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Current Account", session);
    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const sessionEnd = await account.deleteSession("current");
    return sessionEnd;
  } catch (error) {
    throw new Error(error);
  }
};

export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Posts Article

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      articleCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPostById = async (id) => {
  try {
    const posts = await databases.getDocument(
      databaseId,
      articleCollectionId,
      id
    );
    return posts;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      articleCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUsersPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      articleCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents;
  } catch (error) {
    console.error("Error fetching user's posts", error);
  }
};

// Article

export const getFilePreview = async (type, fileId) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFilePreview(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await storage.getFilePreview(type, uploadedFile.$id);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createArticle = async (form) => {
  try {
    const [thumbnailUrl, vimagesUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.vimages, "image"),
    ]);
    const newPost = await databases.createDocument(
      databaseId,
      articleCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        vimages: vimagesUrl,
        body: form.body,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteArticleId = async (id) => {
  try {
    const deleteArticleId = await databases.deleteDocument(
      databaseId,
      articleCollectionId,
      id
    );
    return deleteArticleId;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateArticleId = async (form, id) => {
  try {
    const [thumbnailUrl, vimagesUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.vimages, "image"),
    ]);
    const updateArticle = await databases.updateDocument(
      databaseId,
      articleCollectionId,
      id,
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        vimages: vimagesUrl,
        body: form.body,
        creator: form.creator,
      }
    );
    return updateArticle;
  } catch (error) {
    throw new Error(error);
  }
};

// Kas

export const createKas = async (form) => {
  try {
    const newKas = await databases.createDocument(
      databaseId,
      kasCollectionId,
      ID.unique(),
      {
        saldoAwal: form.saldoAwal,
        pemasukan: form.pemasukan,
        pengeluaran: form.pengeluaran,
        saldoAkhir: form.saldoAkhir,
        creator: form.userId,
      }
    );
    return newKas;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestKas = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, kasCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateKas = async (form, id) => {
  try {
    const updateKas = await databases.updateDocument(
      databaseId,
      kasCollectionId,
      id,
      {
        saldoAwal: form.saldoAwal,
        pemasukan: form.pemasukan,
        pengeluaran: form.pengeluaran,
        saldoAkhir: form.saldoAkhir,
        creator: form.userId,
      }
    );
    console.log("update kas", newKas.$id);
    return updateKas;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteKasId = async (id) => {
  try {
    const DeleteKasId = await databases.deleteDocument(
      databaseId,
      kasCollectionId,
      id
    );
    return DeleteKasId;
  } catch (error) {
    throw new Error(error);
  }
};

// Ustadz / Staff

export const addStaff = async (form) => {
  try {
    const [profileUrl] = await Promise.all([
      uploadFile(form.photoProfile, "image"),
    ]);
    const newPost = await databases.createDocument(
      databaseId,
      ustadzCollectionId,
      ID.unique(),
      {
        fullName: form.fullName,
        photoProfile: profileUrl,
        phoneNumber: form.phoneNumber,
        role: form.role,
        creator: form.userId,
      }
    );
    console.log(newPost);
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStaff = async (form, id) => {
  try {
    const [profileUrl] = await Promise.all([
      uploadFile(form.photoProfile, "image"),
    ]);
    const updateStaff = await databases.updateDocument(
      databaseId,
      ustadzCollectionId,
      id,
      {
        fullName: form.fullName,
        photoProfile: profileUrl,
        phoneNumber: form.phoneNumber,
        role: form.role,
        creator: form.userId,
      }
    );
    return updateStaff;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllStaffs = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, ustadzCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteStaffId = async (id) => {
  try {
    const deleteStaffId = await databases.deleteDocument(
      databaseId,
      ustadzCollectionId,
      id
    );
    return deleteStaffId;
  } catch (error) {
    throw new Error(error);
  }
};

// Qurban

export const addQurban = async (form) => {
  try {
    const addQurbans = await databases.createDocument(
      databaseId,
      qurbanCollectionId,
      ID.unique(),
      {
        fullName: form.fullName,
        nominal: form.nominal,
        qurbanType: form.qurbanType,
        creator: form.userId,
      }
    );
    console.log(addQurbans);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateQurban = async (form, id) => {
  try {
    const updateQurban = await databases.updateDocument(
      databaseId,
      qurbanCollectionId,
      id,
      {
        fullName: form.fullName,
        nominal: form.nominal,
        qurbanType: form.qurbanType,
        creator: form.userId,
      }
    );
    return updateQurban;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllQurbans = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, qurbanCollectionId);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteQurbanId = async (id) => {
  try {
    const deleteQurbanId = await databases.deleteDocument(
      databaseId,
      qurbanCollectionId,
      id
    );
    return deleteQurbanId;
  } catch (error) {
    throw new Error(error);
  }
};

// Search Query
export const getArticleQuery = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      articleCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getKasQuery = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, kasCollectionId, [
      Query.search("createdAt", query),
    ]);
    console.log(posts);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUstadzQuery = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      ustadzCollectionId,
      [Query.search("fullName", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getQurbanQuery = async (query) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      qurbanCollectionId,
      [Query.search("fullName", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// SCREEM TV
export const createContentImage = async (form) => {
  try {
    const [contentUrl] = await Promise.all([uploadFile(form.content, "image")]);
    const newImage = await databases.createDocument(
      databaseId,
      contentCollectionId,
      ID.unique(),
      {
        content: contentUrl,
        creator: form.creator,
      }
    );
    return newImage;
  } catch (error) {
    throw new Error(error);
  }
};

export const getContent = async () => {
  try {
    const content = await databases.listDocuments(
      databaseId,
      contentCollectionId
    );
    return content.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateContent = async (form, id) => {
  try {
    const [contentUrl] = await Promise.all([uploadFile(form.content, "image")]);
    const updatecontent = await databases.updateDocument(
      databaseId,
      contentCollectionId,
      id,
      {
        content: contentUrl,
        creator: form.creator,
      }
    );
    return updatecontent;
  } catch (error) {
    throw new Error(error);
  }
};

export const createMarquee = async (form) => {
  try {
    const createText = await databases.createDocument(
      databaseId,
      marqueeCollectionId,
      ID.unique(),
      {
        marquee: form.marquee,
        creator: form.userId,
      }
    );
    console.log(createText);
    return createText;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMarquee = async () => {
  try {
    const text = await databases.listDocuments(databaseId, marqueeCollectionId);
    return text.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMarquee = async (form, id) => {
  try {
    const updmarq = await databases.updateDocument(
      databaseId,
      marqueeCollectionId,
      id,
      {
        marquee: form.marquee,
        creator: form.userId,
      }
    );
    return updmarq;
  } catch (error) {
    throw new Error(error);
  }
};

// Masjid
export const addMasjid = async (form) => {
  try {
    const addMasjid = await databases.createDocument(
      databaseId,
      mosqueCollectionId,
      ID.unique(),
      {
        masjid: form.masjid,
        city: form.city,
        creator: form.userId,
      }
    );
    console.log(addMasjid);
    return addMasjid;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMasjid = async () => {
  try {
    const masjid = await databases.listDocuments(
      databaseId,
      mosqueCollectionId
    );
    return masjid.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMasjid = async (form, id) => {
  try {
    const updatemasjid = await databases.updateDocument(
      databaseId,
      mosqueCollectionId,
      id,
      {
        masjid: form.masjid,
        city: form.city,
        creator: form.userId,
      }
    );
    return updatemasjid;
  } catch (error) {
    throw new Error(error);
  }
};

// TIMER
export const getTimer = async () => {
  try {
    const masjid = await databases.listDocuments(databaseId, timerCollectionId);
    return masjid.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTimer = async (form) => {
  try {
    const addTimer = await databases.createDocument(
      databaseId,
      timerCollectionId,
      ID.unique(),
      {
        subuh: form.subuh,
        dzuhur: form.dzuhur,
        ashar: form.ashar,
        maghrib: form.maghrib,
        isya: form.isya,
        creator: form.userId,
      }
    );
    console.log(addTimer);
    return addTimer;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTimer = async (form, id) => {
  try {
    const updatemasjid = await databases.updateDocument(
      databaseId,
      timerCollectionId,
      id,
      {
        subuh: form.subuh,
        dzuhur: form.dzuhur,
        ashar: form.ashar,
        maghrib: form.maghrib,
        isya: form.isya,
        creator: form.userId,
      }
    );
    return updatemasjid;
  } catch (error) {
    throw new Error(error);
  }
};
