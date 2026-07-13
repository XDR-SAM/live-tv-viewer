export interface Channel {
  id: string;
  name: string;
  group: string;
  url: string;
}

export const channels: Channel[] = [
  {
    id: "fox-sports-1-iptv185",
    name: "Fox Sports 1",
    group: "Fox / Tested",
    url: "http://85.237.89.160:9590/usa-s/FOX-SPORTS-1/index.m3u8",
  },
  {
    id: "fox-sports-1-streamvidex",
    name: "Fox Sports 1 (alt)",
    group: "Fox / Tested",
    url: "https://streamvidex.qzz.io/videx/fox1usa/index.m3u8",
  },
  {
    id: "fox-news-preview",
    name: "Fox News Preview",
    group: "Fox / Tested",
    url: "http://247preview.foxnews.com/hls/live/2020027/fncv3preview/primary.m3u8",
  },
  {
    id: "fox-news-40",
    name: "Fox News 40.160",
    group: "Fox / Tested",
    url: "http://40.160.24.52/FOX_NEWS/index.m3u8",
  },
  {
    id: "fox-news-41",
    name: "Fox News 41.205",
    group: "Fox / Tested",
    url: "http://41.205.77.102/FOX-NEWS/index.m3u8",
  },
  {
    id: "fox-news-45",
    name: "Fox News 45.190",
    group: "Fox / Tested",
    url: "http://45.190.28.50/FOX_NEWS/index.m3u8",
  },
  {
    id: "fox-news-138",
    name: "Fox News 138.121",
    group: "Fox / Tested",
    url: "http://138.121.15.230:9002/FOX-NEWS/index.m3u8",
  },
  {
    id: "fox-news-206",
    name: "Fox News 206.212",
    group: "Fox / Tested",
    url: "http://206.212.244.63/67/index.m3u8",
  },
  {
    id: "livenow-fox-vizio",
    name: "LiveNOW from FOX Vizio",
    group: "Fox / Tested",
    url: "https://fox-foxnewsnow-vizio.amagi.tv/playlist.m3u8",
  },
  {
    id: "livenow-fox-jmp2",
    name: "LiveNOW from FOX JMP2",
    group: "Fox / Tested",
    url: "https://jmp2.uk/plu-63d025db4e83e700086eaa96.m3u8",
  },
  {
    id: "livenow-fox-amagi",
    name: "LiveNOW from FOX Amagi",
    group: "Fox / Tested",
    url: "https://cdn-uw2-prod.tsv2.amagi.tv/linear/amg00488-foxdigital-livenowbyfox-lgus/playlist.m3u8",
  },
  {
    id: "fox-sports-es",
    name: "Fox Sports en Espanol",
    group: "Fox / Tested",
    url: "https://live-manifest.production-public.tubi.io/live/d906efca-1302-4e29-b0d9-9a1d7a305d69/playlist.m3u8",
  },
  {
    id: "fox-news-radio",
    name: "Fox News Radio",
    group: "Fox / Tested",
    url: "https://radiovid.foxnews.com/hls/live/661547/RADIOVID/index.m3u8",
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
    id: "redbull-hd",
    name: "Red Bull HD",
    group: "Sports / Tested",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8",
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
    id: "4tv-news",
    name: "4TV News",
    group: "News / Tested",
    url: "https://cdn-4.pishow.tv/live/1007/master.m3u8",
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
