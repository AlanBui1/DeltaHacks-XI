import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResumeForm from "./ResumeForm";
import PDFPreviewPanel from "./PDFPreviewPanel";
import OptimizationPanel from "./OptimizationPanel";

interface EditorLayoutProps {
  defaultSizes?: number[];
  onPanelResize?: (sizes: number[]) => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  defaultSizes = [25, 50, 25],
  onPanelResize = () => {},
}) => {
  return (
    <div className="h-full bg-gray-100">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={onPanelResize}
        className="h-full"
      >
        {/* Left Panel - Resume Form */}
        <ResizablePanel defaultSize={defaultSizes[0]} minSize={20}>
          <ResumeForm />
        </ResizablePanel>

        <ResizableHandle />

        {/* Center Panel - PDF Preview */}
        <ResizablePanel defaultSize={defaultSizes[1]} minSize={30}>
          <PDFPreviewPanel />
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel - Optimization */}
        <ResizablePanel defaultSize={defaultSizes[2]} minSize={20}>
          <OptimizationPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorLayout;
