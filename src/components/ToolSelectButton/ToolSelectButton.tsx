import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { brush, pencil, closeCircleOutline } from "ionicons/icons";
import React, { ComponentProps, useCallback, useRef } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { ToolName, availableTools } from "../../paper/tools";

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

  return (
    <IonFab {...props}>
      <IonFabButton>
        <IonIcon icon={toolIcons.current[currentToolName]} />
      </IonFabButton>

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
