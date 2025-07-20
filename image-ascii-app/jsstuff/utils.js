import bilateralfilter from "./bilateralfilter.js";

export const sourceImage = new Image();
export const grayscaleImage = new ImageData(150, 150);
export const sourceImageUpdater = (new_image) => {
  sourceImage = new_image;
}

/** 
  grayscaleImage -> bilateral filter -> Image()
  use the image to write a canvas
*/
const bilateral_filter_helper = () => {
  
}