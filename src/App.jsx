import { useTournament } from "./context/TournamentContext";
import { TournamentProvider } from "./context/TournamentContext";
import SettingsForm from "./components/SettingsForm";
import Timer from "./components/Timer";
import BlindDisplay from "./components/BlindDisplay";
import LevelTable from "./components/LevelTable";
import Fullscreen from "./components/Fullscreen";
import Break from "./components/Break";
import SoundWarning from "./components/SoundWarning";

function AppContent() {
  const { isRunning, isBreak, startTournament } = useTournament();

  const isFullscreen = document.fullscreenElement !== null;
  const backgroundImage = isBreak
    ? "url('/img/break.jpg')"
    : "url('/img/main.jpg')";

  return (
    <div
      className="min-h-screen text-white p-4 overflow-hidden"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!isFullscreen && !isBreak && (
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-300 drop-shadow-lg tracking-wide uppercase">
          Pokerio Turnyro Laikmatis
        </h1>
      )}

      {!isRunning ? (
        <SettingsForm onStart={startTournament} />
      ) : isBreak ? (
        <Break />
      ) : (
        <>
          <Timer />
          <BlindDisplay />
          <LevelTable />
          <Fullscreen />
          <SoundWarning />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <TournamentProvider>
      <AppContent />
    </TournamentProvider>
  );
}