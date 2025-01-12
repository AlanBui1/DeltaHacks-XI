import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

interface PDFPreviewPanelProps {
  pdfUrl?: string;
  onDownload?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  zoomLevel?: number;
  pdfData: string | null;
}

const PDFPreviewPanel: React.FC<PDFPreviewPanelProps> = ({
  pdfUrl = "https://images.unsplash.com/photo-1706018133345-0f26c6a9a658",
  onDownload = () => {},
  onZoomIn = () => {},
  onZoomOut = () => {},
  zoomLevel = 100,
  pdfData
}) => {
  return (
    <Card className="w-full h-full bg-white flex flex-col rounded-none">
      {/* Preview Controls */}
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resume Preview</h3>
      </div>

      {/* PDF Preview Area */}
      {pdfData ? 
        <object data={pdfData} type="application/pdf" className="w-full h-full" />
      :
        <p className="ml-2 mt-2 italic text-center">Click Render Resume to see your resume!</p>
      }
    </Card>
  );
};

export default PDFPreviewPanel;
