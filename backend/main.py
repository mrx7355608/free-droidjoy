import pyvjoy
from flask import Flask, request
from flask_cors import CORS
import time
import vgamepad as vg

# Initialize Flask app
app = Flask(__name__)
CORS(app)

gamepad = vg.VX360Gamepad()


buttons = {
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
    "UP": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP,
    "DOWN": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN,
    "LEFT": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT,
    "RIGHT": vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT
}

def press_button(button):
    key = buttons_dict[button]
    gamepad.press_button(button=key)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=key)
    gamepad.update()


@app.route('/button', methods=['POST'])
def button():    
    data = request.get_json()
    button = data.get("button")
    press_button(button.upper())

    return "OK"

@app.route('/joystick', methods=['POST'])
def joystick():
    data = request.get_json()
    
    # Get the X and Y values
    x = data.get('x', 0)
    y = data.get('y', 0)
    print(f"x: {x}, y: {y}")

    # Convert X, Y to a range of 0 to 32767 (for joystick movement)
    lx = int((x + 1) * 16383)  # 0 to 32767 for X axis
    ly = int((y + 1) * 16383)  # 0 to 32767 for Y axis

    # Set the X and Y axes (left stick)
    vj.set_axis(pyvjoy.HID_USAGE_X, lx)
    vj.set_axis(pyvjoy.HID_USAGE_Y, ly)
    
    return "OK"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
