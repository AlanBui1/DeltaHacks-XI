import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LoaderCircle, Wand2 } from "lucide-react";

interface Suggestion {
  id: string;
  section: string;
  original: string;
  improved: string;
  reason: string;
}

interface OptimizationPanelProps {
  jobDescription?: string;
  suggestions?: Suggestion[];
  onJobDescriptionChange?: (description: string) => void;
  onApplySuggestion?: (suggestion: Suggestion) => void;
  onAnalyze: (description: string) => void;
  isAnalyzing: boolean;
}

const defaultSuggestions: Suggestion[] = [
  {
    id: "1",
    section: "Experience",
    original: "Led development of key features",
    improved: "Spearheaded development of mission-critical features",
    reason: "Stronger leadership verb and emphasis on importance",
  },
  {
    id: "2",
    section: "Skills",
    original: "JavaScript, React",
    improved: "JavaScript, React, Redux, TypeScript",
    reason: "Added relevant technologies mentioned in job description",
  },
  {
    id: "3",
    section: "Projects",
    original: "Built scalable architecture",
    improved: "Architected and implemented scalable cloud-based solution",
    reason: "More specific technical implementation details",
  },
];

const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  jobDescription = "",
  suggestions = defaultSuggestions,
  onJobDescriptionChange = () => {},
  onApplySuggestion = () => {},
  onAnalyze,
  isAnalyzing
}) => {
  const [desc, setDesc] = useState("");

  const analyze = () => {
    onAnalyze(desc);
  };

  return (
    <Card className="w-full h-full bg-white flex flex-col overflow-hidden rounded-none">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <Textarea
          placeholder="Paste the job description here to get AI-powered suggestions..."
          className="min-h-[200px]"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button className="w-full mt-4" onClick={analyze}>
          <Wand2 className="h-4 w-4 mr-2" />
          Analyze & Optimize
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <h3 className="text-lg font-semibold p-4 pb-2">Suggestions</h3>
        <ScrollArea className="h-[calc(100%-2.5rem)] px-4">
          <div className="space-y-4 pb-4">
            {isAnalyzing && <LoaderCircle className="animate-spin" />}
            {suggestions.map((suggestion) => (
              <Card
                key={suggestion.id}
                className="p-4 border-l-4 border-l-blue-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    {suggestion.section}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onApplySuggestion(suggestion)}
                  >
                    Apply
                  </Button>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Original:</div>
                    <div className="text-sm">{suggestion.original}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Improved:</div>
                    <div className="text-sm font-medium text-blue-600">
                      {suggestion.improved}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Reason:</div>
                    <div className="text-sm">{suggestion.reason}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default OptimizationPanel;
