"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    constructor() {
        this.imageResult = "";
        //ffmpeg();
    }
    /** The core entrypoint for creating an image.
     * @param {string} imageData - The raw imageData as base64
    */
    make(imageData) {
        let result = "A cool looking image";
        return result;
    }
}
exports.default = AsciiGenerator;
