import React, { Dispatch, SetStateAction, useState }  from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ResumeForm, { ResumeSection } from "./ResumeForm";
import PDFPreviewPanel from "./PDFPreviewPanel";
import OptimizationPanel from "./OptimizationPanel";
import { Experience, Project, ResumeData } from "@/lib/latex";

interface EditorLayoutProps {
  defaultSizes?: number[];
  onPanelResize?: (sizes: number[]) => void;
  localSections: ResumeSection[];
  setLocalSections: Dispatch<SetStateAction<ResumeSection[]>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  number: string;
  setNumber: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  linkedin: string;
  setLinkedin: Dispatch<SetStateAction<string>>;
  github: string;
  setGithub: Dispatch<SetStateAction<string>>;
  pdfData: string;
  onAnalyze: (desc: string) => void;
  suggestions: any;
  onApplySuggestion: any;
  moveUp: any;
  isAnalyzing: boolean;
};

const EditorLayout: React.FC<EditorLayoutProps> = ({
  defaultSizes = [25, 50, 25],
  onPanelResize = () => {},
  localSections,
  setLocalSections,
  name,
  setName,
  number,
  setNumber,
  email,
  setEmail,
  linkedin,
  setLinkedin,
  github,
  setGithub,
  pdfData,
  onAnalyze,
  suggestions,
  onApplySuggestion,
  moveUp,
  isAnalyzing
}) => {
  const [jobDescript, setJobDescription] = useState("");
  return (
    <div className="h-[calc(100vh-60px)] bg-gray-100">
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={onPanelResize}
        className="h-full"
      >
        {/* Left Panel - Resume Form */}
        <ResizablePanel defaultSize={defaultSizes[0]} minSize={20}>
          <ResumeForm localSections={localSections} setLocalSections={setLocalSections} name={name} setName={setName} number={number} setNumber={setNumber} email={email} setEmail={setEmail} linkedin={linkedin} setLinkedin={setLinkedin} github={github} setGithub={setGithub} moveUp={moveUp}/>
        </ResizablePanel>

        <ResizableHandle />

        {/* Center Panel - PDF Preview */}
        <ResizablePanel defaultSize={defaultSizes[1]} minSize={30}>
          <PDFPreviewPanel pdfData={pdfData} />
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel - Optimization */}
        <ResizablePanel defaultSize={defaultSizes[2]} minSize={20}>
          <OptimizationPanel 
            jobDescription={jobDescript} 
            onJobDescriptionChange={(newValue) => {setJobDescription(newValue)}}
            onAnalyze={onAnalyze}
            suggestions={suggestions}
            onApplySuggestion={onApplySuggestion}
            isAnalyzing={isAnalyzing}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorLayout;
