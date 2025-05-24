import tkinter as tk

root = tk.Tk()
root.title("DroidJoy Server")
root.geometry("300x200")

label = tk.Label(root, text="DroidJoy Server UI", font=("Arial", 16))
label.pack(pady=10)

start_btn = tk.Button(root, text="Start Server", command=start_server)
start_btn.pack(pady=10)

root.mainloop()