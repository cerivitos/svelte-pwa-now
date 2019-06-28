![alt text](https://github.com/cerivitos/INeedToilet/blob/master/src/assets/favicon-32x32.png "icon")
I Need Toilet
=============
An unofficial listing of toilets rated by the Restroom Association (Singapore)

## Why?
I wanted to learn to use Svelte by building something other than a to-do list or pomodoro timer. I came across the website of the [Restroom Association](https://www.toilet.org.sg) in Singapore and decided to build a nice listing for them. Obviously this app is only relevant to Singapore.

## How?
Tools used:
* [Svelte](https://svelte.dev) with [Rollup](https://rollupjs.org)
* [Mapbox](https://mapbox.com)
* [Tailwind](https://tailwindcss.com)

1) Toilet information was scrapped from [here](https://www.toilet.org.sg/loomapdirectory) using [webscraper.io](https://webscraper.io). 

2) As only addresses were available, I used this [batch geocoder](https://geocode.localfocus.nl/) to get lat lng coordinates of each toilet. There are probably some errors :wink:

3) The resulting csv data file needs to be converted to geojson format to be consumed by Mapbox. I used [geojson.io](https://geojson.io).

## Try
The site is hosted at [https://sgtoilet.app](https://sgtoilet.app)

If you want to run it locally, [Node.js](https://nodejs.org) is required. Clone the repo and
```bash
npm install
```
Get a free Mapbox public key by creating an account. Put your key in the `src/keys.js` file like this
```javascript
export const mapBoxKey = YOUR_OWN_KEY;
```
Start by
```bash
npm run dev
```
and go to [localhost:5000](http://localhost:5000).

Build for production using
```bash
npm run build
```
and serve the `dist` folder.

## Contribute
:raised_hand: Feel free to submit an issue or PR if you notice any wrongly geocoded entries!

*Disclaimer: This is my first Svelte app so expect a lot of bad practices!*
\
\
:+1: Thanks to the Restroom Association (Singapore) for the data
