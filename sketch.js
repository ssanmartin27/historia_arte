let rectX = 150; // X-coordinate of the rectangle
let rectY = 20; // Y-coordinate of the rectangle
let rectWidth = 700; // Width of the rectangle
let rectHeight = 780; // Height of the rectangle
let circleRadius = 6; // Radius of the circles
let gap = 8; // Gap between the circles
let cnv;
let flag = true;

let arrows = [];
let arrowNum = 25;
let arrowSize = 30;


function preload() {
  img = loadImage("image.png");
  pt = loadImage("painting.png")
  arm = loadImage("arm3.png")
  for (let i = 0; i < arrowNum; i++) {
    arrows.push(new Arrow());
  }

}

function setup() {

createCanvas(1300,800)
 
cnv = createGraphics(width, height);
cnv.stroke(0)
cnv.fill(250, 250, 250, 235);
cnv.rect(rectX, rectY, rectWidth, rectHeight);
cnv.stroke(0)
// Calculate the number of circles needed
let numCirclesX = floor(rectWidth / (2 * circleRadius + gap));
let numCirclesY = floor(rectHeight / (2 * circleRadius + gap));
cnv.erase()
  // Draw circles along the top side of the rectangle
for (let i = 0; i < numCirclesX; i++) {
    let x = rectX + i * (2 * circleRadius + gap);
    let y = rectY;
  cnv.ellipse(x, y, circleRadius * 2);
  }

  // Draw circles along the right side of the rectangle
for (let i = 0; i < numCirclesY; i++) {
    let x = rectX + rectWidth;
    let y = rectY + i * (2 * circleRadius + gap);
    cnv.ellipse(x, y, circleRadius * 2);
}

  // Draw circles along the bottom side of the rectangle
for (let i = numCirclesX ; i >= 0 ; i--) {
    let x = rectX + i * (2 * circleRadius + gap);
    let y = rectY + rectHeight;
    cnv.ellipse(x, y, circleRadius * 2);
  }

  // Draw circles along the left side of the rectangle
for (let i = numCirclesY-1; i >= 0; i--) {
    let x = rectX;
    let y = rectY + i * (2 * circleRadius + gap);
    cnv.ellipse(x, y, circleRadius * 2);
  }
  
cnv.noErase()
cnv.noFill()
cnv.stroke(0,0,0, 230)
cnv.rect(rectX+20, rectY+20, rectWidth-35, rectHeight-35)
img.loadPixels();
cnv2 = createGraphics(width, height);
  
for (x = 0; x < img.width; x = x + 5) {
   for (y = 0; y < img.height; y = y + 5) {
      index = (floor(x) + floor(y) * img.width) * 4;
      r = img.pixels[index]
      b = img.pixels[index + 1]
      g = img.pixels[index + 2]
      al = img.pixels[index + 3]
      //pixel_brightness = (red + blue + green) / 3
      cnv2.strokeWeight(30 * Math.random())
      cnv2.stroke(r+random()*80, b+Math.random()*50, g+Math.random()*50, al/(5 * Math.random()))
      cnv2.line(x + random(-1,1) * 100,y +Math.random(-1,1)*100 ,x + 50 + random(-1,1)*100,y + 50 + random(-1,1)*20)
     
    }
}




}

function draw() {

  image(cnv2, 0, 0)
  if (mouseIsPressed) {
    flag = false
  }
  if (flag) {
  image(cnv, 0,0)
  textSize(100);
  fill(255, 140, 0, 200)
  noStroke();
  strokeWeight(2);
  text("CARTAGENA", 200, 120)}
  blendMode(MULTIPLY)
  image(pt, 70, 100, 700,700)
  blendMode(BLEND)
  
  if (!flag) {
    if(mouseX>=190 && mouseX <=730 && mouseY>=100 &&mouseY<=750) {
    for (let i = 0; i < arrows.length; i++) {
    arrows[i].update();
    arrows[i].display();
  }
    }
}
}

class Arrow {
  constructor() {
    this.angle = TWO_PI / arrowNum * arrows.length;
    this.pos = createVector(width / 2 + 500 + cos(this.angle) * 450, height / 2 + 450+ sin(this.angle) * 450);
    this.dir = createVector(cos(this.angle), sin(this.angle));
  }
  
  update() {
    // Update direction to point towards mouse
    let mousePos = createVector(mouseX, mouseY);
    this.dir = p5.Vector.sub(mousePos, this.pos).normalize();
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.dir.heading());
    // Draw arrow
    arm.resize(120, 60)
    arm.loadPixels()
    for (x = 0; x < arm.width; x = x + 5) {
   for (y = 0; y < arm.height; y = y + 5) {
      index = (floor(x) + floor(y) * arm.width) * 4;
      r = arm.pixels[index]
      b = arm.pixels[index + 1]
      g = arm.pixels[index + 2]
      al = arm.pixels[index + 3]
      //pixel_brightness = (red + blue + green) / 3
      strokeWeight(9 * Math.random())
      stroke(r+60, b+60, g+60, al/(4 * Math.random()))
      line(x + random() * 5,y +Math.random()*2 ,x + 10 ,y + 10)
     
    }
}
    //image(arm, 0, 0, 100, 40)
    pop();
  }
}

