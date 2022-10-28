import React from 'react';
import { Button } from 'reactstrap';

export function CountryOrCity({List, removeSelected}){
    return(
        List.map((CountryOrCity, index) => (
        <div className='container' key ={index}>
            {CountryOrCity}
            <div className='buttons-container'>
                <Button onClick={() => removeSelected(CountryOrCity)}> X </Button>
            </div>
        </div>

        ))
    )
}