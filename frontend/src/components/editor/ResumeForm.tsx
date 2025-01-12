import React, { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BulletPointEditor from "./BulletPointEditor";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface EntryFields {
  id: string;
  title: string;
  company?: string;
  location?: string;
  date: string;
  bulletPoints: string[];
  display: boolean;
}

export interface ResumeSection {
  id: string;
  title: string;
  type: "education" | "experience" | "project" | "skill";
  entries: EntryFields[];
}

interface ResumeFormProps {
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
  onSectionUpdate?: (sections: ResumeSection[]) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  localSections,
  setLocalSections,
  onSectionUpdate = () => {},
  name,
  setName,
  number,
  setNumber,
  email,
  setEmail,
  linkedin,
  setLinkedin,
  github,
  setGithub
}) => {

  const addEntry = (sectionId: string) => {
    const section = localSections.find((s) => s.id === sectionId);
    if (!section) return;

    const newEntry: EntryFields = {
      id: `entry-${Date.now()}`,
      title: "",
      date: "",
      bulletPoints: section.type === "skill" ? [] : [""],
      display: true
    };

    const updatedSections = localSections.map((s) =>
      s.id === sectionId ? { ...s, entries: [...s.entries, newEntry] } : s,
    );

    setLocalSections(updatedSections);
    onSectionUpdate(updatedSections);
  };

  const updateEntry = (
    sectionId: string,
    entryId: string,
    updatedEntry: EntryFields,
  ) => {
    const updatedSections = localSections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          entries: section.entries.map((entry) =>
            entry.id === entryId ? { ...updatedEntry, id: entry.id } : entry,
          ),
        };
      }
      return section;
    });

    setLocalSections(updatedSections);
    onSectionUpdate(updatedSections);
  };

  const deleteEntry = (sectionId: string, entryId: string) => {
    const updatedSections = localSections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          entries: section.entries.filter((entry) => entry.id !== entryId),
        };
      }
      return section;
    });
    setLocalSections(updatedSections);
    onSectionUpdate(updatedSections);
  };

  return (
    <div className="bg-white flex flex-col gap-4 h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Info</h3>
            <div className="flex items-center gap-x-5">
              <Label htmlFor="name" className="w-24">Name</Label>
              <Input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="John Doe"
                id="name"
              />
            </div>
            <div className="flex items-center gap-x-5">
              <Label htmlFor="number" className="w-24">Number</Label>
              <Input
                value={number}
                onChange={(e) =>
                  setNumber(e.target.value)
                }
                placeholder="123-456-7890"
                id="number"
              />
            </div>
            <div className="flex items-center gap-x-5">
              <Label htmlFor="email" className="w-24">Email</Label>
              <Input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="johndoe@email.com"
                id="email"
              />
            </div>
            <div className="flex items-center gap-x-5">
              <Label htmlFor="linkedin" className="w-24">LinkedIn</Label>
              <Input
                value={linkedin}
                onChange={(e) =>
                  setLinkedin(e.target.value)
                }
                placeholder="linkedin.com/in/johndoe"
                id="linkedin"
              />
            </div>
            <div className="flex items-center gap-x-5">
              <Label htmlFor="github" className="w-24">GitHub</Label>
              <Input
                value={github}
                onChange={(e) =>
                  setGithub(e.target.value)
                }
                placeholder="github.com/johndoe"
                id="github"
              />
            </div>
          </div>
          {localSections.map((section) => (
            <div key={section.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addEntry(section.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add {section.type === "skill" ? "Skill" : section.type}
                </Button>
              </div>

              {section.entries.map((entry) => (
                <BulletPointEditor
                  key={entry.id}
                  entry={entry}
                  type={section.type}
                  onChange={(updatedEntry) =>
                    updateEntry(section.id, entry.id, updatedEntry)
                  }
                  onDelete={() => deleteEntry(section.id, entry.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResumeForm;
