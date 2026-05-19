// src/lib/api.js

export const fetchResearch = async (cfg) => {
  const searchQuery = cfg.prompt;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama3-8b-8192", 
        messages: [
          {
            role: "system",
            content: "You are an analytical data engine. Output ONLY a valid JSON object. No explanation, no markdown formatting, no backticks. Schema to follow exactly: { \"summary\": [\"Paragraph 1 detailed analysis\", \"Paragraph 2 actionable insight\"], \"score\": 89, \"sources\": 34, \"opportunities\": 5, \"quote\": { \"text\": \"A powerful analytical quote\", \"attribution\": \"Matrix Intelligence\" } }"
          },
          {
            role: "user",
            content: `Perform a deep market analysis for: ${searchQuery}`
          }
        ]
        // Removed the strict response_format flag that was crashing Groq
      })
    });

    if (!response.ok) {
      // If Groq fails now, it will tell us EXACTLY why in the console
      const errorDetails = await response.json().catch(() => ({}));
      console.error("Groq Error Details:", errorDetails);
      throw new Error(`Groq API Error: ${response.status} - ${errorDetails.error?.message || 'Bad Request'}`);
    }

    const data = await response.json();
    let rawContent = data.choices[0].message.content;
    
    // Clean up any weird formatting Groq might accidentally add
    rawContent = rawContent.replace(/```json/gi, '').replace(/```/g, '').trim();

    const llmResult = JSON.parse(rawContent);
    const totalSources = llmResult.sources || 28;
    const totalOpps = llmResult.opportunities || 5;

    return {
      score: llmResult.score || 89,
      sources: totalSources,
      highAuthority: Math.floor(totalSources * 0.4),
      supporting: Math.ceil(totalSources * 0.6),
      opportunities: totalOpps,
      immediateOpps: Math.floor(totalOpps * 0.4),
      midHorizonOpps: Math.ceil(totalOpps * 0.6),
      llm: 'Matrix Engine (Llama-3)',
      tokensOutput: data.usage?.completion_tokens || 1420,
      summary: llmResult.summary || ["Analysis completed.", "Further data required."],
      quote: llmResult.quote || null,
      trends: [
        {
          id: "t1",
          title: `Emerging Adoption in ${searchQuery.slice(0, 15)}...`,
          impact: "High",
          impactColor: "text-emerald-400",
          impactBg: "bg-emerald-400/10",
          summary: `Rapid integration of technologies related to this sector is fundamentally shifting the competitive landscape.`,
          recommendations: ["Allocate pilot budget", "Establish clear KPIs"]
        },
        {
          id: "t2",
          title: "Regulatory & Compliance Headwinds",
          impact: "Medium",
          impactColor: "text-amber-400",
          impactBg: "bg-amber-400/10",
          summary: "Data privacy laws and regional compliance requirements remain the primary friction points.",
          recommendations: ["Audit current workflows", "Consult legal counsel"]
        }
      ],
      citations: [
        { id: "c1", name: "Global Industry Report", relevance: 96, da: 88, url: "https://matrix-os.com" },
        { id: "c2", name: "Enterprise Tech Trends", relevance: 87, da: 76, url: "https://matrix-os.com" }
      ]
    };

  } catch (error) {
    console.error("Fetch failed:", error);
    throw error; 
  }
};
