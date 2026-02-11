# AI Chatbot

A premium, modern AI Chatbot web application built with React, Vite, and the Gemini API. This application features a sleek, responsive design and real-time interaction capabilities.

**Live Demo:** [https://Mohamedarsath.github.io/aichatbot/](https://Mohamedarsath.github.io/aichatbot/)

## Features

-   **Intelligent Conversations**: Powered by Google's Gemini API for natural and accurate responses.
-   **Modern UI/UX**: Clean, responsive interface with smooth animations and typing indicators.
-   **Markdown Support**: Displays code blocks, lists, and formatted text beautifully.
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices.
-   **Fast Performance**: Built with Vite for lightning-fast development and production builds.

## Tech Stack

-   **Frontend**: React, TypeScript, Vite
-   **Styling**: CSS Modules, Modern CSS3 (Variables, Flexbox/Grid)
-   **AI Integration**: Google Generative AI (Gemini) SDK

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   A Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Mohamedarsath/aichatbot.git
    cd aichatbot
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Deployment

To deploy this application to GitHub Pages:

```bash
npm run deploy
```

This script builds the application and pushes the `dist` folder to the `gh-pages` branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
