import StreamerItem from "../components/StreamerItem";
type StreamerSingleProps = {

}
const StreamerSingle: React.FC<StreamerSingleProps> = props => {

    return <div>
        Single page
        <StreamerItem id={''} name={''} description={''} platform={''}/>
    </div>
}

export default StreamerSingle