import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.less';
import store from './app/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* TODO: Look into replacing Provider with ApiProvider from rtk query if it makes sense */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
