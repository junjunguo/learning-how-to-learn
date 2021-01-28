import Reveal from "reveal.js";
import HighLight from "reveal.js/plugin/highlight/highlight.esm.js";

import "./styles.scss";
import { firstSection } from "./firstSection";

import { README } from "../generated/README";
import { norsk } from "../generated/norsk";

const fsTitleEn = "How to Become a More Effective Learner";
const fsTitleNo = "Lære å lære";
let activeLang = navigator.language;
const containerEl = document.querySelector("#slider-container");

const fsno = `${firstSection(fsTitleNo, "english")} ${norsk}`;
const fsen = `${firstSection(fsTitleEn, "bokmål")} ${README}`;

const deck = new Reveal({
  plugins: [HighLight],
});

deck.initialize({
  width: "90%",
  height: "100%",
  margin: 0,
  minScale: 1,
  maxScale: 1,
  controlsTutorial: true,
  progress: true,
  autoAnimate: true,
  autoSlide: 5000,
  loop: false,
  slideNumber: true,
});

const loadLanguage = () => {
  if(activeLang == 'nb') {
    containerEl.innerHTML = fsno;
  } else {
    containerEl.innerHTML = fsen;
  }

  const fsLangEl = document.querySelector('#fs-lang'); 
  fsLangEl.addEventListener("click", () => {
    activeLang = activeLang == 'nb' ? 'en' : 'nb'
    loadLanguage();
    
    setTimeout(() => {
      deck.next();
    }, 66);
  });

}

loadLanguage();

