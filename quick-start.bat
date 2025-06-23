@echo off
echo 🚀 Noah Business API MCP - Quick Start
echo ======================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 20 or higher.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2,3 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 20 (
    echo ❌ Node.js version 20 or higher is required. Current version: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the project
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if not exist "dist\index.js" (
    echo ❌ Build failed. Please check the error messages above.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Test the MCP server
echo 🧪 Testing MCP server...
node test-mcp.js

echo.
echo 🎉 Setup complete!
echo.
echo To connect to Cursor:
echo 1. Open Cursor settings
echo 2. Find the MCP section
echo 3. Add the configuration from mcp-config.json
echo 4. Replace 'your_noah_api_key_here' with your actual API key
echo 5. Restart Cursor
echo.
echo For detailed instructions, see CURSOR_SETUP.md
pause 