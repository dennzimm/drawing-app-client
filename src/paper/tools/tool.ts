import paper from "paper";
import { CreateItemInput } from "../../api/@types/generated/gql-operations.types";
import { PaperViewEvents } from "../@types";
import { emitOnView } from "../helper";

/**
 * Tool
 *
 * This abstract class shall be extended by other tool classes
 * and should be seen as a basis for (paper) tools.
 * In addition, various defaults are defined
 * and set here, which are required for working with paper.js.
 *
 * @export
 * @abstract
 * @class Tool
 */
export abstract class Tool {
  public readonly tool = new paper.Tool();

  protected readonly defaultEventThrottleWait = 60;

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
