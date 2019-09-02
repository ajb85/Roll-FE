import React from 'react';
import { Route } from 'react-router-dom';

import GameSelect from 'components/protected/GameSelect/';
import NewGame from 'components/protected/GameSelect/NewGame/';
import JoinGame from 'components/protected/GameSelect/JoinGame/';
import PlayGame from 'components/protected/Game/';

function Routes(props) {
  return (
    <React.Fragment>
      <Route path="/" exact render={rProps => <GameSelect {...rProps} />} />
      <Route path="/game/create" component={NewGame} />
      <Route path="/game/join" component={JoinGame} />
      <Route path="/game/play/:name" component={PlayGame} />
    </React.Fragment>
  );
}

export default Routes;
