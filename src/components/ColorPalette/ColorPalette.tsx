/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { useStoreState } from '../../store/hooks';

const wrapperStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-height: 50vh;
`;

const colorPotStyles = (color: string) => css`
  background-color: ${color};
  border-radius: 100%;
  height: 2.25rem;
  width: 2.25rem;
  margin: 0.35rem;
`;

export interface ColorPaletteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  onColorSelect,
  className,
}) => {
  const colors = useStoreState((state) => state.drawing.allColors);

  return (
    <div css={wrapperStyles}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => onColorSelect(color)}
          css={colorPotStyles(color)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
