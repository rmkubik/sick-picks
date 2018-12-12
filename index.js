import "babel-polyfill";
import "./typography";
import Parser from "rss-parser";
import dateFormat from "date-fns/format";
import nextUntil from './nextUntil';
import overrides from './overrides';

const isSickPick = header =>
  header.innerText
    .toLowerCase()
    .trim()
    .match(/si.*ck.*pi.*ck/);

const rssParser = new Parser();

(async () => {
  const feed = await rssParser.parseURL("https://feed.syntax.fm/rss");
  let sickPicks = [];
  feed.items.forEach(item => {
    const sickPick = document.createElement("div");

    const header = document.createElement("h2");
    header.innerText = item.title;
    sickPick.appendChild(header);

    const pubDate = document.createElement("p");
    pubDate.innerText = dateFormat(new Date(item.pubDate), "MMMM D, YYYY");
    sickPick.appendChild(pubDate);

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(item.content, "text/html");
    const headers = doc.querySelectorAll('h2');
    const headerTag = [...headers].find(isSickPick);

    if (headerTag || overrides.some(override => override.title === item.title)) {
      let picks;
      if (overrides.some(override => override.title === item.title)) {
        const override = domParser.parseFromString(overrides.find(override => override.title === item.title).picks, "text/html");
        picks = [...override.body.children];
      } else {
        picks = nextUntil(headerTag, 'h2');
      }
  
      picks.forEach(pick => {
        if (pick instanceof Node) {
          sickPick.appendChild(pick);
        }
      })

      sickPicks.push(sickPick);
    }
  });

  sickPicks.forEach(sickPick => {
    document.body.appendChild(sickPick);
  });
})();
