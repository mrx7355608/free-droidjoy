import threading

message_queue = []
condition = threading.Condition()

def notify_tkinter(ip, sid):
    with condition:
        message_queue.append({ 'ip': ip, 'sid': sid })
        condition.notify()

