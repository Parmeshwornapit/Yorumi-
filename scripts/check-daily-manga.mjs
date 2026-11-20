import assert from 'node:assert/strict';
import {today,validateEpisode,imagePrompt,cadence} from './daily-manga.mjs';
assert.equal(today(new Date('2026-11-20T18:30:00Z')),'2026-11-21');
assert.throws(()=>validateEpisode({title:'Wrong'}));
const episode={title:'The Last Streetlamp',premise:'A courier delivers a sunrise.',genre:'Fantasy',characters:'Two adult couriers.',panels:Array.from({length:24},()=>({scene:'Rain falls on a city rooftop.',caption:'After midnight.',dialogue:'We still have time.'}))};
assert.equal(validateEpisode(episode),episode);assert.ok(imagePrompt(episode).includes('FOUR'));assert.ok(imagePrompt(episode).includes('We still have time.'));assert.throws(()=>validateEpisode({...episode,panels:episode.panels.slice(1)}));
console.log('Daily manga validation, prompt, panel count, and Nepal date checks passed. No API requests made.');

assert.equal(cadence({cadenceStart:'2026-11-20'},'2026-11-26').chapterNumber,1);assert.equal(cadence({cadenceStart:'2026-11-20'},'2026-11-27').chapterNumber,2);assert.equal(cadence({cadenceStart:'2026-11-20'},'2026-12-04').seriesNumber,2);assert.equal(cadence({cadenceStart:'2026-11-20'},'2026-12-04').chapterNumber,1);assert.equal(cadence({cadenceStart:'2026-11-20'},'2026-12-04').episodeNumber,1);assert.equal(cadence({},'2026-12-02').day,0);assert.throws(()=>imagePrompt(episode,6));assert.ok(imagePrompt(episode,5).includes('24. Draw:'));console.log('24 panels, six illustration sections, weekly chapters, fortnightly series, and activation date checks passed.');
