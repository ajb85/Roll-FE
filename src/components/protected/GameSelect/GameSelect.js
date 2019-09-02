import React from 'react';
import Table from './Table/';
import Buttons from './Buttons/';

function GameSelect(props) {
  return (
    <div>
      <Table {...props} />
      <Buttons {...props} />
    </div>
  );
}

export default GameSelect;
