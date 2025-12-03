# SagedUI CLI

Command-line interface for managing SVG icons in your SagedUI projects.

## Installation

The CLI is included with the `saged-ui` package:

```bash
npm install saged-ui
```

## Quick Start

```bash
# Initialize SagedUI in your project
npx saged-ui init

# Fetch icons from Iconify
npx saged-ui icons fetch lucide:home lucide:settings mdi:account

# Build TypeScript from icons.json
npx saged-ui icons build

# Start the Icon Manager (visual interface)
npx saged-ui icons server
```

## Commands

### `saged-ui init`

Initialize SagedUI configuration in your project.

```bash
npx saged-ui init [options]

Options:
  -f, --force    Overwrite existing configuration
```

This will:
- Create `saged-ui.config.json` configuration file
- Create the icons directory (`./src/icons` by default)
- Create an empty `icons.json` file
- Add helper scripts to your `package.json`

### `saged-ui icons`

Manage SVG icons in your project.

#### `icons fetch <icons...>`

Fetch icons from [Iconify](https://iconify.design/) API.

```bash
# Fetch specific icons
npx saged-ui icons fetch lucide:home lucide:settings mdi:heart

# Use default prefix
npx saged-ui icons fetch home settings --prefix lucide
```

#### `icons add <name>`

Add a custom SVG icon from file or string.

```bash
# From file
npx saged-ui icons add my-icon --file ./path/to/icon.svg

# From SVG string
npx saged-ui icons add my-icon --svg '<svg>...</svg>'
```

#### `icons remove <name>`

Remove an icon from the project.

```bash
npx saged-ui icons remove my-icon
```

#### `icons list`

List all icons in the project.

```bash
npx saged-ui icons list

# Output as JSON
npx saged-ui icons list --json
```

#### `icons build`

Generate TypeScript and JSON files from `icons.json`.

```bash
npx saged-ui icons build

# Custom output path
npx saged-ui icons build --output ./src/custom-icons.ts
```

This generates:
- `index.ts` - TypeScript with type definitions and auto-registration
- `index.json` - JSON file for dynamic loading

#### `icons search <query>`

Search for icons in Iconify.

```bash
npx saged-ui icons search home

# Limit to specific icon set
npx saged-ui icons search home --prefix lucide
```

#### `icons sets`

List available icon sets from Iconify.

```bash
npx saged-ui icons sets

# Filter by name
npx saged-ui icons sets --search material
```

#### `icons import <file>`

Import icons from an SVG sprite sheet.

```bash
npx saged-ui icons import ./sprites.svg

# Replace all existing icons
npx saged-ui icons import ./sprites.svg --replace
```

#### `icons optimize`

Optimize SVG icons in the project.

```bash
npx saged-ui icons optimize

# Analyze without modifying
npx saged-ui icons optimize --analyze
```

#### `icons preview`

Generate an HTML preview of all icons.

```bash
npx saged-ui icons preview

# Custom output path
npx saged-ui icons preview --output ./icons-gallery.html
```

#### `icons server`

Start the Icon Manager visual interface.

```bash
npx saged-ui icons server

# Custom port
npx saged-ui icons server --port 3000

# Use legacy inline server
npx saged-ui icons server --legacy
```

### `saged-ui icon-sets`

Import popular icon sets directly.

#### `icon-sets list`

List available icon sets.

```bash
npx saged-ui icon-sets list
```

Available sets: `lucide`, `mdi`, `heroicons`, `tabler`, `phosphor`, `feather`, `bootstrap`, `carbon`, `ionicons`

#### `icon-sets import <set>`

Import icons from a set.

```bash
# Import first 100 icons
npx saged-ui icon-sets import lucide

# Import specific icons
npx saged-ui icon-sets import lucide --icons home,settings,user

# Import all icons
npx saged-ui icon-sets import lucide --all
```

#### `icon-sets search <set> <query>`

Search for icons in a specific set.

```bash
npx saged-ui icon-sets search lucide home
```

#### `icon-sets preview <set>`

Open the Iconify preview page for a set.

```bash
npx saged-ui icon-sets preview lucide
```

## Configuration

### `saged-ui.config.json`

```json
{
  "icons": {
    "input": "./src/icons",
    "output": "./src/icons/index.ts",
    "jsonFile": "icons.json"
  }
}
```

| Option | Description | Default |
|--------|-------------|---------|
| `icons.input` | Directory containing icons | `./src/icons` |
| `icons.output` | Output TypeScript file | `./src/icons/index.ts` |
| `icons.jsonFile` | Name of the JSON file | `icons.json` |

## Icons Format

Icons are stored in `icons.json` as an array:

```json
[
  {
    "name": "lucide:home",
    "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">...</svg>",
    "inProject": true
  },
  {
    "name": "mdi:heart",
    "content": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">...</svg>",
    "inProject": false
  }
]
```

- `name`: Icon identifier (supports `prefix:name` format)
- `content`: Raw SVG string
- `inProject`: Whether to include in the build output

## Generated Output

### TypeScript (`index.ts`)

```typescript
// Auto-generated - do not edit manually

export const icons: Record<string, string> = {
  'lucide-home': '<svg>...</svg>',
  'mdi-heart': '<svg>...</svg>',
};

// Auto-register icons when imported
registerIcons(icons);

// Type definitions
export type IconName = 'lucide-home' | 'mdi-heart';
export const iconNames: IconName[] = ['lucide-home', 'mdi-heart'];
export function isValidIconName(name: string): name is IconName;
```

### JSON (`index.json`)

```json
{
  "lucide-home": "<svg>...</svg>",
  "mdi-heart": "<svg>...</svg>"
}
```

## Usage in Projects

### Angular

```typescript
// Import icons to auto-register them
import './icons';

// Use in templates
<sg-icon name="lucide-home"></sg-icon>
```

### React

```jsx
// Import icons
import './icons';

// Or use Web Components directly
import { defineCustomElements } from 'saged-ui/loader';
defineCustomElements(window);

// Use component
<sg-icon name="lucide-home" size={24} />
```

### Dynamic Loading

```typescript
import { loadIconsFromJson } from './icons';

// Load icons dynamically
await loadIconsFromJson('/assets/icons.json');
```

## Vite Plugin

For hot-reload during development:

```javascript
// vite.config.js
import { sagedUIIcons } from 'saged-ui/cli/plugins/vite';

export default {
  plugins: [
    sagedUIIcons({
      watch: true,
      iconsDir: './src/icons',
      output: './src/icons/index.ts'
    })
  ]
}
```

### Plugin Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `watch` | boolean | `true` | Enable file watching |
| `iconsDir` | string | `./src/icons` | Icons directory |
| `jsonFile` | string | `icons.json` | JSON file name |
| `output` | string | `./src/icons/index.ts` | Output TypeScript file |
| `prefix` | string | `''` | Prefix for icon names |
| `optimize` | boolean | `true` | Optimize paths |

## Programmatic API

The CLI can also be used programmatically:

```javascript
const { commands, utils, plugins } = require('saged-ui/cli');

// Load configuration
const config = utils.config.loadConfig();

// Parse SVG
const parsed = utils.svgParser.parseSVG('<svg>...</svg>');

// Use Vite plugin
const viteConfig = {
  plugins: [plugins.vite()]
};
```

## Icon Manager

The Icon Manager is a visual interface for managing your icons:

```bash
npx saged-ui icons server
```

Features:
- 📋 Browse and search all available icons
- ➕ Add icons from Iconify with one click
- ✅ Toggle which icons are included in the build
- 🎨 Preview icons in different sizes and colors
- 🔄 Real-time sync with `icons.json`

## Workflow Example

```bash
# 1. Initialize project
npx saged-ui init

# 2. Fetch icons from Iconify
npx saged-ui icons fetch lucide:home lucide:settings lucide:user mdi:heart

# 3. Or use the Icon Manager
npx saged-ui icons server

# 4. Build TypeScript
npx saged-ui icons build

# 5. Import in your app
```

```typescript
// Import icons (auto-registers them)
import './icons';

// Use in components
<sg-icon name="lucide-home"></sg-icon>
<sg-icon name="mdi-heart" color="red"></sg-icon>
```

## Best Practices

1. **Use prefixes**: Name icons with prefixes (`lucide:home`) to avoid conflicts
2. **Filter with `inProject`**: Only build icons you actually use
3. **Run build after changes**: Always run `icons build` after modifying icons
4. **Commit `icons.json`**: Track your icon definitions in version control
5. **Use the Icon Manager**: For visual icon management and discovery

## Troubleshooting

### Icons not showing

1. Ensure icons are built: `npx saged-ui icons build`
2. Import the generated file in your app
3. Check the icon name matches (use `prefix-name` format in components)

### Build fails

1. Check `icons.json` is valid JSON
2. Verify paths in `saged-ui.config.json`
3. Ensure write permissions to output directory

### Icon Manager not starting

1. Check if port is in use: `npx saged-ui icons server --port 4568`
2. Try legacy mode: `npx saged-ui icons server --legacy`

## License

MIT © SagedUI
