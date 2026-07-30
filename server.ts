import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client on server side
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint to search or generate song chords and lyrics using Gemini
app.post("/api/gemini/song", async (req, res) => {
  try {
    const { title, artist, keyPreference } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Song title is required" });
    }

    const ai = getGeminiAI();
    const prompt = `Provide the full gospel song lyrics with guitar chords inline or formatted line by line for the song: "${title}" ${
      artist ? `by ${artist}` : ""
    }.
Target Key: ${keyPreference || "C"}.
Languages: Supporting both Myanmar (Burmese) and English gospel songs. If it's a known Burmese Gospel song or translated hymn, provide the authentic Burmese lyrics with guitar chords above words.

Format the response strictly as valid JSON with this structure:
{
  "title": "${title}",
  "artist": "${artist || "Gospel Worship"}",
  "originalKey": "${keyPreference || "C"}",
  "tempo": "Moderate (72-84 BPM)",
  "timeSignature": "4/4",
  "category": "Worship / Praise",
  "language": "Myanmar / English",
  "chordsUsed": ["C", "G", "Am", "F"],
  "sections": [
    {
      "sectionName": "Verse 1",
      "lines": [
        {
          "chordLine": "C          G          Am         F",
          "lyricLine": "Lyrics here matching the chords..."
        }
      ]
    },
    {
      "sectionName": "Chorus",
      "lines": [
        {
          "chordLine": "F          G          C",
          "lyricLine": "Chorus lyrics here..."
        }
      ]
    }
  ],
  "devotionalContext": "A brief 2-sentence spiritual background or Bible verse connected to this song."
}
Only output valid JSON, no markdown code block backticks if possible, or plain JSON text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("Error generating song with Gemini:", error);
    return res.status(500).json({
      error: "Failed to generate or find song chords.",
      details: error?.message,
    });
  }
});

// API endpoint to generate Daily Devotional / Scripture Verse with Gemini
app.post("/api/gemini/devotional", async (req, res) => {
  try {
    const { theme } = req.body;
    const ai = getGeminiAI();
    const prompt = `Generate an inspiring Christian Daily Devotional in Myanmar language (with English translation included) focusing on ${
      theme || "Grace, Faith, Hope, and Peace"
    }.

Format response as JSON:
{
  "title": "Devotional Title in Myanmar",
  "titleEnglish": "Devotional Title in English",
  "scriptureVerse": "John 3:16",
  "scriptureTextMyanmar": "ကျမ်းဂန်စကားရပ်...",
  "scriptureTextEnglish": "For God so loved the world...",
  "reflectionMyanmar": "ဝိညာဉ်ရေးရာ ဆင်ခြင်တွေးတောဖွယ်...",
  "reflectionEnglish": "Reflection paragraph...",
  "prayerMyanmar": "ဆုတောင်းချက်...",
  "recommendedSongs": ["Amazing Grace", "အံ့ဩဖွယ်ကျေးဇူးတော်", "10000 Reasons"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const data = JSON.parse(response.text || "{}");
    return res.json(data);
  } catch (error: any) {
    console.error("Error generating devotional:", error);
    return res.status(500).json({ error: "Failed to fetch devotional." });
  }
});

// Serve web app manifest dynamically
app.get("/manifest.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json({
    short_name: "GraceGospel",
    name: "Grace Gospel - Songs & Chords",
    icons: [
      {
        src: "https://api.iconify.design/lucide:music.svg?color=%238b5cf6&width=192&height=192",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "https://api.iconify.design/lucide:music.svg?color=%238b5cf6&width=512&height=512",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
    start_url: "/",
    background_color: "#0f172a",
    theme_color: "#7c3aed",
    display: "standalone",
    orientation: "portrait",
    description: "Gospel song lyrics, chords, transposer, audio and daily devotionals.",
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
