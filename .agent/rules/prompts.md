---
trigger: always_on
---

# Prompt Logging Rules (Workspace)

For every user request:
1) Create a new file in /prompts/ named YYYY-MM-DD__<short-slug>.md containing:
   - the exact prompt
   - assumptions
   - acceptance criteria

During work:
2) Maintain /runs/YYYY-MM-DD__<short-slug>/runlog.md and append after each milestone:
   - what changed (files)
   - commands run
   - tests run + results
   - links/names of relevant artifacts

Finish:
3) Write /runs/YYYY-MM-DD__<short-slug>/summary.md:
   - final outcome
   - known issues
   - next steps
4) Ask me to checkpoint with git (propose commit message referencing the prompt file).
