import axios from 'axios';
import {useState, useEffect} from 'react';
import './App.css';

const Cards = () => {
    const URL = 'https://api.openbrewerydb.org/v1/breweries/meta';
    const [metadata, setMetadata] = useState({
        total: 0,
        numberUS: 0,
        numberGeorgia: 0
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            let response;
    
            let MOD_URL = URL;
            response = await axios.get(MOD_URL);

            let totalNum = response.data.total;

            MOD_URL = URL + '?by_country=united_states'
            response = await axios.get(MOD_URL);
            let totalNumUS = response.data.total;

            console.log(totalNumUS);

            MOD_URL = URL + '?by_state=georgia'
            response = await axios.get(MOD_URL);
            let totalNumGeorgia = response.data.total;

            setMetadata({
                total: totalNum,
                numberUS: totalNumUS,
                numberGeorgia: totalNumGeorgia
            });

            console.log(metadata);
        }

        fetchMetadata();
    }, []);

    return (
        <div className='cardHolder'>
            <div className='card'>
                <h2>Total Breweries Worldwide</h2>
                <h2>🌎</h2>
                <p>{metadata.total}</p>
            </div>

            <div className='card'>
                <h2>Total American Breweries</h2>
                <img src='src\assets\usa.avif' id='flag'></img>
                <p>{metadata.numberUS}</p>
            </div>

            <div className='card'>
                <h2>Total Breweries in Georgia</h2>
                <img src='src\assets\georgia.png' className='georgia'></img>
                <p>{metadata.numberGeorgia}</p>
            </div>
        </div>
    )
}

export default Cards;