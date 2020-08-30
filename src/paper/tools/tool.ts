import paper from "paper";
import { CreateItemInput } from "../../api/@types/generated/gql-operations.types";
import { PaperViewEvents } from "../@types";
import { emitOnView } from "../helper";

export abstract class Tool {
  public readonly tool = new paper.Tool();

  protected readonly defaultEventThrottleWait = 85;

  protected abstract onMouseDown(event: paper.ToolEvent): void;
  protected abstract onMouseDrag(event: paper.ToolEvent): void;
  protected abstract onMouseUp(event: paper.ToolEvent): void;

  constructor() {
    this.setToolDefaults();
    this.setToolFunctions();
  }

  protected emitItemCreated(payload: CreateItemInput) {
    emitOnView<CreateItemInput>(PaperViewEvents.CREATE_ITEM, payload);
  }

  private setToolDefaults() {
    this.tool.minDistance = 1;
  }

  private setToolFunctions() {
    this.tool.onMouseDown = this.onMouseDown.bind(this);
    this.tool.onMouseDrag = this.onMouseDrag.bind(this);
    this.tool.onMouseUp = this.onMouseUp.bind(this);
  }
}
