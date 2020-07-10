import React from 'react';
import { colors } from '../../config/color-palette.config';
import styled from 'styled-components';

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface ColorProps {
  color: string;
}

const Color = styled.div<ColorProps>`
  background-color: ${({ color }) => color};
  border-radius: 100%;
  height: 2.25rem;
  width: 2.25rem;
  margin: 0.35rem;
`;

interface ColorPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  onColorClick: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  onColorClick,
  className,
}) => {
  return (
    <ColorsWrapper className={className}>
      {colors.map((color) => (
        <Color key={color} onClick={() => onColorClick(color)} color={color} />
      ))}
    </ColorsWrapper>
  );
};

export default ColorPalette;
