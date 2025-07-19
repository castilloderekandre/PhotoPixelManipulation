import {Latex, makeScene2D} from '@motion-canvas/2d';
import {createRef, createRefMap, makeRef, range, sequence, all, delay, waitFor} from '@motion-canvas/core';


export default makeScene2D(function* (view) {
  const tex = createRef<Latex>();
  
  view.add(
    <Latex ref={tex} tex={''} fill={'white'}/>
  )

  yield* waitFor(0.2);
  yield* tex().tex(['f(x) = ', 'e', '^{-x^2}'], 1)
  yield* waitFor(1);
  yield* tex().tex(['f(x) = ', 'a', 'e', '^{ {{ -( }} x {{ -b }} {{ ) }} ^2 {{ \\over 2 {{ c }} ^2 }} }'], 1)
  yield* waitFor(1);
  yield* tex().tex(['f(x) = ', 'a', '\\text{exp}', '\\left(-', '{{ ( }} x {{ -b }} {{ ) }} ^2 {{ \\over 2 {{ c }} ^2 }}', '\\right)'], 1)
  yield* waitFor(1);
  // yield* tex().tex(['f(x) = ', 'a', '\\text{exp}', '{{\\left(}} -{{\\frac{ (x{{-b}})^2 }{ 2c^2 }}} {{\\right)}}'], 1)
  // yield* waitFor(1);
  // yield* tex().tex(['a', '\\text{exp}', '\\left( -\\frac{ (x{{-b}})^2 }{ 2{{c}}^2 } \\right)'], 1)
  // yield* waitFor(1);
  // yield* tex().tex(['\\frac{1}{\\sigma\\sqrt{2\\pi}}', '\\text{exp}', '\\left( -\\frac{ (x{{-\\mu}})^2 }{ 2{{\\sigma}}^2 } \\right)'], 1)
  // yield* waitFor(1);


});