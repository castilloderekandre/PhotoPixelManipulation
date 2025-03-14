const grayscaleSketch = (canvas) => {
  const [width, height] = [window.MyApp.sharedImage?.width, window.MyApp.sharedImage?.height];

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);

  context.drawImage(window.MyApp.sharedImage, 0, 0);

  const imageData = context.getImageData(0, 0, width, height);

  for (let i = 0; i < imageData.data.length; i+=4) {
    const grayscalePixel = 0.299 * imageData.data[i] + 0.587 * imageData.data[i + 1] + 0.114 * imageData.data[i + 2];
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayscalePixel;
  }

  context.putImageData(imageData, 0, 0);
  console.log('Grayscale sketch rendered successfully! (Doesn\'t say it\'s displayed the way the user intended)');
};

window.MyApp.grayscaleSketch = grayscaleSketch;