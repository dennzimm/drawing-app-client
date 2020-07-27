import { makeVar, ReactiveVar } from '@apollo/client';
import { FeaturesCacheConfig } from '../../../../apollo/config/features.config';
import { colors } from '../../config/color-palette.config';
import { ToolState } from '../models/tool.model';

export const drawingAreaCacheConfig: FeaturesCacheConfig = {
  queryFields: {
    tool: {
      read() {
        return toolStateVar();
      },
    },
  },
};

const toolStateInitialValue: ToolState = {
  toolName: 'pencil',
  color: colors[Math.floor(Math.random() * colors.length)],
  size: 2,
};

export const toolStateVar: ReactiveVar<ToolState> = makeVar<ToolState>(
  toolStateInitialValue
);
