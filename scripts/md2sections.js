const marked = require("marked");
const fs = require("fs");

const substrFromFirstSection = (str = "") =>
  `${str.substr(str.indexOf("<section>"))}</section></section>`;

marked.setOptions({ headerIds: false });

const readMe = fs.readFileSync("README.md", "utf-8");

const renderer = {
  paragraph(text) {
    const regexRotating = /⚙|🌀/gu;
    const regexPulse = /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|🏗|🗃|🏖|⛷|🎟/gu;
    let classNames = null;

    if (text.match(regexRotating)) {
      classNames = `class="moji animated rotating"`;
    } else if (text.match(regexPulse)) {
      classNames = `class="moji animated pulse"`;
    }

    return classNames
      ? `<div class="moji-wrapper"><div ${classNames}>${text}</div></div>`
      : `<p>${text}</p>`;
  },
  heading(text, level) {
    switch (level) {
      case 1:
        return "";
      case 2:
        return `
                    </section>
                </section>
                <section>                
                    <section>
                        <h${level}>
                            ${text}
                        </h${level}>`;
      case 3:
      case 4:
        return `
                    </section>
                    <section>
                        <h${level}>
                            ${text}
                        </h${level}>`;
      default:
        return `
                    <h${level}>
                        ${text}
                    </h${level}>
                    `;
    }
  },
};

marked.use({ renderer });

const sections = substrFromFirstSection(marked(readMe));

const generated = "generated";

if (!fs.existsSync(generated)) {
  fs.mkdirSync(generated);
}

fs.writeFileSync(
  `${generated}/sections.js`,
  `export const sections = \`${sections}\`;`
);
