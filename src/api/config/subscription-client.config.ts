import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import {
  Drawing as DrawingType,
  DrawingVariables as DrawingVariablesType,
} from "../../api/@types/generated/gql-operations.types";
import { paperDrawingApiImportService } from "../../paper/shared/api/services/paper-drawing-api-import.service";
import store from "../../store";
import { DRAWING } from "../graphql/drawing.graphql";
import { client } from "./apollo-client.config";

const GRAPHQL_WS_ENDPOINT = process.env.REACT_APP_GQL_WS_ENDPOINT as string;

export const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_ENDPOINT, {
  reconnect: true,
  lazy: true,
  connectionParams: () => {
    return {
      drawingID: store.getState().drawing.id,
      userID: store.getState().user.userID,
    };
  },
});

subscriptionClient.onReconnected(() => {
  client
    .query<DrawingType, DrawingVariablesType>({
      query: DRAWING.query,
      variables: {
        drawingName: store.getState().drawing.id,
      },
    })
    .then(({ data }) => {
      if (data && data.drawing) {
        paperDrawingApiImportService.importItems(data.drawing.items);
        console.log("onReconnected");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

export const subscriptionLink = new WebSocketLink(subscriptionClient);
