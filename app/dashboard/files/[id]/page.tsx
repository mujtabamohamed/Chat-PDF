// import Chat from "@/components/Chat";
import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

export default async function ChatToFilePage({ params }: { params: { id: string } }) {
  await auth.protect();
  const { userId } = await auth();

  const ref = await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(params.id)
    .get();

  const url = ref.data()?.downloadUrl;

  return (
    <div className="grid lg:grid-cols-11 h-full overflow-hidden">
      {/* Right */}
      <div className="col-span-7 lg:col-span-6 overflow-y-auto lg:-order-1 border-r border-[#ddd]">
        {/* Chat */}
        <Chat id={params.id} />
      </div>

      {/* Left */}
      <div className="col-span-7 lg:col-span-5 bg-[#eee] lg:border-[#3b3b3b] overflow-auto">
        {/* PDFView */}
        <PdfView url={url} />
      </div>

    </div>
  );
}
