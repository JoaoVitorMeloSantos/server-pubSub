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

    const idConversa = 'conversa_1'; // Nome da conversa (criar lógica para mudar o idConversa)
    criarFilaSeNecessario(channel, idConversa);

    const mensagem = {
      idMensagem: 'msg_1',
      idConversa: idConversa,
      idUsuario: 'usuario_2',
      conteudo: 'Eu estou bem!',
      dataHora: new Date().toISOString(),
    };

    // Enviar a mensagem em formato JSON
    channel.sendToQueue(idConversa, Buffer.from(JSON.stringify(mensagem)));

    console.log(" [x] Sent '%s'", JSON.stringify(mensagem));
  });

  // Fechar a conexão após 500ms
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
