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
     * @param {string} imageData - The raw imageData as base64
    */
    make(imageData: string): string {
        let result = "A cool looking image";
        return result;
    }
}

export default AsciiGenerator;
