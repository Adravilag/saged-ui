#!/usr/bin/env node

// Thin launcher that delegates to the canonical CLI implementation
// located in `packages/icons/bin/cli.js`. Keeping a lightweight
// launcher in `bin/` allows npm `bin` entries to remain stable.

try {
  // eslint-disable-next-line node/no-unpublished-require
  require('../packages/icons/bin/cli.js');
} catch (e) {
  // If delegating fails, print a helpful error and exit non-zero.
  /* eslint-disable no-console */
  console.error('Failed to launch SageBox CLI from packages/icons/bin/cli.js');
  console.error(e && e.stack ? e.stack : e);
  process.exit(1);
}

// Import commands
const iconsCommand = require('../cli/commands/icons');
const iconSetsCommand = require('../cli/commands/icon-sets');
const initCommand = require('../cli/commands/init');

program
  .name('sagebox')
  .description('SageBox CLI - Manage your component library')
  .version(pkg.version);

// Register commands
iconsCommand(program);
iconSetsCommand(program);
initCommand(program);

// Default help
program.on('command:*', () => {
  console.error('Invalid command: %s\n', program.args.join(' '));
  program.help();
});

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.help();
}
