# Sentiment Analysis Dashboard

This project is a full-stack application designed to perform real-time sentiment analysis on any given topic by fetching and analyzing comments from Reddit. It consists of a Python Flask backend that handles data-intensive tasks and a React frontend that provides a user-friendly dashboard for visualization.

The backend leverages the Python Reddit API Wrapper (PRAW) to search all of Reddit for relevant discussions and uses the Hugging Face Transformers library with the `distilbert-base-uncased-finetuned-sst-2-english` model to analyze the sentiment of the fetched comments. The frontend, built with React and Vite, communicates with the API and displays the aggregated sentiment data (Positive vs. Negative) in an intuitive bar chart using the Recharts library.

## Features

*   **Real-time Sentiment Analysis**: Input any topic to get an up-to-date sentiment snapshot from Reddit.
*   **Comprehensive Search**: Scans across all of Reddit (`r/all`) to find relevant posts.
*   **Interactive Dashboard**: A clean and simple interface for querying and viewing sentiment data.
*   **Data Visualization**: Sentiment results are displayed in a clear bar chart, showing the distribution of positive and negative comments.
*   ** decoupled Architecture**: A separate Flask API for processing and a React app for presentation, allowing for scalability and modularity.

## Project Structure

The repository is organized into two main components:

*   `sentiment-api/`: The Flask backend server. It exposes an API endpoint that receives a topic, fetches comments from Reddit using PRAW, performs sentiment analysis using the Transformers library, and returns the aggregated results.
*   `sentiment-dashboard/`: The React frontend application. This is the user interface where you can enter a topic, initiate the analysis, and view the results visualized in a chart.

## Setup and Installation

Follow these steps to get the application running on your local machine.

### Prerequisites

*   Python 3.8+
*   Node.js and npm
*   Reddit Account and API Credentials

### Backend Setup (Flask API)

1.  **Get Reddit API Credentials**:
    *   Go to Reddit's [app preferences page](https://www.reddit.com/prefs/apps).
    *   Scroll down and click "are you a developer? create an app...".
    *   Fill out the form:
        *   **name**: `sentiment-analysis-app` (or any name)
        *   **type**: `script`
        *   **description**: (optional)
        *   **about url**: (optional)
        *   **redirect uri**: `http://localhost:8080`
    *   Click "create app". You will get a `CLIENT_ID` (under your app name) and a `CLIENT_SECRET`.

2.  **Configure the API**:
    *   Navigate to the `sentiment-api` directory.
    *   Open `api.py` and replace the placeholder values with your Reddit credentials:
        ```python
        CLIENT_ID = "YOUR_CLIENT_ID"
        CLIENT_SECRET = "YOUR_CLIENT_SECRET"
        USER_AGENT = "Sentiment analysis script by u/YourUsername" # Replace YourUsername
        ```

3.  **Install Dependencies and Run**:
    *   It is recommended to create and activate a Python virtual environment.
    *   Install the required libraries:
        ```bash
        pip install Flask Flask-Cors transformers torch praw
        ```
    *   Run the Flask server:
        ```bash
        python api.py
        ```
    The API will start on `http://127.0.0.1:5000`. The first time you run it, the sentiment analysis model will be downloaded, which may take a few minutes.

### Frontend Setup (React Dashboard)

1.  **Navigate to the Dashboard Directory**:
    ```bash
    cd sentiment-dashboard
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The React application will start, typically on `http://localhost:5173`.

## How to Use

1.  Ensure both the backend and frontend servers are running.
2.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
3.  In the "Analysis Query" card, enter a topic you want to analyze (e.g., "AI", "climate change", "Bitcoin").
4.  Click the "Analyze" button.
5.  Wait for the application to fetch comments from Reddit and analyze their sentiment. A loading message will be displayed.
6.  Once complete, the "Sentiment Distribution" chart will update to show the number of positive and negative comments found for your topic. If an error occurs, a message will be displayed.
