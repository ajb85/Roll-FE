import React from 'react';
import { Route } from 'react-router-dom';
import GameSelect from 'components/protected/GameSelect/';

function Routes(props) {
  return (
    <React.Fragment>
      <Route path="/" exact render={rProps => <GameSelect {...rProps} />} />
    </React.Fragment>
  );
}

export default Routes;
