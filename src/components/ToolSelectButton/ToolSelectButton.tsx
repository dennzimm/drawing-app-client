import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { brush, closeCircleOutline, pencil } from "ionicons/icons";
import React, { ComponentProps, useCallback, useRef } from "react";
import styled from "styled-components";
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
const ToolSelectButton: React.FC<ToolSelectButtonProps> = (props) => {
  const toolIcons = useRef<Record<ToolName, string>>({
    pencil,
    brush,
    eraser: closeCircleOutline,
  });

  const currentToolName: ToolName = useStoreState(
    (state) => state.drawing.currentToolName
  );

  const setCurrentToolName = useStoreActions(
    (actions) => actions.drawing.setCurrentToolName
  );

  const setTool = useCallback(
    (toolName: ToolName) => {
      setCurrentToolName(toolName);
      availableTools[toolName].activate();
    },
    [setCurrentToolName]
  );

  const eraserSelected = useStoreState((state) => state.drawing.eraserSelected);

  return (
    <IonFab {...props}>
      <StyledFab eraserSelected={eraserSelected}>
        <IonIcon icon={toolIcons.current[currentToolName]} />
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
