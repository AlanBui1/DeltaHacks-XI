"use client";

import React, { useState } from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import VersionControlBar from "@/components/editor/VersionControlBar";
import { Experience, Project, ResumeData } from "@/lib/latex";
import { ResumeSection } from "@/components/editor/ResumeForm";

interface EditorPageProps {}

const defaultSections: ResumeSection[] = [
  {
    id: "experience",
    title: "Experience",
    type: "experience",
    entries: [
      {
        id: "exp1",
        title: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        date: "2020-Present",
        bulletPoints: [
          "Led development of core platform features",
          "Managed team of 5 developers",
        ],
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    type: "project",
    entries: [
      {
        id: "proj1",
        title: "E-commerce Platform",
        date: "2023",
        bulletPoints: [
          "Built scalable architecture using React and Node.js",
          "Implemented payment processing system",
        ],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    type: "skill",
    entries: [
      { id: "skill1", title: "JavaScript", date: "", bulletPoints: [] },
      { id: "skill2", title: "React", date: "", bulletPoints: [] },
    ],
  },
];

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

  // const [data, setData] = useState<ResumeData>({
  //   projects: [],
  //   experiences: [],
  //   skills: []
  // });

  // const updateProjects = (projs: Project[]) => {
  //   setData((data) => {
  //     console.log("hey!", data)
  //     return {...data, projects: projs};
  //   });
  //   console.log("setting data");
  // };

  // const updateExperiences = (exps: Experience[]) => {
  //   setData({...data, experiences: exps})
  // }

  // const updateSkills = (skills: string[]) => {
  //   setData({...data, skills})
  // }

  const [localSections, setLocalSections] = useState<ResumeSection[]>(defaultSections);

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
        <EditorLayout onPanelResize={handlePanelResize} localSections={localSections} setLocalSections={setLocalSections}  />
      </div>
    </div>
  );
};

export default EditorPage;