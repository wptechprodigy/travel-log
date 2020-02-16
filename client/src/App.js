import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { listLogEntry } from './API';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 9.082,
    longitude: 8.6753,
    zoom: 3,
  });

  // Since useEffect cannot be make an async function
  // A work around will be to make an async IIFE to await the fetch from our server
  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntry();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/waheedafolabi/ck6opw94l0aoo1is5vavsunkt"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map(entry => (
        <Marker
          key={entry._id}
          latitude={entry.latitude}
          longitude={entry.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img
            src="https://i.imgur.com/y0G5YTX.png"
            alt="marker"
            style={{
              width: `calc(1vmin * ${viewport.zoom})`,
              height: `calc(1vmin * ${viewport.zoom})`
            }}
            className="marker"
          />
        </Marker>
      ))}
    </ReactMapGL>
  );
}

export default App;
