"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the cartesian distance between two points on a pixel grid.
 * @param x - The x coordinate
 * @param y - The y coordinate
 * @param xo - The anchor/center x coordinate
 * @param yo - The anchor/center y coordinate
 * @returns cartesian distance
 */
const spatialKernel = (x, y, xo, yo, sigma) => {
    const sigma2 = 2 * sigma * sigma;
    return Math.exp(-((x - xo) ** 2 + (y - yo) ** 2) / sigma2);
};
/**
 *
 * @param i - p in pixel intensity
 * @param io - The anchor/center pixel intensity
 * @param sigma - Coeficient controlling width of gaussian curve
 * @returns
 */
const rangeKernel = (i, io, sigma) => {
    // just normal gaussian function
    const sigma2 = 2 * sigma * sigma;
    return Math.exp(-((i - io) ** 2) / sigma2);
};
// const get1DGaussian = (q, p, sigma) => {
//   const sigma2 = 2 * sigma * sigma;
//   return Math.exp( -((p - q)**2) / sigma2 );
// }
/**
 * Through row-major flattening, it returns the index for a 1D array.
 * Width is necessary to
 * @param width - Width of the image in pixel
 * @param x - Desired X
 * @param y - Desired Y
 * @returns Index of Red channel
 */
const getPixelIndex = (width, x, y) => {
    const PIXEL_DATA_WIDTH = 4; //Readability
    const OFFSET_ROW = PIXEL_DATA_WIDTH * width;
    const OFFSET_COLUMN = PIXEL_DATA_WIDTH; //Readability
    return OFFSET_COLUMN * x + OFFSET_ROW * y;
};
/**
 * Applies a bilateral filter over an image
 * @param grayscale_canvas
 * @param new_canvas
 * @returns filtered imagea
 */
const bilateralfilter = (grayscale_canvas, new_canvas, KERNEL_SIZE) => {
    const ctx = new_canvas.getContext('2d');
    const width = new_canvas.width = grayscale_canvas.width;
    const height = new_canvas.height = grayscale_canvas.height;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    const grayscaleImageData = grayscale_canvas.getContext('2d').getImageData(0, 0, grayscale_canvas.width, grayscale_canvas.height);
    const bilateralfilter = applyKernels(grayscaleImageData, KERNEL_SIZE);
    ctx.putImageData(bilateralfilter, 0, 0);
};
const applyKernels = (grayscaleImageData, KERNEL_SIZE) => {
    let bilateralfilter = new ImageData(grayscaleImageData.width, grayscaleImageData.height);
    let spatial_kernel = Array.from({ length: KERNEL_SIZE }, (_, i) => Array.from({ length: KERNEL_SIZE }, (_, j) => spatialKernel(i - KERNEL_HALF_SIZE, j - KERNEL_HALF_SIZE, 0, 0, SPATIAL_SIGMA)));
    for (let i = 0; i < grayscaleImageData.height; i++) {
        for (let j = 0; j < grayscaleImageData.width; j++) {
            let window_sum = 0;
            let kernel_sum = 0;
            const anchor_intensity = grayscaleImageData.data[getPixelIndex(grayscaleImageData.width, j, i)];
            for (let window_y = 0; window_y < KERNEL_SIZE /*window size*/; window_y++) {
                for (let window_x = 0; window_x < KERNEL_SIZE /*window size*/; window_x++) {
                    const x = bounceCoordinate(j + window_x, grayscaleImageData.width - 1);
                    const y = bounceCoordinate(i + window_y, grayscaleImageData.height - 1);
                    const window_intensity = grayscaleImageData.data[getPixelIndex(grayscaleImageData.width, x, y)];
                    const w_p = spatial_kernel[window_y][window_x] * rangeKernel(window_intensity, anchor_intensity, RANGE_SIGMA);
                    window_sum += w_p * anchor_intensity;
                    kernel_sum += w_p;
                    // if (rangeKernel(window_intensity, anchor_intensity, RANGE_SIGMA) > 0) {
                    //   console.log(0);
                    //   // console.log(rangeKernel(window_intensity, anchor_intensity, RANGE_SIGMA));
                    // }
                }
            }
            window_sum /= kernel_sum;
            window_sum = Math.floor(window_sum);
            const pixel_index = getPixelIndex(bilateralfilter.width, j, i);
            bilateralfilter.data[pixel_index] = bilateralfilter.data[pixel_index + 1] = bilateralfilter.data[pixel_index + 2] = window_sum;
            bilateralfilter.data[pixel_index + 3] = 255;
        }
    }
    return bilateralfilter;
};
const bounceCoordinate = (coord, max) => Math.abs(coord) & max; //Bounces/reflects the coordinate if necesarry to get the mirror padding.
const KERNEL_SIZE = 7;
const KERNEL_HALF_SIZE = Math.floor(KERNEL_SIZE / 2);
const SPATIAL_SIGMA = 4;
const RANGE_SIGMA = 4;
exports.default = bilateralfilter;
