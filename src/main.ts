import "./style.css";
import { data } from "./data";

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shiftGrid = () => {
  const imgParents: NodeList | any =
    document.querySelectorAll("#div-img__parents");
  const img: NodeList | any = document.querySelectorAll("#img-items");
  for (let i = 0; i < imgParents.length; i++) {
    imgParents[i].style.transform = `translate(${randomNum(
      0,
      100
    )}px, ${randomNum(0, 150)}px)`;
    img[i].style.width = `${randomNum(70, 200)}px`;
  }
};

const scaleImg = () => {
  const img: NodeList | any = document.querySelectorAll("#img-items");
  const zoomIn = () => {
    for (let i = 0; i < img.length; i++) {
      img[i].onpointerover = () => {
        img[i].style.transiton = `transform 1279s ease-in-out .51s`;
        img[i].style.transform = `scale(${randomNum(1.2, 1.5)})`;
      };
    }
    return img;
  };

  const zoomOut = () => {
    for (let i = 0; i < img.length; i++) {
      img[i].onpointerout = () => {
        img[i].style.transiton = `transform 0.1s ease-in-out`;
        img[i].style.transform = `scale(1)`;
      };
    }
  };
  zoomIn();
  zoomOut();
};

const addText = () => {
  const div: NodeListOf<Element> | any =
    document.querySelectorAll("#div-img__parents");

  for (let i = 0; i < data.length; i++) {
    const p = document.createElement("p");
    p.innerText = data[i].name;
    p.style.position = "absolute";
    p.style.display = "none";
    p.style.zIndex = "999";

    div[i]?.appendChild(p);

    div[i].onpointerover = (e: PointerEvent) => {
      p.style.left = e.x + "px";
      p.style.top = e.y + "px";
      p.style.display = "block";
    };

    div[i].onpointerout = () => {
      p.style.display = "none";
    };
  }

  return div;
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
    div.appendChild(img);
    viewport?.appendChild(div);
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
  addText();
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
