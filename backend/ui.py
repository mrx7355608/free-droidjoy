import tkinter as tk
from tkinter import ttk
import socket
import threading
from datetime import datetime

class ServerUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Server Dashboard")
        self.root.geometry("600x400")
        
        # Configure style
        self.style = ttk.Style()
        self.style.configure("ServerInfo.TLabel", font=("Arial", 12))
        self.style.configure("ClientList.Treeview", font=("Arial", 10))
        self.style.configure("Disconnect.TButton", font=("Arial", 10))
        
        # Server info frame
        self.server_frame = ttk.Frame(self.root, padding="10")
        self.server_frame.pack(fill=tk.X)
        
        self.server_ip = self.get_server_ip()
        self.server_label = ttk.Label(
            self.server_frame,
            text=f"Server IP: {self.server_ip}",
            style="ServerInfo.TLabel"
        )
        self.server_label.pack(side=tk.LEFT)
        
        # Client list frame
        self.client_frame = ttk.Frame(self.root, padding="10")
        self.client_frame.pack(fill=tk.BOTH, expand=True)
        
        # Create Treeview for clients
        self.client_tree = ttk.Treeview(
            self.client_frame,
            columns=("IP", "Last Seen", "Status"),
            show="headings",
            style="ClientList.Treeview"
        )
        
        # Configure columns
        self.client_tree.heading("IP", text="IP Address")
        self.client_tree.heading("Last Seen", text="Last Seen")
        self.client_tree.heading("Status", text="Status")
        
        self.client_tree.column("IP", width=150)
        self.client_tree.column("Last Seen", width=200)
        self.client_tree.column("Status", width=100)
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(self.client_frame, orient=tk.VERTICAL, command=self.client_tree.yview)
        self.client_tree.configure(yscrollcommand=scrollbar.set)
        
        # Pack the tree and scrollbar
        self.client_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        # Button frame
        self.button_frame = ttk.Frame(self.root, padding="10")
        self.button_frame.pack(fill=tk.X)
        
        self.disconnect_button = ttk.Button(
            self.button_frame,
            text="Disconnect Selected",
            command=self.disconnect_selected,
            style="Disconnect.TButton"
        )
        self.disconnect_button.pack(side=tk.RIGHT)
        
        # Store connected clients
        self.connected_clients = {}
        
        # Start update thread
        self.update_thread = threading.Thread(target=self.update_client_list, daemon=True)
        self.update_thread.start()

    def get_server_ip(self):
        try:
            s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
            s.connect(("8.8.8.8", 80))
            server_ip = s.getsockname()[0]
            s.close()
            return server_ip
        except:
            return "127.0.0.1"

    def update_client_list(self):
        while True:
            # Clear existing items
            for item in self.client_tree.get_children():
                self.client_tree.delete(item)
            
            # Add current clients
            for ip, data in self.connected_clients.items():
                self.client_tree.insert(
                    "",
                    tk.END,
                    values=(ip, data["last_seen"], data["status"])
                )
            
            # Update every 2 seconds
            self.root.after(2000, self.update_client_list)
            break

    def disconnect_selected(self):
        selected_items = self.client_tree.selection()
        for item in selected_items:
            values = self.client_tree.item(item)["values"]
            if values and values[0] in self.connected_clients:
                del self.connected_clients[values[0]]
        self.update_client_list()

    def update_client(self, client_ip, status="connected"):
        self.connected_clients[client_ip] = {
            "status": status,
            "last_seen": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

    def run(self):
        self.root.mainloop()

def start_ui():
    ui = ServerUI()
    ui.run()

if __name__ == "__main__":
    start_ui()
