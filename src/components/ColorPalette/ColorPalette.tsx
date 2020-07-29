import styled from '@emotion/styled';
import React from 'react';
import { useStoreState } from '../../store/hooks';

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
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  onColorSelect,
  className,
}) => {
  const colors = useStoreState((state) => state.drawing.allColors);

  return (
    <ColorsWrapper className={className}>
      {colors.map((color) => (
        <Color key={color} onClick={() => onColorSelect(color)} color={color} />
      ))}
    </ColorsWrapper>
  );
};

export default ColorPalette;
