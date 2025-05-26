import vgamepad as vg

class XboxSimulator:
    def __init__(self):
        self.gamepad = vg.VX360Gamepad()
        self.buttons_dict = {
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

    def simulate_joystick(self, x, y, side):
        jx, jy = self.scale_axis(x, y)
        if side == "left":
            self.gamepad.left_joystick(x_value=jx, y_value=jy)
        elif side == "right":
            self.gamepad.right_joystick(x_value=jx, y_value=jy)
        
        self.gamepad.update()


    def button_press(self, button, action):
        print(button, action)
        if button == "RT" or button == "LT":
            self.handle_trigger(button, action)
        else:
            key = self.buttons_dict[button]
            if action == 'press':
                self.gamepad.press_button(button=key)
            elif action == 'release':
                self.gamepad.release_button(button=key)
        
            self.gamepad.update()
        

    def handle_trigger(self, trigger_button, action):
        # Handle right trigger
        if trigger_button == "RT":
            if action == "press":
                self.gamepad.right_trigger(255)
            elif action == "release":
                self.gamepad.right_trigger(0)

        # Handle left trigger
        elif trigger_button == "LT":
            if action == "press":
                self.gamepad.left_trigger(255)
            elif action == "release":
                self.gamepad.left_trigger(0)
        
        self.gamepad.update()


    def scale_axis(self, x, y):
        scaled_x = int(x * 32767)
        scaled_y = int(-y * 32767)  # Note the negative sign to invert Y-axis
        return scaled_x, scaled_y


