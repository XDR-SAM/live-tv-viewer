export interface Channel {
  id: string;
  name: string;
  group: string;
  url: string;
}

export const channels: Channel[] = [
  {
    id: "livenow-fox",
    name: "LiveNOW from FOX",
    group: "Fox / Tested",
    url: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00488-foxdigital-livenowbyfox-lgus/playlist.m3u8",
  },
  {
    id: "fox-news-radio",
    name: "Fox News Radio",
    group: "Fox / Tested",
    url: "https://radiovid.foxnews.com/hls/live/661547/RADIOVID/index.m3u8",
  },
  {
    id: "bein-xumo",
    name: "BeIN Sports Extra Xumo",
    group: "Sports / Tested",
    url: "https://bein-esp-xumo.amagi.tv/playlistR720P.m3u8",
  },
  {
    id: "bein-xumo-alt",
    name: "BeIN Sports Xumo alt",
    group: "Sports / Tested",
    url: "https://bein-esp-xumo.amagi.tv/playlist.m3u8",
  },
  {
    id: "redbull",
    name: "Red Bull TV",
    group: "Sports / Tested",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8",
  },
  {
    id: "30a-golf",
    name: "30A Golf Kingdom 720p",
    group: "Sports / Tested",
    url: "https://30a-tv.com/feeds/vidaa/golf.m3u8",
  },
  {
    id: "africa24-sport",
    name: "Africa 24 Sport 1080p",
    group: "Sports / Tested",
    url: "https://africa24.vedge.infomaniak.com/livecast/ik:africa24sport/manifest.m3u8",
  },
  {
    id: "jw-platform",
    name: "JW Platform Test HD",
    group: "HD / Tested",
    url: "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
  },
  {
    id: "longtail-adaptive",
    name: "Longtail Adaptive",
    group: "HD / Tested",
    url: "http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8",
  },
  {
    id: "skate-phantom-4k",
    name: "Skate Phantom Flex 4K",
    group: "4K / Tested",
    url: "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
  },
  {
    id: "apple-qthttp",
    name: "Apple HTTP Test",
    group: "HD / Tested",
    url: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
  },
  {
    id: "mux-test",
    name: "Mux Test 720p",
    group: "Test / Tested",
    url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
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
