#!/bin/bash
# dor digital plugin — installer

PLUGIN_URL="https://github.com/dorkings/dor-digital-plugin.git"
SETTINGS="$HOME/.claude/settings.json"

python3 - <<'EOF'
import json, os, sys

settings_path = os.path.expanduser("~/.claude/settings.json")
plugin_url    = "https://github.com/dorkings/dor-digital-plugin.git"

if os.path.exists(settings_path):
    with open(settings_path, "r") as f:
        settings = json.load(f)
else:
    settings = {}

settings.setdefault("enabledPlugins", {})["dor-digital@dor-digital"] = True
settings.setdefault("extraKnownMarketplaces", {})["dor-digital"] = {
    "source": {
        "source": "git",
        "url": plugin_url
    }
}

with open(settings_path, "w") as f:
    json.dump(settings, f, indent=2, ensure_ascii=False)

print("✅ הותקן! הפעל מחדש את Claude Code.")
print("📌 השתמש בסקיל: 'בנה לי דשבורד ללקוח חדש'")
EOF
