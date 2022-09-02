import { Dimensions } from 'react-native';
import { NewHeightTypes, NewWidthTypes } from './Types';

const { height, width } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const getNewWidth = ({
  newHeight,
  oldWidth,
  oldHeight,
}: NewWidthTypes) => (newHeight * oldWidth) / oldHeight;

export const getNewHeight = ({
  newWidth,
  oldWidth,
  oldHeight,
}: NewHeightTypes) => (newWidth / oldWidth) * oldHeight;
