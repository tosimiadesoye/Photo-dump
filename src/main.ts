import "./style.css";

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shiftGrid = () => {
  const canvasParent: any = document.getElementById("canvas-parent");
  canvasParent.style.transform = `translate(${randomNum(0, 100)}px, ${randomNum(
    0,
    150
  )}px)`;
};

const getRandomColor = () => {
  let r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return `rgb(${r}, ${g}, ${b} )`;
};

const rectangle = (context: {
  [x: string]: any;
  beginPath: () => void;
  rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
  stroke: () => void;
}) => {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      context?.beginPath();
      context.fillStyle = getRandomColor();
      context?.fillRect(x * randomNum(0, 300), y * randomNum(0, 200), 100, 150);
      context?.stroke();
    }
  }
};

const canvases = () => {
  let canvas: HTMLCanvasElement | any = document.getElementById("myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let context: CanvasRenderingContext2D | any = canvas.getContext("2d");

  rectangle(context);

  return context;
};

const transformViewport = (x: number, y: number) => {
  const speed = 0.5;
  const num = 2 - 1;

  const normaliseX = (x / window.innerWidth) * num;
  const percentageX = normaliseX * 100;
  const translateX = percentageX * speed;

  const normaliseY = (y / window.innerHeight) * num;
  const percentageY = normaliseY * 100;
  const translateY = percentageY * speed;

  return {
    x: translateX,
    y: translateY,
  };
};
const getContainer = () => {
  canvases();
  shiftGrid();
  const viewport: any = document.getElementById("viewport");

  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      const { x, y } = transformViewport(e.x, e.y);

      if (typeof viewport !== "undefined")
        viewport.style.transform = `translate(${-x * -2}px, ${-y * -2}px)`;
    },
    false
  );
};
getContainer();
