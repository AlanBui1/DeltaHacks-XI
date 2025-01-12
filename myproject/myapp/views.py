from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
import requests
import subprocess
import os
import cohere
import json

def talkToCohere(system_message, message, schema=None):
    co = cohere.ClientV2(api_key="D8KMKqvP4xTS113bqJwzyKTY4nFABXWH1IQDESHW")

    # Add the messages
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": message},
    ]

    # Generate the response
    if schema is None:
        response = co.chat(model="command-r-plus-08-2024", messages=messages)
    else:
        response = co.chat(model="command-r-plus-08-2024", messages=messages, response_format={"type": "json_object", "json_schema": schema})

    return response.message.content[0].text

def getSkills():
    with open('myapp/skills.txt') as inFile:
        skills = {line.strip(): 1 for line in inFile.readlines()}
    return skills

def getMatchingWords(inp: str, skills):
    #returns the words in inp that are in skills
    #where inp is a string and skills is a list of strings

    total_freq = {}
    for word in skills:
        total_freq[word] = inp.count(word)

    skills = [i for i in skills]
    for i in range(len(skills)):
        for j in range(i+1, len(skills)):
            word1 = skills[i]
            word2 = skills[j]
            
            if word1 in word2:
                total_freq[word1] -= total_freq[word2]
            if word2 in word1:
                total_freq[word2] -= total_freq[word1]

    freq = {}

    for word in total_freq:
        if total_freq[word] != 0:
            freq[word] = total_freq[word]

    return freq



class GetKeywords(APIView):
    def post(self, request):
        skills = getSkills()
        description = request.data.get('description', '').strip().split()

        freq = getMatchingWords(description, skills)

        return Response({
            'keywords': [i for i in freq],
            'frequency': freq
            }, status=status.HTTP_200_OK)
    
    def get(self, request):
        skills = [i for i in self.getSkills()]

        return Response({
            'keywords': skills
        }, status=status.HTTP_200_OK)
    
class ExtractResumeData(APIView):
    def post(self, request):
        text = request.data.get('text')

        response = talkToCohere("""You are a resume reader. You will be given a resume in plain text and should return it in the desired format. Don't add any additional info. Give dates in Month Year format. Use date ranges wherever possible (e.g., Jan. 2024 -- Present).""",
                     f"Respond in JSON format. Here's the resume:\n\n{text}",
                     {
  "type": "object",
  "properties": {
    "projects": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "date": { "type": "string", "format": "date" },
          "skills": {
            "type": "array",
            "items": { "type": "string" }
          },
          "points": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["title", "date", "skills", "points"]
      }
    },
    "experiences": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "company": { "type": "string" },
          "location": { "type": "string" },
          "date": { "type": "string", "format": "date" },
          "points": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["title", "company", "location", "date", "points"]
      }
    },
    "educations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "school": { "type": "string" },
          "date": { "type": "string", "format": "date" },
          "location": { "type": "string" },
          "degree": { "type": "string" }
        },
        "required": ["school", "date", "location", "degree"]
      }
    },
    "skills": {
      "type": "object",
      "properties": {
        "languages": {
          "type": "array",
          "items": { "type": "string" }
        },
        "frameworks": {
          "type": "array",
          "items": { "type": "string" }
        },
        "tools": {
          "type": "array",
          "items": { "type": "string" }
        },
        "other": {
          "type": "array",
          "items": { "type": "string" }
        }
      },
      "required": ["languages", "frameworks", "tools", "other"]
    }
  },
  "required": ["projects", "experiences", "educations", "skills"]
})
        
        return Response(json.loads(response), status=status.HTTP_200_OK)
        
class ReorderSkills(APIView):
    def post(self, request):
        all_skills = getSkills()

        skills = request.data.get('skills')

        description = request.data.get('description')
        description = description.strip()

        sections = request.data.get('localSections')

        related_skills_freq = getMatchingWords(description, all_skills)
        for skill in skills:
            if skill not in related_skills_freq:
                related_skills_freq[skill] = 0
        
        skills.sort(key = lambda word: -related_skills_freq[word])

        def formatBullets(s):
            ret = """## Task and Context
You are an assistant who is an expert at writing bullet points and interpreting job descriptions. 
You are given a job description and a series of bullet points. 

First, determine the key details of the job. This includes behavioural traits as well as technical skills.
Then, your task is to rewrite the bullet points to incorporate as many of the key details of the job description as possible.

Bullet points are given in the following format:

Section: {SECTION_NAME}
Bullets:
bullets listed with a newline for each bullet point

## Style Guide
Be professional. 
Try to write bullet points that highlight a task, action, and result WITHOUT introducing new details into the project. 
Incorporate key details from the job description if applicable.
Include a reason for the change with citations to the job description.

##### For each modification you would like to make, YOU MUST respond with the following format EXACTLY. DO NOT OUTPUT ANYTHING ELSE:

{
    id: {ID},
    section: {SECTION_NAME},
    original: {ORIGINAL_BULLET_POINT},
    improved: {IMPROVED_BULLET_POINT},
    reason: {REASON},
},



"""
            ret += f"### Job Description: {description}\n\n\n"

            SECTIONS = ['Education', 'Experience', 'Projects', 'Skills']
            for i in [1, 2]:
                for entry in s[i]['entries']:
                    curSection = SECTIONS[i]

                    ret += f"Section: {curSection}\n"
                    ret += "Bullets:\n"

                    for bullet in entry['bulletPoints']:
                        ret += f"{bullet}\n"
                    ret += "\n"
                
            return ret

        def getSystemMessage():
            """## Task and Context
You are an assistant who is an expert at writing bullet points and interpreting job descriptions. 
You are given a job description and a series of bullet points. 

First, determine the key details of the job. This includes behavioural traits as well as technical skills.
Then, your task is to rewrite the bullet points to incorporate as many of the key details of the job description as possible.

Bullet points are given in the following format:

Section: {SECTION_NAME}
Bullets:
bullets listed with a newline for each bullet point

## Style Guide
Be professional. 
Try to write bullet points that highlight a task, action, and result WITHOUT introducing new details into the project. 
Incorporate key details from the job description if applicable.
Include a reason for the change with citations to the job description.

##### For each modification you would like to make, YOU MUST respond with the following format EXACTLY. DO NOT OUTPUT ANYTHING ELSE:

{
    id: {ID},
    section: {SECTION_NAME},
    original: {ORIGINAL_BULLET_POINT},
    improved: {IMPROVED_BULLET_POINT},
    reason: {REASON},
},"""

        messageToPrompt = formatBullets(sections)
        systemMessageToPrompt = getSystemMessage()

        fromCohere = talkToCohere(systemMessageToPrompt, messageToPrompt)

        # print(fromCohere)

        changes = []

        for line in fromCohere.split('\n'):
            line = line.strip()
            if ':' in line:
                KEY = line[:line.index(':')]
                if KEY == "id":
                    changes.append({})
                VALUE = line[line.index(':')+2: len(line)-1]
                changes[-1][KEY] = VALUE
            

        return Response({
            'skills': skills,
            'changes': changes
        }, status=status.HTTP_200_OK)
    

class RenderPDF(APIView):
    def post(self, request):
        latex_text = request.body.decode("utf-8")

        with open("resume.tex", "w") as f:
            f.write(latex_text)

        cmd = ['pdflatex', '-interaction', 'nonstopmode', 'resume.tex']
        proc = subprocess.Popen(cmd)
        proc.communicate()

        retcode = proc.returncode
        if not retcode == 0:
            os.unlink('resume.pdf')
            raise ValueError('Error {} executing command: {}'.format(retcode, ' '.join(cmd))) 

        os.unlink('resume.tex')
        os.unlink('resume.log')

        with open("resume.pdf", "rb") as pdf_file:
            return HttpResponse(pdf_file.read(), content_type="application/pdf")