import {Streamer} from "../../models/streamer";
import StreamerItem from "./StreamerItem";
import classes from './StreamerList.module.scss'
import {Link} from "react-router-dom";

type StreamerListProps = {
    items: Streamer[]
}

const StreamerList: React.FC<StreamerListProps> = props => {
    const {items} = props
    return <div className={classes.streamerList}>
        {items?.length ? items.map(streamer => <div key={streamer.id}>
            <StreamerItem id={streamer.id}
                          name={streamer.name} platform={streamer.platform}
                          description={streamer.description}
                          image={streamer.image} votes={streamer.votes}/>
            <Link className={classes.link} to={`/streamer/${streamer.id}`}>Details</Link>
        </div>) : ''}
    </div>
}
export default StreamerList