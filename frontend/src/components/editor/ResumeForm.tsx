import React, { Dispatch, SetStateAction } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BulletPointEditor from "./BulletPointEditor";

interface EntryFields {
  id: string;
  title: string;
  company?: string;
  location?: string;
  date: string;
  bulletPoints: string[];
}

export interface ResumeSection {
  id: string;
  title: string;
  type: "experience" | "project" | "skill";
  entries: EntryFields[];
}

interface ResumeFormProps {
  localSections: ResumeSection[];
  setLocalSections: Dispatch<SetStateAction<ResumeSection[]>>;
  onSectionUpdate?: (sections: ResumeSection[]) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  localSections,
  setLocalSections,
  onSectionUpdate = () => {},
}) => {

  const addEntry = (sectionId: string) => {
    const section = localSections.find((s) => s.id === sectionId);
    if (!section) return;

    const newEntry: EntryFields = {
      id: `entry-${Date.now()}`,
      title: "",
      date: "",
      bulletPoints: section.type === "skill" ? [] : [""],
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
    <div className="h-full bg-white p-4 flex flex-col gap-4">
      <ScrollArea className="flex-1">
        <div className="space-y-6">
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
