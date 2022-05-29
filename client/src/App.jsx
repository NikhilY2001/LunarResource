import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/global.scss';

import Register from './pages/registration.jsx';
import Login from './pages/login.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import Admin from './pages/admin';
import Moon from './component/moon.jsx';
import Header from './component/header';
import About from './pages/about';
import FAQs from './pages/faq';

import { Suspense } from 'react';
import Loading from './component/loading.jsx';
import { extend, Canvas } from '@react-three/fiber';
import PrivateRoute from './component/privateRoute';
import { AuthProvider } from './contexts/authContext';
import { MapProvider } from './contexts/mapContext';
import PrivilegedRoute from './component/privilegedRoute';

extend({Loading});

const Content = () => {
  return (
    <AuthProvider>
      <MapProvider>
        <Router>
          <Moon />
          <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Navigate to="/login" />} />
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/home" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
            }/>
            <Route exact path="/about" element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
            }/>
            <Route path="/info/:type" element={
                <PrivateRoute>
                  <Info />
                </PrivateRoute>
            } />
            <Route path="/faqs" element={
                <PrivateRoute>
                  <FAQs />
                </PrivateRoute>
            } />
            <Route path="/admin/:type" element={
                <PrivateRoute>
                  <PrivilegedRoute>
                    <Admin />
                  </PrivilegedRoute>
                </PrivateRoute>
              } />
            <Route path="/admin" element={<Navigate to="/admin/dashboard"/>}/>
          </Routes>
        </Router>
      </MapProvider>
    </AuthProvider>
  )
}

function App() {
  return (
    <div className="App">
      <div className="canvas-container">
        <Canvas className="canvas">
          <Suspense fallback={null}>
            <Content />
          </Suspense>
        </Canvas>
      </div>

    </div>
  );
}

export default App;
