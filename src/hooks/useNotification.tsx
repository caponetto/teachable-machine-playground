import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import { APP_NAME, useApp } from "../app/AppContext";
import { routes } from "../app/Routes";

export function useNotification(throttleTime = 3000) {
  const app = useApp();
  const location = useLocation();
  const supported = useMemo(() => "Notification" in window, []);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const canNotifyRef = useRef(true);

  useEffect(() => {
    if (!supported) {
      return;
    }
    Notification.requestPermission().then((result) => {
      setPermissionGranted(result === "granted");
    });
  }, [supported]);

  const notify = useCallback(
    (message: string) => {
      if (!permissionGranted || !canNotifyRef.current) {
        return;
      }

      const nav = Object.values(routes.nav).find((n) => n.path === location.pathname);
      const navName = nav ? nav.name : APP_NAME;

      const notificationDetails = {
        title: APP_NAME,
        body: `${navName} says: ${message}`,
        icon: routes.images.robot,
      };

      if (app.device === "mobile") {
        navigator.serviceWorker.register("sw.js");
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(notificationDetails.title, {
            body: notificationDetails.body,
            icon: notificationDetails.icon,
          });
        });
      } else if (app.device === "desktop") {
        new Notification(notificationDetails.title, {
          body: notificationDetails.body,
          icon: notificationDetails.icon,
        });
      }

      canNotifyRef.current = false;
      setTimeout(() => {
        canNotifyRef.current = true;
      }, throttleTime);
    },
    [app.device, throttleTime, location.pathname, permissionGranted]
  );

  return {
    notify,
  };
}
