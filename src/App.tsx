import { ErrorBoundary } from './app/components/ErrorBoundary';
import { PlayerProvider } from './app/state';
import { Homepage } from './app/pages/Homepage';
import { Player } from './app/components/Player';

function App() {
  return (
    <ErrorBoundary>
      <PlayerProvider>
        <div className="min-h-screen bg-gray-50">
          <Homepage />
          <Player />
        </div>
      </PlayerProvider>
    </ErrorBoundary>
  );
}

export default App;
