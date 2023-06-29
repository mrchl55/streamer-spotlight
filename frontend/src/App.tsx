import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import StreamerSpotlight from "./streamers/pages/StreamerSpotlight";
import Navigation from "./shared/components/Navigation";
import StreamerSingle from "./streamers/pages/StreamerSingle";

function App() {


  return (
      <Routes>
        <Route path='/' element={< Navigation />}>
            <Route index element={<StreamerSpotlight />} />
            <Route path='streamer/:sid' element={<StreamerSingle />} />
        </Route>
      </Routes>
  );
}

export default App;
