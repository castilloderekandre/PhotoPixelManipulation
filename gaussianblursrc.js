const canvasSketch = require('canvas-sketch');

const grayscaleCanvas = document.getElementById('grayscaleCanvas');
const dogCanvas = document.getElementById('dogCanvas');

let settings = {
  canvas: dogCanvas,
  dimensions: [ 2048, 2048 ]
};

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const gaussianBlurSketch = async () => {

  const dogContext = settings.canvas?.getContext();

  if (!dogContext) {
    console.log('DoG Context is null! Aborting!');
    return;
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.drawImage(image, 0, 0);

    const imageData = dogContext.getImageData(0, 0, width, height);

    //

    context.putImageData(imageData, 0, 0);
    console.log('Gaussian blur sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

const createPadding = (imageData) => {
  const pixels = imageData.data;

  const padding = [];

  for(let i = 0; i < pixels.length; i++) {
    //4 * y... gonna head to bed fam
  }
}

const getSharedImageElement = () => {
  console.log("Attempting to return sharedImageElement!");
  return MyApp.sharedImage;
}

const start = async () => {
  image = getSharedImageElement();
  manager = await canvasSketch(sketch, settings);
  manager.render();

  image.addEventListener(
    'load',
    () => {
      console.log('I EXECUTED UPON IMAGE \'load\' EVENT!');
      let no_src = image.currentSrc.length === 0;
      sketch = no_src ? defaultSketch : gaussianBlurSketch;

      if (no_src){
        settings.dimensions = [2048, 2048];
      } else {
        settings.dimensions = [image.width, image.height];
      }

      manager.loadAndRun(sketch, settings);
    }
  );
}

let image;
let manager;
let sketch = defaultSketch;
start();
