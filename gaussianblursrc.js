const canvasSketch = require('canvas-sketch');

import { generate_gaussian_kernel } from './gaussianKernel';

const grayscaleCanvas = document.getElementById('grayscaleCanvas');
const gaussianCanvas = document.getElementById('gaussianCanvas');

let settings = {
  canvas: gaussianCanvas,
  dimensions: [ 2048, 2048 ]
};

const STANDARD_DEVIATION = 1;
let GRID_SIZE;

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const gaussianBlurSketch = async () => {

  GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const imageData = grayscaleCanvas.getContext('2d').getImageData(0, 0, width, height);

    const kernel = generate_gaussian_kernel(GRID_SIZE, STANDARD_DEVIATION);

    let blurImageData = applyKernel(imageData, kernel, convolutionHorizontal);
    blurImageData = applyKernel(blurImageData, kernel, convolutionVertical);

    context.putImageData(blurImageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');

  };
};

const getPixelsValue = (imageData, x, y) => {
  const pixels = imageData.data;
  const PIXEL_DATA_WIDTH = 4; //Readability
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * imageData.width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability

  return pixels[OFFSET_COLUMN * x + OFFSET_ROW * y];
}

const getPixelsIndex = (width, x, y) => {
  const PIXEL_DATA_WIDTH = 4; //Readability
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability

  return OFFSET_COLUMN * x + OFFSET_ROW * y;
}

const convolutionHorizontal = (v) => {
  v;
}

const convolutionVertical = (x, y) => {
  return [y, x];
}

const applyKernel = (imageData, kernel, convolutionDirection) => {
  const newImageData = new ImageData(imageData.width, imageData.height);
  const HALF_SIZE = Math.floor(GRID_SIZE / 2);
  const WIDTH;

  //width and height vary
  for(let y = 0; y < imageData.height; convolutionDirection(y)) {
    for(let x = 0; x < imageData.width; convolutionDirection(x)) {

      let convolution = 0;
      let pixelIndex;

      for(let i = -HALF_SIZE; i < HALF_SIZE; i++) {
        pixelIndex = getPixelsIndex(imageData.width, bounceCoordinate(x + i), bounceCoordinate(y + i));
        convolution += imageData.data[pixelIndex] * kernel[i + HALF_SIZE]
      }

      newImageData[pixelIndex] = newImageData[pixelIndex + 1] = newImageData[pixelIndex + 2] = convolution;
      newImageData[pixelIndex + 3] = 255;
    }
  }
}

const bounceCoordinate = (coord, max) => Math.abs((Math.abs(coord) + max) % (2 * max) - max); //Bounces the coordinate if necesarry to get the mirror padding.


const getSharedImageElement = () => {
  console.log("Attempting to return sharedImageElement!");
  return MyApp.sharedImage;
}

const start = async () => {
  image = getSharedImageElement(); //Still necesarry to determine 
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
