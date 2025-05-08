import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';
import { SoundProvider } from './components/SoundContext'; // 👈 import SoundProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <SoundProvider> {/* 👈 wrap your app in the new sound context */}
        <App />
      </SoundProvider>
    </ApolloProvider>
  </React.StrictMode>
);
