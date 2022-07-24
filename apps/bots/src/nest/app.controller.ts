import { Controller, Get, Res } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ClientProxyEvents } from '@tsuwari/shared';

import { Bots } from '../bots.js';
import { prisma } from '../libs/prisma.js';
import { prometheus } from '../libs/prometheus.js';

@Controller()
export class AppController {

  @Get('/metrics')
  async root(@Res() res: any) {
    res.contentType(prometheus.contentType);
    res.send(await prometheus.register.metrics() + await prisma.$metrics.prometheus());
  }

  @EventPattern('bots.joinOrLeave')
  joinOrLeave(@Payload() data: { action: 'join' | 'part', botId: string, username: string }) {
    const bot = Bots.cache.get(data.botId);
    if (bot) {
      bot[data.action](data.username);
    }
  }

  @EventPattern('user.update')
  async userUpdate(@Payload() data: ClientProxyEvents['user.update']['input']) {
    const channel = await prisma.channel.findFirst({
      where: { id: data.user_id },
    });

    if (channel?.isEnabled) {
      const bot = Bots.cache.get(channel.botId);
      if (bot) {
        bot.join(data.user_name);
      }
    }
  }
}
