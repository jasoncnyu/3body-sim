import React from 'react';
import { getPack, LangCode, PresetId } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface Props {
  preset: PresetId;
  lang: LangCode;
  onClose: () => void;
  className?: string;
}

const EducationPanel: React.FC<Props> = ({ preset, lang, onClose, className }) => {
  const pack = getPack(lang);
  const content = pack.education[preset];

  return (
    <aside className={cn("overflow-auto rounded-xl border border-[#29445e] bg-[#07122299] p-4 text-white shadow-xl backdrop-blur-[2px]", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wide text-[hsl(200,95%,76%)]">{pack.strings.guide}</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded border border-[#45617f] bg-[#0b1a30]/45 px-2 py-0.5 text-[11px] font-semibold text-slate-100 hover:bg-[#173356]/55"
        >
          {pack.strings.close}
        </button>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-slate-200">{pack.strings.threeBodyIntro}</p>

      <div className="mt-4 rounded-lg border border-[#2d4560] bg-[#0b1a30]/45 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(200,90%,72%)]">
          {pack.strings.currentPreset}
        </p>
        <p className="mt-1 text-sm font-semibold">{content.title}</p>
        <p className="mt-2 text-xs leading-5 text-slate-200">{content.summary}</p>
        <p className="mt-2 text-xs leading-5 text-slate-300">{content.whatToNotice}</p>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(50,95%,72%)]">{pack.strings.tryThis}</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-xs leading-5 text-slate-100">
          {content.tryThis.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ol>
      </div>
    </aside>
  );
};

export default EducationPanel;
