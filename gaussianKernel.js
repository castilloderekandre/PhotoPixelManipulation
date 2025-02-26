export function generate_gaussian_kernel(grid_size, standard_deviation) {
  const half_size = Math.floor(grid_size / 2);
  let normalization_sum = 0;
  
  const NORMALIZATION_FACTOR = 1 / Math.sqrt(2 * Math.PI) * standard_deviation; //could be unnecesarry, have to test performance gain/loss and final product
  const standard22 = 2 * standard_deviation ** 2;
  
  const kernel = new Float32Array(grid_size);
  
  for(let i = 0; i < kernel.length; i++) {
    const x = i - half_size;
    kernel[i] = NORMALIZATION_FACTOR * Math.exp(-((x * x) / standard22));
  }

  console.log("Normalization sum: ", normalization_sum)

  const originalCopy = kernel.map(value => value);
  console.log("Original kernel: ", originalCopy); //Only for debugging, deleting later.

  //Normalizing to avoid darkening or brightening the image
  for(let x = 0; x < grid_size; x++) {
    kernel[x] /= normalization_sum; //JavaScript sucks at math.
  }

  console.log("kernel: ", kernel);
  return kernel;
}