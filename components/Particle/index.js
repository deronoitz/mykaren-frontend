import { useEffect, useState, useRef } from 'react'
const karenParticle = (el, w, h) => {
  const canvas = el;
  const winWidth = w
  const noOfDrops = 70;

  // const [fallingDrops, setFallingDrops] = useState([])
  let fallingDrops = [];
  const x = 0,
        y = 0
  
  const particles = [
    {
      rect: 'M42.8331 99.5685L39.9672 63.5642L2.9663 66.5085L0.960205 41.3624L37.9611 38.4181L35.0954 2.41356L58.3563 0.562042L61.238 36.5664L98.2389 33.6221L100.245 58.7681L63.2441 61.7125L66.11 97.717L42.8331 99.5685Z',
      color: '#20CAEF'
    },
    {
      rect: 'M25.9039 58.6078L23.8597 37.4153L2.08101 39.5152L0.651367 24.714L22.4299 22.6141L20.3809 1.42153L34.0715 0.100983L36.1253 21.2935L57.9057 19.1936L59.3385 33.9948L37.5583 36.0947L39.6121 57.2873L25.9039 58.6078Z',
      color: '#4B4A4A'
    },
    {
      rect: 'M7.66156 51.5868L27.0599 40.6785L38.2701 60.5656L51.8175 52.9473L40.6073 33.06L60.0042 22.1517L52.9543 9.6454L33.5574 20.5537L22.3473 0.666565L8.79987 8.28511L20.01 28.1722L0.611572 39.0805L7.66156 51.5868Z',
      color: '#C5E824'
    },
    {
      rect: 'M8.32602 54.8221L29.3468 43.4596L41.0234 65.0104L55.7044 57.0748L44.0278 35.5238L65.0486 24.1614L57.7041 10.6087L36.6849 21.9713L25.0082 0.420288L10.3273 8.35592L22.004 29.9069L0.983154 41.2694L8.32602 54.8221Z',
      color: '#F72963'
    }
  ];

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
  

  function draw(){
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for(let i=0; i < noOfDrops; i++){
  
      drawPath(fallingDrops[i].rect, fallingDrops[i].color, fallingDrops[i].scale, fallingDrops[i].x, fallingDrops[i].y )
      
      fallingDrops[i].y += fallingDrops[i].speed;
      if (fallingDrops[i].y > h) {
        fallingDrops[i].y = -150;
        fallingDrops[i].x = Math.random() * winWidth;
        fallingDrops[i].scale = getRandomArbitrary(0,1.25);
      }
    }
  }
  
  function drawPath(rect, color, scale, x, y, alpha){
    const ctx = canvas.getContext('2d');
    const path = new Path2D(rect);
    const m = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix()
    const t = m.scale(scale);
    const p = new Path2D();
    p.addPath(path, t);
    ctx.translate(x, y); 
    ctx.fillStyle = color;
    ctx.fill(p);
    ctx.globalAlpha = alpha;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  
  function setup(){
    if(canvas.getContext){
      setInterval(draw, 1);
      const itemLength = particles.length - 1;
      for(let i = 0; i < noOfDrops; i++){
        const itemNumber = Math.round(Math.random() * itemLength);
        const item = particles[itemNumber];
        let fallingDr = {};
        fallingDr.x = Math.round(Math.random() * winWidth);
        fallingDr.y = -150;
        fallingDr.speed = .5 + Math.random() * .5;
        fallingDr.scale = getRandomArbitrary(0,1.25);
        fallingDr.rect = item.rect;
        fallingDr.color = item.color;
        fallingDr.alpha = 1;
        fallingDrops.push(fallingDr);
      }
    }
  }
  setup();
}

export default function KarenParticle(props){
  const [winWidth, setWinWidth] = useState(0);
  const innerCanvas = useRef(null);
  useEffect(() => {
    if(innerCanvas.current) karenParticle(innerCanvas.current, window.innerWidth, props.height)
    if(winWidth === 0) setWinWidth(window.innerWidth);
  }, [])
  return (
    <div className="canvasWrapper">
      <style jsx>
        {`
        .canvasWrapper {
          position: relative;
          overflow: hidden;
        }
        .canvasWrapper::after { 
          content: '';
          position: absolute;
          width: 100%;
          bottom: 0;
          background: linear-gradient(transparent, #fff);
          height: ${props.height / 1.5}px;
          left: 0;
          z-index: 2;
        }
        `}
      </style>
      <canvas ref={innerCanvas} width={winWidth} height={props.height || 'auto'}/>
    </div>
  )
}