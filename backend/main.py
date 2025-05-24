from ui import start_ui
from server import start_server
import threading

def main():
    flask_thread = threading.Thread(target=start_server)
    # ensures that the server stops when the main tkinter thread stops
    flask_thread.daemon = True 
    flask_thread.start()

    # start the ui on main thread
    start_ui()


if __name__ == "__main__":
    main()