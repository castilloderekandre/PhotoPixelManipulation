const gaussian_function_2d = (x, y, standard_deviation) => {
  const normalization_factor = 1 / (2 * Math.PI * standard_deviation ** 2); //relative weights
  const euler_exponent = -( (x ** 2 + y ** 2) / (2 * standard_deviation ** 2) );
  return normalization_factor * Math.exp(euler_exponent);
}

export function generate_gaussian_kernel(grid_size, standard_deviation) {
  const half_size = Math.floor(grid_size / 2);
  let normalization_sum = 0;

  const grid = Array.from(
    { length: grid_size },
    (_, y) => Array.from(
      { length: grid_size },
      (_, x) => {
        const gaussian = gaussian_function_2d(x - half_size, y - half_size, standard_deviation);
        normalization_sum += gaussian;
        return gaussian;
      }
    )
  );

  console.log("Normalization sum: ", normalization_sum)

  const originalCopy = grid.map(innerArray => [...innerArray]);
  console.log("Original grid: ", originalCopy); //Only for debugging, deleting later.

  //Assuring all values in the kernel add up to 1
  for(let y = 0; y < grid_size; y++){
    for(let x = 0; x < grid_size; x++) {
      grid[y][x] = grid[y][x] / normalization_sum; //JavaScript sucks at math.
    }
  }

  console.log("Grid: ", grid);
  return grid;
}

//Test
// console.log("Gaussian kernel result: ", generate_gaussian_kernel(5, 3));

//use mirror padding when applying gaussian kernel