import { Image, ImageData, CanvasRenderingContext2D, Canvas, createCanvas } from "canvas";
import CanvasImage from "./canvasImage";

class Kernel {
	private _size!: number;
	private _halfSize!: number;

	get size(): number {
		return this._size;
	}

	set size(newValue: number) {
		this._size = newValue;
		this._halfSize = Math.floor(this.size / 2);
	}
	
	get halfSize() {
		return this._halfSize;
	}

	constructor(size: number) {
		this.size = size;
	}
}

/**
* Returns the cartesian distance between two points on a pixel grid.
* @param x - The x coordinate
* @param y - The y coordinate
* @param xo - The anchor/center x coordinate
* @param yo - The anchor/center y coordinate
* @returns cartesian distance
*/
const spatialKernel = (
	x: number,
	y: number,
	xo: number,
	yo: number,
	sigma: number
): number => {
	const sigma2: number = 2 * sigma * sigma;
	return Math.exp( -((x - xo)**2 + (y-yo)**2) / sigma2 );
}

/**
* 
* @param i - p in pixel intensity
* @param io - The anchor/center pixel intensity
* @param sigma - Coeficient controlling width of gaussian curve
* @returns 
*/
const rangeKernel = (
	i: number, 
	io: number, 
	sigma: number,
): number => { // intensity input
	// just normal gaussian function
	const sigma2: number = 2 * sigma * sigma;
	return Math.exp( -((i - io)**2) / sigma2 );
}

// const get1DGaussian = (q, p, sigma) => {
//   const sigma2 = 2 * sigma * sigma;
//   return Math.exp( -((p - q)**2) / sigma2 );
// }

/**
* Through row-major flattening, it returns the index for a 1D array.
* @param width - Width of the image in pixels
* @param x - Desired X
* @param y - Desired Y
* @returns Index of Red channel
*/
function getPixelIndex (width: number, x: number, y: number): number {
	const PIXEL_DATA_WIDTH: number = 4; //Readability
	const OFFSET_ROW: number    = PIXEL_DATA_WIDTH * width;
	const OFFSET_COLUMN: number = PIXEL_DATA_WIDTH; //Readability

	return OFFSET_COLUMN * x + OFFSET_ROW * y;
}

/**
* Applies a bilateral filter over an image
* @param grayscale_canvas 
* @param new_canvas 
* @returns filtered image
*/
const bilateralFilter = (
	canvasImage: CanvasImage,
	KERNEL_SIZE: number,
	SPATIAL_SIGMA: number,
	RANGE_SIGMA: number
): void => {

	const kernel = new Kernel(KERNEL_SIZE);
	applyKernels(canvasImage.imageData, kernel, SPATIAL_SIGMA, RANGE_SIGMA);
	canvasImage.context.putImageData(canvasImage.imageData, 0, 0);
	console.log('FILTER: Bilateral filter applied');
}

const applyKernels = (imageData: ImageData, kernel: Kernel, SPATIAL_SIGMA: number, RANGE_SIGMA: number): void => {


	let spatial_kernel: number[][] = Array.from( // spatial kernel will always be consistent so we precompute it
		{ length: kernel.size},
		(_, i) => Array.from(
			{ length: kernel.size },
			(_, j) => spatialKernel(i - kernel.halfSize, j - kernel.halfSize, 0, 0, SPATIAL_SIGMA)
		) 
	);


	for (let i = 0; i < imageData.height; i++) {
		for (let j = 0; j < imageData.width; j++) {

			let window_sum: number = 0;
			let kernel_sum: number = 0;
			const center_pixel_intensity: number = imageData.data[getPixelIndex(imageData.width, j, i)];


			for (let window_y: number = 0; window_y < kernel.size /*window size*/; window_y++) {
				for (let window_x: number = 0; window_x < kernel.size /*window size*/; window_x++) {
					const x: number = bounceCoordinate(j + window_x - kernel.halfSize, imageData.width - 1);
					const y: number = bounceCoordinate(i + window_y - kernel.halfSize, imageData.height - 1);
					const neighbor_intensity: number = imageData.data[getPixelIndex(imageData.width, x, y)];
					const w_p: number = spatial_kernel[window_y][window_x] * rangeKernel(neighbor_intensity, center_pixel_intensity, RANGE_SIGMA);
					window_sum += w_p * neighbor_intensity;
					kernel_sum += w_p;
				}
			}

			window_sum /= kernel_sum;
			window_sum = Math.floor(window_sum);

			const pixel_index: number = getPixelIndex(imageData.width, j, i);
			imageData.data[pixel_index] = imageData.data[pixel_index + 1] = imageData.data[pixel_index + 2] = window_sum;
			imageData.data[pixel_index + 3] = 255;
		}
	}
}

const bounceCoordinate = (coord: number, max: number): number => {
	if (coord < 0) return Math.abs(coord);
	if (coord > max) return max - (coord - max);
	return coord
} //Bounces/reflects the coordinate if necesarry to get the mirror padding.

export default bilateralFilter;
