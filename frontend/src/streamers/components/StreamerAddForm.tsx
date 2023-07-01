import {useEffect, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";

type StreamerAddFormProps = {}

const StreamerAddForm: React.FC<StreamerAddFormProps> = props => {
    const {isLoading, error, sendRequest} = useHttpClient()
    const [name, setName] = useState('')
    const [platform, setPlatform] = useState('Twitch')
    const [description, setDescription] = useState('')

    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onChangePlatformHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setPlatform(e.target.value)
    }
    const onChangeDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await sendRequest('http://localhost:5000/streamers', 'POST', JSON.stringify({
                name,
                platform,
                description,
            }), {
                'Content-Type': 'application/json',

            })
            console.log(response)
        }catch (err: any){

        }

    }
    useEffect(() => {
        console.log(name, description, platform)
    }, [sendRequest])

    return <form onSubmit={onSubmitHandler}>
        <input name='name' value={name} placeholder='John' onChange={onChangeNameHandler}/>
        <select onChange={onChangePlatformHandler}>
            <option selected={true} disabled>Choose plarform..</option>
            <option>Twitch</option>
            <option>YouTube</option>
            <option>TikTok</option>
            <option>Kick</option>
            <option>Rumble</option>
        </select>
        <textarea name='description' value={description} placeholder='Most popular streamer of 2023'
                  onChange={onChangeDescriptionHandler}/>
        <button type='submit'>Add</button>
    </form>
}
export default StreamerAddForm