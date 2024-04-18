import pika
import time

def callback(ch, method, properties, body):
    print("Mensagem recebida:", body.decode())

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
