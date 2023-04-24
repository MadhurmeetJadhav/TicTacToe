/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from './components/Icons';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));

  const relodGame = () => {
    setTurn(false);
    setWinner('');
    setGameState(new Array(9).fill('empty', 0, 9));
  };
  const colors = {
    dark: '#292B36',
    dark1: '#000000',
    light: '#f8f9fa',
    light1: '#ffffff',
  };
  const checkIsWinner = () => {
    //Winning logic

    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setWinner(`${gameState[0]} won the game`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setWinner('Draw game... ⌛️');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (winner) {
      return Snackbar.show({
        text: winner,
        backgroundColor: 'green',
        textColor: 'yellow',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = turn ? 'Check' : 'Circle';
      setTurn(!turn);
    } else {
      return Snackbar.show({
        text: 'Position is filled',
        backgroundColor: '#000000',
        textColor: '#ffffff',
      });
    }

    checkIsWinner();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: darkTheme ? colors.dark : colors.light,
      }}>
      <StatusBar />
      <Switch
        value={darkTheme}
        onValueChange={() => setDarkTheme(!darkTheme)}
        thumbColor={darkTheme ? colors.dark1 : colors.light1}
        trackColor={{true: colors.light, false: colors.dark}}
      />
      {winner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{winner}</Text>
        </View>
      ) : (
        <View
          style={[styles.playerInfo, turn ? styles.player1 : styles.player2]}>
          <Text style={styles.gameTurnTxt}>
            {' '}
            Player{' '}
            {turn ? (
              <Icon name="check" size={30} color="#000000" />
            ) : (
              <Icon name="circle-thin" size={30} color="#000000" />
            )}{' '}
            Turn
          </Text>
        </View>
      )}

      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} />
          </Pressable>
        )}
      />

      <Pressable style={styles.gameBtn} onPress={relodGame}>
        <Text style={styles.gameBtnText}>
          {winner ? 'Start new Game' : 'Reload Game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 50,
    paddingVertical: 8,
    marginVertical: 60,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '600',
  },
  player1: {
    backgroundColor: '#38CC77',
  },
  player2: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 10,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#99e9f2',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#0b7285',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    marginVertical: 40,
    backgroundColor: '#8D3DAF',
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default App;
