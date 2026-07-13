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
    id: "fox-sports-es",
    name: "Fox Sports en Espanol",
    group: "Fox / Tested",
    url: "https://live-manifest.production-public.tubi.io/live/d906efca-1302-4e29-b0d9-9a1d7a305d69/playlist.m3u8",
  },
  {
    id: "nbc-sports-now",
    name: "NBC Sports NOW",
    group: "Sports / Tested",
    url: "https://d4whmvwm0rdvi.cloudfront.net/10007/99993008/hls/master.m3u8?ads.xumo_channelId=99993008",
  },
  {
    id: "nhl",
    name: "NHL",
    group: "Sports / Tested",
    url: "https://nhl-firetv.amagi.tv/playlist.m3u8",
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
    id: "redbull-hd",
    name: "Red Bull HD",
    group: "Sports / Tested",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8",
  },
  {
    id: "redbull",
    name: "Red Bull TV",
    group: "Sports / Tested",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_1660.m3u8",
  },
  {
    id: "sportsgrid",
    name: "SportsGrid",
    group: "Sports / Tested",
    url: "https://sportsgrid-tribal.amagi.tv/playlist.m3u8",
  },
  {
    id: "wpt-1080",
    name: "World Poker Tour 1080p",
    group: "Sports / Tested",
    url: "https://d39g1vxj2ef6in.cloudfront.net/v1/manifest/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/15d59f2f-80da-4448-9bce-775cc9f470f7/1.m3u8",
  },
  {
    id: "world-poker-tour",
    name: "World Poker Tour",
    group: "Sports / Tested",
    url: "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/playlist.m3u8?ads.xumo_channelId=88883102",
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
    id: "abc-news",
    name: "ABC News",
    group: "News / Tested",
    url: "https://abc-news-dmd-streams-1.akamaized.net/out/v1/701126012d044971b3fa89406a440133/index.m3u8",
  },
  {
    id: "abp-news",
    name: "ABP News",
    group: "News / Tested",
    url: "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/abpnews-livetv/master.m3u8",
  },
  {
    id: "akd-calcutta",
    name: "AKD Calcutta News",
    group: "News / Tested",
    url: "https://cdn-2.pishow.tv/live/237/master.m3u8",
  },
  {
    id: "4tv-news",
    name: "4TV News",
    group: "News / Tested",
    url: "https://cdn-4.pishow.tv/live/1007/master.m3u8",
  },
  {
    id: "24news",
    name: "24 News 396p",
    group: "News / Tested",
    url: "https://yuppmedtaorire.akamaized.net/v1/master/a0d007312bfd99c47f76b77ae26b1ccdaae76cb1/24_nim_https/110322/channel24/playlist.m3u8",
  },
  {
    id: "sadhna-plus",
    name: "Sadhna Plus News",
    group: "News / Tested",
    url: "https://6n3yow8pl9ok-hls-live.5centscdn.com/sadhananewstv/live.stream/playlist.m3u8",
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
