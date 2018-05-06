import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

import ENV from '@/environment'

export const Sock = new SockJS(ENV.API.WS)
export const StompClient = Stomp.over(Sock)

// if (process.env.NODE_ENV === 'production') {
StompClient.debug = null
// }

StompClient.connect()

// Reconnect Stomp Socket
Sock.onclose = () => {
  StompClient.connect()
}
