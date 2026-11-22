// ozbox.org hub page — `node build.mjs` writes ./site
import { mkdirSync, writeFileSync, readFileSync, copyFileSync, rmSync } from 'node:fs';
const OUT = 'site';
const SITES = [
  ['https://lotto.ozbox.org/', 'lotto', 'Lotto odds calculators', 'Exact odds for Powerball, Oz Lotto, Saturday Lotto and Set for Life, plus system entries and syndicates.'],
  ['https://ev.ozbox.org/', 'ev', 'Electric car costs', 'Running costs, charging times, novated leases and the 2027 FBT changes, with head-to-head model comparisons.'],
  ['https://mortgage.ozbox.org/', 'mortgage', 'Mortgage payoff calculator', 'How long your home loan will take, and what extra repayments, offset and redraw do to it.'],
  ['https://paradox.ozbox.org/', 'paradox', 'Paradoxes you can test', 'Monty Hall, the birthday paradox and more, explained with simulations you can run yourself.'],
  ['https://fakeaway.ozbox.org/', 'fakeaway', 'Fakeaway recipes', 'Takeaway favourites made at home, each with a closer-to-the-original and a healthier version.'],
];
rmSync(OUT, { recursive: true, force: true }); mkdirSync(join(OUT, 'icons'), { recursive: true });
function join(...p) { return p.join('/'); }
for (const [, k] of SITES) copyFileSync(`src/${k}.svg`, `${OUT}/icons/${k}.svg`);
copyFileSync('src/logo.svg', `${OUT}/logo.svg`); copyFileSync('src/favicon.svg', `${OUT}/favicon.svg`);
const css = `*{box-sizing:border-box}body{margin:0;background:#f3f6fa;color:#0d2340;font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:#0b5fa5}main{max-width:900px;margin:0 auto;padding:2rem 1rem 3rem}
header{display:flex;flex-wrap:wrap;align-items:center;gap:1rem 1.5rem;margin-bottom:1.5rem}header img{width:120px;height:120px}
h1{font-size:clamp(1.6rem,5vw,2.2rem);margin:0;line-height:1.15}header p{margin:.3rem 0 0;color:#46566e;max-width:36rem}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:1rem}
.card{display:flex;gap:.9rem;align-items:flex-start;background:#fff;border:1px solid #dbe3ee;border-radius:14px;padding:1rem;text-decoration:none;color:inherit}
.card:hover{border-color:#4cc3ff;box-shadow:0 4px 14px rgba(13,35,64,.08)}.card img{width:56px;height:56px;flex:none}
.card h2{font-size:1.1rem;margin:.1rem 0 .2rem;color:#0b5fa5}.card p{margin:0;font-size:.93rem;color:#46566e}.card small{display:block;color:#6b7a90;margin-top:.3rem}
footer{max-width:900px;margin:0 auto;padding:1rem;color:#5a6a80;font-size:.88rem}`;
const html = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ozbox: free, independent Australian calculators and guides</title>
<meta name="description" content="ozbox is a small family of free Australian websites: lotto odds, electric car costs, a mortgage payoff calculator, interactive paradoxes and fakeaway recipes.">
<link rel="canonical" href="https://ozbox.org/">
<meta property="og:title" content="ozbox">
<meta property="og:description" content="Free, independent Australian calculators and guides.">
<meta property="og:url" content="https://ozbox.org/">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${css.replace(/\s*\n\s*/g, '')}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: 'ozbox', url: 'https://ozbox.org/', logo: 'https://ozbox.org/logo.svg', email: 'contact@ozbox.org' })}</script>
</head>
<body>
<main>
<header><img src="/logo.svg" alt="ozbox logo" width="120" height="120"><div><h1>ozbox</h1><p>A small family of free, independent Australian websites. Plain calculators and honest guides, no sign-ups, and nobody pays to be included.</p></div></header>
<div class="grid">
${SITES.map(([url, k, name, desc]) => `<a class="card" href="${url}"><img src="/icons/${k}.svg" alt="" width="56" height="56"><div><h2>${name}</h2><p>${desc}</p><small>${url.replace('https://', '').replace(/\/$/, '')}</small></div></a>`).join('\n')}
</div>
</main>
<footer><p>Contact: <a href="mailto:contact@ozbox.org">contact@ozbox.org</a>. Each site has its own privacy policy, linked at the bottom of every page.</p></footer>
</body>
</html>`;
writeFileSync(`${OUT}/index.html`, html);
writeFileSync(`${OUT}/404.html`, html.replace('<main>', '<main><p><strong>That page isn\'t here.</strong> Try one of the sites below.</p>'));
writeFileSync(`${OUT}/ads.txt`, 'google.com, pub-3136341800882537, DIRECT, f08c47fec0942fa0\n');
writeFileSync(`${OUT}/robots.txt`, 'User-agent: *\nAllow: /\nSitemap: https://ozbox.org/sitemap.xml\n');
writeFileSync(`${OUT}/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://ozbox.org/</loc></url></urlset>\n');
// www and pages.dev → apex
writeFileSync(`${OUT}/_redirects`, '');
console.log('Built hub');
