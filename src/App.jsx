import { useTournament } from "./context/TournamentContext";
import { TournamentProvider } from "./context/TournamentContext";
import SettingsForm from "./components/SettingsForm";
import Timer from "./components/Timer";
import SoundWarning from "./components/SoundWarning"
import BlindDisplay from "./components/BlindDisplay"

function AppContent() {
  const { isRunning } = useTournament();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Pokerio Turnyro Laikmatis
      </h1>

      {!isRunning ? (
        <SettingsForm onStart={() => { }} />
      ) : (
        <>
          <Timer />
          <BlindDisplay />
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