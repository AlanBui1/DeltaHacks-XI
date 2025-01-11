from django.urls import path
from .views import GetKeywords, ReorderSkills, RenderPDF

urlpatterns = [
    path('get-keywords/', GetKeywords.as_view(), name='get-keywords'),
    path('reorder-skills/', ReorderSkills.as_view(), name='reorder-skills'),
    path('render-pdf/', RenderPDF.as_view(), name='render-pdf')
]
