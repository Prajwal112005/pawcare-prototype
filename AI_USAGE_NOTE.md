AI Usage Note: Engineering Decisions & LLM Collaboration

Internship Assignment: AI Full-Stack Developer Intern — Thinking & Building Challenge

Candidate / Developer Reflection

1. Which AI Coding Tools Were Used
In building this prototype, I used AI as a development and reasoning partner rather than as a replacement for engineering decisions.
Google Antigravity / Gemini: Used as an interactive architectural pairing partner, code-generation assistant, and debugging aid while developing the full-stack prototype.
Google Gemini 1.5 Flash REST API (In-App): Integrated server-side into the /api/clarify and /api/learn routes for natural-language query deconstruction and qualitative research synthesis.

2. What AI Helped With
   1. Scaffolding the Next.js Application
AI helped accelerate the creation of the Next.js application structure, typed API route handlers, React components, and styling.
This allowed me to spend more time deciding what the system should do rather than manually writing repetitive boilerplate.
   2. Generating the Historical Sample Dataset
AI was used to help create the project's historical sample dataset representing NIFTY 50 daily OHLC data for the prototype's 2018–2024 testing period.
I treated this as prototype/sample research data rather than production-grade market data, and the application explicitly communicates that limitation.
   3. Designing Structured LLM Prompts
AI assistance was also used to design prompts for the CLARIFY and LEARN stages.
The prompts were structured so that the system separates:
Data / Facts → Interpretation → Caveats → Conclusion
This prevents the qualitative AI layer from presenting an interpretation as if it were directly observed evidence.
3. Key Decisions Made by Me
   1. Strictly Isolating Mathematical Calculations from the LLM
Decision: The LLM is never responsible for calculating backtest returns, win rates, drawdowns, or equity values.
All quantitative calculations are performed deterministically in TypeScript through lib/backtest.ts.
Rationale: Financial calculations need to be reproducible and testable. An LLM should not be treated as the source of truth for numerical backtesting.
   2. Mandatory Offline / Zero-Key Fallback
Decision: The application remains functional even when no Gemini API key is configured.
I implemented deterministic fallback logic in the clarification and learning layers so the core research workflow does not completely fail when an API key is unavailable.
Rationale: An AI prototype should degrade gracefully rather than becoming unusable when an external model or API quota is unavailable.
   3. Anti-Look-Ahead Execution
Decision: The default experiment generates the signal using the current day's closing data but executes the position at the next trading day's open (T+1).
The interface also warns the user if they choose same-close execution.
Rationale: I wanted to explicitly address look-ahead bias rather than allowing the backtest to use information that would not have been available at the time of execution.
   4. Epistemological Guardrails in the LEARN Stage
Decision: The system should not make an unsupported statement such as “this strategy is profitable” simply because the backtest produces a positive metric.
Instead, the LEARN stage separates:
What the data shows
System interpretation
Caveats
Pragmatic conclusion
Recommended follow-up investigations
Rationale: A small historical experiment can generate an interesting result without proving that a strategy will continue to work. The system should communicate that distinction explicitly.
4. What Suggestions Were Rejected or Modified
   1. Rejected: Client-Side Direct LLM Calls
Suggestion: Call the LLM API directly from React components in the browser.
Rejected because: This could expose the API key to the client. I instead routed model requests through Next.js server-side API routes and kept the API key in server environment variables.
   2. Rejected: Heavyweight Charting Dependencies
Suggestion: Use a large external charting library for the equity curve.
Rejected because: The prototype only required a simple research visualization. I chose a lightweight SVG-based equity curve instead, reducing dependencies and keeping the implementation easier to control.
   3. Modified: Overlapping Position Handling
Initial approach: Allow multiple simultaneous positions when several qualifying drop signals occur close together.
Modification: The experiment uses a single non-overlapping position allocation.
Reason: This creates a simpler and more interpretable prototype and avoids implicitly assuming unlimited capital or leverage.
5. What Part of the Implementation I Am Most Proud Of
The 3-Tier Ambiguity Decomposition in Stage 2 — CLARIFY
The part I am most proud of is not a particular UI component or line of code. It is the decision to make ambiguity itself a first-class part of the product.
A question such as:
“Does buying NIFTY after a sharp fall work?”
sounds specific to a human, but it leaves several critical variables undefined.
Instead of silently choosing them, NIFTY AlphaLab separates the question into:
User Stated
System Assumptions
Needs Clarification
The proposed assumptions—drop percentage, drop timeframe, execution timing, holding period, and trading friction—are made visible and editable before the experiment is run.

This reflects the core philosophy of the project:

Build less. Think more.

The goal was not simply to build an AI application that produces an answer. It was to build a system that makes the user define the question properly before trusting the answer.