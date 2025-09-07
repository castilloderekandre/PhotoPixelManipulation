import { Image, ImageData, CanvasRenderingContext2D, Canvas, createCanvas } from "canvas";

type CanvasData = [Canvas, CanvasRenderingContext2D, ImageData];

class CanvasImage {

	private _base64Image: string = '';
	get base64Image(): string {
		return this._base64Image;
	}
	private set base64Image(newValue: string) {
		this._base64Image = newValue;
	}

	private _canvas: Canvas;
	get canvas(): Canvas {
		return this._canvas;
	}
	private set canvas(newValue: Canvas) {
		this._canvas = newValue;	
	}

	private _context: CanvasRenderingContext2D;
	get context(): CanvasRenderingContext2D {
		return this._context;
	}
	private set context(newValue: CanvasRenderingContext2D) {
		this._context = newValue;
	}

	private _imageData: ImageData;
	get imageData(): ImageData {
		return this._imageData;
	}
	private set imageData(newValue: ImageData) {
		this._imageData = newValue;
	}

	private constructor(base64Image: string, [canvas, context, imageData]: CanvasData) {
		this._base64Image = base64Image;
		this._canvas = canvas;
		this._context = context;
		this._imageData = imageData;
	}

	static async create(base64Image: string): Promise<CanvasImage> {
		const image: CanvasData = await this.processImage(base64Image)	

		return new CanvasImage(base64Image, image);
	}

	private static processImage(base64Image: string): Promise<CanvasData> {
		return new Promise((resolve, reject) => {
			const image = new Image();

			image.onload = () => {
				const [ canvas, context ] = this.getCanvasElements(image);
				resolve([
					canvas,
					context,
					context.getImageData(0, 0, canvas.width, canvas.height)
				]);
			}
			image.onerror = () => reject(new Error('Image could not be proccesed.'));
			image.src = base64Image;
		});
	}

	private static getCanvasElements(image: Image): [Canvas, CanvasRenderingContext2D] {
		const canvas = createCanvas(image.width, image.height);
		const context = canvas.getContext('2d') as CanvasRenderingContext2D;

		context.drawImage(image, 0, 0);

		return [ canvas, context ];
	}
}

export default CanvasImage;
