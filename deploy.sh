#!/bin/bash

# Vastlink Render Deployment Guide

echo "🚀 Vastlink Render Deployment"
echo "---------------------------------------------------"
echo "Render uses a 'Blueprint' (GitOps) workflow."
echo ""
echo "Step 1: Commit and Push your code to GitHub/GitLab."
echo "   git add ."
echo "   git commit -m \"Prepare for Render deployment\""
echo "   git push origin main"
echo ""
echo "Step 2: Go to the Render Dashboard (https://dashboard.render.com)."
echo "   - Click 'New' -> 'Blueprint'"
echo "   - Connect this repository"
echo "   - Render will automatically detect 'render.yaml'"
echo "   - Click 'Apply' to create Database, Redis, API, and Web services."
echo ""
echo "Files created:"
echo "   - apps/api/Dockerfile"
echo "   - apps/web/Dockerfile"
echo "   - render.yaml"
