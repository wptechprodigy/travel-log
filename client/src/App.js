import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntry } from './API';
import LocationMarker from './components/LocationMarker';
import LogEntryForm from './components/LogEntryForm';

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
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

  const showAddMarkerPopup = event => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/waheedafolabi/ck6opw94l0aoo1is5vavsunkt"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <Fragment key={entry._id}>
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
              <LocationMarker viewport={viewport} color="yellow" />
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
                <small className="visitedOn">
                  Visited on: {new Date(entry.visitedDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>
              <LocationMarker viewport={viewport} color="red" />
            </div>
          </Marker>
          {addEntryLocation ? (
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={true}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <LogEntryForm />
              </div>
            </Popup>
          ) : null}
        </>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
