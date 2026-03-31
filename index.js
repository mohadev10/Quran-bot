const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const TOKEN = process.env.TOKEN;
const GUILD_ID = "1488304780315984017";
const CHANNEL_ID = "1488304782652342284";

client.once('ready', () => {
  console.log('✅ البوت خدام');

  const connection = joinVoiceChannel({
    channelId: CHANNEL_ID,
    guildId: GUILD_ID,
    adapterCreator: client.guilds.cache.get(GUILD_ID).voiceAdapterCreator,
  });

  const player = createAudioPlayer();

  function playQuran() {
    const resource = createAudioResource("https://stream.radiojar.com/8s5u5tpdtwzuv");
    player.play(resource);
  }

  playQuran();

  player.on(AudioPlayerStatus.Idle, () => {
    playQuran();
  });

  connection.subscribe(player);
});

client.login(TOKEN);
