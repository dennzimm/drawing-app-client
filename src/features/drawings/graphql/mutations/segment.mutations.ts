import { gql } from '@apollo/client';

export const PUBLISH_NEW_SEGMENT = gql`
  mutation PublishNewSegment($newSegmentData: NewSegmentInput!) {
    publishNewSegment(newSegmentData: $newSegmentData) {
      itemID
    }
  }
`;
