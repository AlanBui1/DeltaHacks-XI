import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Suggestion {
  id: string;
  content: string;
  section: string;
  impact: "high" | "medium" | "low";
}

interface SuggestionsListProps {
  suggestions?: Suggestion[];
  onApply?: (suggestion: Suggestion) => void;
  onDismiss?: (suggestion: Suggestion) => void;
}

const defaultSuggestions: Suggestion[] = [
  {
    id: "1",
    content: "Add quantifiable metrics to your project outcomes",
    section: "Projects",
    impact: "high",
  },
  {
    id: "2",
    content:
      "Include relevant technical skills mentioned in the job description",
    section: "Skills",
    impact: "medium",
  },
  {
    id: "3",
    content: "Highlight leadership experience in your work history",
    section: "Experience",
    impact: "high",
  },
];

const SuggestionsList = ({
  suggestions = defaultSuggestions,
  onApply = () => {},
  onDismiss = () => {},
}: SuggestionsListProps) => {
  return (
    <Card className="w-full h-[400px] bg-white p-4">
      <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
      <ScrollArea className="h-[320px] w-full">
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="p-4 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Section: {suggestion.section}
                  </p>
                  <p className="text-sm">{suggestion.content}</p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${getImpactColor(suggestion.impact)}`}
                    >
                      {suggestion.impact.charAt(0).toUpperCase() +
                        suggestion.impact.slice(1)}{" "}
                      Impact
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={() => onApply(suggestion)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Apply suggestion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => onDismiss(suggestion)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dismiss suggestion</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default SuggestionsList;
