import CanvasImage from "./canvasImage";
import bilateralFilter from "./bilateralFilter";
import grayscaleFilter from "./grayscale";
import gaussianBlurFilter from "./gaussianblur";
//import * as ffmpeg from "@ffmpeg/core"; NO TYPED DEFINITIONS - FIX!!

/**
 * The AsciiGenerator class manages the functionality for converting an image into ASCii.
 * It supports the following output image types:
 * * jpeg
 * * jpeg base64
 * * png
 * * txt
 */
class AsciiGenerator {

	imageResult: string

	constructor() {
		this.imageResult = "";
		//ffmpeg();
	}

	/** The core entrypoint for creating an image.
			* @param {string} base64Image - The raw imageData as base64
		*/
	async make(base64Image: string): Promise<string> {
		try {
			const canvasImage = await CanvasImage.create(base64Image);	
			grayscaleFilter(canvasImage);
			bilateralFilter(canvasImage, 7, 1.5, 15);
			gaussianBlurFilter(canvasImage, 1);
			
			const result = canvasImage.canvas.toDataURL();
			return result;
		} catch (error) {
			throw new Error(`Failed to convert image to ASCII text: ${error}`);
		}
	}

}

export default AsciiGenerator;
