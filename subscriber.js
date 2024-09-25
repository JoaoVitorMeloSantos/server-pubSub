const amqp = require('amqplib/callback_api');

const criarFilaSeNecessario = (channel, queue) => {
  // Garantir que a fila existe
  channel.assertQueue(queue, {
    durable: false,
  });
};

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const idConversa = 'conversa_1'; // Nome da conversa (pode ser dinâmico)
    criarFilaSeNecessario(channel, idConversa);

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", idConversa);

    // Consumir as mensagens da fila
    channel.consume(idConversa, (msg) => {
      const mensagem = JSON.parse(msg.content.toString());
      console.log(" [x] Received message:", mensagem);
    }, {
      noAck: true
    });
  });
});
