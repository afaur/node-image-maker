// Require fs for writing files to the filesystem
const fs = require('fs')

// Require Canvas for drawing an image in memory
const Canvas = require('canvas')

// Make functions for drawing a line, drawing some text, and drawing background

function drawBackground() {
  // Create a colored background that fills the image
  ctx.fillStyle = '#2A5F6A'
  ctx.fillRect(0, 0, width, height)
}

function drawLine() {
  // Set font stroke color
  ctx.strokeStyle = '#4EA1E5'

  // Begin to draw a solid line
  ctx.beginPath()

  // Start the line at (x, y)
  ctx.moveTo(0, 125)

  // Draw the line from the start point to (x, y)
  ctx.lineTo(width, 125)

  // Set the width of the line
  ctx.lineWidth = 1

  // Draw the line that we set up
  ctx.stroke()
}

function drawText() {
  // Set the fill style for text
  ctx.fillStyle = '#fff'

  // Set the font size and type for the text
  ctx.font = '16px Times, sans-serif'

  // Align the text
  ctx.textAlign = 'left'

  // Draw the text at (x, y)
  ctx.fillText('Hello', 10, 23)

  // Change only the alignment of the text
  ctx.textAlign = 'center'

  // Then draw more text at some other positions
  ctx.fillText('One last thing', width/2, 120)
  ctx.fillText('Yo', width/2, 140)
}

// Setup variables for the width and height
const width  = 540
const height = 250

// Create a new instance of Canvas telling it what size you want (w, h)
const canvas = new Canvas(width, height)

// Get a ref to the canvas 2D drawing api for working with the in mem image
const ctx = canvas.getContext('2d')

// Draw background
drawBackground()

// Draw a line
drawLine()

// Draw some text
drawText()

// Create a write stream using fs api and create a png on the filesystem
const outputStream = fs.createWriteStream(__dirname + '/image.png')

// Turn the in memory canvas into a pngStream
const pngStream = canvas.pngStream()

// As the canvas outputs itself as a pngStream, write the data produced to fs
pngStream.on('data', function(dataChunk) { outputStream.write(dataChunk) })

// When canvas is done outputing the pngStream indicate that the save finished
pngStream.on('end', function() { console.log('PNG Saved (image.png)') })
