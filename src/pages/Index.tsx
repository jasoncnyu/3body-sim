import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Body, step, getPreset, addNewBody, initAccelerations, setTrailLength } from '@/lib/simulation';
import SimulationCanvas from '@/components/SimulationCanvas';
import ControlPanel from '@/components/ControlPanel';
import EducationPanel from '@/components/EducationPanel';
import { useIsMobile } from '@/hooks/use-mobile';
import { Github, Globe, Pause, Play, RotateCcw, ShieldCheck } from 'lucide-react';
import { DEFAULT_LANG, detectPreferredLanguage, getLocalizedLanguageName, getPack, LangCode, LANGUAGE_OPTIONS, normalizeLangCode, PresetId, withLanguagePrefix } from '@/lib/i18n';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TRAIL_MAX_SECONDS = 5 * 60;
const TRAIL_SAMPLES_PER_SECOND = 60;
const TRAIL_MAX_LENGTH = TRAIL_MAX_SECONDS * TRAIL_SAMPLES_PER_SECOND;
const GITHUB_REPO_URL = "https://github.com/jasoncnyu/3body-sim";
const LEANVIBE_URL = "https://leanvibe.io/vibe/n-body-playground-mmgy4aly";

const Index = () => {
  const { lang: langParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [preset, setPreset] = useState<PresetId>('three-body');
  const routeLang = normalizeLangCode(langParam) ?? DEFAULT_LANG;
  const [lang, setLang] = useState<LangCode>(routeLang);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [gConstant, setGConstant] = useState(5);
  const [collapsed, setCollapsed] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [isMobileControlsExpanded, setIsMobileControlsExpanded] = useState(false);
  const [isMobileGuideExpanded, setIsMobileGuideExpanded] = useState(false);
  const [trailLength, setTrailLength_] = useState(200);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bodiesSnapshot, setBodiesSnapshot] = useState<Body[]>(() => getPreset('three-body'));

  const bodiesRef = useRef<Body[]>(getPreset('three-body'));
  const timeSpeedRef = useRef(1);
  const gConstantRef = useRef(5);
  const t = getPack(lang).strings;

  useEffect(() => { timeSpeedRef.current = timeSpeed; }, [timeSpeed]);
  useEffect(() => { gConstantRef.current = gConstant; }, [gConstant]);

  useEffect(() => {
    const normalized = normalizeLangCode(langParam);
    if (!normalized) {
      const preferred = detectPreferredLanguage();
      navigate(withLanguagePrefix(location.pathname, preferred), { replace: true });
      return;
    }
    setLang(normalized);
    localStorage.setItem('nbody-language', normalized);
  }, [langParam, location.pathname, navigate]);

  useEffect(() => {
    const pack = getPack(lang).strings;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = pack.siteTitle;
    const description = document.querySelector('meta[name=\"description\"]');
    if (description) {
      description.setAttribute('content', pack.siteDescription);
    }
  }, [lang]);

  // Init accelerations on first load
  useEffect(() => {
    initAccelerations(bodiesRef.current, gConstantRef.current);
  }, []);

  const stepFn = useCallback(() => {
    const dt = timeSpeedRef.current * 0.5;
    const substeps = 4;
    for (let i = 0; i < substeps; i++) {
      bodiesRef.current = step(bodiesRef.current, dt / substeps, gConstantRef.current);
    }
    setElapsedTime((t) => t + dt * 0.016);
    // Sync snapshot every 10 frames for control panel
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  const handleReset = useCallback(() => {
    const bodies = getPreset(preset);
    initAccelerations(bodies, gConstantRef.current);
    bodiesRef.current = bodies;
    setBodiesSnapshot([...bodies]);
    setElapsedTime(0);
  }, [preset]);

  const handlePresetChange = useCallback((p: string) => {
    const nextPreset = p as PresetId;
    setPreset(nextPreset);
    const bodies = getPreset(nextPreset);
    initAccelerations(bodies, gConstantRef.current);
    bodiesRef.current = bodies;
    setBodiesSnapshot([...bodies]);
    setElapsedTime(0);
  }, []);

  const handleLanguageChange = useCallback((nextLang: LangCode) => {
    setLang(nextLang);
    localStorage.setItem('nbody-language', nextLang);
    navigate(withLanguagePrefix(location.pathname, nextLang));
  }, [location.pathname, navigate]);

  const currentLangOption = LANGUAGE_OPTIONS.find((option) => option.code === lang);
  const currentLangLabel = currentLangOption?.nativeName ?? currentLangOption?.englishName ?? lang;

  const handleBodyChange = useCallback((id: string, field: string, value: number) => {
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      (body as any)[field] = value;
      setBodiesSnapshot([...bodiesRef.current]);
    }
  }, []);

  const handleBodyColorChange = useCallback((id: string, color: string) => {
    const body = bodiesRef.current.find((b) => b.id === id);
    if (body) {
      body.color = color;
      setBodiesSnapshot([...bodiesRef.current]);
    }
  }, []);

  const handleRemoveBody = useCallback((id: string) => {
    bodiesRef.current = bodiesRef.current.filter((b) => b.id !== id);
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  const handleAddBody = useCallback(() => {
    const newBody = addNewBody(bodiesRef.current);
    bodiesRef.current.push(newBody);
    initAccelerations(bodiesRef.current, gConstantRef.current);
    setBodiesSnapshot([...bodiesRef.current]);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMobileControlsExpanded(false);
      setIsMobileGuideExpanded(false);
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050510]">
      {!isMobile && (
        <ControlPanel
          bodies={bodiesSnapshot}
          isPaused={isPaused}
          timeSpeed={timeSpeed}
          gConstant={gConstant}
          lang={lang}
          trailLength={trailLength}
          trailMaxLength={TRAIL_MAX_LENGTH}
          preset={preset}
          collapsed={collapsed}
          elapsedTime={elapsedTime}
          onTogglePause={() => setIsPaused((p) => !p)}
          onReset={handleReset}
          onTimeSpeedChange={setTimeSpeed}
          onGConstantChange={setGConstant}
          onPresetChange={handlePresetChange}
          onTrailLengthChange={(v) => { setTrailLength_(v); setTrailLength(v); }}
          onBodyChange={handleBodyChange}
          onBodyColorChange={handleBodyColorChange}
          onRemoveBody={handleRemoveBody}
          onAddBody={handleAddBody}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      )}
      <div className="flex-1 relative">
        <SimulationCanvas bodiesRef={bodiesRef} isPaused={isPaused} stepFn={stepFn} />
        {!isMobile && (
          isGuideOpen ? (
              <EducationPanel
                preset={preset}
                lang={lang}
                onClose={() => setIsGuideOpen(false)}
                className="absolute right-3 top-3 z-20 w-[min(380px,calc(100%-1.5rem))] max-h-[74vh]"
              />
          ) : (
            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="absolute right-3 top-3 z-20 rounded-lg border border-[#355271] bg-[#07122299] px-3 py-1 text-xs font-semibold tracking-wide text-[hsl(200,95%,78%)] shadow-lg backdrop-blur-[2px] hover:bg-[#10274399]"
            >
              {t.guide}
            </button>
          )
        )}

        {isMobile && (
          <>
            {(isMobileControlsExpanded || isMobileGuideExpanded) && (
              <button
                type="button"
                aria-label={t.close}
                onClick={() => {
                  setIsMobileControlsExpanded(false);
                  setIsMobileGuideExpanded(false);
                }}
                className="absolute inset-0 z-20 bg-black/30"
              />
            )}

            <div className="absolute inset-x-0 top-0 z-30 border-b border-[#1f3450] bg-[#071222b3] backdrop-blur-[2px]">
              <div className="flex h-12 items-center justify-between px-3">
                <h1 className="text-xs font-bold tracking-[0.14em] uppercase text-[hsl(200,90%,75%)]">{t.appTitle}</h1>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPaused((p) => !p)}
                    aria-label={isPaused ? t.play : t.pause}
                    className="rounded border border-[#355271] bg-[#10243b]/60 p-1.5 text-slate-100"
                  >
                    {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    aria-label={t.reset}
                    className="rounded border border-[#355271] bg-[#10243b]/60 p-1.5 text-slate-100"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileControlsExpanded((v) => !v);
                      setIsMobileGuideExpanded(false);
                    }}
                    className="rounded border border-[#3f6284] bg-[#143153]/70 px-2 py-1 text-[11px] font-semibold text-[hsl(200,95%,80%)]"
                  >
                    {isMobileControlsExpanded ? t.less : t.more}
                  </button>
                </div>
              </div>
            </div>

            {isMobileControlsExpanded && (
              <div className="absolute inset-x-0 top-12 z-30 h-[min(74vh,calc(100%-3rem))]">
                <ControlPanel
                  bodies={bodiesSnapshot}
                  isPaused={isPaused}
                  timeSpeed={timeSpeed}
                  gConstant={gConstant}
                  lang={lang}
                  trailLength={trailLength}
                  trailMaxLength={TRAIL_MAX_LENGTH}
                  preset={preset}
                  collapsed={false}
                  elapsedTime={elapsedTime}
                  onTogglePause={() => setIsPaused((p) => !p)}
                  onReset={handleReset}
                  onTimeSpeedChange={setTimeSpeed}
                  onGConstantChange={setGConstant}
                  onPresetChange={handlePresetChange}
                  onTrailLengthChange={(v) => { setTrailLength_(v); setTrailLength(v); }}
                  onBodyChange={handleBodyChange}
                  onBodyColorChange={handleBodyColorChange}
                  onRemoveBody={handleRemoveBody}
                  onAddBody={handleAddBody}
                  onToggleCollapse={() => setIsMobileControlsExpanded(false)}
                  showHeader={false}
                  showStats={false}
                  showTransportControls={false}
                  className="h-full w-full border-r-0 rounded-b-xl shadow-2xl"
                />
              </div>
            )}

            {!isMobileGuideExpanded && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileGuideExpanded(true);
                  setIsMobileControlsExpanded(false);
                }}
                className="absolute bottom-3 left-3 right-3 z-30 rounded-xl border border-[#3e5f82] bg-[#071222b8] p-3 text-left shadow-xl backdrop-blur-[2px]"
              >
                <p className="text-xs font-semibold text-[hsl(50,95%,74%)]">{t.guideQuestion}</p>
                <p className="mt-1 text-[11px] leading-4 text-slate-200">
                  {t.guideTeaser}
                </p>
              </button>
            )}

            {!isMobileGuideExpanded && (
              <div className="absolute bottom-[5.8rem] right-4 z-30 flex items-center gap-2">
                <a
                  href={LEANVIBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/45 hover:text-slate-200/70"
                  aria-label="Listed on LeanVibe"
                  title="Listed on LeanVibe"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                </a>
                <a
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300/45 hover:text-slate-200/70"
                  aria-label="GitHub repository"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsLanguageModalOpen(true)}
                  className="text-[10px] font-medium text-slate-300/45"
                >
                  {currentLangLabel}
                </button>
              </div>
            )}

            {isMobileGuideExpanded && (
              <div className="absolute inset-x-0 bottom-0 z-40 h-[62vh]">
                <EducationPanel
                  preset={preset}
                  lang={lang}
                  onClose={() => setIsMobileGuideExpanded(false)}
                  className="h-full w-full rounded-b-none rounded-t-2xl border-x-0 border-b-0"
                />
              </div>
            )}
          </>
        )}

        {!isMobile && (
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            <a
              href={LEANVIBE_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-lg border border-[#355271] bg-[#07122299] p-2 text-slate-100 hover:bg-[#10274399]"
              aria-label="Listed on LeanVibe"
              title="Listed on LeanVibe"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
            </a>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center rounded-lg border border-[#355271] bg-[#07122299] p-2 text-slate-100 hover:bg-[#10274399]"
              aria-label="GitHub repository"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#355271] bg-[#07122299] px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-[#10274399]"
            >
              <Globe className="h-3.5 w-3.5" />
              {currentLangLabel}
            </button>
          </div>
        )}
      </div>

      {isLanguageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
          <div className="w-full max-w-sm rounded-xl border border-[#2c4968] bg-[#071222] p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[hsl(200,95%,78%)]">{t.chooseLanguage}</h2>
              <button
                type="button"
                onClick={() => setIsLanguageModalOpen(false)}
                className="rounded border border-[#3a5877] px-2 py-0.5 text-xs text-slate-200"
              >
                {t.close}
              </button>
            </div>
            <p className="mt-1 text-xs text-slate-300">{t.languageHint}</p>
            <div className="mt-3 max-h-[calc(100vh-14rem)] space-y-1 overflow-y-auto overflow-x-hidden">
              {LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => handleLanguageChange(option.code)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-xs text-slate-100 hover:bg-[#16385c]/70 ${
                    lang === option.code
                      ? 'border-[hsl(200,85%,65%)] bg-[#16385c]/80'
                      : 'border-[#2a4562] bg-[#0d2238]/70'
                  }`}
                >
                  <span>{option.nativeName}</span>
                  <span className="text-slate-300">{getLocalizedLanguageName(option.code, lang)}</span>
                  <span className="ml-2 text-[hsl(200,95%,78%)]">{lang === option.code ? '✓' : ''}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
