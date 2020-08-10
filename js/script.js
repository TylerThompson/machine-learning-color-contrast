let output;
// Color handling
const input = document.getElementById('color');
// First train the neural network
let net = new brain.NeuralNetwork();
net.train([
{ input: { r: 0.0, g: 0.0, b: 0.0 }, output: { white: 1 } },
{ input: { r: 1.0, g: 1.0, b: 1.0 }, output: { black: 1 } },
{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } },
{ input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } },
{ input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
{ input: { r: 0.07, g: 0.34, b: 0.0 }, output: { white: 1 } },
{ input: { r: 1.0, g: 0.50, b: 0.50 }, output: { black: 1 } }]);

/**
 * Change Color
 * @description: Change the color of the text based on the background
 * @param {*} e
 */
function changeColor(e) {
  document.body.style.backgroundColor = e.target.value;
  color = hexToRgb(e.target.value);
  Object.keys(color).map(function (key, index) {
    color[key] = +(color[key] / 255).toFixed(2);
  });
  output = net.run(color);
  document.body.style.color = likely(output);
}

/**
 * HexToRgb
 * @description: Change our Hex values to Standard RGB output
 * @param {*} hex
 */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16) } :
  null;
}

/**
 * Likely
 * @description How likely the text is to be either white or black
 * @param {*} result
 */
function likely(result) {
  return result.white > result.black ? "white" : "black";
}

// Listen for the color picker input to change
input.addEventListener('input', changeColor);