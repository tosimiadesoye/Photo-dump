import "./style.css";
import { data } from "./data";
let pointerX = 0;
let pointerY = 0;
let hoverIndex: string | null;

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shiftGrid = () => {
  const imgParents: NodeList | any =
    document.querySelectorAll("#div-img__parents");

  for (let i = 0; i < imgParents.length; i++) {
    imgParents[i].style.transform = `translate(${randomNum(
      0,
      100
    )}px, ${randomNum(0, 150)}px)`;
    imgParents[i].style.width = `${randomNum(70, 150)}px`;
    imgParents[i].style.height = `${randomNum(70, 150)}px`;
  }
};

const scaleImg = () => {
  const img: NodeList | any = document.querySelectorAll("#img-items");
  const zoomIn = () => {
    for (let i = 0; i < img.length; i++) {
      img[i].onpointerover = () => {
        img[i].style.width = "200px";
        img[i].style.height = "200px";
      };
    }
    return img;
  };

  const zoomOut = () => {
    for (let i = 0; i < img.length; i++) {
      img[i].onpointerout = () => {
        img[i].style.width = `${randomNum(70, 200)}px`;
        img[i].style.height = `${randomNum(70, 200)}px`;
      };
    }
  };
  zoomIn();
  zoomOut();
};

const fadeImg = (img: HTMLImageElement | any) => {
  let opacity = 0;

  const fadeIn = setInterval(() => {
    opacity += 0.1;

    img.style.opacity = opacity;

    if (opacity >= 1) clearInterval(fadeIn);
  }, 100);
};

const addText = () => {
  const parent = document.getElementById("parent-text__hover");

  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    const p: HTMLParagraphElement | any = document.createElement("p");

    if (hoverIndex === data[i].id) {
      p.innerText = data[i].name;
      p.className = "p-text__hover";
      div?.appendChild(p);
      parent?.appendChild(div);
      p.style = `--left: ${pointerX}px; --top:${pointerY}px`;
    }
  }

  return parent;
};


const getImages = () => {
  const viewport = document.getElementById("viewport");

  for (let i = 0; i < data.length; i++) {
    const div = document.createElement("div");
    div.className = "div-img__parents";
    div.id = "div-img__parents";

    const img = document.createElement("img");
    img.className = "img-items ";
    img.id = "img-items";
    img.src = data[i].image;
    img.alt = data[i].name;

    fadeImg(img);

    div.appendChild(img);
    viewport?.appendChild(div);

    img.onpointermove = () => {
      addText();

      hoverIndex = data[i].id;
    };

    img.onpointerenter = (e: PointerEvent) => {
      addText();
      pointerX = e.x;
      pointerY = e.y;
      hoverIndex = data[i].id;
    };

    img.onpointerleave = () => {
      hoverIndex = null;
    };
  }

  return viewport;
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
  getImages();
  shiftGrid();
  scaleImg();

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
