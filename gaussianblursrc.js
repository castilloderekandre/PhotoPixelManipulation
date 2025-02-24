const canvasSketch = require('canvas-sketch');

import { generate_gaussian_kernel } from './gaussianKernel';

const grayscaleCanvas = document.getElementById('grayscaleCanvas');
const gaussianCanvas = document.getElementById('gaussianCanvas');

let settings = {
  canvas: gaussianCanvas,
  dimensions: [ 2048, 2048 ]
};

const STANDARD_DEVIATION = 1;

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const gaussianBlurSketch = async () => {

  const GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;
  const HALF_SIZE = Math.floor(GRID_SIZE / 2);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const imageData = grayscaleCanvas.getContext('2d').getImageData(0, 0, width, height);
    const totalCells = imageData.width * imageData.height;

    const kernel = generate_gaussian_kernel(GRID_SIZE, STANDARD_DEVIATION);

    const blurImageData = new ImageData(imageData.width, imageData.height);
    const bounceCoordinate = (coord, max) => Math.abs((Math.abs(coord) + max) % (2 * max) - max); //Bounces the coordinate if necesarry to get the mirror padding.
    for(let i = 0; i < totalCells; i++) {
      const imagePatch = Array.from( //Find a way to reuse values since image patch only shifts by 1 every iteration in any one direction
        { length: GRID_SIZE },
        (_, y) => Array.from(
          { length: GRID_SIZE },
          (_, x) => {
            let next_x = (i % image.width) + x - HALF_SIZE; //Offset to center 'x'
            let next_y = Math.floor(i / image.width) + y - HALF_SIZE; //Offset to center 'y'

            next_x = bounceCoordinate(next_x, imageData.width);
            next_y = bounceCoordinate(next_y, imageData.height);

            return getPixelsValue(imageData, next_x, next_y);
          }
        )
      );

      blurImageData.data[4 * i] = blurImageData.data[4 * i + 1] = blurImageData.data[4 * i + 2] = convolve(imagePatch, kernel);
      blurImageData.data[4 * i + 3] = 255;
    }

    context.putImageData(blurImageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

const getMirrorPadding = (imageData, GRID_SIZE) => {
  const HALF_SIZE = GRID_SIZE / 2 | 0; //GRID_SIZE SHOULD always be positive. If it's negative that means something has gone terribly wrong.
  
  const CORNERS = {
    TOP_LEFT:     (padding_level) => { return { x: padding_level + 1,                   y: padding_level + 1 }},
    TOP_RIGHT:    (padding_level) => { return { x: imageData.width - padding_level - 1, y: padding_level + 1 }},
    BOTTOM_LEFT:  (padding_level) => { return { x: padding_level + 1,                   y: imageData.height - padding_level - 1 }},
    BOTTOM_RIGHT: (padding_level) => { return { x: imageData.width - padding_level - 1, y: imageData.height - padding_level - 1 }} 
  };

  const padding = {
    up: [],
    down: [],
    left: [],
    right: []
  };
  //height and width often vary in images. some logic depends on the height/width respectively.
  for(let padding_level = 0; padding_level < HALF_SIZE; padding_level++) {
    const [TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT] = [CORNERS.TOP_LEFT(padding_level), CORNERS.TOP_RIGHT(padding_level), CORNERS.BOTTOM_LEFT(padding_level), CORNERS.BOTTOM_RIGHT(padding_level)]
    const [PADDING_HORIZONTAL_LENGTH, PADDING_VERTICAL_LENGTH] = [imageData.width + padding_level, imageData.height + padding_level];
    //Due to kernel being symmetric, we can insert beginning/ending values (corners) of the arrays
    for(let corner = 0; corner < HALF_SIZE; corner++) {
      padding.up[padding_level][corner]                             = getPixelsValue(imageData, TOP_LEFT.x - corner, TOP_LEFT.y); //Beginning
      padding.up[padding_level][PADDING_HORIZONTAL_LENGTH + corner] = getPixelsValue(imageData, TOP_RIGHT.x + padding_level - corner, TOP_RIGHT.y); //Ending

      padding.down[padding_level][corner]                             = getPixelsValue(imageData, BOTTOM_LEFT.x - corner, BOTTOM_LEFT.y);
      padding.down[padding_level][PADDING_HORIZONTAL_LENGTH + corner] = getPixelsValue(imageData, BOTTOM_RIGHT.x + padding_level - corner, BOTTOM_RIGHT.y);
      
      padding.left[padding_level][corner]                           = getPixelsValue(imageData, TOP_LEFT.x, TOP_LEFT.y - corner);
      padding.left[padding_level][PADDING_VERTICAL_LENGTH + corner] = getPixelsValue(imageData, TOP_LEFT.x, TOP_LEFT.y + padding_level - corner);

      padding.right[padding_level][corner]                           = getPixelsValue(imageData, TOP_RIGHT.x, TOP_RIGHT.y - corner);
      padding.right[padding_level][PADDING_VERTICAL_LENGTH + corner] = getPixelsValue(imageData, TOP_RIGHT.x, TOP_RIGHT.y + padding_level - corner);
    }

    for(let pixel = 0; pixel < imageData.width; pixel++) {
      padding.up[padding_level][HALF_SIZE + pixel - 1]   = getPixelsValue(imageData, pixel, TOP_LEFT.y);
      padding.down[padding_level][HALF_SIZE + pixel - 1] = getPixelsValue(imageData, pixel, BOTTOM_LEFT.y);
    }

    for(let i = 0; i < imageData.height; i++) {
      padding.left[padding_level][HALF_SIZE + pixel - 1]  = getPixelsValue(imageData, TOP_LEFT.x, pixel);
      padding.right[padding_level][HALF_SIZE + pixel - 1] = getPixelsValue(imageData, TOP_RIGHT.x, pixel)
    }
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

const convolve = (matrix_a, matrix_b) => {
  let sum = 0;
  for(let y = 0; y < 3; y++) {
    for(let x = 0; x < 3; x++) {
      sum += Math.round(matrix_a[x][y] * matrix_b[x][y]);
    }
  }

  return sum;
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
