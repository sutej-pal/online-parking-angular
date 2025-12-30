// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// Fix for Windows path issues with node:sea and other node: protocol paths
if (process.platform === 'win32') {
  // Disable package exports to avoid node: protocol issues on Windows
  config.resolver = {
    ...config.resolver,
    unstable_enablePackageExports: false,
  }
  
  // Ensure cache directory exists
  const cacheStores = [
    path.resolve(__dirname, '.expo'),
    path.resolve(__dirname, '.expo', 'metro'),
  ]
  
  cacheStores.forEach((cachePath) => {
    try {
      const fs = require('fs')
      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true })
      }
    } catch (e) {
      // Ignore errors
    }
  })
}

module.exports = config

