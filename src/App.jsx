import { useTournament } from "./context/TournamentContext";
import { TournamentProvider } from "./context/TournamentContext";
import SettingsForm from "./components/SettingsForm";
import Timer from "./components/Timer";
import BlindDisplay from "./components/BlindDisplay";
import LevelTable from "./components/LevelTable";
import Controls from "./components/Controls";
import FullscreenButton from "./components/FullscreenButton";

function AppContent() {
  const { isRunning, startTournament } = useTournament();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Pokerio Turnyro Laikmatis
      </h1>

      {!isRunning ? (
        <SettingsForm onStart={startTournament} />
      ) : (
        <>
          <Timer />
          <BlindDisplay />
          <LevelTable />
          <Controls />
          <FullscreenButton />
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