# Syntax.fm Sick Picks

This project was created to provide a single place to view all of the Sick Picks
recommended on the [Syntax podcast.](https://syntax.fm/) hosted by [Wes Bos](https://twitter.com/wesbos) and
[Scott Tolinksi](https://twitter.com/stolinski).

The app parses the Syntax RSS feed and searches for a header in each episode
containing a list of "Sick Picks". If the header is found, all following HTML
until the next header is added to the site.

[Check out the site on Netlify.](https://sick-picks.netlify.com/)

## Setup

Ensure you have [Node.js installed.](https://nodejs.org/en/download/package-manager/)

In your terminal, run this to install all npm dependencies.
```bash
npm install
```

In your terminal, run this to start running the web app locally.
```bash
npm start
```

Open the webapp in a browser by navigating to `localhost:1234`.

## Contributing

If there are open Issues, a pull request is always welcome.

If you discover an problem, or have a suggestion while using the site,
please [open an issue on Github.](https://github.com/rmkubik/sick-picks/issues)
