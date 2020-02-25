import socket
import sys

total_bytes_read = 0
total_messages_read = 0

protocol = sys.argv[1]
stop_and_wait = int(sys.argv[2])
print(stop_and_wait)
print("protocol = {0}".format(protocol))

def start_tcp():
    print('using tcp')
    global total_messages_read
    global total_bytes_read
    # Create a TCP/IP socket
    print('creating socket')
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)


    # Bind the socket to the port
    # server_address = ('172.19.90.35', 10000)
    server_address = ('localhost', 10000)
    print('binding')
    sock.bind(server_address)

    # Listen for incoming connections
    sock.listen(1)

    while True:
        # Wait for a connection
        print('waiting for connection')
        connection, client_address = sock.accept()

        try:
            print('connection from', client_address)

        # Receive the data in small chunks and retransmit it
            while True:
                data = connection.recv(999999)
                if data:
                    if stop_and_wait == 1:
                        connection.send(b'ACK')
                    total_bytes_read += len(data)
                    total_messages_read += 1
                else:
                    print('done')
                    connection.close()
                    return
        finally:
            # Clean up the connection
            connection.close()


def start_udp():
    print('using udp')
    global total_messages_read
    global total_bytes_read
    print('creating udp socket')
    UDPServerSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
    print('binding')
    UDPServerSocket.bind(('localhost', 10000))
    # UDPServerSocket.bind(('172.19.90.35', 10000))
    print('listening')

    while(True):
        bytesAddressPair = UDPServerSocket.recvfrom(1024)
        message = bytesAddressPair[0]
        address = bytesAddressPair[1]
        print("Message from Client:{}".format(message))
        print("Client IP Address:{}".format(address))
        if message == b'stop':
            print("stop")
            return
        total_messages_read += 1
        total_bytes_read += len(message)

if protocol == 'tcp':
    start_tcp()
else:
    start_udp()


print('used ' + protocol)
print('total messages received ' + str(total_messages_read))
print('total bytes received ' + str(total_bytes_read))