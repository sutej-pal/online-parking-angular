// Script to fix Windows path issues with Expo
const fs = require('fs')
const path = require('path')

const expoDir = path.join(__dirname, '.expo')
const metroDir = path.join(expoDir, 'metro')
const externalsDir = path.join(metroDir, 'externals')

// Create directories if they don't exist
const dirs = [expoDir, metroDir, externalsDir]

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    } catch (error) {
      console.error(`Error creating directory ${dir}:`, error.message)
    }
  }
})

console.log('Windows path fix completed!')

