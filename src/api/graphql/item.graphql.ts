import { gql } from "@apollo/client";

export default {};

// export const ITEM_DATA_FRAGMENT = gql`
//   fragment ItemData on Item {
//     name
//     type
//     data
//   }
// `;

// export const CREATE_ITEM = gql`
//   mutation CreateItem(
//     $user: UserIdInput!
//     $drawing: DrawingNameInput!
//     $data: CreateItemInput!
//   ) {
//     createItem(user: $user, drawing: $drawing, data: $data) {
//       id
//     }
//   }
// `;

// export const DELETE_ITEM = gql`
//   mutation DeleteItem($user: UserIdInput!, $drawing: DrawingNameInput!, $data: DeleteItemInput!) {
//   deleteItem(
//     user: $user,
//     drawing: $drawing,
//     data: $data,
//   ) {
//     id
//   }
// `;
