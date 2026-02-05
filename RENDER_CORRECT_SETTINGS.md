# Correct Render Static Site Settings

## ⚠️ CRITICAL: Both Settings Must Be Set Correctly

You need **BOTH** the Build Command AND Publish Directory set correctly.

## Render Dashboard Configuration

### 1. Build Command (MUST BE SET)
```
cd app && npm install && npm run build
```

**Important:** This field cannot be empty! If it's empty, Render won't build your project.

### 2. Publish Directory
```
app/dist
```

**Why `app/dist`?**
- The build command runs from the repository root
- It changes to the `app` directory and builds
- The `dist` folder is created at `app/dist` (relative to repo root)
- Render looks for the publish directory relative to the repository root
- So it must be `app/dist`, not just `dist`

## Step-by-Step Setup

1. **Go to Render Dashboard** → Your Static Site → Settings

2. **Set Build Command:**
   - Field: "Build Command"
   - Value: `cd app && npm install && npm run build`
   - ⚠️ Make sure this field is NOT empty!

3. **Set Publish Directory:**
   - Field: "Publish Directory"  
   - Value: `app/dist`
   - This is relative to your repository root

4. **Save and Deploy**

## Why You Got the Error

When you changed the publish directory to `dist`, Render likely:
- Didn't recognize your build command (or it was empty)
- Skipped the build step
- Looked for `dist` folder which doesn't exist because the build never ran
- Result: "Publish directory dist does not exist!"

## Verification

After setting both correctly, check the build logs:
- You should see: "Running: cd app && npm install && npm run build"
- You should see npm install output
- You should see the Vite build output
- Build should complete successfully
- Then Render should find `app/dist` and deploy it

## If It Still Doesn't Work

1. **Check Build Logs:** Make sure the build actually runs
2. **Verify Paths:** The logs will show where files are created
3. **Try Alternative:** If `app/dist` doesn't work, the build logs will tell you the actual path
