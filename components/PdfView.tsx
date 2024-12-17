"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({ url }: { url: string }) {
  const searchParams = useSearchParams();
  const documentName = searchParams.get("name"); 

  const [numPages, setNumPages] = useState<number>();
  const [inputPageNumber, setInputPageNumber] = useState<number>(1); 
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]); 

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();
      setFile(file);
    };

    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  const handleScrollToPage = (pageNum: number) => {
    if (pageRefs.current[pageNum - 1]) {
      pageRefs.current[pageNum - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    
  
    const pages = Array.from(container.querySelectorAll(".react-pdf__Page"));
    const visiblePage = pages.find(
      (page) =>
        page.getBoundingClientRect().top < window.innerHeight &&
        page.getBoundingClientRect().bottom > 0
    );
  
    if (visiblePage) {
      const pageIndex = pages.indexOf(visiblePage) + 1;
      setPageNumber(pageIndex);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center">
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="sticky top-0 z-50 w-full">
        <div className="relative flex items-center justify-center max-w-full overflow-auto py-6 bg-[#fcfcfc] border-b border-[#ddd]">

          <div className="absolute left-0 flex px-3">

            <button
              disabled={scale >= 1.5}
              onClick={() => { setScale(scale * 1.2); }}
              className=" text-[#555] bg-transparent mx-4">
              <ZoomInIcon strokeWidth={3} width={16} />
            </button>

            <button
              disabled={scale <= 0.75}
              onClick={() => setScale(scale / 1.2)}
              className="text-[#555] bg-transparent mx-4">
              <ZoomOutIcon strokeWidth={3} width={16}/>
            </button>

            <button
              onClick={() => setRotation((rotation + 90) % 360)}
              className="text-[#555] bg-transparent mx-4">
              <RotateCw strokeWidth={3} width={16}/>
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="number"
              value={inputPageNumber}
              onChange={(e) => {
                const pageNum = Number(e.target.value);
                if (pageNum > 0 && pageNum <= numPages!) {
                  setInputPageNumber(pageNum);
                  setPageNumber(pageNum); 
                  handleScrollToPage(pageNum);
                }
              }}
              className="border border-[#ccc] rounded-md w-16 text-center mx-2 bg-[#fcfcfc]"
              min={1}
              max={numPages}
            />
            <span>of {numPages}</span>
          </div>

          <div>
            <p className="font-semibold text-center text-[#252525]">{documentName}</p>
          </div>

          <div className="absolute right-4 text-[#555] text-sm px-4 py-2 rounded-xl">
            <p>Page<span className="mx-2 px-2 py-2 border-[#ddd] border rounded-md">{pageNumber}</span>of {numPages}</p>
          </div>


        </div>
      </div>

      {!file ? (
          <Loader2Icon className="animate-spin h-20 w-20 text-[#0062cc] mt-20" />
        ) : (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            >
          {Array.from(new Array(numPages), (el, index) => (
            <div ref={el => { if (el) pageRefs.current[index] = el; }} key={`page_${index + 1}`}>
              <Page
                className={`shadow-lg ${index > 0 ? 'mt-2' : ''}`}                 
                scale={scale}
                pageNumber={index + 1}
                rotate={rotation}
              />
            </div>
          ))}
          </Document>
        )}
    </div>
  );
}
export default PdfView;