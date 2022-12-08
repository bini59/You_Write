import loadVideo from "./loadVideo";
import loadVideos from "./loadVideos";

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


const structVideo = (id:any, setVideos:any) => {
    loadVideos(id, (ids: string[]) => {
        for (let videoID in ids) {
            loadVideo(ids[videoID], (video: video) => {
                setVideos(video);
            });
        }
    });
}

export default structVideo;