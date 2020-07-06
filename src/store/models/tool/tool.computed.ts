import { Computed, computed } from 'easy-peasy';
import paper from 'paper';
import { ToolModel } from './tool.model';

export enum ToolComputedItem {
  paperColor = 'paperColor',
}

export interface ToolComputedItems {
  [ToolComputedItem.paperColor]: Computed<ToolModel, paper.Color>;
}

const toolComputed: ToolComputedItems = {
  [ToolComputedItem.paperColor]: computed(
    (state) => new paper.Color(state.color)
  ),
};

export default toolComputed;
