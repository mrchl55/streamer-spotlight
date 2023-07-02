import {useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import classes from './StreamerAddForm.module.scss'

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
        try {
            const response = await sendRequest('http://localhost:5000/streamers', 'POST', JSON.stringify({
                name,
                platform,
                description,
            }), {
                'Content-Type': 'application/json',

            })
            if (response) {
                setName('');
                setDescription('')
                setPlatform('Twitch')
            }
        } catch (err: any) {

        }
    }
    const isFormValid: boolean = (name === '' || description === '');
    return <form onSubmit={onSubmitHandler} className={classes.form}>
        <input name='name' value={name} placeholder='John Doe' onChange={onChangeNameHandler}/>
        <select onChange={onChangePlatformHandler}>
            <option>Twitch</option>
            <option>YouTube</option>
            <option>TikTok</option>
            <option>Kick</option>
            <option>Rumble</option>
        </select>
        <textarea name='description' value={description} placeholder='Most popular streamer of 2023'
                  onChange={onChangeDescriptionHandler}/>
        <button disabled={isFormValid} type='submit'>Add</button>
    </form>
}
export default StreamerAddForm