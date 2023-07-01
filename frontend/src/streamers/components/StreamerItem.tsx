import {Streamer} from "../../models/streamer";
import {useCallback, useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import classes from './StreamerItem.module.scss';

type StreamerItemProps = Streamer

const StreamerItem: React.FC<StreamerItemProps> = props => {
    const {id, name, platform, description, image, votes = {upvotes: 0, downvotes: 0}} = props
    const {sendRequest} = useHttpClient()
    const [currentUpVotes, setCurrentUpVotes] = useState<number>(votes.upvotes)
    const [currentDownVotes, setCurrentDownVotes] = useState<number>(votes.downvotes)
    const updateVotes = useCallback(async (votes: { upvotes: number, downvotes: number }) => {
        try {
            const streamersData = await sendRequest(`http://localhost:5000/streamers/${id}/vote`, 'PUT', JSON.stringify({
                votes
            }), {
                'Content-Type': 'application/json',

            })

        } catch (err: any) {

        }

    }, [])


    if (!id) {
        return <div className={classes.streamer}>Speaker doesn't exist</div>
    }

    const voteUpHandler = async (e: any) => {
        e.preventDefault()
        setCurrentUpVotes(currentUpVotes + 1)
        await updateVotes({
            downvotes: currentDownVotes,
            upvotes: currentUpVotes + 1,
        })
    }
    const voteDownHandler = async () => {
        setCurrentDownVotes(currentDownVotes + 1)
        await updateVotes({
            upvotes: currentUpVotes,
            downvotes: currentDownVotes + 1,
        })
    }
    return <div className={classes.streamerItem}>
        <div >{id}</div>
        <div className={classes.name}>{name}</div>
        <img src={image}/>
        <div>{description}</div>
        <div>{platform}</div>
        <div className={classes.votes}>

        <div>
            <button onClick={voteUpHandler}>Vote up</button>
            <span>{currentUpVotes}</span>
        </div>
        <div>
            <button onClick={voteDownHandler}>Vote down</button><span>{currentDownVotes}</span>
        </div>

        </div>
    </div>
}
export default StreamerItem