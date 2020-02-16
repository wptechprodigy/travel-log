import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntry } from './API';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
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
        <>
          <Marker
            key={entry._id}
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <img
                src="https://i.imgur.com/y0G5YTX.png"
                alt="marker"
                style={{
                  width: `calc(1vmin * ${viewport.zoom})`,
                  height: `calc(1vmin * ${viewport.zoom})`,
                }}
                className="marker"
              />
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={true}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small className='visitedOn'>
                  Visited on: {new Date(entry.visitedDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
    </ReactMapGL>
  );
}

export default App;
