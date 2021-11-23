import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// pages & components
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Navbar from './components/Layout/Navbar';
import { useEffect } from 'react';

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
              <Route path="/" element={!user && <Navigate to="/login" />} />
              <Route path="/" element={user && <Home />} />
              <Route 
                path="/login"
                element={<Login />} />

              <Route
                path="/signup"
                element={<Signup />} />
            </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App