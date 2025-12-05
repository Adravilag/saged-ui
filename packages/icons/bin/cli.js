#!/usr/bin/env node

/**
 * @sagebox/icons CLI
 *
 * Command line interface for managing SVG icons
 *
 * Usage:
 *   npx sage-icons <command> [options]
 *   sage-icons <command> [options]
 *
 * Commands:
 *   icons       Manage SVG icons
 *   icon-sets   Import popular icon sets (Lucide, Material, etc.)
 *   init        Initialize configuration
 *   help        Show help
 */

const { program } = require('commander');
const pkg = require('../package.json');

// Import commands
const iconsCommand = require('../cli/commands/icons');
const iconSetsCommand = require('../cli/commands/icon-sets');
const initCommand = require('../cli/commands/init');

program.name('sage-icons').description('@sagebox/icons CLI - Manage your SVG icons').version(pkg.version);

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
