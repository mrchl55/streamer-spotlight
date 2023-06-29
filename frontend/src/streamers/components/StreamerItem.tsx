import {Streamer} from "../../models/streamer";

type StreamerItemProps = Streamer

const StreamerItem: React.FC<StreamerItemProps> = props => {
    const {id, name, platform, description, image, votes} = props
    return <>
    <div>{name}</div>
    <div>{platform}</div>
    </>
}
export default StreamerItem