const spatialKernel = (x, y, xo, yo, sigma) => { // coordinate input
  const sigma2 = 2 * sigma * sigma;
  return Math.exp( -((x - xo)**2 + (y-yo)**2) / sigma2 );
}

const rangeKernel = (i, io, sigma) => { // intensity input
  const sigma2 = 2 * sigma * sigma;
  return Math.exp( -((i + io)**2) / sigma2 );
}

const getPixelIndex = (width, x, y) => {
  const PIXEL_DATA_WIDTH = 4; //Readability
  const OFFSET_ROW    = PIXEL_DATA_WIDTH * width;
  const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability

  return OFFSET_COLUMN * x + OFFSET_ROW * y;
}

const bilateralfilter = (canvas) => {
  const width = canvas.width;
  const height = canvas.height;
  GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;
  HALF_SIZE = GRID_SIZE / 2 | 0;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);

  const grayscaleImageData = window.MyApp.grayscaleCanvas.getContext('2d').getImageData(0, 0, width, height); // [TODO] CHECK FOR NULL
  
  
}

const applyKernels = (grayscaleImageData) => {
  
}

const bounceCoordinate = (coord, max) => Math.abs((Math.abs(coord) + max) % (2 * max) - max); //Bounces/reflects the coordinate if necesarry to get the mirror padding.
