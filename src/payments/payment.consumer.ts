import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentConsumer {
  @RabbitSubscribe({
    exchange: 'amq.direct',
    routingKey: 'checkout.created',
    queue: 'microservico-pagamentos',
  })
  async consume(msg: { checkout_id: number; total: number }) {
    try {
      console.log(msg);
      // regra de negocio que está sendo executado
      throw new Error('Erro ao processar pagamento');
    } catch (err) {
      return new Nack(true);
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
