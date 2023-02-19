const CANVAS_SIZE = 500;
const DEFAULT_TEXT = `1. 내용을 한 줄씩 입력합니다.
2. 클릭하여 회전합니다.
3. 즐겁게 사용합니다!`;

let inputText = "";
const textArea = document.getElementById("text-area");

textArea.addEventListener("input", (event) => {
  inputText = event.target.value;
});

function setup() {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  canvas.parent("#canvas");
  textArea.value = DEFAULT_TEXT;
  inputText = textArea.value;
}

let rotationAngle = 0;
let isSpinning = false;

let easingFactor = 0.99;

function draw() {
  colorMode(RGB, 255);
  background(50);
  stroke(50);

  const textLines = inputText.split("\n");
  const numTextLines = textLines.length;

  colorMode(HSB, 100);

  push();
  translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  rotate(rotationAngle);

  for (let i = 0; i < numTextLines; i++) {
    fill((i * 72) % 100, 50, 80);
    arc(0, 0, CANVAS_SIZE - 100, CANVAS_SIZE - 100, 0, TWO_PI / numTextLines, PIE);
    rotate(TWO_PI / numTextLines);
  }

  for (let i = 0; i < numTextLines; i++) {

    fill((i * 72) % 100, 80, 100);
    text(textLines[i], 40, -3);
    rotate(TWO_PI / numTextLines);
  }

  pop();

  triangle(90, 110, 110, 90, 120, 120);
}

function mousePressed() {
  if (isSpinning) return;
  isSpinning = true;

  const rotationSpeed = 1 + Math.random() * 0.1;
  let currentRotationSpeed = rotationSpeed;

  const interval = setInterval(() => {
    rotationAngle += currentRotationSpeed;
    currentRotationSpeed *= easingFactor;

    if (currentRotationSpeed < 0.0001) {
      clearInterval(interval);
      isSpinning = false;
    }
  }, 10);
}
