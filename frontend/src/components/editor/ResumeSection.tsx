import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface ResumeSectionProps {
  title?: string;
  content?: string;
  isCollapsed?: boolean;
  onCollapse?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

const ResumeSection = ({
  title = "Experience",
  content = "Sample work experience details...",
  isCollapsed = false,
  onCollapse = () => {},
  onDragStart = () => {},
  onDragEnd = () => {},
}: ResumeSectionProps) => {
  const [isOpen, setIsOpen] = React.useState(!isCollapsed);

  const handleCollapse = () => {
    setIsOpen(!isOpen);
    onCollapse();
  };

  return (
    <Card className="w-[380px] bg-white mb-4 p-4">
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        className="cursor-move"
      >
        <Collapsible open={isOpen}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                onClick={handleCollapse}
              >
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className="space-y-4">
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                defaultValue={content}
                placeholder="Enter section content..."
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Add Entry
                </Button>
                <Button variant="outline" size="sm">
                  Clear
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  );
};

export default ResumeSection;
