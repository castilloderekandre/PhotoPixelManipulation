const canvasSketch = require('canvas-sketch');

const grayscaleCanvas = document.getElementById('grayscaleCanvas');
const gaussianCanvas = document.getElementById('gaussianCanvas');

let settings = {
  canvas: gaussianCanvas,
  dimensions: [ 2048, 2048 ]
};

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const gaussianBlurSketch = async () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const imageData = grayscaleCanvas.getContext('2d').getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const padding = getMirrorPadding(imageData);
    console.log("Extracted padding: ", padding);

    const blurImageData = new ImageData(imageData.width, imageData.height);

    //Create a 2D array that represents the image patch. Check for edges, if need be, fill in edges with respective padding values. Convolute with gaussian kernel. Add new value to blurImageData.

    context.putImageData(blurImageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

const getMirrorPadding = (imageData) => {
  const pixels = imageData.data;

  console.log('Pixels: ', pixels);

  const PIXEL_DATA_WIDTH = 4;
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * imageData.width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //For readability. Will probably just indicate OFFSET_COLUMN is the same as PIXEL_DATA_WIDTH in a comment later
  const PADDING_HORIZONTAL_LENGTH = imageData.width + 2; //Readability
  const PADDING_VERTICAL_LENGTH   = imageData.height + 2; //Readability

  const padding = Array.from(
    { length: 4 },
    () => []
  );

  //In terms of pixels and not RGB values; we can assume the indexing will be by 1 (Pixel) instead of 4 (RGBA). Only exception is 'i'
  padding[2][0] /*Values intersect*/  = padding[0][0]                         = pixels[                        OFFSET_COLUMN +                          OFFSET_ROW]; //Gets (1,1) value
  padding[2][PADDING_VERTICAL_LENGTH] = padding[0][PADDING_HORIZONTAL_LENGTH] = pixels[(imageData.width - 2) * OFFSET_COLUMN +                          OFFSET_ROW]; //Gets (Width - 1, 1) value
  padding[3][0]                       = padding[1][0]                         = pixels[                        OFFSET_COLUMN + (imageData.height - 2) * OFFSET_ROW]; //Gets (1, Height - 1) value
  padding[3][PADDING_VERTICAL_LENGTH] = padding[1][PADDING_HORIZONTAL_LENGTH] = pixels[(imageData.width - 2) * OFFSET_COLUMN + (imageData.height - 2) * OFFSET_ROW]; //Gets (Width - 1, Height - 1) value
  for(let i = 0; i < imageData.width; i++) {
    padding[0][i + 1] = pixels[                         OFFSET_ROW + i * PIXEL_DATA_WIDTH]; //Goes down 1 row, iterates from there using 'i'
    padding[1][i + 1] = pixels[(imageData.height - 2) * OFFSET_ROW + i * PIXEL_DATA_WIDTH]; //Goes up 1 row from bottom, iterates from there using 'i'
  }
  for(let i = 0; i < imageData.height; i++) {
    padding[2][i + 1] = pixels[                        OFFSET_COLUMN + OFFSET_ROW * i * PIXEL_DATA_WIDTH]; //Goes down 1 row on each 'i' iteration. Always 1 column to the right
    padding[3][i + 1] = pixels[(imageData.width - 2) * OFFSET_COLUMN + OFFSET_ROW * i * PIXEL_DATA_WIDTH]; //Goes down 1 row on each 'i' iteration. Always 2nd to last column.
  }

  return padding;
}

const getSharedImageElement = () => {
  console.log("Attempting to return sharedImageElement!");
  return MyApp.sharedImage;
}

const start = async () => {
  image = getSharedImageElement();
  manager = await canvasSketch(sketch, settings);
  manager.render();

  image.addEventListener(
    'load',
    () => {
      console.log('I EXECUTED UPON IMAGE \'load\' EVENT!');
      let no_src = image.currentSrc.length === 0;
      sketch = no_src ? defaultSketch : gaussianBlurSketch;

      if (no_src){
        settings.dimensions = [2048, 2048];
      } else {
        settings.dimensions = [image.width, image.height];
      }

      manager.loadAndRun(sketch, settings);
    }
  );
}

let image;
let manager;
let sketch = defaultSketch;
start();
