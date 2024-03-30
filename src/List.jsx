import axios from 'axios';
import { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import './App.css'

const List = () => {
    const URL = 'https://api.openbrewerydb.org/v1/breweries';
    const [breweries, setBreweries] = useState([]);
    const [typeFilter, setTypeFilter] = useState(null);
    const [search, setSearch] = useState(null);

    const brewery_types = [
        {value: 'large', label: 'large'},
        {value: 'micro', label: 'micro'},
        {value: 'nano', label: 'nano'},
        {value: 'regional', label: 'regional'},
        {value: 'brewpub', label: 'brewpub'},
        {value: 'planning', label: 'planning'},
        {value: 'bar', label: 'bar'},
        {value: 'contract', label: 'contract'},
        {value: 'proprietor', label: 'proprietor'},
        {value: 'closed', label: 'closed'}
    ]

    useEffect(() => {
        const fetchData = async () => {
            let response;
            let MOD_URL = URL;

            if (typeFilter !== null) {
                MOD_URL = MOD_URL + '?by_type=' + typeFilter;
            }
            
            if (search !== null) {
                
                MOD_URL = MOD_URL + (typeFilter === null ? '?' : '&') + 'by_name=' + encodeURIComponent(search);
            }

            response = await axios.get(MOD_URL);

            console.log(MOD_URL);

            setBreweries(response.data);
        }
        fetchData();
    }, [typeFilter, search]);

    return (
        <>
        <label htmlFor='nameSearch'>Search By Name</label>
        <input id='nameSearch' name="nameSearch" type="text" onChange={e => setSearch(e.target.value)} />

        <Select options={brewery_types} className='brewery_dropdown' onChange={(type) => setTypeFilter(type[0].value)} />
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
                            <td>{brewery.brewery_type}</td>
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