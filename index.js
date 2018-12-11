import "babel-polyfill";
import Parser from "rss-parser";

const isSickPick = header =>
  header.innerText
    .toLowerCase()
    .trim()
    .match(/si(.*)ck(.*)pi(.*)ck/);
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
    pubDate.innerText = item.pubDate;
    sickPick.appendChild(pubDate);

    const domParser = new DOMParser();
    const doc = domParser.parseFromString(item.content, "text/html");
    const headers = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const picks = [...headers]
      .filter(isSickPick)
      .map(header => header.nextElementSibling)
      .filter(sickPick => sickPick); // remove null elements

    if (picks[0] instanceof Node) {
      sickPick.appendChild(picks[0]);
      sickPicks.push(sickPick);
    }
  });

  sickPicks.forEach(sickPick => {
    document.body.appendChild(sickPick);
  });
})();
