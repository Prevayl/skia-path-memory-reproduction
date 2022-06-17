import {Canvas, Color} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import ECGLine from './ECGLine';
import {createGraphPath} from './helpers';

interface Props {
  height: number;
  width: number;
  data?: number[];
  min?: number;
  max?: number;
  padding?: number;
  chartColor?: Color;
  lineColor?: Color;
}

const ECGChart: React.FC<Props> = ({
  height,
  width,
  data = Array.from({length: 200}, () => 0),
  max = 3,
  min = -3,
  padding = 25,
  chartColor = 'white',
  lineColor = 'black',
}) => {
  const path = createGraphPath({
    width,
    height,
    ys: data,
    max,
    min,
    padding,
  });

  return (
    <View style={{width, height}}>
      <Canvas style={styles.graph}>
        <ECGLine
          height={height}
          width={width}
          path={path}
          chartColor={chartColor}
          lineColor={lineColor}
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  graph: {flex: 1},
});

export default ECGChart;
