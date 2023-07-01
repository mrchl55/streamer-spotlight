import StreamerAddForm from "../components/StreamerAddForm";
import {Streamer} from "../../models/streamer";
import StreamerList from "../components/StreamerList";
import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useRealm} from "../../shared/hooks/realm-hook";

type StreamerSpotlightProps = {}

const StreamerSpotlight: React.FC<StreamerSpotlightProps> = props => {
    const streamersList = useRealm()
    console.log('streamersList', streamersList)
    const [streamers, setStreamers] = useState<Streamer[]>([])
    const {isLoading, error, sendRequest} = useHttpClient()
    useEffect(() => {
        const getStreamers = async () => {
            try {
                const streamersData = await sendRequest('http://localhost:5000/streamers')
                console.log(streamersData)
                setStreamers(streamersData.streamers)
            } catch (serr: any) {
            }
        }
        getStreamers()


    }, [sendRequest, streamersList])


    return <div>
        Spotlight page
        <StreamerAddForm/>
        {!isLoading && !error ? <StreamerList items={[...streamers]}/> : ''}
        {isLoading ? 'Loading...' : ''}
        {error ? 'Error occured...' : ''}
    </div>
}

export default StreamerSpotlight