import { makeVar, ReactiveVar } from '@apollo/client';
import { FeaturesCacheConfig } from '../../../../apollo/config/features.config';
import { colors } from '../../config/color-palette.config';
import { Tool } from '../models/tool.model';

export const drawingAreaCacheConfig: FeaturesCacheConfig = {
  queryFields: {
    tool: {
      read() {
        return toolVar();
      },
    },
  },
};

const toolInitialValue: Tool = {
  toolName: 'pencil',
  color: colors[Math.floor(Math.random() * colors.length)],
  size: 2,
};

export const toolVar: ReactiveVar<Tool> = makeVar<Tool>(toolInitialValue);
