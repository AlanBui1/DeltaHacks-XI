"use client";

import React, { useState } from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import VersionControlBar from "@/components/editor/VersionControlBar";
import { convertToLatex, Experience, Project, ResumeData } from "@/lib/latex";
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

  const handleRender = async () => {
    const latex = convertToLatex({
      experiences: defaultSections[0].entries.map((e) => ({
        title: e.title,
        date: e.date,
        company: e.company,
        location: e.location,
        points: e.bulletPoints
      })),
      projects: defaultSections[1].entries.map((e) => ({
        title: e.title,
        date: e.date,
        points: e.bulletPoints,
        skills: []
      })),
      skills: {
        languages: defaultSections[2].entries.filter((_, i) => i % 4 === 0).map((e) => e.title),
        frameworks: defaultSections[2].entries.filter((_, i) => i % 4 === 1).map((e) => e.title),
        tools: defaultSections[2].entries.filter((_, i) => i % 4 === 2).map((e) => e.title),
        other: defaultSections[2].entries.filter((_, i) => i % 4 === 3).map((e) => e.title),
      }
    }, name, number, email, linkedin, github);

    console.log(latex);
    // TODO: render PDF
  };

  const handlePanelResize = (sizes: number[]) => {
    console.log("Panels resized:", sizes);
  };

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

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
        onRender={handleRender}
      />
      <div className="flex-1">
        <EditorLayout onPanelResize={handlePanelResize} localSections={localSections} setLocalSections={setLocalSections} name={name} setName={setName} number={number} setNumber={setNumber} email={email} setEmail={setEmail} linkedin={linkedin} setLinkedin={setLinkedin} github={github} setGithub={setGithub}  />
      </div>
    </div>
  );
};

export default EditorPage;