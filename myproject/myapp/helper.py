import io
import requests
from pylatex import Document

def generate_pdf(tex_file_name):
    # Read the LaTeX content from the .tex file
    with open(tex_file_name, 'r') as f:
        tex_content = f.read()

    # Create a Document object
    doc = Document()

    # Add the LaTeX content to the document
    doc.append(tex_content)

    # Generate PDF in memory
    pdf_bytes = doc.dumps_pdf()  # Generates the PDF as bytes
    return pdf_bytes