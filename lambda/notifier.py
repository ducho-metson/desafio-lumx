import pika
import time
import json


# Dicionario para armazenar o tempo de chegada mais recente para cada ID de pedido
last_events = {}

def parseEventMessage(body):
    message = json.loads(body.decode())
    if 'message' not in message:
        return
    
    message_data = json.loads(message['message'])

    if 'order' not in message_data or 'time' not in message_data:
        return
    
    order_data = message_data['order']
    event_time = message_data['time']
    if (order_data['id'] is None or event_time is None) or ('id' not in order_data and 'email' not in order_data and 'type' not in order_data):
        return
    
    return message_data


def callback(ch, method, properties, body):
    message_data = parseEventMessage(body)
    if message_data is None:
        print("Formato inválido de evento")
        return 

    order_id = message_data['order']['id']
    event_time = message_data['time']
    
    if order_id in last_events:
        if event_time > last_events[order_id]:
            last_events[order_id] = event_time
            print("Mensagem recebida:", message_data)
        else:
            print("Mensagem ignorada (tempo de chegada anterior):", message_data)

            return 
    else:
        last_events[order_id] = event_time
        print("Mensagem recebida (primeira para este ID):", message_data)

    try:
        print("Email de notificação enviado para", message_data['order']['email'], " alegando mudança de status para ", message_data['order']['type'])
    except:
        ch.basic_publish(
            exchange='',
            routing_key=method.routing_key,
            body=body,
            properties=pika.BasicProperties(
                delivery_mode=2,
            )
        )
        print("Mensagem reenviada para a fila.")


def consume():
    print("Iniciando consumer...")
    
    rabbit_host = 'rabbitmq'
    rabbit_port = 5672
    
    connection = None
    while connection is None:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbit_host, port=rabbit_port))
        except pika.exceptions.AMQPConnectionError:
            print("Falha ao conectar ao RabbitMQ. Tentando novamente em 5 segundos...")
            time.sleep(5)
    
    print("Conexão com o RabbitMQ estabelecida. Iniciando consumo de mensagens...")
    
    exchange = 'orders'
    queue = "orders-changed"
    routing_key = 'orders-changed'

    channel = connection.channel()
    channel.queue_declare(queue=queue, durable=True)
    channel.basic_consume(queue=queue, on_message_callback=callback, auto_ack=True)
    channel.start_consuming() 
    
    connection.close()

    print("Finalizando consumer...")

if __name__ == '__main__':
    consume()
