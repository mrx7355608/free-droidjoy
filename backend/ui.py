import tkinter as tk
from tkinter import ttk
import socket
import threading
from datetime import datetime
from utils import message_queue, condition

class ServerUI:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Connected Clients")
        self.root.geometry("400x400")
        self.root.configure(bg='#f0f2f5')
        
        # Configure style
        self.style = ttk.Style()
        self.style.configure("ServerInfo.TLabel", font=("Arial", 12, "bold"), background='#f0f2f5')
        self.style.configure("Treeview", 
                           background="#ffffff",
                           foreground="#333333",
                           rowheight=40,
                           fieldbackground="#ffffff")
        self.style.configure("Treeview.Heading", 
                           font=("Arial", 10, "bold"),
                           background="#e3f2fd",
                           foreground="#1976d2")
        self.style.map("Treeview",
                      background=[("selected", "#2196f3")],
                      foreground=[("selected", "#ffffff")])
        
        # Add button style
        self.style.configure("Disconnect.TButton",
                           padding=5,
                           background="#ff4444",
                           foreground="white")
        
        # Server info frame
        self.server_frame = ttk.Frame(self.root, padding="15", style="ServerInfo.TFrame")
        self.server_frame.pack(fill=tk.X)
        
        self.server_ip = self.get_server_ip()
        self.server_label = ttk.Label(
            self.server_frame,
            text=f"Server IP: {self.server_ip}",
            style="ServerInfo.TLabel"
        )
        self.server_label.pack(side=tk.LEFT)
        
        # Client list frame
        self.client_frame = ttk.Frame(self.root, padding="15")
        self.client_frame.pack(fill=tk.BOTH, expand=True)
        
        # Create Treeview for clients
        self.client_tree = ttk.Treeview(
            self.client_frame,
            columns=("IP", "Action"),
            show="headings",
            height=10,
            style="Treeview"
        )
        
        # Configure columns
        self.client_tree.heading("IP", text="Client IP")
        self.client_tree.heading("Action", text="")
        
        self.client_tree.column("IP", width=250, anchor="w")
        self.client_tree.column("Action", width=100, anchor="center")
        
        # Add scrollbar
        scrollbar = ttk.Scrollbar(self.client_frame, orient=tk.VERTICAL, command=self.client_tree.yview)
        self.client_tree.configure(yscrollcommand=scrollbar.set)
        
        # Pack the tree and scrollbar
        self.client_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
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
            # Store current selection
            selected_items = self.client_tree.selection()
            selected_ips = [self.client_tree.item(item)["values"][0] for item in selected_items]
            
            # Clear existing items
            for item in self.client_tree.get_children():
                self.client_tree.delete(item)
            
            # Add current clients
            for ip in self.connected_clients:
                item = self.client_tree.insert("", tk.END, values=(ip, "Disconnect"))
                # Restore selection
                if ip in selected_ips:
                    self.client_tree.selection_add(item)
                # Bind click event to the disconnect button
                self.client_tree.tag_bind(item, '<ButtonRelease-1>', self.on_click)
            
            # Update every 2 seconds
            self.root.after(2000, self.update_client_list)
            break

    def on_click(self, event):
        print("Disconnect button clicked")  # Debug print

        # Get the clicked item
        item = self.client_tree.identify_row(event.y)
        if item:
            # Get the column clicked
            column = self.client_tree.identify_column(event.x)
            if column == "#2":  # Action column
                # Get the IP from the first column
                ip = self.client_tree.item(item)["values"][0]
                if ip in self.connected_clients:
                    del self.connected_clients[ip]
                    self.update_client_list()

    def update_client(self, client_ip, status="connected"):
        self.connected_clients[client_ip] = {
            "status": status,
        }

    def wait_for_message(self):
        def background_wait():
            while True:
                with condition:
                    condition.wait()  # Wait until notify() is called
                    ip = message_queue.pop(0)

                    if ip in self.connected_clients:
                        del self.connected_clients[ip]
                    else:
                        self.update_client(ip)
                        
                    # Update the client list when we get a message
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
