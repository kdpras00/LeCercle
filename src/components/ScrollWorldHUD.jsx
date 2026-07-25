import React from 'react';
import { Volume2, VolumeX, Eye, Layers, Compass } from 'lucide-react';

export default function ScrollWorldHUD({
  scenes = [],
  currentSceneIndex = 0,
  progress = 0,
  onJumpToScene,
  isAudioMuted = true,
  onToggleAudio,
  viewMode = '3d-world',
  onToggleViewMode,
  isVisible = true
}) {
  const currentScene = scenes[currentSceneIndex] || scenes[0];

  return (
    <div className={`transition-all duration-500 ease-out ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* Top Floating Altitude & Coordinates HUD Tag */}
      <div className="fixed top-24 left-6 z-40 hidden md:flex items-center gap-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-stone-300 select-none shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-amber-400 font-semibold uppercase tracking-wider">3D Flight Mode</span>
        </div>
        <div className="h-3 w-[1px] bg-white/20" />
        <div>
          <span className="text-stone-500">POS: </span>
          <span className="text-stone-200">Z-{(progress * 1200).toFixed(0)}m</span>
        </div>
        <div className="h-3 w-[1px] bg-white/20" />
        <div>
          <span className="text-stone-500">SCENE: </span>
          <span className="text-amber-300 font-semibold">0{currentSceneIndex + 1} / 0{scenes.length}</span>
        </div>
      </div>

      {/* Top Right Quick View Toggle & Audio Controller */}
      <div className="fixed top-24 right-6 z-40 flex items-center gap-3">
        {/* Audio Ambient Toggle */}
        <button
          onClick={onToggleAudio}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border transition-all text-xs font-medium ${
            !isAudioMuted
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
              : 'bg-black/70 border-white/15 text-stone-400 hover:text-white hover:bg-black/90'
          }`}
          title={isAudioMuted ? 'Enable Ambient Spatial Audio' : 'Mute Sound'}
        >
          {!isAudioMuted ? (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline font-mono">SOUND ON</span>
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-0.5 h-2/3 bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 h-4/5 bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">SOUND OFF</span>
            </>
          )}
        </button>

        {/* View Mode Toggle */}
        <button
          onClick={onToggleViewMode}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-stone-900 to-black border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-2xl hover:border-amber-400 transition-all hover:scale-105"
        >
          {viewMode === '3d-world' ? (
            <>
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Classic View</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 text-amber-400" />
              <span>3D Scroll World</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Floating Flight Track Waypoints Bar */}
      {viewMode === '3d-world' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl px-4 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-500/30 shadow-2xl text-white">
          <div className="flex flex-col gap-2">
            {/* Active Scene Label */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-sans text-amber-200">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{currentScene?.title || 'Sanctuary World'}</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400 tracking-wider uppercase">
                Scroll to navigate camera
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 transition-all duration-150 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>

            {/* Waypoint Nodes */}
            <div className="flex justify-between items-center pt-1">
              {scenes.map((scene, idx) => {
                const isActive = idx === currentSceneIndex;
                return (
                  <button
                    key={scene.id || idx}
                    onClick={() => onJumpToScene(idx)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono transition-all group ${
                      isActive
                        ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold scale-105'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-400' : 'bg-stone-600 group-hover:bg-stone-400'}`} />
                    <span className="hidden sm:inline">0{idx + 1} {scene.shortTitle || scene.title.split(' ')[0]}</span>
                    <span className="sm:hidden">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
