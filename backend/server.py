import socketio
import eventlet
from utils import notify_tkinter
from xbox_simulator import XboxSimulator

sio = socketio.Server(logger=True, cors_allowed_origins='*')
app = socketio.WSGIApp(sio)
xbox_simulator = XboxSimulator()

@sio.event
def button_press(sid, data):
    button = data['button']
    action = data['action']
    xbox_simulator.button_press(button.upper(), action)


@sio.event
def joystick(sid, data):
    x = data["x"]
    y = data["y"]
    side = data["side"]
    xbox_simulator.simulate_joystick(x, y, side)



@sio.event
def connect(sid, environ):
    ip = environ['REMOTE_ADDR']
    print(f"Client connected: ({ip}, {sid})")
    notify_tkinter(ip, sid)

@sio.event
def disconnect(sid, reason):
    print("Client disconnected:", sid)
    if reason == sio.reason.CLIENT_DISCONNECT:
        print('the client disconnected')
    elif reason == sio.reason.SERVER_DISCONNECT:
        print('the server disconnected the client')
    else:
        print('disconnect reason:', reason)



def start_server():
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)


