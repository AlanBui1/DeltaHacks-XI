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
        <div className="text-lg font-semibold">Resume Preview</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center">{zoomLevel}%</span>
          <Button variant="outline" size="icon" onClick={onZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Preview Area */}
      <ScrollArea className="flex-1 p-4">
        <div
          className="w-full flex justify-center"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <div className="w-[475px] aspect-[1/1.414] bg-white shadow-lg">
            {pdfData ? 
              <object data={pdfData} type="application/pdf" />
            :
              <p className="ml-2 mt-2">Click Render Resume to see the resume!</p>
            }
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default PDFPreviewPanel;
