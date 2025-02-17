const gaussian_function_2d = (x, y, standard_deviation) => {
  const normalization_factor = 1 / (2 * Math.PI * standard_deviation ** 2); //relative weights
  const euler_exponent = -( (x ** 2 + y ** 2) / (2 * standard_deviation ** 2) );
  return normalization_factor * Math.E ** euler_exponent;
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

  const originalCopy = grid.map(innerArray => [...innerArray]);
  console.log("Original grid: ", originalCopy); //Only for debugging, deleting later.

  //Assuring all values in the kernel add up to 1
  for(let i = 0; i < total_cells; i++) {
    const x = i % grid_size; //No need for half size here since we're not calling gaussian_function_2d
    const y = Math.floor(i / grid_size);

    grid[x][y] = parseFloat((grid[x][y] / normalization_sum).toFixed(3)); //JavaScript sucks at math.
  }

  return grid;
}

//Test
// console.log("Gaussian kernel result: ", generate_gaussian_kernel(5, 3));

//use mirror padding when applying gaussian kernel