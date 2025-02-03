const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
  };
};

canvasSketch(sketch, settings);

function getimage() {
  const file = document.getElementById("imageupload")?.files[0]; //Gets element where image was uploaded duh. Gets first file because we're not uploading multiple images, just one.
  if (!file) return;

  const reader = new FileReader(); //FileReader to transform data into Data URL
  const image = document.getElementById("imagepreview"); //Get image element from the html
  console.log(file);
  reader.addEventListener('load', () => { image.src = reader.result; }, false); //Adds event to execute upon finishing the ".readAsDataURL(file)". Sets image source as reader result
  
  image.onload = () => {

  }


  reader.readAsDataURL(file);
}