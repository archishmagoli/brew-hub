import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const BrewDetail = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        let URL = `https://api.openbrewerydb.org/v1/breweries?by_ids=${params.id}`;
        const getBrewDetail = async () => {
            try {
                let response = await axios.get(URL);
                setFullDetails(response.data[0]); // Assuming the response is an array, so access the first element
            } catch (error) {
                console.error(error);
            }
        };
        
        getBrewDetail();
    }, [params.id]);

    return (
        <>
            {fullDetails ? (
                <div key={fullDetails.id}>
                    <p><strong>Name:</strong> {fullDetails.name}</p>
                    <p><strong>Brewery Type:</strong> {fullDetails.brewery_type}</p>
                    <p><strong>Address:</strong> {fullDetails.address_1 ? fullDetails.address_1 + ', ' : null} 
                        {fullDetails.city}, {fullDetails.state_province}</p>
                    <p><strong>Postal Code:</strong> {fullDetails.postal_code}</p>
                    <p><strong>Country:</strong> {fullDetails.country}</p>
                    <p><strong>Phone:</strong> {fullDetails.phone}</p>
                    <p><strong>Website:</strong> {fullDetails.website_url ? <a href={fullDetails.website_url} target='_blank' rel="noopener noreferrer">{fullDetails.website_url}</a> : 'None'}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
  };
  
  export default BrewDetail;