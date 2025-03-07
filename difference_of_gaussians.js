
const canvases = [];
const sigmas = [];

const getValues = () => {
  document.querySelectorAll('.blur-container').forEach((nodeList) => {
    const canvas = nodeList.querySelector('.blurCanvas');
    const sigma_input = parseFloat(nodeList.querySelector('.sigma-input')?.value);

    canvases.push(canvas);
    sigmas.push(sigma_input);
  });
}

function dogDraw() {
  getValues();
  const canvas = document.getElementById('dogCanvas');
  canvas.width = canvases[0].width;
  canvas.height = canvases[1].height;
  const ctx = canvas.getContext('2d');

  const dogImageData = applyDoG();

  ctx.putImageData(dogImageData, 0, 0);
  console.log('DoG Sketch ran');
}

const applyDoG = () => {
  const [width, height] = [canvases[0].width, canvases[0].height];
  const [ctx1, ctx2] = [canvases[0].getContext('2d'), canvases[1].getContext('2d')];

  const blurImageData1 = ctx1.getImageData(0, 0, width, height);
  const blurImageData2 = ctx2.getImageData(0, 0, width, height);
  const dogImageData = new ImageData(width, height);

  for(let i = 0; i < blurImageData1.data.length; i += 4) {
    dogImageData.data[i] = dogImageData.data[i + 1] = dogImageData.data[i + 2] = blurImageData2.data[i] - blurImageData1.data[i];
    dogImageData.data[i + 3] = blurImageData1.data[i + 3];
  }

  return dogImageData;
}