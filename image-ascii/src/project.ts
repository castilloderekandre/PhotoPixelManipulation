import {makeProject} from '@motion-canvas/core';

import kernel from './scenes/kernel?scene';
import gaussianfunction from './scenes/gaussianfunction?scene';

export default makeProject({
  scenes: [gaussianfunction, kernel],
});
