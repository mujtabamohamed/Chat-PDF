"use server";

import { auth } from "@clerk/nextjs/server";
import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langchain";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId: string) {
    await auth.protect();
    
    try {
        await generateEmbeddingsInPineconeVectorStore(docId);
        revalidatePath('/dashboard');
        return { completed: true };
        
    } catch (error: any) {

        if (error.name === "InsufficientQuotaError") {
            return { 
                error: "OpenAI API quota exceeded. Please check your billing settings.",
                completed: false 
            };
        }

        return { 
            error: "An error occurred while generating embeddings",
            completed: false 
        };
    }
}