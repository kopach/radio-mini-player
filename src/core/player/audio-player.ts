export type StateChangeCallback = (isPlaying: boolean) => void;
export type ErrorCallback = (error: string) => void;

export type AudioPlayerService = {
  play: (url: string) => Promise<void>;
  pause: () => void;
  togglePlay: (url: string) => Promise<void>;
  isPlaying: () => boolean;
  onStateChange: (callback: StateChangeCallback) => void;
  onError: (callback: ErrorCallback) => void;
};

type InternalState = {
  currentUrl: string | null;
  stateChangeCallback: StateChangeCallback | null;
  errorCallback: ErrorCallback | null;
};

export function createWebAudioPlayerService(): AudioPlayerService {
  const audio = new Audio();

  const state: InternalState = {
    currentUrl: null,
    stateChangeCallback: null,
    errorCallback: null,
  };

  const notifyStateChange = (isPlaying: boolean) =>
    state.stateChangeCallback?.(isPlaying);

  const notifyError = (error: unknown) => {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Unknown audio error';
    state.errorCallback?.(message);
  };

  const audioEventHandlers: Record<string, EventListener> = {
    ended: () => notifyStateChange(false),
    error: (event) => {
      const target = event.target as HTMLAudioElement;
      notifyError(target.error?.message ?? 'Stream error');
    },
    pause: () => notifyStateChange(false),
    play: () => notifyStateChange(true),
  };

  Object.entries(audioEventHandlers).forEach(([event, handler]) =>
    audio.addEventListener(event, handler)
  );

  async function play(url: string): Promise<void> {
    if (state.currentUrl === url && !audio.paused) return;

    if (state.currentUrl !== url) {
      state.currentUrl = url;
      audio.src = url;
      audio.load();
    }

    try {
      await audio.play();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.debug('Play request was interrupted by a new request.');
        return;
      }
      notifyError(error);
    }
  }

  function pause(): void {
    audio.pause();
    state.currentUrl = null;
  }

  function isPlaying(): boolean {
    return !audio.paused && !audio.ended;
  }

  async function togglePlay(url: string): Promise<void> {
    if (isPlaying() && state.currentUrl === url) {
      pause();
    } else {
      await play(url);
    }
  }

  return {
    play,
    pause,
    togglePlay,
    isPlaying,
    onStateChange(callback: StateChangeCallback): void {
      state.stateChangeCallback = callback;
    },
    onError(callback: ErrorCallback): void {
      state.errorCallback = callback;
    },
  };
}
