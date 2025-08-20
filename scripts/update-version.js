const fs = require('fs');
const path = require('path');

// Function to increment version
function incrementVersion(version) {
  const parts = version.split('.');
  parts[2] = (parseInt(parts[2]) + 1).toString();
  return parts.join('.');
}

// Function to update package.json
function updatePackageJson() {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const oldVersion = package.version;
  const newVersion = incrementVersion(oldVersion);
  
  package.version = newVersion;
  
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
  
  console.log(`✅ Updated package.json version: ${oldVersion} → ${newVersion}`);
  return newVersion;
}

// Function to update index.html
function updateIndexHtml(version) {
  const indexPath = path.join(__dirname, '..', 'src', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');
  
  // Update meta tags
  html = html.replace(
    /<meta name="application-version" content="[^"]*">/g,
    `<meta name="application-version" content="${version}">`
  );
  
  html = html.replace(
    /<meta name="build-date" content="[^"]*">/g,
    `<meta name="build-date" content="${new Date().toISOString().split('T')[0]}">`
  );
  
  // Update body data attribute
  html = html.replace(
    /data-app-version="[^"]*"/g,
    `data-app-version="${version}"`
  );
  
  fs.writeFileSync(indexPath, html);
  
  console.log(`✅ Updated index.html metadata for version: ${version}`);
}

// Main execution
try {
  console.log('🚀 Starting version update...');
  
  const newVersion = updatePackageJson();
  updateIndexHtml(newVersion);
  
  console.log('🎉 Version update completed successfully!');
  console.log(`📦 New version: ${newVersion}`);
  
} catch (error) {
  console.error('❌ Error updating version:', error.message);
  process.exit(1);
}
