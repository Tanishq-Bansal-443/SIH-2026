import { ExperienceProvider } from './state/ExperienceContext';
import { ExperienceShell } from './components/shell/ExperienceShell';
import './styles/global.css';

export function App() {
  return (
    <ExperienceProvider>
      <ExperienceShell />
    </ExperienceProvider>
  );
}

export default App;
