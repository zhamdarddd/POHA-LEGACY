import * as Notifications from "expo-notifications";

export async function scheduleNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
