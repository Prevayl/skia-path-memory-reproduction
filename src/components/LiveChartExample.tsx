import React from 'react';
import {
  Button,
  LayoutChangeEvent,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ECGChart} from './ecg';

interface Props {}

const FRAME_RATE = 24;
const UPDATE_INTERVAL_MS = 1_000 / FRAME_RATE;
const FLAT_LINE = Array.from({length: 200}, () => 0);

const LiveChartExample: React.FC<Props> = ({}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const style = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    foregroundColor: isDarkMode ? Colors.lighter : Colors.darker,
  };

  const [width, setWidth] = React.useState<number>(0);
  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  }, []);

  const intervalRef = React.useRef<NodeJS.Timer>();
  const [ecg, setEcg] = React.useState<number[]>(FLAT_LINE);

  const onStartPress = React.useCallback(() => {
    intervalRef.current = setInterval(() => {
      setEcg(mockEcgData);
      const head = mockEcgData.splice(0, 3);
      mockEcgData = [...mockEcgData, ...head];
    }, UPDATE_INTERVAL_MS);
  }, []);

  const onStopPress = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setEcg(FLAT_LINE);
  }, []);

  return (
    <View onLayout={onLayout}>
      <ECGChart
        data={ecg}
        min={-3}
        max={3}
        height={100}
        width={width}
        chartColor={style.backgroundColor}
        lineColor={style.foregroundColor}
      />
      <View style={styles.buttonView}>
        <Button title="Start" onPress={onStartPress} />
        <Button title="Stop" onPress={onStopPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

const mockPQRST: number[] = [
  0.25, 0, 0, 0, 0, 0, 1, 2, 1, 0, -0.5, 0, 0, 0, 0, 0.25, 0, 0, 0, 0,
];

let mockEcgData: number[] = [
  ...Array.from({length: 20}, () => 0),
  ...mockPQRST,
  ...Array.from({length: 20}, () => 0),
  ...mockPQRST,
  ...Array.from({length: 20}, () => 0),
  ...mockPQRST,
  ...Array.from({length: 20}, () => 0),
  ...mockPQRST,
  ...Array.from({length: 20}, () => 0),
  ...mockPQRST,
];

export default LiveChartExample;
