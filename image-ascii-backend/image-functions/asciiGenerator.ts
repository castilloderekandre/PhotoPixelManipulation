import CanvasImage from "./canvasImage";
import bilateralfilter from "./bilateralFilter";
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
			const image = await CanvasImage.create(base64Image);	
			
			const result = image.canvas.toDataURL();
			return result;
		} catch (error) {
			throw new Error(`Failed to convert image to ASCII text: ${error}`);
		}
	}

}

export default AsciiGenerator;
