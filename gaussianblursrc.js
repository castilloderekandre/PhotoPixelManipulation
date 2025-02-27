const canvasSketch = require('canvas-sketch');

import { generate_gaussian_kernel } from './gaussianKernel';

const grayscaleCanvas = document.getElementById('grayscaleCanvas');
const gaussianCanvas = document.getElementById('gaussianCanvas');

let settings = {
  canvas: gaussianCanvas,
  dimensions: [ 2048, 2048 ]
};

const STANDARD_DEVIATION = 3;
let GRID_SIZE;
let HALF_SIZE;

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const gaussianBlurSketch = async () => {

  GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;
  HALF_SIZE = Math.floor(GRID_SIZE / 2);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const imageData = grayscaleCanvas.getContext('2d').getImageData(0, 0, width, height);

    const kernel = generate_gaussian_kernel(GRID_SIZE, STANDARD_DEVIATION);
    
    let blurImageData = applyKernel(imageData, kernel);
    blurImageData = applyKernel(blurImageData, kernel, true);
    
    context.putImageData(blurImageData, 0, 0); //Unusual clipping at the bottom
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

const applyKernel = (imageData, kernel, rowOrderFirst=false) => {
  const newImageData = new ImageData(imageData.width, imageData.height);
  const HALF_SIZE = Math.floor(GRID_SIZE / 2);

  //Make modular
  if (!rowOrderFirst) { //Horizontal pass
    for(let y = 0; y < imageData.height; y++) { //y & x need to be interchangable for future modular function
      for(let x = 0; x < imageData.width; x++) {

        let convolution = 0.00;
        let pixelIndex;

        for(let i = -HALF_SIZE; i < HALF_SIZE; i++) {
          pixelIndex = getPixelsIndex(imageData.width, bounceCoordinate(x + i, imageData.width), y); //Non repeatable for future modular function
          convolution += imageData.data[pixelIndex] * kernel[i + HALF_SIZE];
        }


        pixelIndex = getPixelsIndex(imageData.width, x, y);

        newImageData.data[pixelIndex] = newImageData.data[pixelIndex + 1] = newImageData.data[pixelIndex + 2] = Math.min(255, Math.round(convolution)); //I miss explicit typing
        newImageData.data[pixelIndex + 3] = imageData.data[pixelIndex + 3];
      }
    }
  } else { //Vertical pass
    for(let x = 0; x < imageData.width; x++) {
      for(let y = 0; y < imageData.height; y++) {

        let convolution = 0;
        let pixelIndex;

        for(let i = -HALF_SIZE; i < HALF_SIZE; i++) {
          pixelIndex = getPixelsIndex(imageData.width, x, bounceCoordinate(y + i, imageData.height));
          convolution += imageData.data[pixelIndex] * kernel[i + HALF_SIZE];
        }

        pixelIndex = getPixelsIndex(imageData.width, x, y);

        newImageData.data[pixelIndex] = newImageData.data[pixelIndex + 1] = newImageData.data[pixelIndex + 2] = Math.min(255, Math.round(convolution));
        newImageData.data[pixelIndex + 3] = imageData.data[pixelIndex + 3];
      }
    }
  }

  return newImageData;
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
