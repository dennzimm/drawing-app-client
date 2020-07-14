import React from 'react';
import styled from 'styled-components';

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-height: 50vh;
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

export interface ColorPaletteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  handleColorSelect: (color: string) => void;
  colors: string[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  handleColorSelect,
  colors,
  className,
}) => {
  return (
    <ColorsWrapper className={className}>
      {colors.map((color) => (
        <Color
          key={color}
          onClick={() => handleColorSelect(color)}
          color={color}
        />
      ))}
    </ColorsWrapper>
  );
};

export default ColorPalette;
