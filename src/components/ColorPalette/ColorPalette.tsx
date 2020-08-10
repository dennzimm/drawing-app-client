import React from "react";
import styled from "styled-components";
import { colors } from "../../paper/config";

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-height: 50vh;
`;

const ColorPot = styled.div<Record<"color", string>>`
  background-color: ${({ color }) => color};
  border-radius: 100%;
  height: 2.25rem;
  width: 2.25rem;
  margin: 0.35rem;
`;

export interface ColorPaletteProps {
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect }) => {
  return (
    <ColorsWrapper>
      {colors.map((color) => (
        <ColorPot
          key={color}
          onClick={() => onColorSelect(color)}
          color={color}
        />
      ))}
    </ColorsWrapper>
  );
};

export default React.memo(ColorPalette);
