import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { brush, pencil, closeCircleOutline } from "ionicons/icons";
import React, { ComponentProps, useCallback, useRef } from "react";
import { ToolName, toolProvider } from "../../paper/providers";
import { useStoreActions, useStoreState } from "../../store/hooks";

interface ToolSelectButtonProps extends ComponentProps<typeof IonFab> {}
const ToolSelectButton: React.FC<ToolSelectButtonProps> = (props) => {
  const toolIcons = useRef<Record<ToolName, string>>({
    pencil,
    brush,
    eraser: closeCircleOutline,
  });

  const currentToolName = useStoreState(
    (state) => state.drawing.currentToolName
  );

  const setCurrentToolName = useStoreActions(
    (actions) => actions.drawing.setCurrentToolName
  );

  const setTool = useCallback(
    (toolName: ToolName) => {
      setCurrentToolName(toolName);
      toolProvider.getTool(toolName).activate();
    },
    [setCurrentToolName]
  );

  return (
    <IonFab {...props}>
      <IonFabButton>
        <IonIcon icon={toolIcons.current[currentToolName]} />
      </IonFabButton>

      <IonFabList side="start">
        {Object.keys(toolProvider.tools).map((key) => {
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
