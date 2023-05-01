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

  // declare texture variables
  let texture2

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

    texture1 = p.createGraphics(800, 800)
    texture2 = p.createGraphics(800, 800)

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
    texts // an array of 3 strings to display on the cube's faces
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
      p.textSize(size * 0.08)
      p.textAlign(p.CENTER, p.CENTER)
      p.fill(textColor)
      // Set the text and position for the current face of the cube
      let text = texts[i]
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
      p.rotate(-p.HALF_PI / 2)
      p.text(text, -size / 2 + 19, -size / 2 + 19, size - 40, size - 40)
      p.pop()

      // Restore the previous transformation matrix
      p.pop()
    }

    // Restore the previous transformation matrix, stroke weight, and fill color
    p.pop()
  }

  p.cube = ({ c, x = 0, y = 0, z = 0, size = 300, texture } = {}) => {
    p.push()
    p.translate(x, y, z)

    p.push()

    p.noStroke()

    if (texture) {
      p.texture(texture)
      p.textureMode(p.NORMAL)
    }

    let r = c => (p.PI / 180) * c
    p.rotateX(r(c))
    p.rotateY(r(c))
    p.box(size)

    p.pop()
    p.pop()
  }

  p.drawTexture2 = ({ t } = {}) => {
    t.background(colors['Parsons Red'])
    t.fill(255, 50)
    t.push()

    // font settings
    t.textFont(fontface)
    t.textSize(t.width * 0.06)
    t.textAlign(t.CENTER, t.CENTER)

    // translation
    t.translate(t.width * 0.5, t.height * -0.21)
    t.rotate((t.PI / 180) * 45)

    // write text
    t.text(config['title'], 0, 0, t.width, t.height)

    t.pop()
  }

  p.draw = () => {
    p.background(colors['Parsons Red'])

    p.drawTexture2({ t: texture2 })

    let size = p.max(p.width * 0.18, 150)
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
    p.cube({ c, size, x: offset, y: -10, z: 100, texture: texture2 })
    p.cube({ c, size, x: offset * -1, y: -10, z: 100, texture: texture2 })

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
