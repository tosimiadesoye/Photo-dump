import "./style.css";
import { data } from "./data";
import { randomNum, shuffleArray } from "./func";

let pointerX = 0;
let pointerY = 0;
let index: string | null;

const text: HTMLParagraphElement = document.createElement("h3");
const shuffledData = shuffleArray(data);

const shiftGrid = () => {
  const imgParents: NodeListOf<HTMLElement> =
    document.querySelectorAll("#div-img__parents");

  for (let i = 0; i < imgParents.length; i++) {
    imgParents[i].style.transform = `translate(${randomNum(
      0,
      100
    )}px, ${randomNum(0, 150)}px)`;
    imgParents[i].style.width = `${randomNum(50, 100)}px`;
    imgParents[i].style.height = `${randomNum(50, 100)}px`;
  }
};

const scaleImg = () => {
  const img: NodeListOf<HTMLElement> = document.querySelectorAll("#img-items");
  const zoomIn = () => {
    for (let i = 0; i < img.length; i++) {
      img[i].onpointerover = () => {
        img[i].style.width = "300px";
        img[i].style.height = "300px";
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

const fadeImg = (img: HTMLImageElement) => {
  let opacity = 0;

  const fadeIn = setInterval(() => {
    opacity += 0.1;

    img.style.opacity = `${opacity}`;

    if (opacity >= 1) clearInterval(fadeIn);
  }, 100);
};

const addText = () => {
  const parent = document.getElementById("parent-text__hover");

  for (let i = 0; i < shuffledData.length; i++) {
    const div = document.createElement("div");

    if (index === data[i].id) {
      text.innerText = data[i].name!;
      div?.appendChild(text);
      parent?.appendChild(div);
      text.setAttribute("style", `--left: ${pointerX}px; --top:${pointerY}px`);

      if (index === null) text.style.display = "none";
    }
  }

  return parent;
};

const pointerEventsImg = (img: HTMLImageElement, id: string) => {
  img.onpointermove = () => {
    addText();
    index = id;
    text.className = "p-text__hover";
  };

  img.onpointerenter = (e: PointerEvent) => {
    pointerX = e.x;
    pointerY = e.y;
  };

  return img;
};

const getImages = () => {
  const viewport = document.getElementById("viewport");

  for (let i = 0; i < shuffledData.length; i++) {
    const div = document.createElement("div");

    div.id = "div-img__parents";

    const img: HTMLImageElement = document.createElement("img");
    img.className = "img-items";
    img.id = "img-items";

    img.src = data[i].image!;
    img.alt = data[i].name!;

    fadeImg(img);

    div.appendChild(img);
    viewport?.appendChild(div);
    pointerEventsImg(img, data[i].id!);
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

  const viewport = document.getElementById("viewport");

  window.addEventListener(
    "pointermove",
    (e: PointerEvent) => {
      const { x, y } = transformViewport(e.x, e.y);

      if (typeof viewport !== "undefined")
        viewport!.style.transform = `translate(${-x * -2}px, ${-y * -2}px)`;
    },
    false
  );
};
getContainer();
