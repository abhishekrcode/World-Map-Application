import axios from "axios";
import { useEffect, useState } from "react";

const initialDetail = {
    country:'',
    capital:'',
    population:'',
    continents:'',
}

const Detail = ({place}) => {
    const [detail,setDetail] = useState(initialDetail)

    useEffect(()=>{
        
        const myArray = place.split(",");
        let count=0;

        for(let i of myArray){
        count++;
        }
            
            axios.get(`https://restcountries.com/v3.1/name/${myArray[count-1]}`)
            .then((response)=> {
                console.log(response.data[0]);
                setDetail({country:myArray[count-1],capital:response.data[0].capital,population:response.data[0].population,continents:response.data[0].continents})
                console.log(detail)
            }).catch(error =>{
                console.log(error)
            })
        },[place])



    return (
       
        <>
        <p1>Country:{detail.country}</p1>
        <p1>Capital:{detail.capital}</p1>
        <p1>Population:{detail.population}</p1>
        <p1>Continent:{detail.continents}</p1>
        </>
    )
}

export default Detail;