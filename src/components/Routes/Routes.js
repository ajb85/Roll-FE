import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import GameSelect from 'components/protected/GameSelect/';
import NewGame from 'components/protected/GameSelect/NewGame/';
import JoinGame from 'components/protected/GameSelect/JoinGame/';
import PlayGame from 'components/protected/Game/';

import { getUsersGames } from 'reducers/games.js';

function Routes(props) {
  const { gamesWereFetched, games, getUsersGames } = props;
  useEffect(() => {
    if (!gamesWereFetched && !games.length) {
      getUsersGames();
    }
  }, [gamesWereFetched, games, getUsersGames]);
  return (
    <React.Fragment>
      <Route path='/' exact>
        <GameSelect />
      </Route>

      <Route path='/game/create'>
        <NewGame />
      </Route>

      <Route path='/game/join'>
        <JoinGame />
      </Route>

      <Route path='/game/play/:game_id'>
        <PlayGame />
      </Route>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  games: state.games.active,
  gamesWereFetched: state.games.wereFetched
});

export default connect(mapStateToProps, { getUsersGames })(Routes);
