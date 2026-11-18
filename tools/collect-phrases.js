// Lists every phrase the game can speak, so they can be pre-recorded with a natural voice.
// Usage: node tools/collect-phrases.js index.html phrases.json
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('file://' + require('path').resolve(process.argv[2]));
  const list = await p.evaluate(() => {
    const S = new Set(), add = t => { if (t && typeof t === 'string') S.add(t) };
    [...PRAISE, ...TRY_AGAIN].forEach(add);
    ['Wow! You got a brand new sticker! Hooray!', 'Wow! Level up! You are ready for trickier ones!', 'Good! Now how should it end?',
     'Is it a question, or does it show surprise?', 'Is it asking a question? Try again.', 'Is it a surprise or a shout? Try again.',
     'Not quite. Listen again and have another go.', 'Nearly! Try to cover more of the letter.', 'Try to stay on the letter.',
     'Hmm, that doesn’t sound right. Read it out loud and try again.', 'Have another go. Say each sound, then blend them together.',
     'Which word has this sound? Read the words carefully.'].forEach(add);
    for (let g = 0; g <= 20; g++) add(`Hooray! Brilliant! You earned ${g} star${g === 1 ? '' : 's'}!`);
    for (const n of [7, 8, 9, 10]) for (let got = 0; got <= n; got++) { const msg = got >= n - 1 ? 'Superstar! You remembered nearly everything!' : got >= n * .7 ? 'Great remembering!' : 'Good effort! Let’s practise these a bit more.'; add(`${got} out of ${n}! ${msg}`) }
    G.forEach(x => { add(x.say); add(x.word) });
    WORDS.forEach(w => { add(w.w); add('Spell ' + w.w) });
    ALIENS.forEach(a => add(a.say));
    TRICKY.forEach(w => { add(w); add('Find the word: ' + w) });
    SPEAK.forEach(add);
    READPIC.forEach(r => add(r[0]));
    SENTENCES.forEach(([s, pu]) => { add(s + (pu === '?' ? '?' : pu === '!' ? '!' : '.')); add('How should this sentence end? ' + s) });
    STORIES.forEach(st => { add(st.x); st.q.forEach(q => add(q[0])); st.x.split(' ').forEach(w => add(w.replace(/[^A-Za-z']/g, ''))) });
    WORDBUILD.forEach(([q]) => { add(q.replace('+', ' plus ').replace('…', ' dot dot dot').replace('___', 'blank')); add(q.replace('+', ' plus ').replace('…', '')) });
    QUOTES.forEach(q => add('Hi Luna! ' + q));
    FAMILIES.forEach(f => f[1].split(' ').forEach(ch => add(traceSay(ch))));
    TRACEWORDS.flat().forEach(w => { add(w); w.split('').forEach(ch => add(traceSay(ch))) });
    // sample every question generator at every level
    const keys = Object.keys(MG).filter(k => k !== 'mixed');
    for (const k of keys) for (let lv = 1; lv <= 3; lv++) for (let i = 0; i < 6000; i++) { LV = lv; const q = MG[k](); add(q.say || q.prompt) }
    for (const k of [...Object.keys(WORLD), 'animals', 'diet']) for (let i = 0; i < 400; i++) { const q = worldGen(k); add(q.say || q.prompt) }
    return [...S].filter(t => t.trim()).sort();
  });
  require('fs').writeFileSync(process.argv[3], JSON.stringify(list, null, 0));
  console.log(list.length + ' phrases');
  await b.close();
})();
