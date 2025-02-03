const canvasSketch = require('canvas-sketch');

let settings = {
  dimensions: [ 2048, 2048 ]
};

const defaultSketch = () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    console.log('Default sketch rendered!');
  }
}

const grayscaleSketch = async () => {

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, width, height);

    for (let i = 0; i < imageData.data.length; i+=4) {
      const grayscalePixel = 0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
      imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayscalePixel;
    }

    context.putImageData(imageData, 0, 0);
    console.log('Grayscale sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
  };
};

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
      sketch = no_src ? defaultSketch : grayscaleSketch;

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
