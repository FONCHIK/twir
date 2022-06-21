import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@tsuwari/prisma';

import { LastfmUpdateDto } from './dto/update.js';

@Injectable()
export class LastfmService {
  constructor(private readonly prisma: PrismaService) { }

  async getIntegration(channelId: string) {
    const integration = await this.prisma.channelIntegration.findFirst({
      where: {
        channelId,
        integration: {
          service: 'LASTFM',
        },
      },
    });

    return integration;
  }

  async updateIntegration(channelId: string, body: LastfmUpdateDto) {
    const integrationService = await this.prisma.integration.findFirst({
      where: {
        service: 'LASTFM',
      },
    });

    if (!integrationService) throw new HttpException(`LastFM not enabled on our backed. Please, make patience or contact us`, 404);

    let integration = await this.getIntegration(channelId);
    if (!integration) {
      integration = await this.prisma.channelIntegration.create({
        data: {
          channelId,
          data: {
            enabled: body.enabled,
            data: { ...body.data } as unknown as Prisma.InputJsonObject,
          },
          integrationId: integrationService.id,
        },
      });
    } else {
      integration = await this.prisma.channelIntegration.update({
        where: {
          id: integration.id,
        },
        data: {
          enabled: body.enabled,
          data: { ...body.data } as unknown as Prisma.InputJsonObject,
        },
      });
    }

    return integration;
  }
}
