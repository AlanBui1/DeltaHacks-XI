import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Save, Download, Upload, History, ChevronDown, Cog, Loader, LoaderCircle } from "lucide-react";

interface VersionControlBarProps {
  currentVersion?: string;
  onVersionChange?: (version: string) => void;
  onSave?: () => void;
  onExport?: () => void;
  onImport?: (file: File) => void;
  onRender?: () => void;
  isImporting: boolean;
}

const VersionControlBar: React.FC<VersionControlBarProps> = ({
  currentVersion = "Version 1",
  onVersionChange = () => {},
  onSave = () => {},
  onExport = () => {},
  onImport = () => {},
  onRender = () => {},
  isImporting
}) => {
  const versions = [
    { id: "1", name: "Version 1" },
    { id: "2", name: "Version 2" },
    { id: "3", name: "Version 3" },
  ];

  return (
    <div className="w-full h-[60px] bg-white border-b flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold font-mono">Resume Reviewer</h1>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-between">
              {currentVersion}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {versions.map((version) => (
              <DropdownMenuItem
                key={version.id}
                onClick={() => onVersionChange(version.id)}
              >
                {version.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" onClick={onHistory}>
          <History className="h-4 w-4 mr-2" />
          History
        </Button> */}
      </div>
      <div className="flex items-center gap-2">
        {isImporting && <LoaderCircle className="animate-spin" />}

        <input type="file" id="import-pdf" className="hidden" accept=".pdf" onChange={(e) => onImport(e.target.files && e.target.files[0])} />
        
        <Button variant="outline" className="p-0">
          <label htmlFor="import-pdf" className="flex items-center p-4 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </label>
        </Button>
        
        <Button variant="default" onClick={onRender}>
          <Cog className="h-4 w-4 mr-2" />
          Render Resume
        </Button>
      </div>
      {/*
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div> */}
    </div>
  );
};

export default VersionControlBar;
