import *  as  Realm from "realm-web";
import {useEffect, useState} from "react";
import {ACCESS_DATA} from "../../util/access-variables";

const {DB_NAME, COLLECTION_NAME, REALM_APP_NAME} = ACCESS_DATA
const app = new Realm.App({id: `${REALM_APP_NAME}`});

export const useRealm = () => {
    const [user, setUser] = useState<any>();
    const [streamers, setStreamers] = useState<any[]>([]);
    useEffect(() => {
        console.log('changed')
        const login = async () => {
            const user = await app.logIn(Realm.Credentials.anonymous());
            setUser(user);
            const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
            const collection: any = mongodb.db(`${DB_NAME}`).collection(`${COLLECTION_NAME}`);
            for await (const change of collection.watch()) {
                console.log('change', change, streamers)
                console.log('ehh', change.operationType)
                console.log(change.operationType !== 'insert')
                if (change.operationType !== 'insert') {
                    continue
                }

                setStreamers(streamers => [...streamers, change]);
            }
        }
        login();
        console.log('streamers changed', streamers)
    }, [streamers]);

    return streamers
}