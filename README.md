# ClearHere 🌱

ClearHere is a calm, lightweight learning tool that helps English learners understand meaning, tone, and context—not just individual words.

Instead of overwhelming users with long explanations, ClearHere focuses on clarity and relevance, making everyday English easier to understand and remember.

---

## ✨ Features

- **Context-aware explanations**  
  Paste English text and receive a short, structured explanation focused on meaning, tone, and usage.

- **Text-to-speech playback**  
  Listen to explanations using natural-sounding audio to support auditory learning.

- **Gentle gamification**  
  A plant-growth system encourages consistent learning without pressure or competition.

- **Minimal, supportive design**  
  Warm colors, clear hierarchy, and subtle feedback help create a calm learning experience.

---

## 🧠 Why ClearHere?

Many English learners know basic vocabulary but still struggle with:
- phrases and expressions  
- tone and implied meaning  
- understanding English in real-world contexts  

Traditional dictionaries and translators rarely explain these clearly.  
ClearHere bridges this gap by focusing on **contextual understanding** and **emotional ease** while learning.

---

## 🛠️ Built With

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **JavaScript**
- **HTML5 / CSS3**
- **OpenRouter API** (AI-generated explanations)
- **ElevenLabs API** (text-to-speech)
- **DigitalOcean** (deployment)

User progress is stored locally using browser `localStorage` to keep the architecture lightweight and privacy-friendly.

---

## 🚀 How It Works

1. Paste English text into the input box  
2. Click **Explain**  
3. Receive a concise, structured explanation  
4. (Optional) Play the explanation aloud  
5. Watch your plant grow as you continue learning 🌿  

Progress is saved automatically across sessions.

---

## 🧱 Challenges

- Handling inconsistent AI responses (JSON vs plain text), which required server-side normalization  
- Balancing explanation depth with clarity to avoid overwhelming users  

---

## 🏆 Accomplishments

- Built a fully deployed, publicly accessible product  
- Designed a learning experience that feels calm and emotionally supportive  
- Delivered fast, concise, and easy-to-understand explanations  
- Explored photo-based input as a future direction (not completed within the hackathon timeframe)

---

## 📚 What I Learned

- How to integrate third-party APIs reliably in a modern React/Next.js app  
- How small design choices—color, wording, feedback—can significantly affect learner confidence and comfort  

---

## 🌱 What’s Next

- A virtual glass greenhouse to visually represent long-term learning progress  
- Photo-based recognition to connect language learning directly to real-world objects and environments  

---

## 🔐 Environment Variables

Create a `.env.local` file with the following:

```env
OPENROUTER_API_KEY=your_openrouter_key
ELEVENLABS_API_KEY=your_elevenlabs_key
