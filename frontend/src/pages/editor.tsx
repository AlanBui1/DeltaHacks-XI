"use client";

import React, { useState } from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import VersionControlBar from "@/components/editor/VersionControlBar";
import { convertToLatex, Experience, Project, ResumeData, skills, skillToType } from "@/lib/latex";
import { ResumeSection } from "@/components/editor/ResumeForm";
import VoiceflowWidget from "@/components/editor/VoiceFlow";
import Suggestion from "@/components/editor/OptimizationPanel"

interface EditorPageProps {}

const defaultSections: ResumeSection[] = [
  {
    id: "education",
    title: "Education",
    type: "education",
    entries: [
      {
        id: "ed1",
        title: "University of Waterloo",
        company: "Bachelor of Computer Science",
        location: "Waterloo, ON",
        date: "Sept. 2024 -- Present",
        bulletPoints: [],
        display: true
      },
    ],
  },
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
        date: "Feb. 2020 -- Present",
        bulletPoints: [
          "Led development of core platform features",
          "Managed team of 5 developers",
        ],
        display: true
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
        date: "June 2022 -- July 2023",
        bulletPoints: [
          "Built scalable architecture using React and Node.js",
          "Implemented payment processing system",
        ],
        display: true
      },
      {
        id: "proj2",
        title: "Resume Customizer",
        date: "Jan. 2025 -- Present",
        bulletPoints: [
          "Built resume customizer using React and Django",
          "Integrated with Cohere and Voiceflow",
        ],
        display: true
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    type: "skill",
    entries: [
      { id: "skill1", title: "JavaScript", date: "", bulletPoints: [], display: true },
      { id: "skill2", title: "React", date: "", bulletPoints: [], display: true },
      { id: "skill3", title: "TypeScript", date: "", bulletPoints: [], display: true },
      { id: "skill4", title: "Angular", date: "", bulletPoints: [], display: true },
      { id: "skill5", title: "Next.js", date: "", bulletPoints: [], display: true },
      { id: "skill6", title: "Python", date: "", bulletPoints: [], display: true },
      { id: "skill7", title: "C", date: "", bulletPoints: [], display: true },
      { id: "skill8", title: "C++", date: "", bulletPoints: [], display: true },
      { id: "skill9", title: "PyTorch", date: "", bulletPoints: [], display: true },
      { id: "skill10", title: "Git", date: "", bulletPoints: [], display: true },
    ],
  },
];

const EditorPage: React.FC<EditorPageProps> = () => {
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [suggestionData, setSuggestionData] = useState([]);

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

  const extractSkills = (text: string) => [...new Set(text.match(/[\w+.]*\w+/g))].filter((sk) => skills.includes(sk));

  const handleRender = async () => {
    const latex = convertToLatex({
      educations: localSections[0].entries.map((e) => ({
        school: e.title,
        degree: e.company,
        date: e.date,
        location: e.location,
      })),
      experiences: localSections[1].entries.map((e) => ({
        title: e.title,
        date: e.date,
        company: e.company,
        location: e.location,
        points: e.bulletPoints
      })),
      projects: localSections[2].entries.filter((e) => e.display).map((e) => ({
        title: e.title,
        date: e.date,
        points: e.bulletPoints,
        skills: extractSkills(e.bulletPoints.join("\n"))
      })),
      skills: {
        languages: localSections[3].entries.filter((en) => en.title in skillToType && skillToType[en.title] === "languages").map((e) => e.title),
        frameworks: localSections[3].entries.filter((en) => en.title in skillToType && skillToType[en.title] === "frameworks").map((e) => e.title),
        tools: localSections[3].entries.filter((en) => en.title in skillToType && skillToType[en.title] === "tools").map((e) => e.title),
        other: localSections[3].entries.filter((en) => !(en.title in skillToType)).map((e) => e.title),
      }
    }, name, number, email, linkedin, github);

    console.log(latex)

    const pdfFile = await fetch("http://127.0.0.1:8000/api/render-pdf/", {
      method: "POST",
      body: latex,
    });

    console.log(pdfFile);

    // TODO: process pdf file

    const pdfBytes = new Uint8Array(await pdfFile.arrayBuffer());
    let pdfBinary = "";

    for (let i = 0; i < pdfBytes.byteLength; i++) {
      pdfBinary += String.fromCharCode(pdfBytes[i]);
    }

    // console.log(window.btoa(pdfBinary));

    setPdfData(`data:application/pdf;base64,${window.btoa(pdfBinary)}`);
  };

  const handlePanelResize = (sizes: number[]) => {
    console.log("Panels resized:", sizes);
  };

  const handleAnalyze = async (description: string) => {
    const skills = localSections[3].entries.map((skill) => skill.title);
    const reorderRes = await fetch("http://127.0.0.1:8000/api/reorder-skills/", {
      method: "POST",
      body: JSON.stringify({
        skills,
        description,
        localSections
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await reorderRes.json();
    // console.log(data);
    setSuggestionData(data['changes']);



    const projectEntries = [...localSections[2].entries];
    
    // Sort projects
    // projectEntries.sort((a, b) => extractSkills(description).filter((s) => extractSkills(b.bulletPoints.join("\n")).includes(s)).length
    //                               - extractSkills(description).filter((s) => extractSkills(a.bulletPoints.join("\n")).includes(s)).length);

    setLocalSections((prev) => [
      ...localSections.slice(0, 2),
      {
        ...localSections[2],
        entries: projectEntries
      },
      {
        ...localSections[3],
        entries: data.skills.map((skill, i) => ({ id: `skill${i}`, title: skill, date: "", bulletPoints: [] }))
      }
    ]);
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

  const onApplySuggestion = (sug: any) => {
    const newArray = suggestionData.filter(function (ele) {
      return ele.id !== sug.id;
    });

    setSuggestionData(newArray);

    const getNewEntries = (originalEntries: any) => {
      const ret = [];

      for (let entry of originalEntries){
        for (let bullet in entry['bulletPoints']){
          entry['bulletPoints'][bullet] = entry['bulletPoints'][bullet].replace(sug.original, sug.improved)
        }
        ret.push(entry)
      }

      return ret;
    }

  

    setLocalSections([
      localSections[0],
      {
        ...localSections[1],
        entries: getNewEntries(localSections[1]['entries'])
      },
      {
        ...localSections[2],
        entries: getNewEntries(localSections[2]['entries'])
      },
      localSections[3]
    ]);
  }

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
        <EditorLayout 
          pdfData={pdfData} 
          onPanelResize={handlePanelResize} 
          localSections={localSections} 
          setLocalSections={setLocalSections} 
          name={name} 
          setName={setName} 
          number={number} 
          setNumber={setNumber} 
          email={email} 
          setEmail={setEmail} 
          linkedin={linkedin} 
          setLinkedin={setLinkedin} 
          github={github} 
          setGithub={setGithub}
          onAnalyze={handleAnalyze}
          suggestions={suggestionData}
          onApplySuggestion={onApplySuggestion}  />
      </div>
      <VoiceflowWidget></VoiceflowWidget>
    </div>
  );
};

export default EditorPage;