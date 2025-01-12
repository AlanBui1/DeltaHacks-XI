from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
import requests
import subprocess
import os


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
    
    
        
class ReorderSkills(APIView):
    def post(self, request):
        all_skills = getSkills()

        skills = request.data.get('skills')

        description = request.data.get('description')
        description = description.strip()

        related_skills_freq = getMatchingWords(description, all_skills)
        for skill in skills:
            if skill not in related_skills_freq:
                related_skills_freq[skill] = 0
        
        skills.sort(key = lambda word: -related_skills_freq[word])

        return Response({
            'skills': skills
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