import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ResumeSection from "./ResumeSection";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface LeftPanelProps {
  sections?: Section[];
  onSectionAdd?: () => void;
  onSectionReorder?: (startIndex: number, endIndex: number) => void;
}

const defaultSections: Section[] = [
  {
    id: "1",
    title: "Experience",
    content: "Work experience details...",
  },
  {
    id: "2",
    title: "Education",
    content: "Educational background...",
  },
  {
    id: "3",
    title: "Skills",
    content: "Technical and soft skills...",
  },
  {
    id: "4",
    title: "Projects",
    content: "Notable projects and achievements...",
  },
];

const LeftPanel = ({
  sections = defaultSections,
  onSectionAdd = () => {},
  onSectionReorder = () => {},
}: LeftPanelProps) => {
  const [draggedItem, setDraggedItem] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => (e: React.DragEvent) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (index: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedItem === null) return;
    if (draggedItem !== index) {
      onSectionReorder(draggedItem, index);
      setDraggedItem(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="w-[400px] h-full bg-gray-50 border-r border-gray-200 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resume Sections</h2>
        <Button
          onClick={onSectionAdd}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Section
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="space-y-4 pr-4">
          {sections.map((section, index) => (
            <div key={section.id} onDragOver={(e) => handleDragOver(index)(e)}>
              <ResumeSection
                title={section.title}
                content={section.content}
                onDragStart={handleDragStart(index)}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftPanel;
