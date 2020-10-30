import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { brush, pencil } from "ionicons/icons";
import React, { ComponentProps, useCallback, useRef } from "react";
import styled from "styled-components";
import { eraser } from "../../icons";
import { availableTools, ToolName } from "../../paper/tools";
import { useStoreActions, useStoreState } from "../../store/hooks";

const StyledFab = styled(IonFabButton)<Record<"eraserSelected", boolean>>`
  --color: ${({ eraserSelected }) =>
    eraserSelected ? "var(--ion-color-danger)" : "var(--ion-color-light)"};
  --background: ${({ eraserSelected }) =>
    eraserSelected
      ? "var(--ion-color-light-tint)"
      : "var(--ion-color-primary)"};
`;

interface ToolSelectButtonProps extends ComponentProps<typeof IonFab> {}

/**
 * ToolSelectButton
 *
 * This component is used to select a paint tool.
 * The available paint tools are defined in the store.
 *
 * @param {ToolSelectButtonProps} props
 * @return {React.FC<ToolSelectButtonProps>}
 */
const ToolSelectButton: React.FC<ToolSelectButtonProps> = (props) => {
  const toolIcons = useRef<Record<ToolName, string>>({
    pencil,
    brush,
    eraser,
  });

  const { toolName, eraserSelected } = useStoreState((state) => state.drawing);

  const { setToolName } = useStoreActions((actions) => actions.drawing);

  const setTool = useCallback(
    (toolName: ToolName) => {
      setToolName(toolName);
      availableTools[toolName].activate();
    },
    [setToolName]
  );

  return (
    <IonFab {...props}>
      <StyledFab eraserSelected={eraserSelected}>
        <IonIcon icon={toolIcons.current[toolName]} />
      </StyledFab>

      <IonFabList side="start">
        {Object.keys(availableTools).map((key) => {
          const toolName = key as ToolName;

          return (
            <IonFabButton key={toolName} onClick={() => setTool(toolName)}>
              <IonIcon icon={toolIcons.current[key as ToolName]} />
            </IonFabButton>
          );
        })}
      </IonFabList>
    </IonFab>
  );
};

export default ToolSelectButton;
