let settings = {
  dimensions: [ 2048, 2048 ]
};

let canvas;
let ctx;

let STANDARD_DEVIATION = 1;
let GRID_SIZE;
let HALF_SIZE;

const gaussianBlurSketch = () => {
    const width = canvas.width;
    const height = canvas.height;
    GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;
    HALF_SIZE = GRID_SIZE / 2 | 0;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const imageData = document.getElementById('grayscaleCanvas').getContext('2d').getImageData(0, 0, width, height);

    const kernel = generate_gaussian_kernel(GRID_SIZE, STANDARD_DEVIATION);
    
    let blurImageData = applyKernel(imageData, kernel);
    blurImageData = applyKernel(blurImageData, kernel, true);
    
    ctx.putImageData(blurImageData, 0, 0); //Unusual clipping at the bottom
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');

  };

const getPixelsIndex = (width, x, y) => {
  const PIXEL_DATA_WIDTH = 4; //Readability
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability

  return OFFSET_COLUMN * x + OFFSET_ROW * y;
}

const applyKernel = (imageData, kernel, rowOrderFirst=false) => {
  const newImageData = new ImageData(imageData.width, imageData.height);
  //Make modular
  if (!rowOrderFirst) { //Horizontal pass
    for(let y = 0; y < imageData.height; y++) { //y & x need to be interchangable for future modular function
      for(let x = 0; x < imageData.width; x++) {
        let convolution = 0;
        let pixelIndex;
        for(let i = -HALF_SIZE; i < HALF_SIZE; i++) {
          pixelIndex = getPixelsIndex(imageData.width/*This never changes regardless of column-major/row-major order*/, bounceCoordinate(x + i, imageData.width), y); //Non repeatable for future modular function
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
          pixelIndex = getPixelsIndex(imageData.width/*This never changes regardless of column-major/row-major order*/, x, bounceCoordinate(y + i, imageData.height));
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

const bounceCoordinate = (coord, max) => Math.abs((Math.abs(coord) + max) % (2 * max) - max); //Bounces/reflects the coordinate if necesarry to get the mirror padding.

const setSigmaAndRun = async (newcanvas, sigmaValue) => {
  image = MyApp.sharedImage; //Still necesarry to determine 
  
  canvas = newcanvas;
  canvas.width = image.width;
  canvas.height = image.height;
  ctx = canvas.getContext('2d');

  STANDARD_DEVIATION = sigmaValue;
  gaussianBlurSketch();
}
 

const generate_gaussian_kernel = (GRID_SIZE, standard_deviation) => {
  const half_size = GRID_SIZE / 2 | 0;
  let normalization_sum = 0;
  
  // const NORMALIZATION_FACTOR = 1 / (Math.sqrt(2 * Math.PI) * standard_deviation); //could be unnecesarry, have to test performance gain/loss and final product
  const standard2 = 2 * standard_deviation * standard_deviation;
  
  const kernel = new Float32Array(GRID_SIZE);
  
  for(let i = 0; i < kernel.length; i++) {
    const x = i - half_size;
    normalization_sum += kernel[i] = Math.exp(-((x * x) / standard2));
  }

  //Normalizing to avoid darkening or brightening the image
  for(let x = 0; x < GRID_SIZE; x++) {
    kernel[x] /= normalization_sum;
  }

  return kernel;
}

let image;
window.MyApp.setBlur = setSigmaAndRun;
