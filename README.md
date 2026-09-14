# NIFTY AlphaLab: AI-Native Quantitative Research Prototype

> **AI Full-Stack Developer Intern — Thinking & Building Challenge**  
> Journey: **ASK → CLARIFY → DEFINE → TEST → LEARN**  
> Core Research Question: *"Does buying NIFTY after a sharp fall work?"*

---

## 1. Project Overview

**NIFTY AlphaLab** is an AI-native quantitative research prototype designed to explore ambiguous market ideas with scientific rigor. 

Retail traders frequently ask questions like *"Does buying NIFTY after a sharp fall work?"* However, this question is fraught with ambiguity:
- What constitutes a "sharp fall"? (2% in 1 day? 3% in 1 day? 5% over 3 days?)
- When does the trade execute? (At the close of the drop day, which introduces **Look-Ahead Bias**, or at the open of the next day?)
- How long is the position held? (3 days? 5 days? 20 days?)
- Are execution friction, STT, and slippage factored in?

Instead of silently hallucinating answers or arbitrarily picking parameters, NIFTY AlphaLab leads the user through an epistemologically sound five-stage research journey:
$$\text{ASK} \longrightarrow \text{CLARIFY} \longrightarrow \text{DEFINE} \longrightarrow \text{TEST} \longrightarrow \text{LEARN}$$

---

## 2. The 5-Stage Research Journey

```
┌─────────┐      ┌─────────────┐      ┌────────────┐      ┌──────────┐      ┌───────────┐
│ 1. ASK  │ ───► │ 2. CLARIFY  │ ───► │ 3. DEFINE  │ ───► │ 4. TEST  │ ───► │ 5. LEARN  │
└─────────┘      └─────────────┘      └────────────┘      └──────────┘      └───────────┘
Natural Lang      Disentangle          Structured           Deterministic     Data ->
Query with        - User Said          Experiment Card      TypeScript        Interpretation
Ambiguity         - Assumptions        Editable Params      Zero Look-Ahead   -> Caveats ->
                  - Decisions          Anti-Lookahead       Equity Curve      Conclusion
```

### Stage 1: ASK (Natural Language Ingestion)
- The user inputs any natural language trading question or selects from sample prompts.
- Pre-filled example: *"Does buying NIFTY after a sharp fall work?"*
- System explains why natural language is intrinsically ambiguous in quantitative finance.

### Stage 2: CLARIFY (Ambiguity Deconstruction)
The system visually decomposes the prompt into three explicit tiers:
1. 🟢 **User Said**: Explicit facts extracted verbatim from the user's prompt (e.g. Instrument: NIFTY 50, Action: Buy, Trigger: "sharp fall").
2. 🟡 **System Assumptions**: Proposed quantitative baseline defaults (e.g. 3% single-day drop, 5-day holding period, Next Day Open entry, 0.20% round-trip friction).
3. 🔴 **Needs Clarification**: Key decision dimensions that change the statistical outcome:
   - **Magnitude**: 2.0% (Frequent) vs 3.0% (Severe Panic) vs 5.0% (Extreme Crash)
   - **Timeframe**: 1 Trading Day vs 3 Trading Days
   - **Execution Timing**: Next Day Open ($T+1$) [Realistic / Anti-Lookahead] vs Signal Day Close ($T$) [Theoretical Look-Ahead Bias Alert]
   - **Holding Horizon**: 3, 5, 10, or 20 trading sessions
   - **Friction Model**: Realistic (0.20% round trip), Conservative (0.40%), or Zero (0.00%)

### Stage 3: DEFINE (Formal Experiment Specification)
- Converts the clarified parameters into a formal research card with a unique Experiment ID.
- Displays the formal hypothesis:  
  *&quot;Buying NIFTY 50 after a sharp 3% single-day decline produces positive average forward returns over a 5-day holding period due to short-term panic mean-reversion.&quot;*
- **Every assumption remains editable** directly on the card with live validation before execution.
- Contains an active **Look-Ahead Bias Shield** ensuring entry is placed at Day $T+1$ Open.

### Stage 4: TEST (Deterministic Backtesting Engine)
- Executes a pure TypeScript deterministic backtest on 1,576 daily historical OHLC bars (2018–2024).
- Strict adherence to real-world execution sequence:
  1. Bar $i$ Closes: Close-to-Close drop $\le -Threshold\%$ triggers a signal.
  2. Bar $i+1$ Opens: Buy order fills at $Open_{i+1} \times (1 + \text{Slippage})$.
  3. Bar $i+1+\text{HoldingDays}$ Opens: Exit order fills at $Open_{\text{exit}} \times (1 - \text{Slippage}) - \text{Fees}$.
- Computes comprehensive metrics:
  - Total Signals & Executed Non-overlapping Trades
  - Win Rate % (Wins vs Losses)
  - Average & Median Net Return per trade
  - Best Trade & Worst Trade (capturing tail risk)
  - Profit Factor ($\frac{\sum \text{Gains}}{\sum |\text{Losses}|}$)
  - Maximum Strategy Drawdown %
  - Strategy Cumulative Return vs Buy & Hold Benchmark
- Visualizations:
  - Interactive SVG Equity Curve comparing Strategy vs Buy & Hold Benchmark (rebased to 100.0).
  - Chronological Trade Log table with filterable views (All, Wins, Losses) and pagination.

### Stage 5: LEARN (Epistemological Synthesis)
Enforces a strict 4-step framework separating facts from speculation:
1. 📊 **What the Data Shows**: Factual, unvarnished statistical findings.
2. 🧠 **System Interpretation**: Behavioral and economic rationale (mean-reversion vs trend continuation, cash drag).
3. ⚠️ **Caveats & Limitations**: Small sample size, regime bias (bull market dominance), lack of stop-loss, execution slippage in panic sessions, and survivorship bias.
4. 🎯 **Pragmatic Conclusion**: An honest, cautious verdict (e.g. *"The strategy exhibits a modest average edge (+0.09%) that is insufficient as an unhedged standalone strategy due to catastrophic tail risk during multi-day cascades"*).
5. 🔬 **Recommended Next Investigations**: Interactive follow-up hypotheses (e.g. testing with a 200 DMA trend filter, comparing 3-day vs 10-day holding horizons, or adding a 2% stop-loss).

---

## 3. Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Dark fintech terminal aesthetic)
- **Icons**: Lucide React
- **Data Engine**: Deterministic TypeScript math and historical CSV parser
- **AI Integration**: Dual-engine architecture (Google Gemini 1.5 Flash via REST API with seamless deterministic offline fallback)

---

## 4. Architecture & Key Modules

```
├── app/
│   ├── api/
│   │   ├── backtest/route.ts   # Deterministic server-side backtest runner
│   │   ├── clarify/route.ts    # AI prompt deconstruction + heuristic fallback
│   │   └── learn/route.ts      # Structured report synthesis + heuristic fallback
│   ├── globals.css             # Fintech dark theme styling & typography
│   ├── layout.tsx              # Root HTML wrapper and metadata
│   └── page.tsx                # Main reactive client state orchestrator
├── components/
│   ├── StepIndicator.tsx       # 5-stage progress navigation tracker
│   ├── QuestionInput.tsx       # Stage 1: Natural language query input
│   ├── ClarifyPanel.tsx        # Stage 2: 3-tier parameter decomposition
│   ├── ExperimentCard.tsx      # Stage 3: Formalized editable experiment card
│   └── ResultsPanel.tsx        # Stages 4 & 5: Backtest metrics, SVG chart & report
├── lib/
│   ├── types.ts                # Domain models, Trade, Config & Metrics types
│   ├── data.ts                 # Server-side CSV loader & parser
│   ├── backtest.ts             # Deterministic anti-lookahead backtesting engine
│   ├── clarify.ts              # Natural language heuristics & ambiguity mapper
│   └── learn.ts                # Deterministic analytical report synthesizer
├── data/
│   └── nifty_sample.csv        # 1,576 daily OHLC bars for NIFTY 50 (2018–2024)
├── scripts/
│   ├── generate_data.py        # Reproducible NIFTY historical data generator
│   └── test_engine.ts          # Automated verification test suite
├── .env.example                # Optional GEMINI_API_KEY environment config
├── THINKING_NOTE.md            # Deep-dive on ambiguity handling & trade design
└── AI_USAGE_NOTE.md            # Critical evaluation of AI tools & engineering choices
```

---

## 5. How AI is Used (and Why It Does NOT Do Math)

### Appropriate AI Responsibilities:
- **Natural Language Parsing**: Extracting entities, actions, and detecting missing constraints from user queries.
- **Ambiguity Detection**: Identifying terms that have multiple meanings in finance (e.g. "sharp", "dip", "rebound").
- **Contextual Synthesis**: Writing qualitative explanations, caveats, and formulating next research questions.

### Strict Boundaries:
- **Zero LLM Math**: All backtesting calculations, returns, win rates, drawdowns, and price simulations are executed deterministically in pure TypeScript. LLMs are never allowed to estimate numbers or hallucinate statistics.
- **Offline / Zero-Key Fallback**: The app requires **no API key** to run. If `GEMINI_API_KEY` is not present, the system activates its built-in deterministic heuristic parser and analytical engine without disruption.

---

## 6. How the Backtest Works & Anti-Lookahead Guarantee

### The Look-Ahead Fallacy Explained:
Many amateur backtests evaluate a condition at Bar $i$'s Close ($Return_i \le -3\%$) and then record an entry at Bar $i$'s Close.  
In live trading, **this is physically impossible** because:
1. You do not know the official closing price until 15:30 IST.
2. Market orders cannot be matched retroactively at the close once the market is closed.

### Our Mathematical Implementation:
1. **Signal Trigger (Bar $T$)**:
   $$\text{Drop}_T = \frac{\text{Close}_T - \text{Close}_{T-1}}{\text{Close}_{T-1}} \times 100 \le -\text{Threshold}\%$$
2. **Order Execution (Bar $T+1$ Open)**:
   $$\text{Entry Price} = \text{Open}_{T+1} \times (1 + \text{Slippage})$$
3. **Position Exit (Bar $T+1+H$ Open)**:
   $$\text{Exit Price} = \text{Open}_{T+1+H} \times (1 - \text{Slippage})$$
4. **Net Return Calculation**:
   $$\text{Net Return} = \frac{\text{Exit Price} - \text{Entry Price}}{\text{Entry Price}} \times 100 - (2 \times \text{Transaction Cost})$$

---

## 7. Dataset Information

- **Asset**: NIFTY 50 Index (National Stock Exchange of India)
- **Timeframe**: Daily OHLCV bars from **January 1, 2018 to January 15, 2024** (1,576 trading days)
- **Key Historical Regimes Captured**:
  - 2018: IL&FS liquidity crisis & LTCG tax selloff
  - 2019: FPI surcharge selloff & Corporate tax cut surge
  - 2020: Extreme COVID crash (-3.7%, -4.9%, -8.3%, -12.98% single-day shock drops) followed by sharp V-shaped recovery
  - 2021: Post-pandemic stimulus bull market
  - 2022: Russia-Ukraine invasion selloff & global interest rate hike corrections
  - 2023–2024: Post-Adani recovery and rally to 21,700+
- **Disclosure**: Clearly tagged as a historical sample dataset for prototype validation, not a live streaming market feed.

---

## 8. How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm 9+

### Quick Start
```bash
# 1. Clone or navigate to the project directory
cd SUAZ

# 2. Install dependencies (if not already installed)
npm install

# 3. (Optional) Configure Gemini API key for enhanced AI responses
cp .env.example .env.local
# Edit .env.local and set GEMINI_API_KEY=your_key_here

# 4. Run the development server
npm run dev

# 5. Open in your browser
# Navigate to: http://localhost:3000
```

### Running Automated Verification Tests
```bash
# Run the internal verification test suite (verifies anti-lookahead, parser, and metrics)
./node_modules/.bin/tsc scripts/test_engine.ts --outDir dist --module commonjs --target es2020 --esModuleInterop --skipLibCheck && node dist/scripts/test_engine.js && rm -rf dist
```

### Production Build
```bash
npm run build
npm run start
```

---

## 9. Limitations & Future Improvements

### Current Limitations:
1. **Sample Size**: Over 6 years, drops of $\ge 3\%$ occur only ~10 times. While statistically accurate to history, small samples have wide confidence intervals.
2. **Fixed Time-Based Exits**: Exits are strictly scheduled after $H$ days, lacking volatility-adjusted stops (ATR) or profit targets.
3. **Single Asset**: Focused on NIFTY 50 index daily bars; does not yet backtest individual constituent equities or intraday 5-minute ticks.

### Future Roadmap:
- **Regime Filters**: Integrate 200-day Simple Moving Average (SMA) or India VIX threshold to prevent dip buying during secular bear regimes.
- **Dynamic Stop-Loss & Take-Profit**: Implement trailing ATR stops to truncate catastrophic tail losses like March 2020.
- **Multi-Asset Comparison**: Allow cross-testing against BankNIFTY, NIFTY Midcap 100, and S&P 500.
