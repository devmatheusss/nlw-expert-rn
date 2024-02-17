import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  async handleNotification() {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    }
  },
})

export async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pedido realizado!",
      body: 'Faça o envio do pedido para nosso WhatsApp',
      priority: Notifications.AndroidNotificationPriority.MAX
    },
    trigger: { seconds: 5 },
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falha ao conseguir o push token para notificações');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'expert-fastfood' })).data;
    console.log(token);
  } else {
    alert('Use um dispositivo físico para receber notificações Push.');
  }

  return token;
}