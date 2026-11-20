type Panel = { scene: string; caption: string; dialogue: string };

export type PanelCrop = {
  image: string;
  width: number;
  height: number;
  top: number;
  bottom: number;
};

export function IllustratedPanels({ crops, panels }: { crops: PanelCrop[]; panels: Panel[] }) {
  return <div className="webtoon-panels">
    {crops.map((crop, index) => {
      const panel = panels[index];
      return <figure className="webtoon-panel" key={index}>
        <div className="webtoon-panel-art" style={{ aspectRatio: crop.width / (crop.bottom - crop.top) }}>
          <img src={crop.image} alt={panel.scene} width={crop.width} height={crop.height}
            loading={index < 2 ? 'eager' : 'lazy'} style={{ transform: `translateY(-${100 * crop.top / crop.height}%)` }} />
        </div>
        {(panel.dialogue || panel.caption) && <figcaption>
          {panel.caption && <span className="webtoon-narration">{panel.caption}</span>}
          {panel.dialogue && <span className="webtoon-speech">{panel.dialogue}</span>}
        </figcaption>}
      </figure>;
    })}
  </div>;
}
