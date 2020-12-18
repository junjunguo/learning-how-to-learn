import Reveal from 'reveal.js';
import HighLight from 'reveal.js/plugin/highlight/highlight.esm.js';

import './styles.scss';
import { firstSection } from './firstSection';
import { sections } from '../generated/sections';

const containerEl = document.querySelector("#slider-container");
console.log(sections);
containerEl.innerHTML = `${firstSection} ${sections}`;
console.log(containerEl);

const deck = new Reveal({
    plugins: [HighLight]
})
deck.initialize(
    {  // Parallax background image
        parallaxBackgroundImage: '', // e.g. "https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg"

        // Parallax background size
        parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px" - currently only pixels are supported (don't use % or auto)

        // Number of pixels to move the parallax background per slide
        // - Calculated automatically unless specified
        // - Set to 0 to disable movement along an axis
        parallaxBackgroundHorizontal: 200,
        parallaxBackgroundVertical: 50,
        width: "95%",
        height: "100%",
        margin: 0,
        minScale: 1,
        maxScale: 1,
//        autoSlide: 2000,
        controlsTutorial: true,
        progress: true,
        autoAnimate: true,
    }
);