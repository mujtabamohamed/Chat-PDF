import { auth } from "@clerk/nextjs/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/firebaseAdmin";
import Document from "./Document";
import { TableRow } from "./ui/table";

async function Documents() {
  await auth.protect();

  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const documentsSnapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

  return (
    <>
      {documentsSnapshot.docs.map((doc) => {
        const { name, downloadUrl, size, createdAt } = doc.data();
        const createdAtDate = createdAt instanceof Timestamp ? createdAt.toDate() : new Date(createdAt);

        return (
          <TableRow key={doc.id} className="cursor-pointer">
            <Document
              id={doc.id}
              name={name}
              size={size}
              downloadUrl={downloadUrl}
              createdAt={createdAtDate.toLocaleString()} 
            />
          </TableRow>
        );
      })}

      {/* <PlaceholderDocument /> */}
    </>
  );
}
export default Documents;