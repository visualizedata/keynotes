const sketch = p => {
  let fontface
  let rot = 0
  let pause = 0
  let pause_duration = 100
  let rotation_angle = 90

  let featuredTextPos = 0
  let featuredTextArray = [
    ...config.students,
    ...config.themes,
  ]
  let featuredTexts = ['', '', '']

  let save_count = 0;

  p.preload = () => {
    fontface = p.loadFont('../fonts/NeueDisplay-Wide.otf')
  }

  p.setup = () => {
    p.mcanvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL)
    p.updateCanvasSize()
    p.textFont(fontface)
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
    rot, // rotation angle in degrees
    x = 0, // x-coordinate of the cube's position
    y = 0, // y-coordinate of the cube's position
    z = 0, // z-coordinate of the cube's position
    size, // size of the cube
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
    let r = deg => (p.PI / 180) * deg

    // Rotate the cube around the x- and y-axes by the given angle
    p.rotateX(r(rot))
    p.rotateY(r(rot))

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
    const currentBackground = config.themes.includes(featuredTexts[0])?colors['Black']:colors['Parsons Red'];

    p.background(currentBackground);

    let size
    if (p.displayWidth <= 600) {
      size = p.width * 0.5
    } else {
      size = p.max(p.width * 0.25, 150)
    }
    let offset = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) - 200

    p.textCube({
      rot,
      size,
      x: 0,
      y: -10,
      z: 200,
      backgroundColor: currentBackground,//colors['Parsons Red'],
      textColor: colors['White'],
      texts: featuredTexts
    })

    if (p.displayWidth > 600) {
      p.textCube({
        rot,
        size,
        x: offset,
        y: -10,
        z: 100,
        backgroundColor: currentBackground,//colors['Parsons Red'],
        textColor: config.students.includes(featuredTexts[0]) ? colors['Pink'] : colors['White'],
        texts: [config['title']],
        textSizeRatio: 0.06,
        textRotationAngle: p.HALF_PI / 2
      })
      p.textCube({
        rot,
        size,
        x: -offset,
        y: -10,
        z: 100,
        backgroundColor: currentBackground,//colors['Parsons Red'],
        textColor: config.students.includes(featuredTexts[0]) ? colors['Pink'] : colors['White'],
        texts: [config['title']],
        textSizeRatio: 0.06,
        textRotationAngle: p.HALF_PI / 2
      })
    }

    p.counter()
  }

  p.counter = () => {
    if (pause >= pause_duration) {
      pause = 0
      rot = 0
      p.updateFeaturedText()

      if (save_count < featuredTextArray.length) {
        p.saveCanvas(p.mcanvas, featuredTexts[1].replaceAll(" ", "-"), "jpg");
        save_count += 1;
      } else {
        console.log(featuredTextPos, featuredTextArray.length);
      }
    }
    if (rot >= rotation_angle && pause < pause_duration) {
      pause++
    } else if (pause < 1 && rot < rotation_angle) {
      rot++
    } else {
      rot = 0
    }
  }

  p.updateCanvasSize = () => {
    p.updateCanvas16x9()
  }

  p.updateFeaturedText = () => {
    featuredTextPos += 1;
    const featuredText = featuredTextArray[featuredTextPos % featuredTextArray.length];
    const nextFeaturedText =
      featuredTextArray[(featuredTextPos + 1) % featuredTextArray.length]
    featuredTexts = [nextFeaturedText, featuredText, nextFeaturedText]
  }
}

export {sketch};
