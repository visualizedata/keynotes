const moment = require('moment')
const colors = require('./colors.js')
const config = require('../poster.config.js')

const sketch = p => {
  let fontface
  let c = 0
  let pause = 0
  let pause_duration = 70
  let rotation_angle = 90

  // normalized coordinates
  normX = 0
  normY = 0

  let featuredTextPos = 0
  let featuredTextArray = [
    config.title,
    config.school,
    config.department,
    ...config.students
  ]
  let featuredTexts = ['', '', '']

  p.preload = () => {
    fontface = p.loadFont('./fonts/NeueDisplay-Wide.otf')
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL)

    p.textFont(fontface)

    normX = p.width * -0.5
    normY = p.height * -0.5

    p.noStroke()
    p.updateFeaturedText()
  }

  p.title = () => {
    p.push()
    p.fill(colors['Parsons Red'])
    p.textSize(100)

    p.textAlign(p.CENTER, p.CENTER)
    p.text(config.title, 0, 0, 0)
    p.pop()
  }

  // drawing a cube with text on each face
  p.textCube = ({
    c, // rotation angle in degrees
    x = 0, // x-coordinate of the cube's position
    y = 0, // y-coordinate of the cube's position
    z = 0, // z-coordinate of the cube's position
    size = 300, // size of the cube
    backgroundColor, // background color of the cube
    textColor, // color of the text on the cube
    texts, // an array of 3 strings to display on the cube's faces
    textSizeRatio = 0.08, // ratio of the text size to the cube's size
    textRotationAngle = -p.HALF_PI / 2 // rotation angle of the text on the cube's faces
  } = {}) => {
    // Save the current transformation matrix, stroke weight, and fill color
    p.push()

    // Translate to the cube's position in 3D space
    p.translate(x, y, z)

    // Convert the rotation angle from degrees to radians
    let r = c => (p.PI / 180) * c

    // Rotate the cube around the x- and y-axes by the given angle
    p.rotateX(r(c))
    p.rotateY(r(c))

    // Draw the cube with a filled background color with no stroke
    p.push()
    p.noStroke()
    p.fill(backgroundColor)
    p.box(size)
    p.pop()

    // Rotate the cube so that the first face is facing the camera
    p.rotateY(-p.HALF_PI)
    p.rotateX(-p.HALF_PI)

    // Loop through the 3 faces of the cube that have text
    for (let i = 0; i <= 2; i++) {
      // Save the current transformation matrix
      p.push()
      // Set the font settings for the text
      p.textFont(fontface)
      p.textSize(size * textSizeRatio)
      p.textAlign(p.CENTER, p.CENTER)
      p.fill(textColor)
      // Set the text and position for the current face of the cube
      let text = texts[i % texts.length]
      switch (i) {
        case 0:
          p.translate(0, 0, size / 2 + 1)
          break
        case 1:
          p.translate(size / 2 + 1, 0, 0)
          p.rotateY(p.HALF_PI)
          p.rotateZ(p.HALF_PI)
          break
        case 2:
          p.translate(0, -size / 2 - 1, 0)
          p.rotateX(p.HALF_PI)
          break
      }
      p.push()
      p.rotate(textRotationAngle)
      p.text(text, -size / 2 + 19, -size / 2 + 19, size - 40, size - 40)
      p.pop()

      // Restore the previous transformation matrix
      p.pop()
    }

    // Restore the previous transformation matrix, stroke weight, and fill color
    p.pop()
  }

  p.draw = () => {
    p.background(colors['Parsons Red'])

    let size = p.max(p.width * 0.25, 150)
    let offset = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) - 200

    p.textCube({
      c,
      size,
      x: 0,
      y: -10,
      z: 200,
      backgroundColor: colors['Parsons Red'],
      textColor: colors['White'],
      texts: featuredTexts
    })
    p.textCube({
      c,
      size,
      x: offset,
      y: -10,
      z: 100,
      backgroundColor: colors['Parsons Red'],
      textColor: colors['Transparent White'],
      texts: [config['title']],
      textOpacity: 50,
      textSizeRatio: 0.06,
      textRotationAngle: p.HALF_PI / 2
    })
    p.textCube({
      c,
      size,
      x: -offset,
      y: -10,
      z: 100,
      backgroundColor: colors['Parsons Red'],
      textColor: colors['Transparent White'],
      texts: [config['title']],
      textOpacity: 50,
      textSizeRatio: 0.06,
      textRotationAngle: p.HALF_PI / 2
    })

    p.counter()
  }

  p.counter = () => {
    if (pause >= pause_duration) {
      pause = 0
      c = 0
      p.updateFeaturedText()
    }
    if (c >= rotation_angle && pause < pause_duration) {
      pause++
    } else if (pause < 1 && c < rotation_angle) {
      c++
    } else {
      c = 0
    }
  }

  p.updateCanvasSize = (w, h) => {
    console.log('resize canvas', w, h)
    normX = p.width * -0.5
    normY = p.height * -0.5
    p.resizeCanvas(w, h)
  }

  p.updateFeaturedText = () => {
    featuredTextPos++
    const featuredText =
      featuredTextArray[featuredTextPos % featuredTextArray.length]
    const nextFeaturedText =
      featuredTextArray[(featuredTextPos + 1) % featuredTextArray.length]
    featuredTexts = [nextFeaturedText, featuredText, nextFeaturedText]
  }
}

module.exports = sketch
