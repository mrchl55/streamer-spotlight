import StreamerItem from "../components/StreamerItem";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Streamer} from "../../models/streamer";
import {useHttpClient} from "../../shared/hooks/http-hook";

type StreamerSingleProps = {}
const StreamerSingle: React.FC<StreamerSingleProps> = props => {
    const {sid} = useParams()
    const [streamer, setStreamer] = useState<Streamer>({
        id: '', name: '', description: '', platform: ''

    })
    const {isLoading, error, sendRequest} = useHttpClient()
    useEffect(() => {

        const getStreamers = async () => {
            try {
                const streamerData = await sendRequest(`http://localhost:5000/streamer/${sid}`)
                setStreamer(streamerData.streamer)
            } catch (err: any) {

            }

        }
        getStreamers()


    }, [sendRequest])
    if (isLoading && !error) {
        return <div>Loading...</div>
    }
    if (!isLoading && error) {
        return <div>Error occured...</div>
    }
    if (!streamer) {
        return <div>Couldnt find streamer with this id</div>

    }
    const {id, name, description, platform, votes, image} = streamer;
    return <div>
        <StreamerItem id={id} name={name} description={description} platform={platform} image={image} votes={votes}/>
    </div>
}

export default StreamerSingle