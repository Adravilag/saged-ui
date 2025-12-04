/**
 * Init Command
 *
 * Initialize SageBox configuration in a project
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

const DEFAULT_CONFIG = {
  icons: {
    input: './src/icons',
    output: './src/icons/index.ts',
    jsonFile: 'icons.json'
  }
};

module.exports = function(program) {
  program
    .command('init')
    .description('Initialize SageBox configuration')
    .option('-f, --force', 'Overwrite existing configuration')
    .action((options) => {
      log.title('🚀 SageBox - Initialize');

      const configPath = path.join(process.cwd(), 'sagebox.config.json');
      const pkgPath = path.join(process.cwd(), 'package.json');

      // Check if config already exists
      if (fs.existsSync(configPath) && !options.force) {
        log.warn('Configuration already exists. Use --force to overwrite.');
        return;
      }

      // Create config file
      fs.writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), 'utf-8');
      log.success('Created sagebox.config.json');

      // Create icons directory
      const iconsDir = path.join(process.cwd(), DEFAULT_CONFIG.icons.input);
      if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
        log.success(`Created icons directory: ${DEFAULT_CONFIG.icons.input}`);
      }

      // Create empty icons.json
      const iconsJsonPath = path.join(iconsDir, DEFAULT_CONFIG.icons.jsonFile);
      if (!fs.existsSync(iconsJsonPath)) {
        fs.writeFileSync(iconsJsonPath, '{}', 'utf-8');
        log.success('Created icons.json');
      }

      // Add scripts to package.json if it exists
      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

          if (!pkg.scripts) {
            pkg.scripts = {};
          }

          const scriptsToAdd = {
            'icons:add': 'sagebox icons add',
            'icons:build': 'sagebox icons build',
            'icons:list': 'sagebox icons list',
            'icons:preview': 'sagebox icons preview'
          };

          let addedScripts = [];
          for (const [name, cmd] of Object.entries(scriptsToAdd)) {
            if (!pkg.scripts[name]) {
              pkg.scripts[name] = cmd;
              addedScripts.push(name);
            }
          }

          if (addedScripts.length > 0) {
            fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
            log.success(`Added scripts to package.json: ${addedScripts.join(', ')}`);
          }
        } catch (e) {
          log.warn('Could not update package.json: ' + e.message);
        }
      }

      // Print next steps
      console.log(`
${colors.bright}Next steps:${colors.reset}

  1. Add your first icon:
     ${colors.cyan}npx sagebox icons add my-icon --file ./path/to/icon.svg${colors.reset}

  2. Or import from a sprite:
     ${colors.cyan}npx sagebox icons import ./sprites.svg${colors.reset}

  3. Generate TypeScript:
     ${colors.cyan}npx sagebox icons build${colors.reset}

  4. Preview your icons:
     ${colors.cyan}npx sagebox icons preview${colors.reset}

${colors.bright}Configuration:${colors.reset}
  Edit ${colors.cyan}sagebox.config.json${colors.reset} to customize paths.

${colors.bright}Documentation:${colors.reset}
  https://github.com/adravilag/sagebox
`);
    });
};
