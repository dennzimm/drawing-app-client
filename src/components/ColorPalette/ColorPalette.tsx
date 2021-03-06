import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

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

/**
 * ColorPalette
 *
 * This component is used to display a color palette.
 *
 * @param {ColorPaletteProps} { onColorSelect }
 * @return {React.FC<ColorPaletteProps>}
 */
const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect }) => {
  return (
    <ColorsWrapper>
      {COLORS.map((color) => (
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
