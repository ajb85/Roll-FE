import React from 'react';
import { Route } from 'react-router-dom';

import GameSelect from 'components/protected/GameSelect/';
import NewGame from 'components/protected/GameSelect/NewGame/';
import JoinGame from 'components/protected/GameSelect/JoinGame/';

function Routes(props) {
  return (
    <React.Fragment>
      <Route path="/" exact render={rProps => <GameSelect {...rProps} />} />
      <Route path="/game/create" component={NewGame} />
      <Route path="/game/join" component={JoinGame} />
    </React.Fragment>
  );
}

export default Routes;
