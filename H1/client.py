import socket
import sys
import time

total_bytes_sent = 0
total_messages_sent = 0

protocol = sys.argv[1]
stop_and_wait = int(sys.argv[2])
print('protocol ', protocol)

large_buffer = 'large_buffer'
large_buffer *= 100
large_buffer_size = len(large_buffer.encode('utf-8'))

mb_10 = 10485760
mb_500 = mb_10 * 50
mb_1000 = mb_500 * 2
mb_50 = mb_10 * 5
mb_100 = mb_10 * 10

if protocol == 'tcp':
    print('using tcp')
    # Create a TCP/IP socket
    print('creating socket')
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Connect the socket to the port where the server is listening
    # server_address = ('172.19.90.35', 10000)
    server_address = ('localhost', 10000)
    print('connecting to server')
    sock.connect(server_address)
    print('connected to server')

    transmission_start_time = time.time()

    nr_messages = int(mb_1000 / large_buffer_size)
    for message in range(nr_messages):
        if stop_and_wait == 1:
            print(str(message) + '/' + str(nr_messages))
            bytes_sent = sock.send(large_buffer.encode('utf-8'))
            total_bytes_sent += bytes_sent
            total_messages_sent += 1
            ack = False
            while not ack:
                response = sock.recv(99999)
                ack = True
        else:
            print(str(message) + '/' + str(nr_messages))
            total_messages_sent += 1
            bytes_sent = sock.send(large_buffer.encode('utf-8'))
            total_bytes_sent += bytes_sent

else:
    print('using udp')
    transmission_start_time = time.time()
    UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)

    nr_messages = int(mb_1000 / large_buffer_size)
    for message in range(nr_messages):
        print(str(message) + '/' + str(nr_messages))
        bytes_sent = UDPClientSocket.sendto(large_buffer.encode('utf-8'), ('172.19.90.35', 10000))
        # bytes_sent = UDPClientSocket.sendto(large_buffer.encode('utf-8'), ('localhost', 10000))
        total_messages_sent += 1
        total_bytes_sent += bytes_sent

    # UDPClientSocket.sendto(b"stop", ('localhost', 10000))
    UDPClientSocket.sendto(b"stop", ('172.19.90.35', 10000))



print('used ' + protocol)
print('total messages sent ' + str(total_messages_sent))
print('total bytes sent ' + str(total_bytes_sent))
print("transmission time %.2f seconds " % (time.time() - transmission_start_time))
print("Buffer size " + str(large_buffer_size))
