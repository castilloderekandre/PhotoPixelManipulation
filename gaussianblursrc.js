const canvasSketch = require('canvas-sketch');

import { generate_gaussian_kernel } from './gaussianKernel';

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
    const totalCells = imageData.width * imageData.height;
    const padding = getMirrorPadding(imageData);
    console.log("Extracted padding: ", padding);

    const kernel = generate_gaussian_kernel(3, 1);

    const blurImageData = new ImageData(imageData.width, imageData.height);

    //Create a 2D array that represents the image patch. Check for edges, if need be, fill in edges with respective padding values. Convolute with gaussian kernel. Add new value to blurImageData.
    for(let i = 0; i < totalCells; i++) {
      const imagePatch = Array.from( //Find a way to reuse values since image patch only shifts by 1 every iteration in any one direction
        { length: 3 },
        (_, y) => Array.from(
          { length: 3 },
          (_, x) => {
            const current_x = i % image.width;
            const current_y = Math.floor(i / image.width);
            const next_x = current_x + x - 1; //Offset 1 to center 'x'
            const next_y = current_y + y - 1; //Offset 1 to center 'y'

            if(next_y < 0)
              return padding[0][next_x + 1];
            else if (next_x < 0)
              return padding[2][next_y + 1];
            else if (next_x >= imageData.width)
              return padding[3][next_y + 1];
            else if (next_y >= imageData.height)
              return padding[1][next_x + 1];

            return getPixelsValue(imageData, next_x, next_y);
          }
        )
      );

      convolute(imagePatch, kernel);
    }

    context.putImageData(blurImageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

//Needs rework to become scalable. Use repeating values as a starting point.
const getMirrorPadding = (imageData) => {
  const pixels = imageData.data;

  console.log('Pixels: ', pixels);

  const PADDING_HORIZONTAL_LENGTH = imageData.width  + 2; //Readability
  const PADDING_VERTICAL_LENGTH   = imageData.height + 2; //Readability

  const padding = Array.from(
    { length: 4 },
    () => []
  );

  //In terms of pixels and not RGB values; we can assume the indexing will be by 1 (Pixel) instead of 4 (RGBA).
  padding[2][0] /*Values repeat*/     = padding[0][0]                         = getPixelsValue(imageData, 1,                   1);
  padding[2][PADDING_VERTICAL_LENGTH] = padding[0][PADDING_HORIZONTAL_LENGTH] = getPixelsValue(imageData, imageData.width - 2, 1);
  padding[3][0]                       = padding[1][0]                         = getPixelsValue(imageData, 1,                   imageData.height - 2);
  padding[3][PADDING_VERTICAL_LENGTH] = padding[1][PADDING_HORIZONTAL_LENGTH] = getPixelsValue(imageData, imageData.width - 2, imageData.height - 2);
  for(let i = 0; i < imageData.width; i++) {
    padding[0][i + 1] = getPixelsValue(imageData, i, 1);
    padding[1][i + 1] = getPixelsValue(imageData, i, imageData.height - 2);
  }
  for(let i = 0; i < imageData.height; i++) {
    padding[2][i + 1] = getPixelsValue(imageData,                   1, i);
    padding[3][i + 1] = getPixelsValue(imageData, imageData.width - 2, i);
  }

  return padding;
}

const getPixelsValue = (imageData, x, y) => {
  const pixels = imageData.data;
  const PIXEL_DATA_WIDTH = 4; //Readability
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * imageData.width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability

  return pixels[OFFSET_COLUMN * x + OFFSET_ROW * y];
}

const convolute = (matrix_a, matrix_b) => {

}

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
