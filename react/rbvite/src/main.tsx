import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CounterProvider } from './hooks/counter-context.tsx';
import { SessionProvider } from './hooks/session-context.tsx';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import MyInfo from './MyInfo.tsx';
import NotFound from './NotFound.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionProvider>
      <CounterProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/myinfo' element={<MyInfo />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CounterProvider>
    </SessionProvider>
  </React.StrictMode>
);
