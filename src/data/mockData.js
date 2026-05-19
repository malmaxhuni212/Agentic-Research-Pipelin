import { Building2, Scale, GraduationCap } from 'lucide-react';

export const RECENT_ANALYSES = [
  { id: 1, title: "HVAC AI Automation Market", ts: "2h ago", status: "completed", sources: 34, score: 94, icon: Building2 },
  { id: 2, title: "Legal Tech Workflow Optimization 2026", ts: "5h ago", status: "completed", sources: 28, score: 87, icon: Scale },
  { id: 5, title: "EdTech SaaS Competitive Map", ts: "3d ago", status: "completed", sources: 41, score: 91, icon: GraduationCap },
];

/* ─────────────────────────────────────────────────────────────
   Per-analysis result data — single source of truth.
   Every component reads from ANALYSIS_RESULTS[id].
   ──────────────────────────────────────────────────────────── */
export const ANALYSIS_RESULTS = {
  /* ── HVAC AI Automation Market ──────────────────────────── */
  1: {
    score: 94,
    sources: 34,
    opportunities: 7,
    highAuthority: 12,
    supporting: 22,
    immediateOpps: 3,
    midHorizonOpps: 4,
    tokensOutput: 4218,
    llm: "Claude 3.5 Sonnet",
    summary: [
      `The commercial HVAC sector is undergoing a profound structural transformation driven by the convergence of edge AI inference, predictive analytics, and regulatory pressure from the EPA's AIM Act Phase 3 mandate. Our analysis of <strong class="text-white/80">34 authoritative sources</strong> — spanning McKinsey, Bloomberg Intelligence, and DOE databooks — reveals a market in active bifurcation between legacy operators and AI-native challengers.`,
      `Seven discrete high-yield opportunity vectors have been identified. The most immediate — <strong class="text-white/80">Predictive Maintenance via Edge AI</strong> — is addressable within a 60-day GTM sprint targeting mid-market industrial REITs. The regulatory arbitrage window created by R-410A compliance deadlines presents a 14-month first-mover advantage for operators who certify technicians for A2L refrigerants before Q4 2026.`,
      `Structural headwinds include a <strong class="text-white/80">94,000-technician skills gap</strong> by 2027 and persistent Cloudflare-gated access to tier-1 industry databases, which limited raw source depth. Confidence in trend directionality remains high at 94%; specific TAM figures carry ±8% variance.`,
    ],
    quote: {
      text: "Early adopters of LLM-native BMS control loops are demonstrating 28% energy reduction — a margin that compounds rapidly in multi-site commercial portfolios.",
      attribution: "— Analyst Agent · Source: Bloomberg Intelligence 2026",
    },
    trends: [
      {
        id: 1, title: "Predictive Maintenance via Edge AI", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "Industrial HVAC operators are deploying sub-$200 edge inference chips that predict compressor failure 72hrs in advance, reducing unplanned downtime by up to 63% across surveyed enterprise clients.",
        recommendations: [
          "Partner with Nvidia Jetson OEM distributors for bundle deals",
          "Target mid-market industrial REITs with pilot program proposals",
          "Develop ROI calculator showing 63% downtime reduction metric",
        ],
      },
      {
        id: 2, title: "LLM-Native BMS Control Loops", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "Next-gen Building Management Systems are embedding fine-tuned LLMs directly into control loop firmware. Early pilots show 28% energy reduction via real-time load shifting aligned to utility pricing signals.",
        recommendations: [
          "Evaluate white-labeling Siemens Desigo CC API layer",
          "Commission a 90-day pilot with a Tier-2 commercial developer",
          "File provisional patent on adaptive setpoint algorithm",
        ],
      },
      {
        id: 3, title: "Refrigerant Regulation Arbitrage", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "The EPA's AIM Act Phase 3 timeline creates a 2026 compliance cliff. Contractors holding R-410A stock face margin compression, while early adopters of A2L refrigerants gain a 14-month first-mover advantage.",
        recommendations: [
          "Accelerate A2L technician certification program",
          "Negotiate bulk procurement of R-454B before Q4 price surge",
          "Launch customer retrofit advisory service at premium tier",
        ],
      },
      {
        id: 4, title: "HVAC-as-a-Service Subscription Wave", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "Commercial real estate tenants increasingly prefer OpEx HVAC models. Subscription penetration in the SMB segment grew 340% YoY, with average contract values of $2,400/unit/year.",
        recommendations: [
          "Model a 36-month subscription vehicle with Stripe billing",
          "Underwrite equipment residual risk via insurance partnership",
          "Target co-working operators as beachhead vertical",
        ],
      },
      {
        id: 5, title: "Digital Twin Integration Gap", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "73% of enterprise HVAC installations surveyed lack a live digital twin. This gap represents a $4.1B addressable market for IoT retrofit kits and simulation software through 2028.",
        recommendations: [
          "Build an AWS IoT Greengrass integration kit for legacy RTUs",
          "Partner with Autodesk Tandem for BIM-twin synchronization",
          "Target facilities managers in healthcare for compliance angle",
        ],
      },
      {
        id: 6, title: "Workforce Reskilling Demand Surge", impact: "Low",
        impactColor: "text-blue-400", impactBg: "bg-blue-400/10",
        summary: "The shift to AI-assisted HVAC systems is creating a 94,000-technician skills gap by 2027 per DOE estimates. Training platforms and certification bodies are positioned for outsized growth.",
        recommendations: [
          "Launch an AI-HVAC micro-credential on Coursera/Udemy",
          "License curriculum to community college HVAC programs",
          "Partner with ACCA for certification endorsement",
        ],
      },
    ],
    citations: [
      { id: 1, name: "Bloomberg Intelligence — HVAC Market Report 2026", relevance: 97, da: 94, url: "https://bloomberg.com/intelligence/hvac-ai-2026" },
      { id: 2, name: "McKinsey Global Institute — Smart Buildings Outlook", relevance: 94, da: 96, url: "https://mckinsey.com/industries/smart-buildings" },
      { id: 3, name: "Semantic Scholar — Edge AI HVAC Optimization", relevance: 91, da: 82, url: "https://semanticscholar.org/paper/edge-ai-hvac" },
      { id: 4, name: "EPA AIM Act Phase 3 Official Documentation", relevance: 89, da: 99, url: "https://epa.gov/aim-act/phase-3" },
      { id: 5, name: "TechCrunch — HVAC SaaS Funding Rounds 2025", relevance: 86, da: 88, url: "https://techcrunch.com/2025/hvac-saas-funding" },
      { id: 6, name: "Gartner Emerging Tech — IoT Building Systems", relevance: 93, da: 91, url: "https://gartner.com/en/emerging-tech/iot-buildings" },
      { id: 7, name: "Siemens Desigo CC API Technical Whitepaper", relevance: 84, da: 85, url: "https://siemens.com/desigo-cc/api-whitepaper.pdf" },
      { id: 8, name: "DOE Buildings Energy Databook 2025", relevance: 88, da: 97, url: "https://doe.gov/buildings-databook-2025" },
      { id: 9, name: "ArXiv — LLM Control Loops for HVAC Systems", relevance: 90, da: 79, url: "https://arxiv.org/abs/2501.hvac-llm" },
      { id: 10, name: "ACCA — Workforce Readiness Report 2026", relevance: 82, da: 81, url: "https://acca.org/workforce-readiness-2026" },
      { id: 11, name: "Autodesk Tandem — Digital Twin Integration Guide", relevance: 80, da: 87, url: "https://autodesk.com/tandem/integration" },
      { id: 12, name: "Forrester Research — Building Automation Trends", relevance: 87, da: 89, url: "https://forrester.com/report/building-automation" },
    ],
  },

  /* ── Legal Tech Workflow Optimization 2026 ──────────────── */
  2: {
    score: 87,
    sources: 28,
    opportunities: 5,
    highAuthority: 9,
    supporting: 19,
    immediateOpps: 2,
    midHorizonOpps: 3,
    tokensOutput: 3842,
    llm: "GPT-4o",
    summary: [
      `The legal technology sector is experiencing a paradigm shift as AI-native contract lifecycle management (CLM) platforms displace legacy document-review workflows. Our synthesis of <strong class="text-white/80">28 authoritative sources</strong> — including Gartner, Thomson Reuters, and Stanford HAI — reveals that firms adopting LLM-augmented workflows are reducing contract turnaround time by 74%.`,
      `Five high-yield opportunities have been identified. The most actionable — <strong class="text-white/80">Compliance-as-a-Service for mid-market firms</strong> — targets the 68% of firms under 200 attorneys that lack dedicated compliance infrastructure. Early movers are capturing $18K–$45K annual contract values per firm.`,
      `Key risks include regulatory uncertainty around AI-generated legal advice in 14 U.S. jurisdictions and ethical bar association guidelines that remain under active revision. Confidence in adoption trajectory remains strong at 87%; specific market-sizing figures carry ±12% variance due to private-firm opacity.`,
    ],
    quote: {
      text: "Mid-market firms adopting AI-native CLM platforms are seeing 74% reduction in contract cycle time — a competitive moat that compounds with deal volume.",
      attribution: "— Analyst Agent · Source: Thomson Reuters Legal Tech Report 2026",
    },
    trends: [
      {
        id: 1, title: "AI-Native Contract Lifecycle Management", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "LLM-powered CLM platforms are automating clause extraction, risk flagging, and negotiation drafting. Firms report 74% faster contract cycles and 41% reduction in outside counsel spend.",
        recommendations: [
          "Pilot an AI CLM integration with a top-20 AmLaw firm",
          "Build redline-comparison API using GPT-4o fine-tuned on M&A contracts",
          "Target general counsel of PE portfolio companies as beachhead",
        ],
      },
      {
        id: 2, title: "Compliance-as-a-Service Opportunity", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "68% of mid-market law firms lack dedicated compliance teams. SaaS platforms offering automated regulatory monitoring and filing are capturing $18K–$45K ACV per firm.",
        recommendations: [
          "Launch a vertical SaaS product targeting firms with 50–200 attorneys",
          "Integrate SEC, FINRA, and state bar regulatory feeds in real-time",
          "Offer tiered pricing with a self-serve compliance dashboard",
        ],
      },
      {
        id: 3, title: "E-Discovery Cost Deflation via LLMs", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "Traditional e-discovery spend averages $18K–$75K per matter. LLM-powered document review is compressing this to $3K–$12K, creating margin pressure for incumbents like Relativity.",
        recommendations: [
          "Develop a challenger e-discovery product with LLM-first architecture",
          "Partner with litigation boutiques for co-development deals",
          "File patent on semantic deduplication algorithm for legal corpora",
        ],
      },
      {
        id: 4, title: "Ethical AI Guardrails as Differentiator", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "14 U.S. jurisdictions are drafting rules on AI-generated legal advice. Platforms that embed auditable reasoning chains and bias detection gain regulatory approval faster.",
        recommendations: [
          "Build an explainability layer that logs every AI decision with citations",
          "Engage ABA ethics committee for early certification partnership",
          "Publish a transparency report to build trust with risk-averse GCs",
        ],
      },
    ],
    citations: [
      { id: 1, name: "Gartner — Legal Tech Market Guide 2026", relevance: 95, da: 93, url: "https://gartner.com/legal-tech-guide-2026" },
      { id: 2, name: "Thomson Reuters — AI in Legal Workflows Report", relevance: 93, da: 95, url: "https://thomsonreuters.com/ai-legal-workflows" },
      { id: 3, name: "Stanford HAI — LLMs and the Legal Profession", relevance: 91, da: 90, url: "https://hai.stanford.edu/llm-legal" },
      { id: 4, name: "ABA — Ethics Guidelines for AI in Law", relevance: 88, da: 97, url: "https://aba.org/ethics-ai-guidelines" },
      { id: 5, name: "McKinsey — Future of Professional Services", relevance: 90, da: 96, url: "https://mckinsey.com/professional-services-future" },
      { id: 6, name: "Clio — Legal Trends Report 2025", relevance: 86, da: 82, url: "https://clio.com/legal-trends-2025" },
      { id: 7, name: "Relativity — E-Discovery Market Analysis", relevance: 84, da: 84, url: "https://relativity.com/ediscovery-market" },
      { id: 8, name: "LegalTech News — CLM Platform Comparison", relevance: 82, da: 80, url: "https://legaltechnews.com/clm-comparison" },
    ],
  },

  /* ── EdTech SaaS Competitive Map ────────────────────────── */
  5: {
    score: 91,
    sources: 41,
    opportunities: 9,
    highAuthority: 15,
    supporting: 26,
    immediateOpps: 4,
    midHorizonOpps: 5,
    tokensOutput: 5102,
    llm: "Claude 3.5 Sonnet",
    summary: [
      `The EdTech SaaS landscape is entering a consolidation phase as AI-native learning platforms outperform legacy LMS incumbents on engagement, retention, and learning outcomes. Our synthesis of <strong class="text-white/80">41 authoritative sources</strong> — including HolonIQ, GSV Ventures, and UNESCO — reveals a $404B global market growing at 16.3% CAGR.`,
      `Nine high-yield opportunities have been identified across K-12, higher education, and corporate L&D. The most immediate — <strong class="text-white/80">AI Tutoring Co-pilots for K-12</strong> — addresses a $12B segment where personalized learning at scale remains unsolved. Early entrants like Khanmigo are demonstrating 2.3x improvement in math proficiency scores.`,
      `Primary headwinds include student data privacy regulation (FERPA, COPPA, GDPR-K), infrastructure gaps in emerging markets, and teacher union resistance to AI adoption. Data confidence is high at 91% due to strong public-market disclosure from listed EdTech companies.`,
    ],
    quote: {
      text: "AI-native tutoring platforms are demonstrating 2.3x improvement in standardized math scores — the first scalable evidence that personalized AI outperforms traditional classroom instruction.",
      attribution: "— Analyst Agent · Source: HolonIQ EdTech Intelligence 2026",
    },
    trends: [
      {
        id: 1, title: "AI Tutoring Co-pilots for K-12", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "Personalized AI tutors are demonstrating 2.3x improvement in math proficiency. The $12B K-12 supplemental education market is ripe for disruption as parents seek alternatives to expensive human tutoring.",
        recommendations: [
          "Launch a freemium AI tutor targeting math and reading for grades 3–8",
          "Partner with school districts for pilot programs with outcome guarantees",
          "Build parent-facing dashboard showing real-time learning progress",
        ],
      },
      {
        id: 2, title: "Corporate L&D Platform Consolidation", impact: "High",
        impactColor: "text-emerald-400", impactBg: "bg-emerald-400/10",
        summary: "Enterprise L&D budgets are shifting from seat-based LMS licenses to outcome-based AI training platforms. Companies report 45% faster onboarding and 60% better knowledge retention.",
        recommendations: [
          "Build an AI skills-gap analyzer that maps to company OKRs",
          "Target Fortune 500 CHROs with ROI-focused case studies",
          "Integrate with Workday and SAP SuccessFactors for enterprise distribution",
        ],
      },
      {
        id: 3, title: "Credential Verification via Blockchain", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "Employer trust in online credentials remains low at 34%. Blockchain-verified micro-credentials and skill badges are emerging as the bridge between learning platforms and hiring systems.",
        recommendations: [
          "Partner with major MOOC platforms for credential interoperability",
          "Build an employer-facing verification API with instant validation",
          "Lobby for state-level recognition of verified micro-credentials",
        ],
      },
      {
        id: 4, title: "Emerging Market Infrastructure Play", impact: "Medium",
        impactColor: "text-amber-400", impactBg: "bg-amber-400/10",
        summary: "1.2B learners in Sub-Saharan Africa and South Asia lack reliable internet for synchronous learning. Offline-first, SMS-based AI tutoring represents a $8B addressable opportunity.",
        recommendations: [
          "Build an offline-first mobile app with sync-when-connected architecture",
          "Partner with USAID and World Bank for distribution in target markets",
          "Develop SMS-based lesson delivery for feature phone users",
        ],
      },
    ],
    citations: [
      { id: 1, name: "HolonIQ — Global EdTech Intelligence Report 2026", relevance: 96, da: 88, url: "https://holoniq.com/edtech-intelligence-2026" },
      { id: 2, name: "GSV Ventures — EdTech 150 Market Map", relevance: 94, da: 85, url: "https://gsv.com/edtech-150" },
      { id: 3, name: "UNESCO — AI in Education Policy Brief", relevance: 92, da: 98, url: "https://unesco.org/ai-education-policy" },
      { id: 4, name: "McKinsey — Future of Learning Report", relevance: 91, da: 96, url: "https://mckinsey.com/future-of-learning" },
      { id: 5, name: "Coursera — Workforce Skills Report 2025", relevance: 89, da: 87, url: "https://coursera.org/workforce-skills-2025" },
      { id: 6, name: "World Bank — EdTech Infrastructure Assessment", relevance: 87, da: 95, url: "https://worldbank.org/edtech-infrastructure" },
      { id: 7, name: "Khan Academy — Khanmigo Impact Study", relevance: 93, da: 84, url: "https://khanacademy.org/khanmigo-impact" },
      { id: 8, name: "Gartner — LMS Market Guide 2026", relevance: 85, da: 93, url: "https://gartner.com/lms-market-2026" },
      { id: 9, name: "Duolingo — Annual Learning Efficacy Report", relevance: 83, da: 82, url: "https://duolingo.com/learning-efficacy" },
      { id: 10, name: "OECD — PISA Digital Learning Assessment", relevance: 90, da: 97, url: "https://oecd.org/pisa-digital-2025" },
    ],
  },
};

/* ─── Lookup helper — single source of truth ──────────────── */
export function getAnalysisData(id) {
  const meta = RECENT_ANALYSES.find(a => a.id === id);
  const results = ANALYSIS_RESULTS[id];
  if (!meta || !results) return null;
  return { ...meta, ...results };
}

export const SCOUT_LOGS = [
  "[Scout] Initializing Playwright headless browser pool (8 workers)...",
  "[Scout] Seed query dispatched → Google Scholar, Semantic API, ArXiv",
  "[Scout] Bypassing Cloudflare gate on source #3 (retry 1/3)...",
  "[Scout] Cloudflare bypassed. DOM rendered. Extracting structured data...",
  "[Scout] Scraping sitemap from: techcrunch.com/research...",
  "[Scout] Harvested 847 raw tokens from source #5 (bloomberg.com)",
  "[Scout] Deduplication pass — removed 4 mirror URLs",
  "[Scout] Scanning 14 URLs — ETA 22s remaining...",
  "[Scout] Resolved rate-limit on source #8. Retrying with proxy rotation.",
  "[Scout] Source #11 returned 403. Flagging for fallback strategy.",
  "[Scout] PDF extraction triggered for source #12 (whitepaper.pdf)...",
  "[Scout] All primary URLs harvested. Handing off to Analyst agent.",
];

export const ANALYST_LOGS = [
  "[Analyst] Receiving payload from Scout — 34 source blobs queued",
  "[Analyst] Running TF-IDF vectorization on text cluster batch #1...",
  "[Analyst] Semantic filtering pass — cosine similarity threshold: 0.72",
  "[Analyst] Identified 7 high-density topic clusters from corpus",
  "[Analyst] Running semantic filtering on text clusters batch #2...",
  "[Analyst] Key-phrase extraction: 'AI workflow automation', 'HVAC IoT'...",
  "[Analyst] Contradiction detection — cross-referencing claims across sources",
  "[Analyst] Confidence scoring: source #7 rated HIGH (DA: 91, recency: 3d)",
  "[Analyst] Entity recognition pass — extracting companies, metrics, dates",
  "[Analyst] Token budget consumed: 48,221 / 128,000 (37.7%)",
  "[Analyst] Triage complete. Forwarding structured JSON to Editor.",
];

export const EDITOR_LOGS = [
  "[Editor] Receiving structured JSON payload from Analyst...",
  "[Editor] Validating against report schema v2.4 — 0 violations found",
  "[Editor] Generating executive summary via Claude 3.5 Sonnet...",
  "[Editor] Formatting Markdown and auditing citation schema...",
  "[Editor] Building Strategic Trends grid — 6 trend cards generated",
  "[Editor] Cross-referencing citations — all 34 sources mapped",
  "[Editor] Running hallucination guard pass on summary paragraphs...",
  "[Editor] Applying confidence scores to all factual claims...",
  "[Editor] Rendering final report structure. Schema validation: PASSED",
  "[Editor] Report compiled. Total output: 4,218 tokens. Ready to serve.",
];
