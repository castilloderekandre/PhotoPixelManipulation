import CanvasImage from "./canvasImage";

const grayscaleFilter = (canvasImage: CanvasImage) => {
	for (let i = 0; i < canvasImage.imageData.data.length; i+=4) {
		const grayscalePixel = Math.floor(0.299 * canvasImage.imageData.data[i] + 0.587 * canvasImage.imageData.data[i + 1] + 0.114 * canvasImage.imageData.data[i + 2]);
		canvasImage.imageData.data[i] = canvasImage.imageData.data[i + 1] = canvasImage.imageData.data[i + 2] = grayscalePixel;
	}

	canvasImage.context.putImageData(canvasImage.imageData, 0, 0);
	console.log('FILTER: Grayscale applied');
};

export default grayscaleFilter;
