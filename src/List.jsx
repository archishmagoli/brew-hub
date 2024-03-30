import axios from 'axios';
import { useState, useEffect } from 'react';

const List = () => {
    const URL = 'https://api.openbrewerydb.org/v1/breweries';
    const [breweries, setBreweries] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(URL);
            setBreweries(response.data);
        }
        fetchData();
    }, []);


    return (
        <>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Website URL</th>
                </tr>
            </thead>
            <tbody>
                {
                    breweries !== null ? 
                    breweries.map(brewery => 
                        <tr key={brewery.id}>
                            <td>{brewery.name}</td>
                            <td>{brewery.type}</td>
                            <td>{brewery.address_1}, {brewery.city}, {brewery.state_province}</td>
                            <td>{brewery.country}</td>
                            <td>{brewery.website_url ? brewery.website_url : 'None'}</td>
                        </tr>
                    
                    ) : null
                }
            </tbody>
            
        </table>
        </>
    )
}

export default List;