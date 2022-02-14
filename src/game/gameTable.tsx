import React from 'react';
import {
  makeStyles,
} from '@mui/styles';
import {
  Result,
} from 'antd';
import {
  SmileOutlined,
} from '@ant-design/icons';
import {
  GameClient,
} from '../common/gameClient';
import {
  Button,
} from '@mui/material';

const useStyles = makeStyles({
  cell: {
    width: 30,
    height: 30,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '0px !important',
  },
  text: {
    fontWeight: 'bold',
    margin: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
    gameMap: string[]
}

export function GameTable({
  gameMap,
}: Props) {
  const classes = useStyles();

  const onCellClick = (y: number, x: number) => {
    GameClient.socket.send(`open ${x} ${y}`);
  };

  const renderMap = (items: any) => {
    return items.map((item: any, rowIndex: number) => {
      const squares = item.split('');
      const row = squares.map((square: any, columnIndex: number) => {
        const key = `square-${rowIndex}}-${columnIndex}`;
        if (square !== '□') {
          return (
            <Button
              variant="outlined"
              color={square === '*' ? 'error' : 'success'}
              onClick={() => onCellClick(rowIndex, columnIndex)}
              key={key}
              className={classes.cell}
            >
              <p className={classes.text}>{square}</p>
            </Button>
          );
        }
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onCellClick(rowIndex, columnIndex)}
            key={key}
            className={classes.cell}
          />
        );
      });
      return (
        <div
          className={classes.row}
          key={`square-row-${rowIndex}`}>
          {row}
        </div>
      );
    });
  };

  if (!gameMap.length) {
    return (
      <Result
        icon={<SmileOutlined />}
        title="Press START and start playing Minesweeper!"
      />
    );
  }

  return (
    <div>{renderMap(gameMap)}</div>
  );
}
