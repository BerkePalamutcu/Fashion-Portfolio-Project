import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/routes/Navigation';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </main>
  );
}

export default App;
