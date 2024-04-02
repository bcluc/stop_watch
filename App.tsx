/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import prettyMilliseconds from 'pretty-ms';

function App(): React.JSX.Element {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleLapPress = () => {
    let lap = timeElapsed;
    setStartTime(new Date().getTime());
    setLaps([lap, ...laps]);
  };

  const handleStartPress = () => {
    if (running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      const start = new Date().getTime() - timeElapsed;
      intervalRef.current = setInterval(() => {
        setTimeElapsed(new Date().getTime() - start);
      }, 30);
      setStartTime(new Date().getTime());
    }
    setRunning(!running);
  };

  const stopButton = () => {
    let style = running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={handleStartPress}
        style={[styles.button, style]}>
        <Text>{running ? 'Stop' : 'Start'}</Text>
      </TouchableHighlight>
    );
  };

  const lapButton = () => {
    return (
      <TouchableHighlight
        underlayColor="gray"
        onPress={handleLapPress}
        style={styles.button}>
        <Text>Lap</Text>
      </TouchableHighlight>
    );
  };

  const lapList = () => {
    return laps.map((time, index) => {
      return (
        <View style={styles.lap} key={index}>
          <Text style={styles.lapText}>lap {index + 1}</Text>
          <Text style={styles.lapText}>
            {prettyMilliseconds(time, {colonNotation: true})}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {prettyMilliseconds(timeElapsed, {colonNotation: true})}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.buttonWrapper}>
          {lapButton()}
          {stopButton()}
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.footer}>{lapList()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 5,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
});

export default App;
