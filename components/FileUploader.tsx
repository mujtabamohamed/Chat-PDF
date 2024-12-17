"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  CheckCircleIcon,
  HammerIcon,
  RocketIcon,
  SaveIcon,
  Upload,
} from "lucide-react";
import useUpload, { StatusText } from "@/hooks/useUpload";
import { useRouter } from "next/navigation";
import useSubscription from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";

function FileUploader() {
  const { progress, status, fileId, handleUpload } = useUpload();
  const { isOverFileLimit, filesLoading } = useSubscription();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!isOverFileLimit && !filesLoading) {
          await handleUpload(file);
        } else {
          toast({
            variant: "destructive",
            title: "Free Plan File Limit Reached",
            description:
              "You have reached the maximum number of files allowed for your account. Please upgrade to add more documents.",
          });
        }
      } else {
      }
    },
    [handleUpload, isOverFileLimit, filesLoading, toast]
  );

  const statusIcons: {
    [key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="h-16 w-16 text-[#0062cc]" />,
    [StatusText.UPLOADED]: (
      <CheckCircleIcon className="h-16 w-16 text-[#0062cc]" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h-16 w-16 text-[#0062cc]" />,
    [StatusText.GENERATING]: (
      <HammerIcon className="h-16 w-16 text-[#0062cc] animate-bounce" />
    ),
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className="flex flex-col gap-4 items-center max-w-5xl mx-auto">
      {uploadInProgress && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-[#0063cc67] text-white border-[#0062cc] border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={{
              // @ts-ignore
              "--value": progress,
              "--size": "8rem",
              "--thickness": "1rem",
            }}
          >
            {progress} %
          </div>

          {
            // @ts-ignore
            statusIcons[status!]
          }

          {/* @ts-ignore */}
          <p className="text-[#0062cc] animate-pulse">{status}</p>
        </div>
      )}

      {!uploadInProgress && (
        <div
          {...getRootProps()}
          className={`p-10 border-2 border-dashed mt-10 w-[90%]  border-[#252525] text-[#252525] rounded-2xl h-96 flex items-center justify-center ${
            isFocused || isDragAccept ? "bg-[#f5f5f5]" : "bg-[#fff]"
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-4">
            {isDragActive ? (
              <>
                <RocketIcon className="h-16 w-16 animate-ping" />
                <p>Drop the files here ...</p>
              </>
            ) : (
              <>
                <Upload className="h-16 w-16 " />
                <p>Drag n drop some files here, or click to select files</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default FileUploader;
