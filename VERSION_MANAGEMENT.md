# Version Management System

This project automatically manages version numbers when merging branches.

## How It Works

### Automatic Version Updates
- **Post-merge hook**: Automatically increments version when merging branches
- **Pre-commit hook**: Ensures version consistency between package.json and index.html
- **Version script**: Updates both package.json and HTML metadata

### Version Format
- Follows semantic versioning: `MAJOR.MINOR.PATCH`
- Automatically increments the PATCH version (third number)
- Example: `0.0.0` → `0.0.1` → `0.0.2`

## Usage

### Manual Version Update
```bash
npm run version:update
```

### Automatic Updates
The version will automatically update when you:
1. Merge a feature branch into main/master
2. Pull changes from remote
3. Merge any branch

### What Gets Updated
1. **package.json**: `version` field
2. **src/index.html**: 
   - `<meta name="application-version">`
   - `<meta name="build-date">`
   - `data-app-version` attribute on body

## Git Hooks

### post-merge
- Triggers after every merge operation
- Automatically runs version update script
- Updates version number and metadata

### pre-commit
- Runs before each commit
- Checks version consistency
- Prevents commits with mismatched versions

## Viewing Version in Developer Tools

1. Open Developer Tools (F12)
2. Go to Elements tab
3. Check:
   - `<head>` section for meta tags
   - `<body>` tag for data-app-version attribute

## Troubleshooting

### Version Mismatch Error
If you see a version mismatch error:
```bash
npm run version:update
```

### Manual Git Hook Setup
If hooks aren't working, make them executable:
```bash
chmod +x .git/hooks/post-merge
chmod +x .git/hooks/pre-commit
```

## Example Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit
3. Merge to main: `git checkout main && git merge feature/new-feature`
4. Version automatically updates from `0.0.0` to `0.0.1`
5. Check version in Developer Tools Elements tab
