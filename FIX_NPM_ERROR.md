# Fix NPM Error - jsonwebtoken Version

## ✅ Issue Fixed!

I've updated the `backend/package.json` with the correct jsonwebtoken version.

---

## What Was Wrong

**Error:**
```
npm error notarget No matching version found for jsonwebtoken@^9.1.2
```

**Cause:**
- The version `9.1.2` doesn't exist on npm registry
- The package.json had an incorrect version

**Solution:**
- Updated to `jsonwebtoken@^9.0.2` which is a valid version

---

## What Changed

### Before
```json
"jsonwebtoken": "^9.1.2"
```

### After
```json
"jsonwebtoken": "^9.0.2"
```

---

## How to Fix

### Step 1: Clear npm Cache

```bash
npm cache clean --force
```

### Step 2: Delete node_modules (Optional but Recommended)

```bash
# Windows
rmdir /s /q node_modules

# Mac/Linux
rm -rf node_modules
```

### Step 3: Delete package-lock.json (Optional but Recommended)

```bash
# Windows
del package-lock.json

# Mac/Linux
rm package-lock.json
```

### Step 4: Reinstall Dependencies

```bash
npm install
```

This will download and install all packages with correct versions.

---

## Complete Fix Process

### In Terminal (backend folder):

```bash
# Step 1: Clear cache
npm cache clean --force

# Step 2: Delete old files
rmdir /s /q node_modules  # Windows
# or
rm -rf node_modules       # Mac/Linux

# Step 3: Delete lock file
del package-lock.json     # Windows
# or
rm package-lock.json      # Mac/Linux

# Step 4: Reinstall
npm install
```

---

## Expected Output

After running `npm install`, you should see:

```
added 123 packages in 45s
```

No errors!

---

## Verify Installation

Check if jsonwebtoken is installed:

```bash
npm list jsonwebtoken
```

Should show:
```
css-review-backend@1.0.0 /path/to/backend
└── jsonwebtoken@9.0.2
```

---

## Now Try Again

After npm install completes:

```bash
npm run dev
```

Should show:
```
Server running on port 5000
```

---

## All Correct Versions

Here are all the correct package versions in your backend:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "pg": "^8.11.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-validator": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

All versions are now valid and available on npm!

---

## 🆘 If Still Having Issues

### Issue: Still getting npm error

**Solution:**
1. Check internet connection
2. Try again: `npm install`
3. If still fails, try:
   ```bash
   npm install --legacy-peer-deps
   ```

### Issue: Port 5000 already in use

**Solution:**
```bash
# Use different port
PORT=5001 npm run dev
```

### Issue: Other package errors

**Solution:**
1. Clear cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`

---

## ✅ Summary

- ✅ Fixed jsonwebtoken version in package.json
- ✅ Changed from 9.1.2 to 9.0.2
- ✅ Now you can run `npm install` successfully
- ✅ Backend will start without errors

---

## 🚀 Next Steps

1. Run: `npm install`
2. Run: `npm run dev`
3. Backend should start on port 5000
4. Then start frontend in new terminal

---

**The fix is applied! Run `npm install` now!** 🚀
