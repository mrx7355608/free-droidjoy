import tkinter as tk
from tkinter import ttk
import socket
import threading
from datetime import datetime
from utils import message_queue, condition
import tkinter.font as tkfont
# from server import disconnect_client

class ServerUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("FreeDroidJoy Server")
        self.root.geometry("400x500")
        self.root.configure(bg='#ffffff')
        
        # Configure fonts
        self.title_font = tkfont.Font(family="Helvetica", size=16, weight="bold")
        self.ip_font = tkfont.Font(family="Helvetica", size=12)
        self.button_font = tkfont.Font(family="Helvetica", size=12, underline=True)
        
        # Main container
        self.main_frame = tk.Frame(self.root, bg='#ffffff', padx=20, pady=20)
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Server info
        self.server_ip = self.get_server_ip()
        self.server_label = tk.Label(
            self.main_frame,
            text=f"Server IP: {self.server_ip}",
            font=self.title_font,
            fg='#1a73e8',
            bg='#ffffff'
        )
        self.server_label.pack(pady=(0, 10))
        
        # Status label
        self.status_label = tk.Label(
            self.main_frame,
            text="Waiting for connections...",
            font=self.ip_font,
            fg='#5f6368',
            bg='#ffffff'
        )
        self.status_label.pack(pady=(0, 20))
        
        # Canvas container
        self.canvas_frame = tk.Frame(self.main_frame, bg='#ffffff')
        self.canvas_frame.pack(fill=tk.BOTH, expand=True)
        
        # Canvas and scrollbar
        self.canvas = tk.Canvas(
            self.canvas_frame,
            bg='#ffffff',
            highlightthickness=0
        )
        self.scrollbar = ttk.Scrollbar(
            self.canvas_frame,
            orient="vertical",
            command=self.canvas.yview
        )
        
        # Configure canvas scrolling
        self.canvas.configure(yscrollcommand=self.scrollbar.set)
        self.scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        # Frame for client items
        self.clients_frame = tk.Frame(self.canvas, bg='#ffffff')
        self.canvas.create_window((0, 0), window=self.clients_frame, anchor='nw')
        
        # Bind events
        self.clients_frame.bind('<Configure>', self.on_frame_configure)
        self.canvas.bind('<Configure>', self.on_canvas_configure)
        
        # Store connected clients and their UI elements
        self.connected_clients = {}
        self.client_frames = {}
        
        # Start update thread
        self.update_thread = threading.Thread(target=self.update_client_list, daemon=True)
        self.update_thread.start()

    def on_frame_configure(self, event=None):
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def on_canvas_configure(self, event):
        # Update the width of the clients frame to match canvas
        self.canvas.itemconfig(self.canvas.find_withtag("all")[0], width=event.width)

    def create_client_item(self, ip):
        frame = tk.Frame(self.clients_frame, bg='#ffffff', pady=10)
        frame.pack(fill=tk.X, padx=5)
        
        # IP label
        ip_label = tk.Label(
            frame,
            text=ip,
            font=self.ip_font,
            fg='#202124',
            bg='#ffffff'
        )
        ip_label.pack(side=tk.LEFT, padx=10)
        
        # Disconnect button
        disconnect_btn = tk.Label(
            frame,
            text="Disconnect",
            font=self.button_font,
            fg='#d93025',
            bg='#ffffff',
            cursor='hand2'
        )
        disconnect_btn.pack(side=tk.RIGHT, padx=10)
        
        # Bind click event
        disconnect_btn.bind('<Button-1>', lambda e, ip=ip: self.on_disconnect(ip))
        
        return frame

    def update_client_list(self):
        while True:
            # Remove disconnected clients
            for ip in list(self.client_frames.keys()):
                if ip not in self.connected_clients:
                    self.client_frames[ip].destroy()
                    del self.client_frames[ip]
            
            # Add new clients
            for ip in self.connected_clients:
                if ip not in self.client_frames:
                    self.client_frames[ip] = self.create_client_item(ip)
            
            # Update status
            client_count = len(self.connected_clients)
            status_text = f"{client_count} client{'s' if client_count != 1 else ''} connected"
            self.status_label.config(text=status_text)
            
            # Update every 2 seconds
            self.root.after(2000, self.update_client_list)
            break

    def on_disconnect(self, ip):
        if ip in self.connected_clients:
            # Close the socket
            client_sid = self.connected_clients[ip]['sid']
            # disconnect_client(client_sid)

            # Remove client from connected clients
            # del self.connected_clients[ip]
            # self.update_client_list()

    def get_server_ip(self):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            server_ip = s.getsockname()[0]
            s.close()
            return server_ip
        except:
            return "127.0.0.1"

    def update_client(self, client_ip, status="connected", sid=""):
        self.connected_clients[client_ip] = {
            "status": status,
            "sid": sid
        }

    def wait_for_message(self):
        def background_wait():
            while True:
                with condition:
                    condition.wait()
                    client_info = message_queue.pop(0)
                    self.update_client(client_info['ip'], 'connected', client_info['sid'])
                    self.root.after(0, self.update_client_list)

        threading.Thread(target=background_wait, daemon=True).start()

    def run(self):
        self.wait_for_message()
        self.root.mainloop()

def start_ui():
    ui = ServerUI()
    ui.run()

if __name__ == "__main__":
    start_ui()
