from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from pylatex import Document

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
        skills = skills.strip().split(', ')

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
        latex_text = request.data.get('latex')

        doc = Document()
        doc.append(latex_text)

        pdf_bytes = doc.dumps_pdf()

        return Response({
            'Content-Type': 'application/pdf',
            'file':  pdf_bytes
        }, status=status.HTTP_200_OK)