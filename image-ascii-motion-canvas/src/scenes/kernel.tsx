import {Circle, makeScene2D, Txt} from '@motion-canvas/2d';
import {createRef, createRefMap, makeRef, range, sequence, all, delay, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const GRID_SIZE: number = 5;
  const GRID_FONT_SIZE: number = 30;
  const GRID_SPACING: number = GRID_FONT_SIZE * 3;
  const labels: Txt[] = [];
  const letters = createMatrixText(GRID_SIZE);

  view.add(
    <>
      {
        range(letters.length).map(i => (
          <Txt 
            ref={makeRef(labels, i)} 
            position={[(i % GRID_SIZE) * GRID_SPACING - GRID_SPACING * Math.floor(GRID_SIZE / 2), Math.floor(i / GRID_SIZE) * GRID_SPACING - GRID_SPACING * Math.floor(GRID_SIZE / 2)]}
            fill={'rgba(255, 255, 255, 0)'}
            fontSize={GRID_FONT_SIZE}
          >
            {letters[i]}
          </Txt>
        ))
      }
    </>
  );

  yield * sequence(0.05,
    ...labels.map(label => label.fill('rgba(255,255,255,1)', 1))
  );

  const reflect: Txt[][] = [];
  reflect[0] = labels.slice(5, 10);
  reflect[1] = labels.slice(15, 20);
  reflect[2] = labels.filter((_, i) => (i % GRID_SIZE) == 1 && Math.floor(i / GRID_SIZE) !== 1);
  reflect[3] = labels.filter((_, i) => (i % GRID_SIZE) == 3 && Math.floor(i / GRID_SIZE) !== 1);

  yield * all(
    sequence(0.2,
      ...reflect[0].map(label => label.fill('#4C7AE4', 1))
    ),
    sequence(0.2,
      ...reflect[1].map(label => label.fill('#4C7AE4', 1))
    ),
    delay(0.2,
      all(...reflect[2].map(label => label.fill('#4C7AE4', 1)))
    ),
    delay(0.8,
      all(...reflect[3].map(label => label.fill('#4C7AE4', 1)))
    )
  );
  
  yield * waitFor(2);

  yield * all(
    sequence(0.2,
      ...reflect[1].map(label => label.fill('white', 1))
    ),
    delay(0.2,
      all(...reflect[2].map(label => label.fill('white', 1)))
    ),
    delay(0.8,
      all(...reflect[3].map(label => label.fill('white', 1)))
    )
  );

  const padding: Txt[] = [];

  view.add(
    <>
      {
        range(5).map(i => (
          <Txt
            ref={makeRef(padding, i)}
            position={[i * GRID_SPACING - GRID_SPACING * Math.floor(GRID_SIZE / 2), -GRID_SPACING - GRID_SPACING * Math.floor(GRID_SIZE / 2)]}
            fill={'rgba(76, 122, 228, 0)'}
            fontSize={GRID_FONT_SIZE}
          >
            {letters[i + 5]}
          </Txt>
        ))
      }
    </>
  )

  yield * sequence(0.1,
    ...padding.map(label => label.fill('rgba(76, 122, 228, 1)', 0.5))
  )
});


const createMatrixText = (size: number) => {
  const text: string[] = [];
  for(let i = 0; i < size ** 2; i++) {
    text.push(`P${i}`);
  }

  return text;
}