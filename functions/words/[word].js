'use strict';

// To surround requiring "dictionary-crawler" with a try/catch block
// to handle this failure at run-time instead of bundle-time.
let crawler;
try {
  crawler = require('dictionary-crawler');
} catch (error) {
  // Do nothing
}

export async function onRequestGet (context) {
  const { word } = context.params;
  const data = await crawler.yahoo.crawl(word);
  const res = JSON.stringify({ data });
  return new Response(res, { status: 200 });
}
