import { Skia } from '@shopify/react-native-skia';

interface Props {
  width: number;
  height: number;
  ys: number[];
  max: number;
  min: number;
  padding?: number;
  range?: number;
  scaleX?: number;
  scaleY?: number;
}

export function createGraphPath({
  width,
  height,
  ys,
  max,
  min,
  padding = 0,
  range = max - min,
  scaleX = width / ys.length,
  scaleY = (height - padding) / range,
}: Props) {
  const path = Skia.Path.Make();
  const centerY = (height - padding) / 2;
  path.moveTo(0, centerY);
  for (let i = 0, x = 0; i < ys.length && x < width; i++, x += scaleX) {
    const y = centerY - (ys[i] * scaleY - padding);
    path.lineTo(x, y);
  }

  return path;
}
