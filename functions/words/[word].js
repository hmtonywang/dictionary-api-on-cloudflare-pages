'use strict';

const crawler = require('dictionary-crawler');

export async function onRequestGet (context) {
  const { word } = context.params;
  const data = await crawler.yahoo.crawl(word);
  const res = JSON.stringify({ data });
  return new Response(res, { status: 200 });
}
