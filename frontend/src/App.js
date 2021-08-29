import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './routes';
import './App.css';
import { ThemeProvider , createTheme } from '@material-ui/core/styles';

// Componente Navbar
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider  theme={theme}>
      <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </Router>
    </div>
    </ThemeProvider >
  );
}

export default App;
