import { useCallback, useEffect } from "react";
import { useStoreState } from "../../../store/hooks";
import { ServerStatusType } from "../../../store/models/app/app.model";

let toast: HTMLIonToastElement;

/**
 * useServerStatusNotification
 *
 * This hook is used to initialize so-called "toasts",
 * which are displayed when the server status changes.
 *
 * @export
 */
export function useServerStatusNotification() {
  const { serverConnectionStatus } = useStoreState((state) => state.app);

  const presentToast = useCallback(
    async (props: { message: string; color?: string }) => {
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
        toast.onclick = toast.dismiss;

        document.body.appendChild(toast);

        return toast.present();
      }
    },
    []
  );

  useEffect(() => {
    switch (serverConnectionStatus) {
      case ServerStatusType.loading: {
        presentToast({
          message: "Verbindung zum Server wird hergestellt",
        });
        break;
      }
      case ServerStatusType.ready: {
        presentToast({
          message: "Verbindung hergestellt",
          color: "success",
        });
        break;
      }
      case ServerStatusType.error: {
        presentToast({
          message: "Verbindung zum Server verloren",
          color: "danger",
        });
        break;
      }

      default:
        break;
    }
  }, [presentToast, serverConnectionStatus]);
}
