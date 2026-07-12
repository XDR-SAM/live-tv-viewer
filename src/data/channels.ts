export interface Channel {
  id: string;
  name: string;
  category: string;
  url: string;
  logo?: string;
}

export const channels: Channel[] = [
  { id: "fox-deportes", name: "Fox Deportes", category: "Fox", url: "https://cors-proxy.cooks.fyi/http://23.237.104.106:8080/USA_FOX_DEPORTES/index.m3u8" },
  { id: "fox-sports-1a", name: "Fox Sports 1 (CDN)", category: "Fox", url: "https://fl2.moveonjoy.com/FOX_Sports_1/index.m3u8" },
  { id: "fox-sports-1b", name: "Fox Sports 1 (alt)", category: "Fox", url: "http://212.102.60.10/FOX_Sports_1/index.m3u8" },
  { id: "fox-sports-ar", name: "Fox Sports Argentina", category: "Fox", url: "http://181.78.27.128:8000/play/a062/index.m3u8" },
  { id: "fox-sports-mx", name: "Fox Sports MX", category: "Fox", url: "http://streamsy.online:2999/korrigan17/25AUFBdqOi/93" },
  { id: "espn-dep", name: "ESPN Deportes", category: "ESPN", url: "http://190.92.10.66:4000/play/a003/index.m3u8" },
  { id: "espn-ar", name: "ESPN Argentina", category: "ESPN", url: "http://168.227.131.66:8000/play/tfc0/index.m3u8" },
  { id: "bein-1", name: "BeIN Sports 1", category: "BeIN", url: "http://125.209.88.166:45793/BRN/beINSP11.stream/playlist.m3u8" },
  { id: "bein-2", name: "BeIN Sports 2", category: "BeIN", url: "http://125.209.88.166:45793/BRN/beINSP12.stream/playlist.m3u8" },
  { id: "bein-xumo", name: "BeIN Sports Extra", category: "BeIN", url: "https://bein-esp-xumo.amagi.tv/playlistR720P.m3u8" },
  { id: "tnt-1", name: "TNT Sports 1", category: "TNT", url: "http://109.61.81.147:2080/cdn2/559/video.m3u8?token=4444" },
  { id: "tnt-2", name: "TNT Sports 2", category: "TNT", url: "http://109.61.81.147:2080/cdn2/560/video.m3u8?token=4444" },
  { id: "tnt-3", name: "TNT Sports 3", category: "TNT", url: "http://109.61.81.147:2080/cdn2/295/video.m3u8?token=4444" },
  { id: "tsn-1", name: "TSN 1", category: "TSN", url: "http://212.102.60.231/TSN_1/index.m3u8" },
  { id: "tsn-2", name: "TSN 2", category: "TSN", url: "http://212.102.60.231/TSN_2/index.m3u8" },
  { id: "cbs-sports", name: "CBS Sports", category: "US Sports", url: "https://fl2.moveonjoy.com/CBS_SPORTS_NETWORK/index.m3u8" },
  { id: "fite", name: "FITE 24/7", category: "Combat Sports", url: "https://d3d85c7qkywguj.cloudfront.net/scheduler/scheduleMaster/263.m3u8" },
  { id: "redbull", name: "Red Bull TV", category: "Extreme Sports", url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8" },
  { id: "tennis", name: "Tennis Channel", category: "Tennis", url: "https://d3qg0hadt0dkov.cloudfront.net/amgtennisus/playlist1080_p.m3u8" },
  { id: "skylaliga", name: "Sky Sports LaLiga", category: "Football", url: "http://181.78.105.146:2000/play/a08m/index.m3u8" },
  { id: "setanta1", name: "Setanta Sports 1", category: "Football", url: "https://stream2.cinerama.uz/1263/tracks-v1a1/mono.m3u8" },
  { id: "setanta2", name: "Setanta Sports 2", category: "Football", url: "https://stream2.cinerama.uz/1264/tracks-v1a1/mono.m3u8" },
  { id: "arena1", name: "Arena Sport 1", category: "Football", url: "http://109.105.201.198/ARENASPORT1/video.m3u8?token=test" },
  { id: "eurosport1", name: "Eurosport 1", category: "General Sports", url: "http://185.189.225.157/EuroSport1/index.m3u8" },
  { id: "eurosport2", name: "Eurosport 2", category: "General Sports", url: "http://185.189.225.157/EuroSport2/index.m3u8" },
  { id: "fast studios", name: "Fast Studios Women's Sports", category: "Basketball", url: "https://csm-e-eb.csm.tubi.video/csm/extlive/tubiprd01,Fast-Studios-Womens-Sports.m3u8" },
  { id: "draftkings", name: "DraftKings Network", category: "US Sports", url: "https://na.linear.zype.com/e0bd0e23-a958-4e43-8164-4f2fef8876a8/fd3614bd-90bf-4530-a277-65ae3a1720c8-zype/live.m3u8" },
  { id: "tyc", name: "TYC Sports", category: "Football", url: "https://d1xm2jznwi5xzj.cloudfront.net/out/v1/34e0da501a8c4489b713809eb08a9bf3/index_14.m3u8" },
  { id: "real-madrid", name: "Real Madrid TV", category: "Football", url: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=1545" },
];

export const categories = Array.from(new Set(channels.map(c => c.category)));
