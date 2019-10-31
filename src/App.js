import React from 'react';
//
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0 
    };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  //
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    const canvas = this.canvasRef.current;
    const img = this.imageRef.current;
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      const colorsArray = [];

      for (var i = 0; i < img.width; i++) {
        const rawColorData = ctx.getImageData(i, img.height - 1, 1, 1).data;
        const hexValue = `#${("000000" + this.rgbToHex(rawColorData[0], rawColorData[1], rawColorData[2])).slice(-6)}`;

        // colorsArray.push(hexValue);

        ctx.fillStyle = hexValue;
        ctx.fillRect(i, img.height, 1, this.state.height - img.height);

      }

    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  //

  rgbToHex = (r, g, b) => {
    if (r > 255 || g > 255 || b > 255) {
        console.log('Invalid color component');
        return;
    }

    return ((r << 16) | (g << 8) | b).toString(16);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  //

  render() {
    return (
      <div className="App">
        <canvas id="canvas" ref={this.canvasRef} width={this.state.width} height={this.state.height}></canvas>
        <img ref={this.imageRef} alt="Ocean" src={require("./overseas_xs_1.jpg")} style={{display: 'none'}} />
      </div>
    );
  }  
}

export default App;
