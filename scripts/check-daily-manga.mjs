import assert from 'node:assert/strict';
import {today,validateEpisode,imagePrompt} from './daily-manga.mjs';
assert.equal(today(new Date('2026-11-20T18:30:00Z')),'2026-11-21');
assert.throws(()=>validateEpisode({title:'Wrong'}));
const episode={title:'The Last Streetlamp',premise:'A courier delivers a sunrise.',genre:'Fantasy',characters:'Two adult couriers.',panels:Array.from({length:6},()=>({scene:'Rain falls on a city rooftop.',caption:'After midnight.',dialogue:'We still have time.'}))};
assert.equal(validateEpisode(episode),episode);assert.ok(imagePrompt(episode).includes('SIX'));assert.ok(imagePrompt(episode).includes('We still have time.'));assert.throws(()=>validateEpisode({...episode,panels:episode.panels.slice(1)}));
console.log('Daily manga validation, prompt, panel count, and Nepal date checks passed. No API requests made.');
