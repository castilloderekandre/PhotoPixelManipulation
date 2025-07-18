// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>Photo Pixel Manipulation </h1>
      <label htmlFor="imageUpload">Select an image: </label>
      <input type="file" id="imageUpload" name="imageUpload" accept='.jpg, .jpeg, .png'/><br />
      <span style={{fontWeight: 'bold'}}>PREVIEW</span>
      <img id='imagePreview' width='300'/>

      <label htmlFor="imagePreviewDimensions">Dimensions: </label>
      <span id="imagePreviewDimensions"></span>
      
      <h3>Grayscale</h3>
      <p>Grayscaling is done by calculating the luminosity of each pixel using</p>
      <canvas id="grayscaleCanvas" ></canvas>

      <h3>Bilateral Filter</h3>
      <canvas id="bilateralfilterCanvas"></canvas>

      <h3>Applying Gaussian Blur</h3>
      <p>Video here.</p>

      <div style={{display: 'flex'}}>
        <div className="blur-container">
          <canvas className="blurCanvas"></canvas>
          <input type="range" className="sigma-input" min="1" max="15" value="1" step="0.1" />
          <p>Value <output className="sigma-value">1</output></p>
        </div>

        <div className="blur-container">
          <canvas className="blurCanvas"></canvas>
          <input type="range" className="sigma-input" min="1" max="15" value="1.6" step="0.1" />
          <p>Value <output className="sigma-value">1.6</output></p>
        </div>
      </div>

      <button id="applyBlur">Apply Blur</button>


      <h3>Difference of Gaussians</h3>
      <canvas id="dogCanvas"></canvas>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  )
}

export default App
