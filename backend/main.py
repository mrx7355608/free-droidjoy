import pyvjoy
from flask import Flask, request
from flask_cors import CORS
import time
import vgamepad as vg

# Initialize Flask app
app = Flask(__name__)
CORS(app)

gamepad = vg.VX360Gamepad()


buttons_dict = {
    "A": vg.XUSB_BUTTON.XUSB_GAMEPAD_A,
    "B": vg.XUSB_BUTTON.XUSB_GAMEPAD_B,
    "X": vg.XUSB_BUTTON.XUSB_GAMEPAD_X,
    "Y": vg.XUSB_BUTTON.XUSB_GAMEPAD_Y,
    "LB": vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER,
    "RB": vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER,
    "BACK": vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK,
    "START": vg.XUSB_BUTTON.XUSB_GAMEPAD_START,
    "LS": vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB,
    "RS": vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB,
    "DPAD-UP": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP,
    "DPAD-DOWN": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN,
    "DPAD-LEFT": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT,
    "DPAD-RIGHT": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT
}

def press_button(button):
    key = buttons_dict[button]
    gamepad.press_button(button=key)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=key)
    gamepad.update()

def scale_axis(x, y):
    scaled_x = int(x * 32767)
    scaled_y = int(-y * 32767)  # Note the negative sign to invert Y-axis
    return scaled_x, scaled_y

def simulate_joystick(x, y, side):
    jx, jy = scale_axis(x, y)
    if side == "left":
        gamepad.left_joystick(x_value=jx, y_value=jy)
        gamepad.update()
    elif side == "right":
        gamepad.right_joystick(x_value=jx, y_value=jy)
        gamepad.update()


@app.route('/joystick', methods=['POST'])
def joystick():
    data = request.get_json()

    x = data["x"]
    y = data["y"]
    side = data["side"]

    simulate_joystick(x, y, side)

    return "OK"


@app.route('/button', methods=['POST'])
def button():    
    data = request.get_json()

    button = data.get("button")
    press_button(button.upper())

    return "OK"

    

@app.route('/trigger', methods=['POST'])
def trigger():
    data = request.get_json()
    trigger_button = data["trigger"]
    action = data["action"]

    # Handle right trigger
    if trigger_button == "RT":
        if action == "press":
            gamepad.right_trigger(255)
        elif action == "release":
            gamepad.right_trigger(0)
        gamepad.update()

    # Handle left trigger
    elif trigger_button == "LT":
        if action == "press":
            gamepad.left_trigger(255)
        elif action == "release":
            gamepad.left_trigger(0)
        gamepad.update()

    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
