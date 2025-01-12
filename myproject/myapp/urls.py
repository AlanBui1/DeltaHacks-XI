from django.urls import path
from .views import GetKeywords, ReorderSkills, RenderPDF, ExtractResumeData

urlpatterns = [
    path('get-keywords/', GetKeywords.as_view(), name='get-keywords'),
    path('reorder-skills/', ReorderSkills.as_view(), name='reorder-skills'),
    path('render-pdf/', RenderPDF.as_view(), name='render-pdf'),
    path('extract-resume-data/', ExtractResumeData.as_view(), name='extract-resume-data')
]
