const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'sagebox';

function findAngularJson() {
  // Try INIT_CWD first (set by npm during install)
  const initCwd = process.env.INIT_CWD;
  if (initCwd) {
    const angularJsonPath = path.join(initCwd, 'angular.json');
    if (fs.existsSync(angularJsonPath)) {
      return angularJsonPath;
    }
  }
  
  // Navigate up from node_modules/sagebox
  let currentDir = process.cwd();
  if (currentDir.includes('node_modules')) {
    currentDir = path.resolve(currentDir, '..', '..');
  }
  
  const angularJsonPath = path.join(currentDir, 'angular.json');
  if (fs.existsSync(angularJsonPath)) {
    return angularJsonPath;
  }
  
  return null;
}

function isViteBuilder(builder) {
  return builder === '@angular/build:application' || 
         builder === '@angular/build:dev-server' ||
         builder === '@angular-devkit/build-angular:application';
}

function configureAngularProject() {
  const angularJsonPath = findAngularJson();
  
  if (!angularJsonPath) {
    return;
  }
  
  console.log('\n[sagebox] Configuring Angular project...');
  
  try {
    const angularJson = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));
    let modified = false;
    
    for (const [projectName, project] of Object.entries(angularJson.projects || {})) {
      const architect = project.architect || {};
      
      const buildBuilder = architect.build?.builder || '';
      if (!isViteBuilder(buildBuilder)) {
        continue;
      }
      
      if (architect.serve) {
        if (!architect.serve.options) {
          architect.serve.options = {};
        }
        
        if (!architect.serve.options.prebundle) {
          architect.serve.options.prebundle = { exclude: [] };
        }
        
        if (!architect.serve.options.prebundle.exclude) {
          architect.serve.options.prebundle.exclude = [];
        }
        
        const excludeList = architect.serve.options.prebundle.exclude;
        const packagesToExclude = [PACKAGE_NAME, PACKAGE_NAME + '/angular'];
        
        for (const pkg of packagesToExclude) {
          if (!excludeList.includes(pkg)) {
            excludeList.push(pkg);
            modified = true;
          }
        }
      }
    }
    
    if (modified) {
      fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2) + '\n');
      console.log('[sagebox] Added prebundle.exclude to angular.json');
    } else {
      console.log('[sagebox] angular.json already configured.');
    }
    
  } catch (error) {
    console.warn('[sagebox] Could not auto-configure: ' + error.message);
    console.warn('Add to angular.json -> architect.serve.options:');
    console.warn('"prebundle": { "exclude": ["sagebox", "sagebox/angular"] }');
  }
}

// Run the configuration
configureAngularProject();