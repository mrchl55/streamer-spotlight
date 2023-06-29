import {Streamer} from "../../models/streamer";
import {useCallback, useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";

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
        return <div>Speaker doesn't exist</div>
    }

    const voteUpHandler = async () => {
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
    return <div>
        <div>{id}</div>
        <div>{name}</div>
        <img src={image}/>
        <div>{description}</div>
        <div>{platform}</div>
        <div>{currentUpVotes}
            <button onClick={voteUpHandler}>Vote up</button>
        </div>
        <div>{currentDownVotes}
            <button onClick={voteDownHandler}>Vote down</button>
        </div>
    </div>
}
export default StreamerItem