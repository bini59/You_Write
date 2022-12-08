import loadChannel from "./loadChannel";
import loadVideo from "./loadVideo";
import loadVideos from "./loadVideos";
import loadChannelInfo from "./loadChannelInfo";

type video = {
    id: string,
    title: string,
    description: string,
    thumbnail: {
        url: string,
        width: number,
        height: number,
    },
    channelId: string,
}

type channel = {
    title: string,
    thumbnail: string,
    description : string
}

const saveVideos = (e:any, url:string, setChannel:any, setVideos:any) => {

    // let url: string = urlInput.current?.value == undefined ? "" : urlInput.current?.value;
    let url_parts = url.split("/");
    let id = url_parts[url_parts.length - 1];
    let type = url_parts[url_parts.length - 2];
    
    loadChannel(type, id, (res: string) => {
        loadChannelInfo(res, (channel: channel) => {
            setChannel(channel);
        });
        loadVideos(res, (ids: string[]) => {
            for (let videoID in ids) {
                loadVideo(ids[videoID], (video: video) => {
                    setVideos(video);
                });
            }
        });
    });
}

export default saveVideos;