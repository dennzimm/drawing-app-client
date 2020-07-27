import { gql } from '@apollo/client';

export const GET_CURRENT_TOOL = gql`
  query GetCurrentTool {
    tool @client {
      currentTool
    }
  }
`;

export const GET_TOOL_OPTIONS = gql`
  query GetToolColor {
    tool @client {
      color
      size
    }
  }
`;
