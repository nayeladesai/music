let FCM = require('fcm-node');
// let fcm = new FCM(process.env.SERVERKEY);
let fcm = new FCM('BI24jQQz3hCXYinVtOg22ZzhMf4sfJsozz0WzeS7OXjvOtQ5NnPuczjyqqCU7_CIQG3JtXrAIthrD07Y9gvej_Y');

export class Notifications{

    async SendPushNotification(data: any): Promise<any> {
        let count = data.badge;
        var message = {
          to: data.deviceData['token'],
          notification: {
            title: data.title,
            body: data.body,
            item_id: data.itemId,
            sound: 'default',
            badge: count,
          },
        //   data: {
        //     item_id: data.itemId,
        //     message: data.body,
        //     contentAvailable: false,
        //   },
        };


        fcm.send(message, function (err: any, response: any) {
            console.log('123', message, response);
            if (err) {
              console.log('push error==========>', err);
              console.log('Something has gone wrong!');
            } else {
              console.log('Successfully sent with response: ', response);
            }
          });
    }
}