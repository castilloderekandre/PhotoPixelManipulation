export function generate_gaussian_kernel(GRID_SIZE, standard_deviation) {
  const half_size = Math.floor(GRID_SIZE / 2);
  let normalization_sum = 0;
  
  // const NORMALIZATION_FACTOR = 1 / (Math.sqrt(2 * Math.PI) * standard_deviation); //could be unnecesarry, have to test performance gain/loss and final product
  const standard2 = 2 * standard_deviation * standard_deviation;
  
  const kernel = new Float32Array(GRID_SIZE);
  
  for(let i = 0; i < kernel.length; i++) {
    const x = i - half_size;
    normalization_sum += kernel[i] = Math.exp(-((x * x) / standard2));
  }

  //Normalizing to avoid darkening or brightening the image
  for(let x = 0; x < GRID_SIZE; x++) {
    kernel[x] /= normalization_sum;
  }

  return kernel;
}