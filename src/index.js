import Reveal from "reveal.js";
import HighLight from "reveal.js/plugin/highlight/highlight.esm.js";

import "./styles.scss";
import { firstSection } from "./firstSection";
import { sections } from "../generated/sections";

const containerEl = document.querySelector("#slider-container");
containerEl.innerHTML = `${firstSection} ${sections}`;

const deck = new Reveal({
  plugins: [HighLight],
});
deck.initialize({
  width: "90%",
  height: "100%",
  margin: 0,
  minScale: 1,
  maxScale: 1,
  //        autoSlide: 2000,
  controlsTutorial: true,
  progress: true,
  autoAnimate: true,
  autoSlide: 5000,
  loop: false,
  slideNumber: true,
});
