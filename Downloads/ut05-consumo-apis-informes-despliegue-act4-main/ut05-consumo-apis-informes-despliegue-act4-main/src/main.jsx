import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import "./assets/styles/index.css";
import { UserProvider } from './context/UserContext'


ReactDOM.createRoot(document.getElementById('root')).render(
<UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
);
