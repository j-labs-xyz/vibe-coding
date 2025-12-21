# Prompt: How to permanently set node version in JavaScript Debug Terminal

## Assumptions
- User uses `nvm` (implied by `.nvmrc` presence and "set it everytime" workflow).
- User wants to avoid typing `nvm use` every time they open a JS Debug Terminal.
- User is on macOS.

## Solutions
1. **Global Default**: Change `nvm` default alias.
2. **VS Code Automation**: Configure VS Code to run `nvm use` or respect `.nvmrc`.
   - VS Code can use `debug.javascript.terminalOptions`.
   - Or use a `launch.json` with `runtimeVersion` for launch configs (but user specifically asked about the *Terminal*).
