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

    const padding = getMirrorPadding(imageData);

    console.log("Extracted padding: ", padding);

    context.putImageData(imageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

const getMirrorPadding = (imageData) => {
  const pixels = imageData.data;

  console.log('Pixels: ', pixels);

  const PIXEL_DATA_WIDTH = 4;
  const PADDING_LENGTH_VERTICAL   = PIXEL_DATA_WIDTH * imageData.width  - 2 * PIXEL_DATA_WIDTH;
  const PADDING_LENGTH_HORIZONTAL = PIXEL_DATA_WIDTH * imageData.height - 2 * PIXEL_DATA_WIDTH; 
  const OFFSET_ROW = PIXEL_DATA_WIDTH * imageData.width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH;

  const padding = Array.from(
    { length: 4 },
    () => []
  );

  //In terms of pixels and not RGB values; we can assume the indexing will be by 1 (Pixel) instead of 4 (RGBA)
  for(let i = 0; i < PADDING_LENGTH_HORIZONTAL; i += 4) {
    padding[0][i / 4] = pixels[OFFSET_ROW + OFFSET_COLUMN + i]; //Goes down 1 row, goes right 1 column, iterates from there using 'i'
    padding[1][i / 4] = pixels[(imageData.height - 2) * OFFSET_ROW + OFFSET_COLUMN + i]; //Goes up 1 row from bottom, goes right 1 column, iterates from there using 'i'
  }
  for(let i = 0; i < PADDING_LENGTH_VERTICAL; i += 4) {
    padding[2][i / 4] = pixels[OFFSET_ROW * (i + 1) + OFFSET_COLUMN];
    padding[3][i / 4] = pixels[OFFSET_ROW * (i + 1) + (imageData.width - 2) * OFFSET_COLUMN];
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
