import {Streamer} from "../../models/streamer";
import StreamerItem from "./StreamerItem";
type StreamerListProps = {
    items: Streamer[]
}

const StreamerList: React.FC<StreamerListProps> = props => {
    const {items} = props
    return <ul>
        {items?.length ? items.map(streamer => <StreamerItem id={streamer.id} key={streamer.id} name={streamer.name} platform={streamer.platform} description={streamer.description} />) : ''}
    </ul>
}
export default StreamerList