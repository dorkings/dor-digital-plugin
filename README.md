# dor digital — Claude Plugin

Plugin skills for managing Meta Ads client dashboards.

## Skills included

| Skill | Description |
|---|---|
| `dashboard-builder` | Build a customized SaaS dashboard for Meta Ads campaign management |

## Installation

### 1. Add to Claude Code settings

Open `~/.claude/settings.json` and add:

```json
{
  "enabledPlugins": {
    "dor-digital@dor-digital": true
  },
  "extraKnownMarketplaces": {
    "dor-digital": {
      "source": {
        "source": "git",
        "url": "https://github.com/YOUR_USERNAME/dor-digital-plugin.git"
      }
    }
  }
}
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Restart Claude Code

The skills will be available in your next session.

## Usage

Once installed, say:

> "בנה לי דשבורד ללקוח חדש"

or

> `/dashboard-builder`

Claude will guide you through a discovery phase and then scaffold the full dashboard project.
