import { useEffect } from "react";
import { useStoreState } from "../../../store/hooks";
import { NetworkStatusType } from "../../../store/models/app/app.model";

let toast: HTMLIonToastElement;

export function useServerStatusNotification() {
  const serverConnectionStatus = useStoreState(
    (state) => state.app.serverConnectionStatus
  );

  async function presentToast(props: { message: string; color?: string }) {
    const { message, color = "primary" } = props;

    try {
      await toast.dismiss();
    } catch (err) {
      // nothing todo here
    } finally {
      toast = document.createElement("ion-toast");
      toast.position = "top";
      toast.duration = 5000;
      toast.message = message;
      toast.color = color;

      document.body.appendChild(toast);

      return toast.present();
    }
  }

  useEffect(() => {
    switch (serverConnectionStatus) {
      case NetworkStatusType.loading: {
        presentToast({
          message: "Verbindung zum Server wird hergestellt",
        });
        break;
      }
      case NetworkStatusType.ready: {
        presentToast({
          message: "Verbindung hergestellt",
          color: "success",
        });
        break;
      }
      case NetworkStatusType.error: {
        presentToast({
          message: "Verbindung zum Server verloren",
          color: "danger",
        });
        break;
      }

      default:
        break;
    }
  }, [serverConnectionStatus]);
}
