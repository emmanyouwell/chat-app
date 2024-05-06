import {io} from 'socket.io-client'

let forward = true;
let socket;
if (forward){
    socket = io.connect('https://lmt3hmz8-4000.asse.devtunnels.ms/')
}
else {
    socket = io.connect('http://localhost:4000')
}


export default socket;