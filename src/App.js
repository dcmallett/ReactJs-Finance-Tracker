import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

// pages & components
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Navbar from './components/Layout/Navbar';

const App = () => {
  
  //destructuring Auth is Ready from the AuthContext
  const { authIsReady } = useAuthContext();

  return (
    <div className="App">
      {/*so until auth is ready the content will not render. */}
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App