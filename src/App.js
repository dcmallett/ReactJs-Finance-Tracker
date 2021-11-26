import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// pages & components
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Navbar from './components/Layout/Navbar';

const App = () => {
  
  //destructuring Auth is Ready from the AuthContext
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {/*so until auth is ready the content will not render. */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
            <Routes>
              {!user && <Route path="/" element={<Navigate to="/login" />} /> }
              {user && <Route path="/" element={<Home />} /> }

              {user && <Route path="/login" element={<Navigate to="/"/>} />}
              {!user && <Route path="/login" element={<Login />} /> }

              {user && <Route path="/signup" element={<Navigate to="/" />} /> }
              {!user && <Route path="/signup" element={<Signup />} /> }
            </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App