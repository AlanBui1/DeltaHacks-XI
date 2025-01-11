import React from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import VersionControlBar from "@/components/editor/VersionControlBar";
import { ResumeData } from "@/lib/latex";

interface EditorPageProps {}

const EditorPage: React.FC<EditorPageProps> = () => {
  const handleVersionChange = (version: string) => {
    console.log("Version changed:", version);
  };

  const handleSave = () => {
    console.log("Saving resume...");
  };

  const handleExport = () => {
    console.log("Exporting resume...");
  };

  const handleImport = () => {
    console.log("Importing resume...");
  };

  const handleHistory = () => {
    console.log("Opening history...");
  };

  const handlePanelResize = (sizes: number[]) => {
    console.log("Panels resized:", sizes);
  };

  const data: ResumeData = {
    projects: [],
    experiences: [],
    skills: []
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <VersionControlBar
        onVersionChange={handleVersionChange}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onHistory={handleHistory}
      />
      <div className="flex-1">
        <EditorLayout onPanelResize={handlePanelResize} resumeData={data} />
      </div>
    </div>
  );
};

export default EditorPage;