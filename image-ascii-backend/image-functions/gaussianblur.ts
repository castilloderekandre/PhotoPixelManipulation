import { Image, ImageData, CanvasRenderingContext2D, Canvas, createCanvas } from "canvas";
import CanvasImage from "./canvasImage";

let GRID_SIZE: number;
let HALF_SIZE: number;

const gaussianBlurFilter = (canvasImage: CanvasImage, STANDARD_DEVIATION: number): void => {
	GRID_SIZE = Math.floor(6 * STANDARD_DEVIATION) + 1;                 
	HALF_SIZE = GRID_SIZE / 2 | 0;

	const kernel = generate_gaussian_kernel(GRID_SIZE, STANDARD_DEVIATION);
	applyKernel(canvasImage.imageData, kernel);
	applyKernel(canvasImage.imageData, kernel, true);
	canvasImage.context.putImageData(canvasImage.imageData, 0, 0);
	console.log('FILTER: Gaussian Blur applied');
};

const getPixelsIndex = (width: number, x: number, y: number): number => {
	const PIXEL_DATA_WIDTH: number = 4; //Readability
	const OFFSET_ROW: number       = PIXEL_DATA_WIDTH * width;
	const OFFSET_COLUMN: number    = PIXEL_DATA_WIDTH; //Readability

	return OFFSET_COLUMN * x + OFFSET_ROW * y;
}

const applyKernel = (imageData: ImageData, kernel: Float32Array<ArrayBuffer>, rowOrderFirst: boolean = false): void => {
	//Make modular
	// for (let p = 0; p < 2; p++) {
	//   for(let window_index = -KERNEL_HALF_SIZE; window_index < KERNEL_HALF_SIZE; window_index++) {

	//     let x = bounceCoordinate(i * (p === 0) + j * p + window_index * p, grayscaleImageData.width - 1);
	//     let y = bounceCoordinate(j * (p === 0) + i * p + window_index * p, grayscaleImageData.height - 1);

	//     const intensity = grayscaleImageData.data[getPixelIndex(grayscaleImageData.width, x, y)]


	//   }
	// }

	if (!rowOrderFirst) { //Perform horizontal pass
		for(let y = 0; y < imageData.height; y++) { //[TODO] make y & x interchangable
			for(let x = 0; x < imageData.width; x++) {
				let convolution = 0;
				let pixelIndex;
				for(let offset = -HALF_SIZE; offset < HALF_SIZE; offset++) {
					pixelIndex = getPixelsIndex(
						imageData.width, //Width is used to map 1D array to a 2D grid
						bounceCoordinate(x + offset, imageData.width - 1),
						y 
					);
					convolution += imageData.data[pixelIndex] * kernel[offset + HALF_SIZE];
				}

				pixelIndex = getPixelsIndex(imageData.width, x, y);

				// Apply convolution result to RGB channels, clamping values to 255
				imageData.data[pixelIndex] = imageData.data[pixelIndex + 1] = imageData.data[pixelIndex + 2] = Math.min(255, Math.round(convolution));
				imageData.data[pixelIndex + 3] = imageData.data[pixelIndex + 3];
			}
		}
	} else { // Vertical pass
		for(let x = 0; x < imageData.width; x++) {
			for(let y = 0; y < imageData.height; y++) {
				let convolution = 0;
				let pixelIndex;
				for(let offset = -HALF_SIZE; offset < HALF_SIZE; offset++) {
					pixelIndex = getPixelsIndex(
						imageData.width/*This never changes regardless of column-major/row-major order*/, 
						x, 
						bounceCoordinate(y + offset, imageData.height - 1)
					);
					convolution += imageData.data[pixelIndex] * kernel[offset + HALF_SIZE];
				}
				pixelIndex = getPixelsIndex(imageData.width, x, y);
				imageData.data[pixelIndex] = imageData.data[pixelIndex + 1] = imageData.data[pixelIndex + 2] = Math.min(255, Math.round(convolution));
				imageData.data[pixelIndex + 3] = imageData.data[pixelIndex + 3];
			}
		}
	}
}

const bounceCoordinate = (coord: number, max: number): number => Math.abs((Math.abs(coord) + max) % (2 * max) - max); //Bounces/reflects the coordinate if necesarry to get the mirror padding.

const generate_gaussian_kernel = (GRID_SIZE: number, standard_deviation: number): Float32Array<ArrayBuffer> => {
	let normalization_sum = 0;

	// const NORMALIZATION_FACTOR = 1 / (Math.sqrt(2 * Math.PI) * standard_deviation); //could be unnecesarry, have to test performance gain/loss and final product
	const standard2 = 2 * standard_deviation * standard_deviation;

	const kernel = new Float32Array(GRID_SIZE);

	for(let i = 0; i < kernel.length; i++) {
		const x = i - HALF_SIZE;
		normalization_sum += kernel[i] = Math.exp(-((x * x) / standard2));
	}

	//Normalizing to avoid darkening or brightening the image
	for(let x = 0; x < GRID_SIZE; x++) {
		kernel[x] /= normalization_sum;
	}

	return kernel;
}

export default gaussianBlurFilter;
