NIFTY AlphaLab: AI-Native Quantitative Research Prototype

AI Full-Stack Developer Intern — Thinking & Building Challenge

Journey: ASK → CLARIFY → DEFINE → TEST → LEARN

Core Research Question: "Does buying NIFTY after a sharp fall work?"

1. Project Overview
NIFTY AlphaLab is an AI-native quantitative research prototype designed to explore ambiguous market ideas through a structured and reproducible research workflow.
A question such as:
"Does buying NIFTY after a sharp fall work?"
sounds simple, but it leaves several important variables undefined:
What constitutes a "sharp fall"?
Is the fall measured over one trading day or several?
When should the trade execute?
How long should the position be held?
What transaction costs and slippage should be considered?
What does "work" actually mean?
Instead of silently choosing these parameters, NIFTY AlphaLab makes the ambiguity explicit and guides the user through:
ASK → CLARIFY → DEFINE → TEST → LEARN
The goal is not to automatically produce a trading recommendation. The goal is to make the research question precise enough to test and communicate the limitations of the resulting evidence.

2. The 5-Stage Research Journey
┌─────────┐      ┌─────────────┐      ┌────────────┐      ┌──────────┐      ┌───────────┐
│ 1. ASK  │ ───► │ 2. CLARIFY  │ ───► │ 3. DEFINE  │ ───► │ 4. TEST  │ ───► │ 5. LEARN  │
└─────────┘      └─────────────┘      └────────────┘      └──────────┘      └───────────┘
Natural Lang      Ambiguity          Structured           Deterministic     Data →
Query             Decomposition      Experiment           TypeScript        Interpretation
                                     Definition            Backtest          → Caveats
                                                                                → Conclusion
  Stage 1: ASK — Natural Language Ingestion
The user enters a natural-language research question.
A pre-filled example is provided:
"Does buying NIFTY after a sharp fall work?"
The interface explains why natural-language financial questions often contain hidden assumptions.
  Stage 2: CLARIFY — Ambiguity Deconstruction
The system separates the question into three tiers:
User Said
Explicit information extracted from the question.
Example: NIFTY 50, Buy, "sharp fall".
System Assumptions
Proposed quantitative baseline parameters.
Example: 3% single-day decline, 5-day holding period, next-day-open execution, and 0.20% round-trip friction.
Needs Clarification
Variables that can materially change the experiment:
Magnitude: 2%, 3%, or 5%
Timeframe: 1 trading day or 3 trading days
Execution: Next Day Open or Same Close
Holding Horizon: 3, 5, 10, or 20 trading days
Transaction Costs / Slippage: configurable
The important design principle is that these assumptions are visible and editable rather than silently imposed.
  Stage 3: DEFINE — Formal Experiment Specification
The clarified parameters are converted into a structured experiment card.
The default experiment uses:
Market Data: NIFTY 50 historical index data
Signal: ≥3% single-day close-to-close decline
Entry: Next trading day open (T+1)
Holding Period: 5 trading days
Position: Long, single non-overlapping position
Transaction Costs / Slippage: Configurable
Test Period: 2018-01-01 to 2024-01-15
The hypothesis is explicitly represented as a testable statement rather than treated as an established fact.
Every major assumption remains editable before testing.
  Stage 4: TEST — Deterministic Backtesting Engine
The backtest is implemented in pure TypeScript.
The execution sequence is:
Signal: A closing-price decline on Day T satisfies the configured threshold.
Entry: The position is entered at the next trading day's open (T+1).
Exit: The position is exited after the selected holding period.
Friction: Configured transaction costs and slippage are incorporated into the calculation.
The engine calculates:
Total signals
Executed non-overlapping trades
Win rate
Average and median return per trade
Best and worst trade
Profit factor
Maximum drawdown
Strategy cumulative return
Buy-and-hold benchmark return
Visualizations
SVG equity curve comparing strategy performance with a buy-and-hold benchmark.
Chronological trade log.
Trade filtering by all trades, winning trades, and losing trades.
Paginated trade results.
  Stage 5: LEARN — Research Synthesis
The LEARN stage separates observed results from interpretation.
It presents:
What the Data Shows
Direct findings produced by the deterministic backtest.
System Interpretation
Possible explanations and behavioral interpretations.
Caveats & Limitations
Sample size
Market-regime dependency
Slippage and transaction costs
Tail risk
Lack of stop-loss modelling
Limitations of the prototype dataset
Pragmatic Conclusion
A cautious interpretation of what the experiment does and does not establish.
Recommended Next Investigations
Threshold sensitivity
Holding-period sensitivity
Trend/regime filters
Consecutive down-day conditions
Stop-loss experiments
Larger or out-of-sample datasets

3. Tech Stack
Framework: Next.js 14 (App Router)
Language: TypeScript (Strict Mode)
Styling: Tailwind CSS
Icons: Lucide React
Data Engine: Deterministic TypeScript calculations and CSV parsing
AI Integration: Google Gemini 1.5 Flash via server-side REST API with deterministic offline fallback

4. Architecture & Key Modules
├── app/
│   ├── api/
│   │   ├── backtest/route.ts   # Deterministic server-side backtest runner
│   │   ├── clarify/route.ts    # AI prompt deconstruction + heuristic fallback
│   │   └── learn/route.ts      # Structured report synthesis + heuristic fallback
│   ├── globals.css             # Application styling
│   ├── layout.tsx              # Root HTML wrapper and metadata
│   └── page.tsx                # Main client-side state orchestrator
│
├── components/
│   ├── StepIndicator.tsx       # 5-stage progress tracker
│   ├── QuestionInput.tsx       # Stage 1: Research question input
│   ├── ClarifyPanel.tsx        # Stage 2: Ambiguity decomposition
│   ├── ExperimentCard.tsx      # Stage 3: Editable experiment definition
│   └── ResultsPanel.tsx        # Stages 4 & 5: Results and research synthesis
│
├── lib/
│   ├── types.ts                # Domain models and configuration types
│   ├── data.ts                 # Server-side CSV loader and parser
│   ├── backtest.ts             # Deterministic backtesting engine
│   ├── clarify.ts              # Natural-language heuristics and ambiguity mapping
│   └── learn.ts                # Analytical report synthesis
│
├── data/
│   └── nifty_sample.csv        # Historical sample daily OHLC data
│
├── scripts/
│   ├── generate_data.py        # Dataset generation utility
│   └── test_engine.ts          # Automated engine verification tests
│
├── .env.example                # Optional GEMINI_API_KEY configuration
├── THINKING_NOTE.md            # Research reasoning and ambiguity analysis
└── AI_USAGE_NOTE.md            # AI collaboration and engineering decisions

5. How AI Is Used
Appropriate AI Responsibilities
AI is used for:
Natural-language query interpretation
Identifying ambiguous financial terms
Extracting entities and user intent
Generating qualitative explanations
Synthesizing caveats and follow-up research questions
Strict Boundary: AI Does Not Perform the Backtest Math
The LLM does not calculate:
Returns
Win rates
Drawdowns
Equity values
Trade-level performance
These calculations are performed deterministically by the TypeScript backtesting engine.
This separation ensures that quantitative results come from reproducible program logic rather than generated text.
Offline / Zero-Key Fallback
The application does not require a Gemini API key to run.
When GEMINI_API_KEY is unavailable, deterministic fallback logic in the clarification and learning layers allows the core workflow to continue functioning.

6. Anti-Look-Ahead Design
The experiment uses the closing price of Day T to generate the signal and enters at the next trading day's open (T+1).
Conceptually:
Day T Close
    │
    │  Signal evaluated
    ▼
Day T+1 Open
    │
    │  Position entered
    ▼
Holding Period
    │
    ▼
Exit
This prevents the default experiment from assuming that the strategy can enter using a closing price that was only known after the signal-generating session.
The application also displays a warning when same-close execution is selected because that configuration can introduce look-ahead bias.

7. Dataset Information
Asset: NIFTY 50 Index
Data Type: Historical sample daily OHLC data
Test Period: 2018-01-01 to 2024-01-15
Bars: 1,576 daily observations
Important Disclosure
The dataset is used as a historical sample dataset for prototype validation. It is not a live market feed and the application is not intended to provide production trading signals.
The experiment should therefore be interpreted as a research prototype rather than a production-grade financial backtesting system.

8. How to Run Locally
Prerequisites
Node.js 18+
npm 9+
Quick Start
# 1. Clone the repository
git clone https://github.com/Prajwal112005/nifty-alphalab.git

# 2. Enter the project directory
cd nifty-alphalab

# 3. Install dependencies
npm install

# 4. Optional: configure Gemini
cp .env.example .env.local

# Add your Gemini API key to .env.local if desired:
# GEMINI_API_KEY=your_key_here

# 5. Start the development server
npm run dev
Open:
http://localhost:3000
Production Build
npm run build
npm run start

9. Limitations & Future Improvements
Current Limitations
Small Event Sample
The baseline experiment produces only a small number of qualifying non-overlapping trades.
Therefore, the observed result should be treated as exploratory evidence rather than proof of a persistent market effect.
Fixed Time-Based Exits
Positions are currently exited after a configured number of trading sessions.
Volatility-adjusted stops and profit targets are not part of the baseline experiment.
Single Market Dataset
The current implementation focuses on NIFTY 50 historical daily data.
Prototype Dataset
The included dataset is intended for prototype validation rather than production-grade market research.
Future Roadmap
Regime Filters: Test trend conditions such as a 200-day moving-average filter.
Dynamic Risk Management: Experiment with ATR-based stops and other exit rules.
Holding-Period Sensitivity: Compare different holding horizons systematically.
Threshold Sensitivity: Test whether the observed behaviour persists across different definitions of a sharp fall.
Multi-Asset Comparison: Extend the framework to additional indices and datasets.
Out-of-Sample Testing: Validate whether any observed pattern persists outside the initial sample period.

10. Project Philosophy
NIFTY AlphaLab is built around one principle:
Build less. Think more.
The purpose of the application is not to produce an impressive-looking trading prediction.
It is to demonstrate a disciplined process:
Question → Clarification → Formal Experiment → Evidence → Learning
A useful research system should make assumptions visible, calculations reproducible, uncertainty explicit, and conclusions proportional to the evidence.