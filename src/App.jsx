import { useTournament } from "./context/TournamentContext";
import { TournamentProvider } from "./context/TournamentContext";
import SettingsForm from "./components/SettingsForm";
import Timer from "./components/Timer";
import BlindDisplay from "./components/BlindDisplay";
import LevelTable from "./components/LevelTable";
import Timeout from "./components/Timeout";

function AppContent() {
  const { isRunning, startTournament } = useTournament();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-black to-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-300 drop-shadow-lg tracking-wide uppercase">
        Pokerio Turnyro Laikmatis
      </h1>

      {!isRunning ? (
        <SettingsForm onStart={startTournament} />
      ) : (
        <>
          <Timer />
          <Timeout />
          <BlindDisplay />
          <LevelTable />
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