#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = path.join(__dirname, '../dist');
const DEST_DIR = path.join(__dirname, '../../..', 'Desktop/codewithash/public/projects/login-credentials');

console.log('🚀 Deploying login-credentials app...\n');

// Check if dist folder exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`❌ Error: dist folder not found at ${SOURCE_DIR}`);
  console.error('Run "npm run build:web" first');
  process.exit(1);
}

// Create destination directory if it doesn't exist
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
  console.log(`✅ Created directory: ${DEST_DIR}`);
}

// Copy files
function copyRecursive(src, dest) {
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      if (!fs.existsSync(destFile)) {
        fs.mkdirSync(destFile, { recursive: true });
      }
      copyRecursive(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

try {
  // Clear destination
  if (fs.existsSync(DEST_DIR)) {
    fs.rmSync(DEST_DIR, { recursive: true });
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }
  
  // Copy files
  copyRecursive(SOURCE_DIR, DEST_DIR);
  console.log(`✅ Files copied successfully to ${DEST_DIR}\n`);
  
  // Commit and push (optional)
  console.log('📝 Committing changes to git...');
  try {
    const codewithashPath = path.join(__dirname, '../../Desktop/codewithash');
    execSync('git add -A', { cwd: codewithashPath });
    execSync('git commit -m "chore: deploy login-credentials app" || true', { cwd: codewithashPath });
    execSync('git push origin main', { cwd: codewithashPath });
    console.log('✅ Changes pushed to GitHub\n');
  } catch (err) {
    console.warn('⚠️  Git operations failed - you may need to commit manually\n');
  }
  
  console.log('🎉 Deployment complete!');
  console.log(`📦 App available at: https://www.codewithash.com/projects/login-credentials`);
} catch (err) {
  console.error(`❌ Deployment failed: ${err.message}`);
  process.exit(1);
}
