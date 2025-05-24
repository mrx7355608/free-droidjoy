import threading

message_queue = []
condition = threading.Condition()

def notify_tkinter(ip):
    with condition:
        message_queue.append(ip)
        condition.notify()


def wait_for_new_client(root):
    while True:
        with condition:
            condition.wait()
            client_ip = message_queue.pop(0)