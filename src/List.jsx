import axios from 'axios';
import { useState, useEffect } from 'react';
import Select from 'react-dropdown-select';
import './App.css'

const List = () => {
    const URL = 'https://api.openbrewerydb.org/v1/breweries';
    const [breweries, setBreweries] = useState([]);

    const [searchTerms, setSearchTerms] = useState({
        breweryType: null,
        nameSearch: null,
        citySearch: null
    })

    const breweryTypes = [
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

    const handleSearch = (event) => {
        event.preventDefault();
        fetchData();
    }

    const fetchData = async () => {
        let response;
        let MOD_URL = URL;

        if (searchTerms.breweryType !== null) {
            MOD_URL = MOD_URL + '?by_type=' + searchTerms.breweryType;
        }
        
        if (searchTerms.nameSearch !== null) {
            MOD_URL = MOD_URL + (searchTerms.breweryType === null ? '?' : '&') 
                + 'by_name=' + encodeURIComponent(searchTerms.nameSearch);
        }

        if (searchTerms.citySearch !== null) {
            MOD_URL = MOD_URL + (searchTerms.breweryType === null && searchTerms.nameSearch === null 
                ? '?' : '&') + 'by_city=' + encodeURIComponent(searchTerms.citySearch);
        }

        response = await axios.get(MOD_URL);
        setBreweries(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleTerms = (event) => {
        const {name, value} = event.target;
        setSearchTerms({ ...searchTerms, [name]: value});
    }

    return (
        <>
        <div className='searchBar'>
            <form onSubmit={handleSearch} className='searchForm'>
                <label htmlFor='nameSearch'>Search By Name:</label>
                <input id='nameSearch' name="nameSearch" type="text" onChange={handleTerms}/>
                <p>|</p>
                <label htmlFor='citySearch'>Search By City:</label>
                <input id='citySearch' name='citySearch' type="text" onChange={handleTerms}/>
                <p>|</p>
                <div style={{'display' : 'flex', 'alignItems' : 'center', 'justifyContent' : 'center', 'width' : '15em', 'gap' : '0.5em'}}>
                    <p>Search By Type: </p>
                    <Select id='breweryDropdown' options={breweryTypes} className='breweryDropdown' onChange={(type) =>
                        setSearchTerms({ ...searchTerms, breweryType: type[0].value})
                    }/>
                </div>

                <button type="submit">Search</button>
            </form>
        </div>
        

        <table className='brewTable'>
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
                            <td>{brewery.address_1 !== null ? brewery.address_1 + ', ' : null} 
                                {brewery.city}, {brewery.state_province}</td>
                            <td>{brewery.country}</td>
                            <td>{brewery.website_url ? <a href={brewery.website_url} target='_blank'>{brewery.website_url}</a> : 'None'}</td>
                        </tr>
                    
                    ) : null
                }
            </tbody>
        </table>
        </>
    )
}

export default List;