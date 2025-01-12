import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "../ui/checkbox";
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

interface BulletPointEditorProps {
  entry: EntryFields;
  onChange: (entry: EntryFields) => void;
  onDelete: () => void;
  type: "education" | "experience" | "project" | "skill";
}

const input1Name = {
  education: "School",
  experience: "Job Title",
  project: "Project Name"
};

const input3Name = {
  education: "Degree",
  experience: "Company"
};

const BulletPointEditor: React.FC<BulletPointEditorProps> = ({
  entry,
  onChange,
  onDelete,
  type,
}) => {
  const addBulletPoint = () => {
    onChange({
      ...entry,
      bulletPoints: [...entry.bulletPoints, ""],
    });
  };

  const updateBulletPoint = (index: number, content: string) => {
    const newBulletPoints = [...entry.bulletPoints];
    newBulletPoints[index] = content;
    onChange({
      ...entry,
      bulletPoints: newBulletPoints,
    });
  };

  const deleteBulletPoint = (index: number) => {
    onChange({
      ...entry,
      bulletPoints: entry.bulletPoints.filter((_, i) => i !== index),
    });
  };

  if (type === "skill") {
    return (
      <div className="flex gap-2 items-center">
        <Input
          value={entry.title}
          onChange={(e) => onChange({ ...entry, title: e.target.value })}
          placeholder="Enter skill..."
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="p-4 mb-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            value={entry.title}
            onChange={(e) => onChange({ ...entry, title: e.target.value })}
            placeholder={input1Name[type]}
          />
          <Input
            value={entry.date}
            onChange={(e) => onChange({ ...entry, date: e.target.value })}
            placeholder="Date"
          />
          {(type === "experience" || type === "education") && (
            <>
              <Input
                value={entry.company}
                onChange={(e) =>
                  onChange({ ...entry, company: e.target.value })
                }
                placeholder={input3Name[type]}
              />
              <Input
                value={entry.location}
                onChange={(e) =>
                  onChange({ ...entry, location: e.target.value })
                }
                placeholder="Location"
              />
            </>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-500">Bullet Points</div>
          {entry.bulletPoints.map((point, index) => (
            <div key={index} className="flex gap-2">
              <GripVertical className="h-5 w-5 text-gray-400 mt-2" />
              <Textarea
                value={point}
                onChange={(e) => updateBulletPoint(index, e.target.value)}
                placeholder="Enter bullet point..."
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteBulletPoint(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={addBulletPoint}
            className="w-[200px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bullet Point
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete {type === "education" ? "Education" : (type === "experience" ? "Experience" : "Project")}
          </Button>
        </div>
        {type === "project" &&
          <div className="flex items-center space-x-2">
            <Checkbox id="display" checked={entry.display} onCheckedChange={(v) => onChange({...entry, display: v.valueOf() as boolean})} />
            <Label htmlFor="display" className="text-sm">Display</Label>
          </div>
        }
      </div>
    </Card>
  );
};

export default BulletPointEditor;
