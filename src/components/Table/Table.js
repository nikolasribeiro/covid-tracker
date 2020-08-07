import React from 'react'
import './Table.css'
import numeral from 'numeral';


export default function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases}, index) => (
                <tr key={index+1}>
                    <td key={index}>{country}</td>
                    <td key={index+10}><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    )
}
