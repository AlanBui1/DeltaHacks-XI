# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory to /app
WORKDIR /app

# Install TeX Live (LaTeX) and other dependencies
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PATH="/root/texlive/bin/x86_64-linux:$PATH"

# Run Django server (or your app's entry point)
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]
