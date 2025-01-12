"use client";

import React, { useState } from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import VersionControlBar from "@/components/editor/VersionControlBar";
import { convertToLatex, Experience, Project, ResumeData, skills, skillToType } from "@/lib/latex";
import { ResumeSection } from "@/components/editor/ResumeForm";
import VoiceflowWidget from "@/components/editor/VoiceFlow";
import Suggestion from "@/components/editor/OptimizationPanel"
import pdfToText from "react-pdftotext";

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
        title: "Resume Reviewer",
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

  const [isImporting, setIsImporting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const dataToSections: ((data: ResumeData) => ResumeSection[]) = (data) => {
    return [
      {
        id: "education",
        title: "Education",
        type: "education",
        entries: data.educations.map((ed, i) => ({
          id: `ed${i}`,
          title: ed.school,
          company: ed.degree,
          location: ed.location,
          date: ed.date,
          bulletPoints: [],
          display: true
        }))
      },
      {
        id: "experience",
        title: "Experience",
        type: "experience",
        entries: data.experiences.map((exp, i) => ({
          id: `exp${i}`,
          title: exp.title,
          company: exp.company,
          location: exp.location,
          date: exp.date,
          bulletPoints: exp.points,
          display: true
        })),
      },
      {
        id: "projects",
        title: "Projects",
        type: "project",
        entries: data.projects.map((proj, i) => ({
          id: `proj${i}`,
          title: proj.title,
          date: proj.date,
          bulletPoints: proj.points,
          display: true
        })),
      },
      {
        id: "skills",
        title: "Skills",
        type: "skill",
        entries: [...data.skills.languages, ...data.skills.frameworks, ...data.skills.tools, ...data.skills.other].map((skill, i) => ({
          id: `skill${i}`,
          title: skill,
          date: "",
          bulletPoints: [],
          display: true
        }))
      }
    ]
  };

  const handleImport = async (file: File) => {
    setIsImporting(true);
    const text = await pdfToText(file);
    console.log("step 2")
    const resumeRes = await fetch("https://deltahacks-xi-fjvz.onrender.com/api/extract-resume-data/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text
      })
    });

    const resumeData: ResumeData & { name: string, email: string | undefined, number: string | undefined, github: string | undefined, linkedin: string | undefined } = await resumeRes.json();

    setName(resumeData.name);
    setEmail(resumeData.email ?? "");
    setNumber(resumeData.number ?? "");
    setGithub(resumeData.github ?? "");
    setLinkedin(resumeData.linkedin ?? "");
    setLocalSections(dataToSections(resumeData));

    setIsImporting(false);
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

    // console.log(latex)

    const pdfFile = await fetch("https://deltahacks-xi-fjvz.onrender.com/api/render-pdf/", {
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
    setIsAnalyzing(true);
    const skills = localSections[3].entries.map((skill) => skill.title);
    const reorderRes = await fetch("https://deltahacks-xi-fjvz.onrender.com/api/reorder-skills/", {
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

    setIsAnalyzing(false);
  };

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [pdfFile, setPdfFile] = useState<File | null>(null);

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

  const moveUp = (type: string, entryId: string, idx: number) => {
    if (idx === 0) return;

    const newArray = [];

    for (let i in localSections){
      let curSection = localSections[i]
      if (curSection['id'] === type){
        for (let j in curSection['entries']){
          if (curSection['entries'][j]['id'] === entryId){

            [curSection['entries'][j]['bulletPoints'][idx], curSection['entries'][j]['bulletPoints'][idx-1]] = [curSection['entries'][j]['bulletPoints'][idx-1], curSection['entries'][j]['bulletPoints'][idx]];
          }
        }
      }

      newArray.push(localSections[i])
    }

    setLocalSections(newArray);
  }

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <VersionControlBar
        onVersionChange={handleVersionChange}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
        onRender={handleRender}
        isImporting={isImporting}
      />
      <div className="flex-1">
        <EditorLayout
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
          onApplySuggestion={onApplySuggestion}
          moveUp ={moveUp}  
          pdfData={pdfData}
          isAnalyzing={isAnalyzing}  />
      </div>
      <VoiceflowWidget></VoiceflowWidget>
    </div>
  );
};

export default EditorPage;