import {cp, mkdir, readFile, writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const source='source/site';
await mkdir('_site',{recursive:true});
await cp(`${source}/links`,'_site',{recursive:true});
for(const file of ['mobile-header.js','page-navigation.js','page-navigation.css']) {
  await cp(`${source}/${file}`,`_site/${file}`);
}
await mkdir('_site/assets/brand',{recursive:true});
await mkdir('_site/assets/profile',{recursive:true});
for(const file of ['bookmarks-v197.svg','bookmarks-v197.ico','bookmarks-apple-v197.png','bookmarks-og-v197.png']) {
  await cp(`${source}/assets/brand/${file}`,`_site/assets/brand/${file}`);
}
for(const file of ['telegram-avatar-v121.jpg','idea-radar-icon-v130.svg']) {
  await cp(`${source}/assets/profile/${file}`,`_site/assets/profile/${file}`);
}
let html=await readFile('_site/index.html','utf8');
html=html.replaceAll('https://mosolov.work/links/','https://links.mosolov.dev/')
  .replaceAll('https://mosolov.work/assets/brand/','https://links.mosolov.dev/assets/brand/')
  .replace('href="/" aria-label="На главную"','href="https://mosolov.work/" aria-label="На главную"');
await writeFile('_site/index.html',html);
const nav=await readFile('_site/mobile-navigation.js','utf8');
await writeFile('_site/mobile-navigation.js',nav.replace("'../mobile-header.js", "'./mobile-header.js"));
await writeFile('_site/CNAME','links.mosolov.dev\n');
await writeFile('_site/.nojekyll','');
await writeFile('_site/robots.txt','User-agent: *\nAllow: /\nSitemap: https://links.mosolov.dev/sitemap.xml\n');
await writeFile('_site/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://links.mosolov.dev/</loc></url></urlset>');
assert.ok(html.includes('href="https://links.mosolov.dev/"'));
assert.ok(html.includes('href="https://mosolov.work/"'));
const {items}=JSON.parse(await readFile('_site/bookmarks.json','utf8'));
assert.ok(items.length>100);
console.log(`Built ${items.length} bookmarks at https://links.mosolov.dev/`);
