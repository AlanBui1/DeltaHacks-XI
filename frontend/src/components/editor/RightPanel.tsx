import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface RightPanelProps {
  jobDescription?: string;
  onAnalyze?: () => void;
  isAnalyzing?: boolean;
}

const RightPanel = ({
  jobDescription = "",
  onAnalyze = () => {},
  isAnalyzing = false,
}: RightPanelProps) => {
  return (
    <div className="w-[400px] h-full bg-gray-50 p-4 flex flex-col gap-4">
      <Card className="p-4 bg-white">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <textarea
          className="w-full h-[200px] p-3 border rounded-md resize-none"
          placeholder="Paste the job description here..."
          defaultValue={jobDescription}
        />
        <div className="mt-4">
          <Button className="w-full" onClick={onAnalyze} disabled={isAnalyzing}>
            <Wand2 className="mr-2 h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
          </Button>
        </div>
      </Card>

    </div>
  );
};

export default RightPanel;
