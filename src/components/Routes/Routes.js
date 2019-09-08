import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import GameSelect from 'components/protected/GameSelect/';
import NewGame from 'components/protected/GameSelect/NewGame/';
import JoinGame from 'components/protected/GameSelect/JoinGame/';
import PlayGame from 'components/protected/Game/';

import { getUsersGames } from 'reducers/account';

function Routes(props) {
  console.log(props.games);
  const { gamesWereFetched, games, getUsersGames } = props;
  useEffect(() => {
    if (!gamesWereFetched && !games.length) {
      getUsersGames();
    }
  }, [gamesWereFetched, games, getUsersGames]);
  return (
    <React.Fragment>
      <Route path="/" exact render={rProps => <GameSelect {...rProps} />} />
      <Route path="/game/create" component={NewGame} />
      <Route path="/game/join" component={JoinGame} />
      <Route
        path="/game/play/:name"
        render={rProps => (
          <PlayGame
            {...rProps}
            game={props.games.find(g => g.name === rProps.match.params.name)}
          />
        )}
      />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  games: state.account.games,
  gamesWereFetched: state.account.gamesWereFetched
});

export default connect(
  mapStateToProps,
  { getUsersGames }
)(Routes);
