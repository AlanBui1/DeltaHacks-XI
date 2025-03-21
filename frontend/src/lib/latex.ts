export type Education = {
  school: string;
  date: string;
  location: string;
  degree: string;
}

export type Project = {
  title: string;
  date: string;
  skills: string[];
  points: string[];
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  date: string;
  points: string[];
};

export type ResumeData = {
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  skills: {
    languages: string[],
    frameworks: string[],
    tools: string[],
    other: string[]
  };
};

export const skillToType: Record<string, "languages" | "frameworks" | "tools"> = {
  // Languages
  JavaScript: "languages",
  TypeScript: "languages",
  Python: "languages",
  Java: "languages",
  C: "languages",
  "C++": "languages",
  "C#": "languages",
  Ruby: "languages",
  PHP: "languages",
  Go: "languages",
  Rust: "languages",
  Swift: "languages",
  Kotlin: "languages",
  Dart: "languages",
  SQL: "languages",

  // Frameworks
  React: "frameworks",
  Angular: "frameworks",
  Vue: "frameworks",
  Svelte: "frameworks",
  "Next.js": "frameworks",
  "Nuxt.js": "frameworks",
  Express: "frameworks",
  Django: "frameworks",
  Flask: "frameworks",
  Spring: "frameworks",
  "Ruby on Rails": "frameworks",
  Laravel: "frameworks",
  "ASP.NET": "frameworks",
  FastAPI: "frameworks",

  // Tools
  Git: "tools",
  Docker: "tools",
  Kubernetes: "tools",
  Webpack: "tools",
  Babel: "tools",
  ESLint: "tools",
  Prettier: "tools",
  Jenkins: "tools",
  CircleCI: "tools",
  TravisCI: "tools",
  VSCode: "tools",
  IntelliJ: "tools",
  Postman: "tools",
  Figma: "tools",
};

export const skills = [
  ...Object.keys(skillToType),
  // Methodologies and Paradigms
  "Agile",
  "Scrum",
  "Kanban",
  "DevOps",
  "CI/CD",
  "TDD (Test-Driven Development)",
  "Microservices",
  "Event-Driven Architecture",

  // Libraries
  "Lodash",
  "Axios",
  "Moment.js",
  "Tailwind CSS",
  "Bootstrap",
  "jQuery",

  // Platforms
  "AWS",
  "Azure",
  "Google Cloud Platform (GCP)",
  "Heroku",
  "Netlify",
  "Vercel",
  "Firebase",

  // Data-related
  "GraphQL",
  "REST APIs",
  "Kafka",
  "Redis",
  "Elasticsearch",
  "RabbitMQ",

  // Testing
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Selenium",
  "Puppeteer",

  // Miscellaneous
  "Nginx",
  "Apache",
  "Linux",
  "Terraform",
  "Ansible",
  "Chef",
  "Puppet",
  "Cohere",
  "Voiceflow",
  "Node.js"
];

export function convertToLatex(data: ResumeData, name: string, number: string, email: string, linkedin: string, github: string) {
  console.log(data)


  return `
  %-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}


%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING----------
% \\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
%   \\textbf{\\href{http://sourabhbajaj.com/}{\\Large Sourabh Bajaj}} & Email : \\href{mailto:sourabh@sourabhbajaj.com}{sourabh@sourabhbajaj.com}\\\\
%   \\href{http://sourabhbajaj.com/}{http://www.sourabhbajaj.com} & Mobile : +1-123-456-7890 \\\\
% \\end{tabular*}

\\begin{center}
    \\textbf{\\Huge \\scshape ${name}} \\\\ \\vspace{1pt}
    \\small ${number} $|$ \\href{mailto:${email}}{\\underline{${email}}} $|$ 
    \\href{https://${linkedin}}{\\underline{${linkedin}}} $|$
    \\href{https://${github}}{\\underline{${github}}}
\\end{center}


%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    ${data.educations.map((ed) =>
    `\\resumeSubheading
    {${ed.school.replace("&", "\\&").replace("$", "\\$")}}{${ed.location.replace("&", "\\&").replace("$", "\\$")}}
    {${ed.degree.replace("&", "\\&").replace("$", "\\$")}}{${ed.date.replace("&", "\\&").replace("$", "\\$")}}`).join("\n")}
  \\resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart

  ${data.experiences.map((exp) =>
    `\\resumeSubheading
        {${exp.title.replace("&", "\\&").replace("$", "\\$")}}{${exp.date.replace("&", "\\&").replace("$", "\\$")}}
        {${exp.company.replace("&", "\\&").replace("$", "\\$")}}{${exp.location.replace("&", "\\&").replace("$", "\\$")}}
        \\resumeItemListStart
          ${exp.points.map((pt) => `\\resumeItem{${pt.replace("&", "\\&").replace("$", "\\$")}}`).join("\n")}
        \\resumeItemListEnd`).join("\n")}

  \\resumeSubHeadingListEnd


%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
      ${data.projects.map((proj) =>
      `\\resumeProjectHeading
          {\\textbf{${proj.title.replace("&", "\\&").replace("$", "\\$")}} $|$ \\emph{${proj.skills.map((skill) => skill.replace("&", "\\&").replace("$", "\\$")).join(", ")}}}{${proj.date.replace("&", "\\&").replace("$", "\\$")}}
          \\resumeItemListStart
            ${proj.points.map((pt) => `\\resumeItem{${pt.replace("&", "\\&").replace("$", "\\$")}}\n`).join("\n")}
          \\resumeItemListEnd`).join("\n")}
    \\resumeSubHeadingListEnd



%
%-----------PROGRAMMING SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: ${data.skills.languages.map((lang) => lang.replace("&", "\\&").replace("$", "\\$")).join(", ")}} \\\\
     \\textbf{Frameworks}{: ${data.skills.frameworks.map((fw) => fw.replace("&", "\\&").replace("$", "\\$")).join(", ")}} \\\\
     \\textbf{Developer Tools}{: ${data.skills.tools.map((tool) => tool.replace("&", "\\&").replace("$", "\\$")).join(", ")}} \\\\
     \\textbf{Other}{: ${data.skills.other.map((other) => other.replace("&", "\\&").replace("$", "\\$")).join(", ")}}
    }}
 \\end{itemize}


%-------------------------------------------
\\end{document}

  `
}