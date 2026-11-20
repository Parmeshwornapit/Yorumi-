'use client';

import { useEffect, useRef, useState } from 'react';
import archiveData from '@/public/manga/archive.json';
import { IllustratedPanels, type PanelCrop } from './illustrated-panels';
import './reader.css';

type Episode = {
  id: string;
  date: string;
  title: string;
  premise: string;
  genre: string;
  image: string;
  images?: string[];
  panelCrops?: PanelCrop[];
  panels: { scene: string; caption: string; dialogue: string }[];
  aiGenerated?: boolean;
  preview?: boolean;
  seriesTitle?: string;
  chapterNumber?: number;
  episodeNumber?: number;
};

const episodes: Episode[] = archiveData.episodes;

export default function MangaReader() {
  const [selected, setSelected] = useState(episodes[0]?.id ?? '');
  const [progress, setProgress] = useState(0);
  const [resume, setResume] = useState(0);
  const article = useRef<HTMLElement>(null);
  const episode = episodes.find(entry => entry.id === selected) ?? episodes[0];
  const episodeId = episode?.id;
  const automationEnabled = archiveData.automation.enabled;

  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('episode');
    if (!requested || !episodes.some(entry => entry.id === requested)) return;
    setSelected(requested);
    const frame = requestAnimationFrame(() => article.current?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!episodeId) return;
    const storageKey = 'yorumi.webtoon.' + episodeId;
    setProgress(0);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
      setResume(typeof saved?.scroll === 'number' ? saved.scroll : 0);
    } catch {
      setResume(0);
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    const save = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const rect = article.current?.getBoundingClientRect();
        if (!rect) return;
        const distance = Math.max(1, rect.height - window.innerHeight);
        const percent = Math.max(0, Math.min(100, Math.round(-rect.top / distance * 100)));
        setProgress(percent);
        try {
          localStorage.setItem(storageKey, JSON.stringify({ scroll: window.scrollY, progress: percent }));
        } catch {}
      }, 200);
    };
    addEventListener('scroll', save, { passive: true });
    return () => {
      removeEventListener('scroll', save);
      clearTimeout(timer);
    };
  }, [episodeId]);

  if (!episode) return null;

  function selectEpisode(id: string) {
    setSelected(id);
    const url = new URL(location.href);
    url.searchParams.set('episode', id);
    history.replaceState(history.state, '', url);
    article.current?.scrollIntoView({ block: 'start' });
  }

  return <div className="webtoon">
    <header className="webtoon-top">
      <a href="/" className="webtoon-brand">yorumi<span>✦</span></a>
      <nav><a href="/stories/prose">Short fiction</a><a href="#daily-studio">Daily AI studio</a></nav>
    </header>
    <main>
      <section className="webtoon-heading">
        <span className="webtoon-eyebrow">YORUMI ORIGINALS · VERTICAL COMICS</span>
        <h1>Yorumi Originals</h1>
        <p>Read original webtoons and short stories.</p>
      </section>
      <div className="webtoon-layout">
        <aside className="webtoon-shelf">
          <h2>Comic archive</h2>
          {episodes.map(entry => <button key={entry.id} className={episode.id === entry.id ? 'selected' : ''}
            aria-pressed={episode.id === entry.id} onClick={() => selectEpisode(entry.id)}>
            <img src={entry.image} alt="" loading="lazy" />
            <span>
              <small>{entry.date} · {entry.panels.length} panels{entry.preview ? ' · Preview' : ''}</small>
              <strong>{entry.title}</strong><span>{entry.genre}</span>
            </span>
          </button>)}
          <div className="webtoon-studio" id="daily-studio">
            <h2>Daily AI studio</h2>
            <p>The daily creator writes and illustrates 24 panels per episode. A new chapter begins weekly, and a new series begins every two weeks.</p>
            <span className="studio-status">{automationEnabled ? 'Daily episodes available' : 'Awaiting AI service setup'}</span>
            <p>{automationEnabled ? 'Target: 7:00 AM Nepal time. Scheduled runs can be delayed.' : 'Automatic publishing needs a repository API key and an enabled schedule.'}</p>
          </div>
        </aside>
        <article id="comic-episode" className="webtoon-chapter" ref={article}>
          <div className="chapter-title">
            <span className="webtoon-eyebrow">{episode.date} · {episode.panels.length} PANELS{episode.preview ? ' · PREVIEW' : ''}</span>
            {episode.seriesTitle && <p>{episode.seriesTitle} · Chapter {episode.chapterNumber} · Episode {episode.episodeNumber}</p>}
            <h2>{episode.title}</h2><p>{episode.premise}</p>
            <div className="chapter-actions">
              {episode.aiGenerated && <span>AI-illustrated original</span>}
              {resume > 100 && <button onClick={() => window.scrollTo({ top: resume, behavior: 'smooth' })}>Resume reading</button>}
              <a href={'/manga?episode=' + encodeURIComponent(episode.id)}>Episode link</a>
            </div>
          </div>
          {episode.panelCrops ? <IllustratedPanels crops={episode.panelCrops} panels={episode.panels} /> :
            (episode.images ?? [episode.image]).map((image, index) => <img key={image} className="webtoon-strip" src={image}
              alt={episode.title + '. Illustrated section ' + (index + 1) + '. Accessible transcript below.'}
              loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />)}
          <div className="chapter-end">
            <span>END OF EPISODE</span><br />
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to comic archive</button>
          </div>
          <details className="chapter-transcript">
            <summary>Read accessible panel transcript</summary>
            {episode.panels.map((panel, index) => <section key={index}>
              <h3>Panel {index + 1}</h3><p>{panel.scene}</p>
              {panel.caption && <p><em>{panel.caption}</em></p>}
              {panel.dialogue && <p>{panel.dialogue}</p>}
            </section>)}
          </details>
        </article>
      </div>
    </main>
    <div className="reading-progress" role="progressbar" aria-label="Reading progress" aria-valuenow={progress}>
      <span style={{ width: progress + '%' }} />
    </div>
  </div>;
}
