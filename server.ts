import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Initialize the Gemini API client lazily
  let aiClient: GoogleGenAI | null = null;
  function getAiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('WARN: GEMINI_API_KEY is not defined in environment variables. Chat functionality will show a setup message.');
        return null;
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // API endpoints
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid or missing messages array.' });
      }

      const client = getAiClient();
      if (!client) {
        return res.json({
          reply: "The Gemini API key is missing. Please add your GEMINI_API_KEY in the AI Studio Secrets panel found in the Settings gear (⚙️) menu.",
          isConfigError: true
        });
      }

      // Format messages into Google GenAI format securely
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.content || '' }]
      }));

      const systemInstruction = `You are Coach Veloce, the friendly, athletic pro concierge at Veloce Padel Club & Arenas in Doha, Qatar.
You guide players with athletic vigor about:
- Doha Sectors: 
  * Sector A (West Bay Dome): Indoor (The Grand Slam Showcourt - 150 QAR/hr, Apex Arena - 130 QAR/hr).
  * Sector B (The Pearl-Qatar): Sunset Vista Outdoor (110 QAR/hr) with harbor vistas.
  * Sector C (Katara Cultural Village): Coastal Breeze on premium visual turf (100 QAR/hr).
- Pro Equipment Rentals: Premium rackets (Nox AT10 Genius, Bullpadel Vertex 04, Babolat Technical Viper for 30 QAR/session) and pro balls (10 QAR).
- Locations: West Bay Diplomatic Area, Porto Arabia Towers Marina at The Pearl, and Shakespeare St at Katara. Open daily 07:30 - 00:00!
- Padel rules: Scoring is like tennis (15, 30, 40, game; golden point on deuce), serves must be underhand and bounce in the opponent's service box after hitting the glass wall first (but cannot hit the steel wire fence directly after the serve bounce).
Keep replies compact, exceptionally energetic, motivating, and action-oriented. Warmly address players from Doha, Qatar and invite them to explore our sectors on the booking engine or matchmaking board! Limit responses to 2-3 short paragraphs maximum.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500,
        }
      });

      const replyText = response.text || "I'm sorry, I couldn't formulate a response right now. How else can I assist you with your padel booking?";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error('Error in /api/chat:', error);
      res.status(500).json({ error: error.message || 'Internal server error while speaking to Gemini API.' });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Veloce Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Veloce Server:', err);
});
