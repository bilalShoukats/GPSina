/**
 *
 * App
 *
 */

import React from 'react';

import Route from 'containers/Route/Loadable';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <Route />
      <GlobalStyle />
    </>
  );
}
