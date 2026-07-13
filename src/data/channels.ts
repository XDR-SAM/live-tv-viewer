export interface Channel {
  id: string;
  name: string;
  group: string;
  url: string;
}

export const channels: Channel[] = [
  {
    id: "mux-test-720",
    name: "Mux Test 720p",
    group: "Verified",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  },
  {
    id: "apple-test",
    name: "Apple Bipbop Test",
    group: "Verified",
    url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8",
  },
  {
    id: "akamai-test",
    name: "Akamai Test Stream",
    group: "Verified",
    url: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  },
  {
    id: "30a-golf",
    name: "30A Golf Kingdom 720p",
    group: "Sports",
    url: "https://30a-tv.com/feeds/vidaa/golf.m3u8",
  },
  {
    id: "africa24-sport",
    name: "Africa 24 Sport 1080p",
    group: "Sports",
    url: "https://africa24.vedge.infomaniak.com/livecast/ik:africa24sport/manifest.m3u8",
  },
  {
    id: "bein-xumo",
    name: "BeIN Sports Extra Xumo",
    group: "Sports",
    url: "https://bein-esp-xumo.amagi.tv/playlistR720P.m3u8",
  },
  {
    id: "redbull",
    name: "Red Bull TV",
    group: "Sports",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8",
  },
  {
    id: "tennis-amg",
    name: "Tennis Channel AMG",
    group: "Sports",
    url: "https://d3qg0hadt0dkov.cloudfront.net/amgtennisus/playlist1080_p.m3u8",
  },
];

export const groups = Array.from(new Set(channels.map((c) => c.group)));
export const getGroupedChannels = (list: Channel[]) => {
  const map: Record<string, Channel[]> = {};
  for (const item of list) {
    if (!map[item.group]) map[item.group] = [];
    map[item.group].push(item);
  }
  return map;
};
