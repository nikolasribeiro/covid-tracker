import React from 'react'
import './AdvanceInfo.css';
import numeral from 'numeral';

export default function AdvanceInfo({country, ...data}) {

    return (
        
        <div className="AdvanceInfo__container">
            <h2 id="AdvanceInfo__title">Advance Info about {country}</h2>
            
            <div className="AdvanceInfo__table">

                {
                    Object.keys(data['data']).map( (key, index)=> (
                        (key !== "updated" && key !== "country" && key !== "countryInfo" ? 
                            <tr key={index+1}>
                                <td key={index+10} className="key__table">{key}</td>
                                <td key={index+100} className="value__table">{  numeral(data['data'][key]).format("0,0") }</td>
                            </tr>
                        : '')
                    ))
                    
                }

            </div>

            
        </div>
    )
}
