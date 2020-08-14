import React from "react";
import { usePaperHistory } from "../../paper/hooks/usePaperHistory.hook";
import { UndoButton } from "../UndoButton";
import { RedoButton } from "../RedoButton";

const PaperHistory: React.FC = () => {
  const { canUndo, canRedo, undoAddItem, redoAddItem } = usePaperHistory();

  return (
    <div>
      <UndoButton disabled={!canUndo} onClick={undoAddItem} />
      <RedoButton disabled={!canRedo} onClick={redoAddItem} />
    </div>
  );
};

export default PaperHistory;
