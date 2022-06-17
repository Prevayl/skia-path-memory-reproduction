import {
  Color,
  LinearGradient,
  Path,
  PathDef,
  SkiaValue,
  vec,
} from '@shopify/react-native-skia';
import React from 'react';

interface Props {
  height: number;
  width: number;
  path: PathDef | SkiaValue<PathDef>;
  chartColor: Color;
  lineColor: Color;
}

const ECGLine: React.FC<Props> = ({
  width,
  height,
  path,
  chartColor,
  lineColor,
}) => {
  return (
    <Path
      path={path}
      strokeWidth={1}
      style="stroke"
      strokeJoin="round"
      strokeCap="round">
      <LinearGradient
        start={vec(0, height * 0.5)}
        end={vec(width, height * 0.5)}
        colors={[chartColor, lineColor, lineColor, chartColor]}
        positions={[0, 0.15, 0.85, 1]}
      />
    </Path>
  );
};

export default ECGLine;
