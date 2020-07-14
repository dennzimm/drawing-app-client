import React from 'react';
import ColorPalette, {
  ColorPaletteProps,
} from '../components/ColorPalette.component';
import { colors } from '../config/color-palette.config';

export default function ({
  handleColorSelect,
}: Pick<ColorPaletteProps, 'handleColorSelect'>) {
  return <ColorPalette handleColorSelect={handleColorSelect} colors={colors} />;
}
