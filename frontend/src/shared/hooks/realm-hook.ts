import *  as  Realm from "realm-web";
import {useEffect, useState} from "react";

const app = new Realm.App({id: "application-0-jogza"});
export const useRealm = () => {
    const [user, setUser] = useState<any>();
    const [streamers, setStreamers] = useState<any[]>([]);
    useEffect(() => {
        const login = async () => {
            const user = await app.logIn(Realm.Credentials.anonymous());
            setUser(user);
            console.log('addingg', streamers)
            const mongodb = app.currentUser!.mongoClient("mongodb-atlas");
            const collection: any = mongodb.db("streamers").collection("streamers");
            for await (const change of collection!.watch()) {
                setStreamers(streamers => [...streamers, change]);
            }
        }
        login();
    }, [streamers]);

    return streamers
}