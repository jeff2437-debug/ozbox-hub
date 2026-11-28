// ozbox.org hub — `node build.mjs` writes ./site
import { mkdirSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
const OUT = 'site';
const UPDATED = 'November 2026';

// [url, icon, name, description, featured guides [path, title, summary]]
const SITES = [
  ['https://lotto.ozbox.org/', 'lotto', 'Lotto odds', 'Exact odds for Powerball, Oz Lotto, Saturday Lotto and Set for Life, worked out from the game rules, plus system entries, syndicates and expected value.', [
    ['powerball/', 'Powerball odds', 'All nine divisions, and what a big jackpot means for your chance of sharing it.'],
    ['guides/how-lottery-odds-work/', 'How lottery odds work', 'Combinations, supplementary numbers, systems and expected value in plain English.'],
    ['guides/biggest-powerball-jackpots/', 'Biggest Powerball jackpots', 'Every $100 million-plus win since 2018, and how often the prize was shared.'],
    ['syndicate-calculator/', 'Syndicate calculator', 'What a syndicate costs each person, its odds for every division, and how prizes split.'],
  ]],
  ['https://ev.ozbox.org/', 'ev', 'Electric car costs', 'What an electric car really costs to run in Australia, using official efficiency figures, real-world tests and current electricity prices.', [
    ['running-costs/', 'EV vs petrol running costs', 'Compare a year of charging with a year of filling up, for any model.'],
    ['charging-cost-by-state/', 'Charging cost by state', 'Home charging costs in every state at 2026-27 prices, plus public fast charging.'],
    ['ev-fbt-changes-2027/', 'FBT changes from April 2027', 'What the new $75,000 cap and 25% discount mean for novated leases.'],
    ['compare/', 'Head-to-head comparisons', 'Model Y vs Sealion 7, iX3 vs Model Y and more: costs, range and every variant.'],
  ]],
  ['https://mortgage.ozbox.org/', 'mortgage', 'Mortgage maths', 'A home loan calculator that shows how long your loan will really take, and guides to extra repayments, offset, redraw, refinancing and more.', [
    ['', 'Mortgage payoff calculator', 'Repayment frequency, extra repayments, offset and redraw, with a balance graph.'],
    ['extra-repayments/', 'What extra repayments save', 'Worked examples of $100 to $1,000 a month extra on typical loans.'],
    ['offset-vs-redraw/', 'Offset vs redraw', 'Which saves more, how they differ, and when an offset is worth its fee.'],
    ['refinancing-break-even/', 'Refinancing break-even', 'How quickly a lower rate pays back the cost of switching lenders.'],
  ]],
  ['https://paradox.ozbox.org/', 'paradox', 'Paradox Lab', 'Famous paradoxes of probability and logic, each with a game you can play, a simulation you can run, and a plain-English explanation.', [
    ['monty-hall-problem/', 'The Monty Hall problem', 'Play it, then run 10,000 games to see why switching wins two times in three.'],
    ['birthday-paradox/', 'The birthday paradox', 'Why just 23 people give better-than-even odds of a shared birthday.'],
    ['simpsons-paradox/', "Simpson's paradox", 'How a treatment can win in every group yet lose overall.'],
    ['false-positive-paradox/', 'The false positive paradox', 'Why a 99% accurate test can be wrong most of the time it says yes.'],
  ]],
  ['https://fakeaway.ozbox.org/', 'fakeaway', 'Fakeaway recipes', 'Australian takeaway favourites made at home for a fraction of the price, each with a closer-to-the-original version and a healthier, lower-salt one.', [
    ['recipes/bondi-burger/', 'Bondi Burger', 'Charred Portuguese-style chicken and chilli sauce, about $5.82 a serve.'],
    ['recipes/sweet-and-sour-pork/', 'Sweet and sour pork', 'The Aussie Chinese takeaway classic, about $5.57 a serve.'],
    ['recipes/lemon-chicken/', 'Lemon chicken', 'Crisp chicken with a bright lemon sauce, about $4.48 a serve.'],
    ['recipes/chicken-burritos/', 'Chicken burritos', 'A burrito bar favourite at home, about $6.25 a serve.'],
  ]],
];
const NEW = [
  ['27 Nov 2026', 'https://lotto.ozbox.org/guides/biggest-powerball-jackpots/', "Australia's biggest Powerball jackpots"],
  ['24 Nov 2026', 'https://mortgage.ozbox.org/lvr-and-lenders-mortgage-insurance/', 'LVR and lenders mortgage insurance explained'],
  ['24 Nov 2026', 'https://mortgage.ozbox.org/interest-only-vs-principal-and-interest/', 'Interest-only vs principal and interest'],
  ['23 Nov 2026', 'https://ev.ozbox.org/charging-cost-by-state/', 'EV charging cost by state, 2026-27 prices'],
  ['23 Nov 2026', 'https://mortgage.ozbox.org/pay-off-mortgage-in-10-15-or-20-years/', 'How to pay off your mortgage in 10, 15 or 20 years'],
  ['23 Nov 2026', 'https://mortgage.ozbox.org/25-vs-30-year-home-loan/', '25 vs 30-year home loan'],
];

rmSync(OUT, { recursive: true, force: true });
for (const d of ['icons', 'about', 'contact', 'privacy']) mkdirSync(`${OUT}/${d}`, { recursive: true });
for (const [, k] of SITES) copyFileSync(`src/${k}.svg`, `${OUT}/icons/${k}.svg`);
copyFileSync('src/logo.svg', `${OUT}/logo.svg`); copyFileSync('src/favicon.svg', `${OUT}/favicon.svg`);

const css = `*{box-sizing:border-box}body{margin:0;background:#f3f6fa;color:#0d2340;font:17px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:#0b5fa5}main{max-width:960px;margin:0 auto;padding:1.5rem 1rem 2rem}
.top{background:#fff;border-bottom:1px solid #dbe3ee}.top nav{max-width:960px;margin:0 auto;padding:.6rem 1rem;display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap}
.top a{text-decoration:none;font-weight:600}.top .brand{display:flex;align-items:center;gap:.5rem;color:#0d2340;margin-right:auto}.top .brand img{width:34px;height:34px}
header.hero{display:flex;flex-wrap:wrap;align-items:center;gap:1rem 1.5rem;margin:.5rem 0 1.5rem}header.hero img{width:120px;height:120px}
h1{font-size:clamp(1.6rem,5vw,2.2rem);margin:0;line-height:1.15}.lede{margin:.4rem 0 0;color:#2e3f58;max-width:40rem}
h2{font-size:1.35rem;margin:2rem 0 .6rem}
.site{background:#fff;border:1px solid #dbe3ee;border-radius:14px;padding:1.1rem 1.2rem;margin:0 0 1rem}
.site .head{display:flex;gap:.9rem;align-items:flex-start}.site .head img{width:56px;height:56px;flex:none}
.site h3{font-size:1.2rem;margin:.1rem 0 .2rem}.site h3 a{text-decoration:none}.site .head p{margin:0;color:#46566e;font-size:.95rem}
.site ul{list-style:none;padding:0;margin:.9rem 0 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:.6rem 1.2rem}
.site li a{font-weight:600}.site li span{display:block;color:#5a6a80;font-size:.9rem;line-height:1.45}
.prose{background:#fff;border:1px solid #dbe3ee;border-radius:14px;padding:1.2rem 1.4rem}.prose h2:first-child{margin-top:0}
.new{list-style:none;padding:0;margin:0}.new li{padding:.35rem 0;border-bottom:1px solid #edf1f6}.new time{color:#5a6a80;font-size:.88rem;display:inline-block;min-width:7rem}
footer{max-width:960px;margin:0 auto;padding:1rem 1rem 2rem;color:#5a6a80;font-size:.9rem}footer nav{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:.4rem}`;

const page = (path, title, desc, body, extraLd = []) => `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://ozbox.org${path}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://ozbox.org${path}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>${css.replace(/\s*\n\s*/g, '')}</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3136341800882537" crossorigin="anonymous"></script>
${[{ '@context': 'https://schema.org', '@type': 'Organization', name: 'ozbox', url: 'https://ozbox.org/', logo: 'https://ozbox.org/logo.svg', email: 'contact@ozbox.org' }, ...extraLd].map(d => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n')}
</head>
<body>
<div class="top"><nav><a class="brand" href="/"><img src="/logo.svg" alt="" width="34" height="34">ozbox</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav></div>
<main>
${body}
</main>
<footer><nav><a href="/">Home</a><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a></nav>
<p>ozbox is independent and isn't affiliated with any lottery operator, lender, car maker or restaurant. Guides are general information, not financial advice.</p></footer>
</body>
</html>`;

const home = `<header class="hero"><img src="/logo.svg" alt="ozbox logo" width="120" height="120"><div><h1>ozbox</h1>
<p class="lede">A small family of free, independent Australian websites. Each one takes an everyday question that comes down to numbers, works it out properly
and explains the answer in plain English. No sign-ups, no paywalls, and nobody pays to be featured.</p></div></header>
<h2>The sites</h2>
${SITES.map(([url, k, name, desc, guides]) => `<section class="site"><div class="head"><img src="/icons/${k}.svg" alt="" width="56" height="56"><div>
<h3><a href="${url}">${name}</a></h3><p>${desc}</p></div></div>
<ul>${guides.map(([p, t, s]) => `<li><a href="${url}${p}">${t}</a><span>${s}</span></li>`).join('')}</ul></section>`).join('\n')}
<h2>How the numbers are worked out</h2>
<div class="prose">
<p><strong>From first principles.</strong> Lotto odds are counted exactly from each game's rules, then checked against the odds the lottery operators
publish. Mortgage figures come from a day-by-day loan simulation that charges interest the way Australian lenders do: calculated daily and charged
monthly. Paradox simulations run thousands of real random trials in your browser, right next to the theoretical answer.</p>
<p><strong>From named sources.</strong> Electric car running costs use the Australian Government's Green Vehicle Guide, real-world testing and the
regulated 2026-27 electricity price caps in each state. Mortgage examples use current average loan sizes and interest rates. Pages say where their
figures come from, so you can check them yourself.</p>
<p><strong>Kept current.</strong> When rates, prices or game rules change, the examples are updated. The mortgage guides moved to a $750,000 loan
at 6.75% in late November 2026 to match today's typical loan size and rate, for example.</p>
</div>
<h2>Recently added</h2>
<div class="prose"><ul class="new">${NEW.map(([d, u, t]) => `<li><time>${d}</time> <a href="${u}">${t}</a></li>`).join('')}</ul></div>`;

const about = `<h1>About ozbox</h1>
<div class="prose">
<p class="lede">ozbox is a small group of free websites that answer everyday Australian questions with real numbers: what are my lotto odds, what does
an electric car cost to run, how long will my mortgage take, why does switching doors win, and can I make that takeaway favourite at home?</p>
<h2>Why it exists</h2>
<p>Most of these questions have a definite answer, but it's often buried in jargon, rounded to uselessness or skewed by someone selling something.
ozbox does the working properly and shows it: the calculations run in your browser, the assumptions are written down, and the guides explain the
reasoning rather than just the result.</p>
<h2>How it's made</h2>
<p>ozbox is run independently in Australia by a numbers enthusiast. Every calculation is built from the underlying rules and data rather than
copied from elsewhere, and figures are checked against official sources before they're published. When something changes, such as interest rates or
electricity prices, the affected pages are updated and dated.</p>
<h2>Independence</h2>
<p>ozbox isn't affiliated with any lottery operator, bank, lender, car maker or restaurant, and nobody pays to be featured or ranked. The sites may
show advertising to cover running costs; ads are always clearly separate from the content.</p>
<h2>Not advice</h2>
<p>The guides are general information to help you understand the numbers. They aren't financial, tax or legal advice, and they don't take your
circumstances into account. For decisions about a loan, a car purchase or tax, talk to a licensed professional.</p>
<h2>Corrections</h2>
<p>If you spot an error, an out-of-date figure or a rule change, please <a href="/contact/">get in touch</a>. Corrections are made promptly.</p>
<p><small>Last updated ${UPDATED}.</small></p>
</div>`;

const contact = `<h1>Contact</h1>
<div class="prose">
<p class="lede">The best way to reach ozbox is by email: <a href="mailto:contact@ozbox.org">contact@ozbox.org</a>.</p>
<h2>Good reasons to get in touch</h2>
<ul>
<li>You've found a mistake, or a figure that's out of date.</li>
<li>A lottery's rules, an electricity price or a lending rule has changed.</li>
<li>You'd like a calculator or guide to cover something it doesn't.</li>
<li>You have a question about how a number was worked out.</li>
</ul>
<p>Emails are usually answered within a few days. ozbox can't give personal financial advice or tell you which loan, car or lottery entry to choose.</p>
</div>`;

const privacy = `<h1>Privacy policy</h1>
<div class="prose">
<p><small>Last updated ${UPDATED}. This policy covers ozbox.org and its sites: lotto.ozbox.org, ev.ozbox.org, mortgage.ozbox.org,
paradox.ozbox.org and fakeaway.ozbox.org.</small></p>
<h2>What we collect</h2>
<p>The calculators and simulations run entirely in your browser. The numbers you enter are never sent to us or stored. We don't ask for accounts,
names or contact details.</p>
<p>Our host, Cloudflare, processes standard technical data such as IP addresses and browser type to deliver and protect the sites.</p>
<h2>Visitor statistics</h2>
<p>We use Cloudflare Web Analytics to count page views and see which pages are popular. It doesn't use cookies, doesn't track you across other
websites and doesn't collect personal information. It reports only aggregate figures such as page views, referring sites, countries and device types.</p>
<h2>Advertising and cookies</h2>
<p>The sites may use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to
these and other websites. Google's advertising cookies let it and its partners serve ads to you based on those visits.</p>
<p>You can opt out of personalised advertising at <a href="https://adssettings.google.com/">Google Ad Settings</a>, or opt out of some
third-party vendors' cookies at <a href="https://www.aboutads.info/">aboutads.info</a>. Learn more in
<a href="https://policies.google.com/technologies/partner-sites">How Google uses information from sites that use its services</a>.
Visitors in the European Economic Area and UK are asked for consent before personalised ads are shown.</p>
<h2>Email</h2>
<p>If you email us, we use your address only to reply.</p>
<h2>Contact</h2>
<p>Questions about this policy: <a href="mailto:contact@ozbox.org">contact@ozbox.org</a>.</p>
</div>`;

const itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'ozbox sites', itemListElement: SITES.map(([url, , name], i) => ({ '@type': 'ListItem', position: i + 1, url, name })) };
writeFileSync(`${OUT}/index.html`, page('/', 'ozbox: free, independent Australian calculators and guides',
  'Free Australian calculators and plain-English guides: lotto odds, electric car running costs, a mortgage payoff calculator, interactive paradoxes and fakeaway recipes.', home, [itemList]));
writeFileSync(`${OUT}/about/index.html`, page('/about/', 'About ozbox', 'What ozbox is, how its calculators and guides are made, and how it stays independent.', about));
writeFileSync(`${OUT}/contact/index.html`, page('/contact/', 'Contact ozbox', 'How to contact ozbox about corrections, rule changes and suggestions.', contact));
writeFileSync(`${OUT}/privacy/index.html`, page('/privacy/', 'Privacy policy | ozbox', 'How ozbox and its sites handle data, analytics, advertising and cookies.', privacy));
writeFileSync(`${OUT}/404.html`, page('/404', "Page not found | ozbox", 'That page isn\'t here.', `<h1>That page isn't here</h1><p>Try one of the sites below.</p>` + home.slice(home.indexOf('<h2>The sites</h2>'))).replace('<link rel="canonical" href="https://ozbox.org/404">', '<meta name="robots" content="noindex">'));
writeFileSync(`${OUT}/ads.txt`, 'google.com, pub-3136341800882537, DIRECT, f08c47fec0942fa0\n');
writeFileSync(`${OUT}/robots.txt`, 'User-agent: *\nAllow: /\nSitemap: https://ozbox.org/sitemap.xml\n');
writeFileSync(`${OUT}/sitemap.xml`, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  + ['/', '/about/', '/contact/', '/privacy/'].map(p => `<url><loc>https://ozbox.org${p}</loc></url>`).join('') + '</urlset>\n');
writeFileSync(`${OUT}/_redirects`, '');
console.log('Built hub');
