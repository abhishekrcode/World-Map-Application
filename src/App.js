import Map, {
  FullscreenControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { GeolocateControl } from "mapbox-gl";

import axios from "axios";

//components
import Detail from "./component/Detail";


const Container = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: grey;
`;

function App() {
  let [lat, setLattitude] = useState(18.25);
  let [lng, setLongitude] = useState(-63.16666666);

  const [latitude, setClickLat] = useState(null);
  const [longitude, setClickLong] = useState(null);
  const [place, setPlace] = useState("");

  const InformationGain = (e) => {
    e.target.doubleClickZoom._clickZoom = true;
    setClickLat(e.lngLat.lat);
    setClickLong(e.lngLat.lng);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1IjoiYWJoaTVoZWtyYWoiLCJhIjoiY2xpazlwZGNtMDJ6cjNkcWYzZ3NseHVuZCJ9.kSCZANysCSgTxWQmEVVaFw`
      )
      .then((response) => {
        console.log(response.data.features[1].place_name);
        //  const place = response.data.features[1].place_name ;
        setPlace(response.data.features[1].place_name);
      });
  }, [latitude, longitude]);

  return (
    <Container>
      <h1> World Map Application</h1>
      <Map
        onClick={(e) => InformationGain(e)}
        mapboxAccessToken="Your_AccessToken_Here"
        style={{
          width: "700px",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid blue",
        }}
        initialViewState={{
          longitude: lng,
          latitude: lat,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl />
        <FullscreenControl />

        {/* <Marker
         longitude={lng}
         latitude={lat}
      /> */}
      </Map>
      <Detail place={place} />
    </Container>
  );
}

export default App;
