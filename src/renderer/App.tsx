import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { isAuthenciatedSelector } from 'selectors/auth';
import NewSession from './screens/newSession';
import store from '../config/store';
import Browser from './screens/browser';
import Logout from './screens/logout';

function Wrapper() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(isAuthenciatedSelector);
  const previsAuthenticated = useRef<boolean>();

  useEffect(() => {
    if (!isAuthenticated && previsAuthenticated.current) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    previsAuthenticated.current = isAuthenticated;
  }, [isAuthenticated]);

  return (
    <>
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2">
          <div className="flex items-center gap-2 ">
            <span className="font-semibold text-gray-900 dark:text-white">
              AWS MediaStore Browser
            </span>
          </div>

          {isAuthenticated && <Logout />}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<NewSession />} />
        <Route path="/browser" element={<Browser />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Wrapper />
      </Router>
    </Provider>
  );
}
