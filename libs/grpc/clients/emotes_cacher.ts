import { ChannelCredentials, createChannel, createClient } from 'nice-grpc';

import { EmotesCacherClient, EmotesCacherDefinition } from '../generated/emotes_cacher/emotes_cacher.js';
import { PORTS } from '../servers/constants.js';
import { CLIENT_OPTIONS, createClientAddr, waitReady } from './helper.js';

export const createEmotesCacher = async (env: string): Promise<EmotesCacherClient> => {
  const channel = createChannel(
    createClientAddr(env, 'emotes-cacher', PORTS.EMOTES_CACHER_SERVER_PORT),
    ChannelCredentials.createInsecure(),
    CLIENT_OPTIONS,
  );

  await waitReady(channel);

  const client = createClient(EmotesCacherDefinition, channel);

  return client as any;
};