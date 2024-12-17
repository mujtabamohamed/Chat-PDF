"use server";

import { adminDb, adminStorage } from "@/firebaseAdmin";
import { indexName } from "@/lib/langchain";
import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
  await auth.protect();

  const { userId } = await auth();

  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete();

  try {
    await adminStorage
      .bucket(process.env.FIREBASE_STORAGE_BUCKET)
      .file(`users/${userId}/files/${docId}`)
      .delete();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to delete file: ${error.message}`);
    } else {
      console.error(`An unknown error occurred while deleting the file: ${error}`);
    }
  }
  

  const index = await pineconeClient.index(indexName);
  await index.namespace(docId).deleteAll();

  revalidatePath("/dashboard");
}