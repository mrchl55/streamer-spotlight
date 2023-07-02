import StreamerAddForm from "../components/StreamerAddForm";
import {Streamer} from "../../models/streamer";
import StreamerList from "../components/StreamerList";
import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useRealm} from "../../shared/hooks/realm-hook";
import classes from './StreamerSpotlight.module.scss'

type StreamerSpotlightProps = {}

const StreamerSpotlight: React.FC<StreamerSpotlightProps> = props => {
    const streamersList = useRealm()
    const [streamers, setStreamers] = useState<Streamer[]>([])
    const {isLoading, error, sendRequest} = useHttpClient()
    useEffect(() => {
        const getStreamers = async () => {
            try {
                const streamersData = await sendRequest('http://localhost:5000/streamers')
                setStreamers(streamersData.streamers)
            } catch (serr: any) {
            }
        }
        getStreamers()


    }, [sendRequest, streamersList])


    return <div className={classes.spotlight}>
        <h3>
            Add new streamer
        </h3>
        <StreamerAddForm/>
        <h3>
            All streamers
        </h3>
        {!isLoading && !error ? <StreamerList items={[...streamers]}/> : ''}
        {isLoading ? 'Loading...' : ''}
        {error ? (typeof error === "string" ? error : 'Error occured') : ''}
    </div>
}

export default StreamerSpotlight