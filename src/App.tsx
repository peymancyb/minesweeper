import React, {
  useEffect,
  useState,
} from 'react';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider,
  styled,
} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {
  makeStyles,
} from '@mui/styles';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  createGame,
  initialiazeGame,
} from './game/gameReducers';
import {
  RootState,
} from './store/store';
import {
  GameTable,
} from './game/gameTable';
import {
  FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';

const useStyles = makeStyles({
  headText: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  layout: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    background: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: '90%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    flex: 2,
  },
  content: {
    flex: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
    margin: 30,
  },
  footer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  startButton: {
    minWidth: '150px !important',
  },
  levelSelector: {
    maxWidth: '150px !important',
    marginBottom: '15px !important',
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const Item = styled(Paper)(({
  theme,
}) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [level, setLevel] = useState(1);
  const gameState = useSelector((state: RootState) => state.game);

  useEffect(() => {
    dispatch(initialiazeGame());
  }, []);

  const onPlayGame = () => {
    dispatch(createGame(`new ${level}`));
  };

  const handleOnLevelChange = (event: SelectChangeEvent) => {
    const newLevel = Number(event?.target?.value);
    setLevel(newLevel);
  };

  const renderMessage = (message: string) => {
    return message !== 'OK' ? message : '';
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <div className={classes.layout}>
          <Item elevation={2} className={classes.container}>
            <div className={classes.header}>
              <p className={classes.headText}>Minesweeper</p>
              <p className={classes.message}>{renderMessage(gameState.message)}</p>
            </div>
            <div className={classes.content}>
              <GameTable gameMap={gameState.map}/>
            </div>
            <div className={classes.footer}>
              <FormControl fullWidth className={classes.levelSelector}>
                <InputLabel id="level-select-label">Level</InputLabel>
                <Select
                  labelId="level-select-label"
                  id="level-select"
                  value={`${level}`}
                  label="Level"
                  onChange={handleOnLevelChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
              <Button
                onClick={onPlayGame}
                variant="contained"
                color="success"
                className={classes.startButton}
              >
                {gameState.map.length ? 'Play again' : 'Start'}
              </Button>
            </div>
          </Item>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
