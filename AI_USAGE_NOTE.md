# AI Usage Note: Engineering Decisions & LLM Collaboration

> **Internship Assignment**: AI Full-Stack Developer Intern — Thinking & Building Challenge  
> **Candidate / Developer Reflection**

---

## 1. Which AI Coding Tools Were Used

In building this prototype, the following AI tooling was utilized:
- **Google Antigravity / Gemini 3.8 Flash**: Employed as an interactive architectural pairing partner, code synthesizer, and debugger for rapid full-stack scaffolding.
- **Google Gemini 1.5 Flash REST API (In-App)**: Integrated into the backend API routes (`/api/clarify` and `/api/learn`) to perform natural-language query deconstruction and qualitative research synthesis.

---

## 2. What AI Helped With

1. **Scaffolding the Next.js App Router Architecture**:
   - Accelerating the boilerplate creation for typed API route handlers (`/api/clarify`, `/api/backtest`, `/api/learn`), Next.js components, and Tailwind styling.
2. **Generating Realistic NIFTY Historical OHLC Data**:
   - Synthesizing a high-fidelity 1,576-bar daily dataset for NIFTY 50 (2018–2024) that faithfully reproduces historical volatility milestones, including the IL&FS crisis (2018), corporate tax cut surge (2019), COVID crash and circuit breakers (March 2020), second wave (2021), and the Ukraine invasion selloff (2022).
3. **Structured Prompt Design for Financial Epistemology**:
   - Crafting system prompts that instruct the LLM to format responses into strict JSON adhering to the **Data (Facts) → Interpretation → Caveats → Conclusion** hierarchy.

---

## 3. Key Decisions Made by Me (The Developer)

1. **Strictly Isolating Math from the LLM**:
   - *Decision*: The LLM is **never** permitted to calculate backtest returns, win rates, median returns, drawdowns, or equity values. All math is executed deterministically in pure TypeScript (`lib/backtest.ts`).
   - *Rationale*: LLMs are probabilistic token predictors prone to mathematical hallucination and calculation errors. In quantitative finance, arithmetic must be 100% deterministic, testable, and reproducible.
2. **Mandatory Offline / Zero-Key Fallback Mode**:
   - *Decision*: Architect the application so it is 100% functional without an API key.
   - *Rationale*: A common flaw in AI prototypes is becoming completely broken when an API key is missing or quota is exhausted. I built local deterministic fallback engines in `lib/clarify.ts` and `lib/learn.ts` that execute instant heuristic parsing and template synthesis if `GEMINI_API_KEY` is not present.
3. **Strict Enforcement of Anti-Lookahead Execution ($T+1$ Open)**:
   - *Decision*: Enforce execution at the Next Trading Day Market Open rather than the Signal Day Close, and add an explicit visual warning banner if a user selects the Same Day Close.
   - *Rationale*: Look-ahead bias is the most prevalent flaw in novice trading backtests. Addressing it transparently demonstrates genuine domain knowledge.
4. **Epistemological Guardrails in the LEARN Stage**:
   - *Decision*: Forbid exaggerated claims like "this strategy is profitable."
   - *Rationale*: Even though the default backtest showed a 71.4% win rate, the cumulative return was -0.01% due to cash drag and tail losses (-9.45%). The system must teach the user that high win rate $\ne$ profitability.

---

## 4. What Suggestions Were Rejected or Modified

1. **Rejected: Client-Side Direct LLM Calls**:
   - *Suggestion*: Call the LLM API directly from the React components in the browser.
   - *Rejected Because*: This exposes API secrets to client inspection. All AI requests were routed through Next.js server-side route handlers (`app/api/*`) utilizing server environment variables.
2. **Rejected: Complex Heavyweight Charting Libraries (Chart.js / TradingView Lightweight)**:
   - *Suggestion*: Install a 5MB charting dependency.
   - *Rejected Because*: A bespoke, zero-dependency SVG equity curve component provides instant load times, zero external runtime fragility, full dark-mode styling control, and zero bundle bloat.
3. **Modified: Overlapping Position Handling**:
   - *Initial Idea*: Allow multiple simultaneous positions on consecutive drop days.
   - *Modification*: Enforce single non-overlapping position allocation with cash tracking. This mimics a realistic retail portfolio with fixed capital rather than unrealistic infinite margin.

---

## 5. What Part of the Implementation I am Most Proud Of

### The 3-Tier Ambiguity Decomposition in Stage 2 (CLARIFY)
Most AI applications make the critical mistake of **silently making assumptions** for the user. When a user asks a vague question, the system quietly picks arbitrary parameters and presents the output as ground truth.

In NIFTY AlphaLab, the centerpiece of the application is the **interactive parameter deconstruction**:
- It explicitly tells the user: *"Here is what you said; here is what you didn't say; and here are the assumptions we propose."*
- Every single assumption—drop percentage, drop timeframe, execution timing, holding period, and transaction fees—is presented transparently and remains editable.

This embodies the core philosophy: **Build less. Think more.**
