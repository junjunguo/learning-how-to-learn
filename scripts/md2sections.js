const marked = require("marked");
const fs = require("fs");

const mdFileNames = process.argv.slice(2);

const md2HtmlSections = (mdFileName = 'README', generatedFilePath = "generated") => {

  const substrFromFirstSection = (str = "") =>
    `${str.substr(str.indexOf("<section>"))}</section></section>`;

  marked.setOptions({ headerIds: false });

  const mdFile = fs.readFileSync(`${mdFileName}.md`, "utf-8");

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

  const sections = substrFromFirstSection(marked(mdFile));

  if (!fs.existsSync(generatedFilePath)) {
    fs.mkdirSync(generatedFilePath);
  }

  fs.writeFileSync(
    `${generatedFilePath}/${mdFileName}.js`,
    `export const ${mdFileName} = \`${sections}\`;`
  );

}

const run = (mdFileNames) => {
  console.log("MD file names: ", mdFileNames.join(", "));
  for(filename of mdFileNames) {
    md2HtmlSections(filename);
  }
}

run(mdFileNames);