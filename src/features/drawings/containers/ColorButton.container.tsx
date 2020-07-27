import React from 'react';
import ColorButton from '../components/ColorButton.component';
import { useQuery } from '@apollo/client';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';
import { toolMutations } from '../store/operations/mutations';

export default function () {
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentColor = toolOptions.tool.color;
  const { setColor } = toolMutations;

  return <ColorButton currentColor={currentColor} setColor={setColor} />;
}
