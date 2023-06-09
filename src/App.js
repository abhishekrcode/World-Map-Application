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
  flex-direction: column ;
  background-color: grey;
`;


const initialSearchValue = {
  country:'',
  capital:'',
  population:'',
  continents:'',
}

function App() {
  let [lat, setLattitude] = useState(18.25);
  let [lng, setLongitude] = useState(-63.16666666);

  const [latitude, setClickLat] = useState(null);
  const [longitude, setClickLong] = useState(null);
  const [place, setPlace] = useState("");

  const [searchPlace, setsearchPlace] = useState(initialSearchValue);
  const [flag,setFlag] =useState(false);
  const [flags,setFlags] =useState("");
  const [savedflags,setsavedFlags] =useState("");

  const [saved,setsaved] = useState("");

  const InformationGain = (e) => {
    e.target.doubleClickZoom._clickZoom = true;
    setClickLat(e.lngLat.lat);
    setClickLong(e.lngLat.lng);
    setFlag(false);
    console.log("flaaaaaaaaaaaag",flags);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=ACESS_TOKEN`
      )
      .then((response) => {
        console.log(response.data.features[1].place_name);
        //  const place = response.data.features[1].place_name ;
        setPlace(response.data.features[1].place_name);
      });

  }, [latitude, longitude]);

  const SearchItem = async (e) => {
    const searchValue = e.target.value;
    try{

      await axios.get(`https://restcountries.com/v3.1/name/${searchValue}`)
      .then((response)=> {
        setsearchPlace({country:searchValue,capital:response.data[0].capital,population:response.data[0].population,continents:response.data[0].continents})
        console.log("SearchValue",searchPlace)
        console.log("Res",response.data[0])
        setFlags(response.data[0].flags.png);
        console.log("Flag",flags)

      })
      }catch(error){
        console.log(error);
      }
        
  }

  const OnSubmit =()=>{
    setsaved(searchPlace);
    setFlag(true);
    setsavedFlags(flags);

  }

  return (
    <Container>
      <h1> World Map Application</h1>
      <input type="text" placeholder="Search Country" onChange={(e)=>{SearchItem(e)}}></input>
      <input type="button" value={"Submit"} onClick={()=> {OnSubmit()}}></input>
      

      <Map
        onClick={(e) => InformationGain(e)}
        mapboxAccessToken="ACESS_TOKEN"
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
      {flag?<img src={savedflags}/>:" "}
      <Detail place={place} saved={saved}  flag={flag} flags={flags}  setFlags={setFlags}/>
      
    </Container>
  );
}

export default App;
