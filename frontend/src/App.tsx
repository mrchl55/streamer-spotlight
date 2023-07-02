import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import StreamerSpotlight from "./streamers/pages/StreamerSpotlight";
import StreamerSingle from "./streamers/pages/StreamerSingle";
import Wrapper from "./shared/components/Wrapper";

function App() {


    return (
        <Routes>
            <Route path='/streamers' element={< Wrapper/>}>
                <Route index element={<StreamerSpotlight/>}/>
            </Route>
            <Route path='/streamer/:sid' element={< Wrapper/>}>
                <Route index element={<StreamerSingle/>}/>
            </Route>
            <Route
                path="*"
                element={<Navigate to="/streamers" replace/>}
            />
        </Routes>
    );
}

export default App;
