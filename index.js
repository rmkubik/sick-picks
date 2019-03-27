import "babel-polyfill";
import "./typography";
import Parser from "rss-parser";
import dateFormat from "date-fns/format";
import nextUntil from "./nextUntil";
import overrides from "./overrides";

const isSickPick = header =>
  header.innerText
    .toLowerCase()
    .trim()
    .match(/si.*ck.*pi.*ck/);

const rssParser = new Parser();

(async () => {
  try {
    const feedResponse = await fetch("https://feed.syntax.fm/rss");
    const feedString = await feedResponse.text();
    const feed = await rssParser.parseString(feedString);
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
      const headers = doc.querySelectorAll("h2");
      const headerTag = [...headers].find(isSickPick);

      if (
        headerTag ||
        overrides.some(override => override.title === item.title)
      ) {
        let picks;
        if (overrides.some(override => override.title === item.title)) {
          const override = domParser.parseFromString(
            overrides.find(override => override.title === item.title).picks,
            "text/html"
          );
          picks = [...override.body.children];
        } else {
          picks = nextUntil(headerTag, "h2");
        }

        picks.forEach(pick => {
          if (pick instanceof Node) {
            sickPick.appendChild(pick);
          }
        });

        sickPicks.push(sickPick);
      }
    });

    document.querySelector("#loading").style.display = "none";

    sickPicks.forEach(sickPick => {
      document.body.appendChild(sickPick);
    });
  } catch (error) {
    document.querySelector("#loading").style.display = "none";
    document.querySelector("#error").style.display = "block";
  }
})();
