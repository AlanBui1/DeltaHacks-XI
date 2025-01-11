import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Download, ZoomIn, ZoomOut } from "lucide-react";

interface CenterPanelProps {
  pdfUrl?: string;
  zoomLevel?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onDownload?: () => void;
}

const CenterPanel = ({
  pdfUrl = "https://example.com/sample.pdf",
  zoomLevel = 100,
  onZoomIn = () => {},
  onZoomOut = () => {},
  onDownload = () => {},
}: CenterPanelProps) => {
  return (
    <div className="w-[712px] h-full bg-gray-100 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onZoomOut}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{zoomLevel}%</span>
          <Button
            variant="outline"
            size="icon"
            onClick={onZoomIn}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownload}
          className="flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Download PDF</span>
        </Button>
      </div>

      <Card className="flex-1 bg-white overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          {/* Placeholder for PDF viewer - in a real implementation, you'd use a PDF viewing library */}
          <div className="w-[595px] h-[842px] bg-white shadow-lg relative">
            {/* A4 size ratio container (595x842 pixels at 72 DPI) */}
            <div className="absolute inset-0 p-8">
              {/* Sample resume content structure */}
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-gray-600">Software Engineer</p>
                  <p className="text-sm text-gray-500">
                    john.doe@example.com | (555) 123-4567
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                    Experience
                  </h2>
                  <div className="text-sm space-y-4">
                    <div>
                      <p className="font-medium">
                        Senior Developer - Tech Corp
                      </p>
                      <p className="text-gray-600">2020 - Present</p>
                      <ul className="list-disc list-inside text-gray-700 mt-1">
                        <li>Led development of core platform features</li>
                        <li>Managed team of 5 developers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                    Education
                  </h2>
                  <div className="text-sm">
                    <p className="font-medium">BS in Computer Science</p>
                    <p className="text-gray-600">University Name, 2016-2020</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                    Skills
                  </h2>
                  <p className="text-sm text-gray-700">
                    JavaScript, React, Node.js, Python, SQL, AWS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CenterPanel;
