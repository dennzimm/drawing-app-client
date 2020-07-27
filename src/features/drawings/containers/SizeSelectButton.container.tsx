import { useQuery } from '@apollo/client';
import React from 'react';
import SizeSelectButton from '../components/SizeSelectButton.component';
import { toolMutations } from '../store/operations/mutations';
import { GET_TOOL_OPTIONS } from '../store/operations/queries/tool.queries';

export default function () {
  const { data: toolOptions } = useQuery(GET_TOOL_OPTIONS);
  const currentSize = toolOptions.tool.size;
  const { setSize } = toolMutations;

  return <SizeSelectButton currentSize={currentSize} setSize={setSize} />;
}
