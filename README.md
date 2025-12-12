# Crystal Forge - Winter Hackathon Website ❄️

A beautiful winter-themed hackathon registration website with glassmorphism design and interactive 3D elements.

## Features

- ✨ Glassmorphism UI with winter theme
- 🎨 Interactive 3D elements and animations
- 📱 Responsive design
- 🔐 Admin portal with authentication
- ⛄ AI-powered chatbot assistant
- 🎯 Multi-step registration process
- 📊 Team status tracking

## ChatBot Setup 🤖

The website includes an AI-powered chatbot named "Frosty" that helps users with hackathon-related questions.

### Setting up the Gemini API:

1. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Copy the `.env.local` file and replace `your_gemini_api_key_here` with your actual API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
   ```
3. The chatbot will appear as a floating snowball on all pages except the intro animation
4. Click the snowball to open the chat interface and talk with Frosty! ⛄

### ChatBot Features:
- Winter-themed snowman assistant
- Contextual help about the hackathon
- Real-time responses powered by Google Gemini
- Beautiful glassmorphism chat interface

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18 with TypeScript
- Vite for development
- Framer Motion for animations
- Three.js for 3D elements
- Tailwind CSS for styling
- Zustand for state management
- Google Gemini API for chatbot

## Project Structure

```
src/
├── components/
│   ├── animations/     # Intro animations
│   ├── layout/        # Navigation and layout
│   ├── three/         # 3D components
│   └── ui/            # Reusable UI components
├── pages/             # Main pages
├── stores/            # State management
└── hooks/             # Custom hooks
```

## Admin Access

- Username: `admin`
- Password: `crystalforge2025`

---

Built with ❄️ for an amazing hackathon experience!