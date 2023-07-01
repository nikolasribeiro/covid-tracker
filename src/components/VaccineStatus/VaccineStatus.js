import React, {useEffect, useState} from 'react'
import {API_CALL} from '../../utils/utils';
import './VaccineStatus.css';

export default function VaccineStatus() {
    
    const [vaccinePhases, setVaccinePhases] = useState([]);

    //Get Vaccine Status
    // useEffect(()=>{
        // fetch(API_CALL.getVaccineStatus)
          // .then(result=>result.json())
          // .then(data=>{
            // setVaccinePhases(data['phases'])
          // })
    // },[])


    return (
        <div className="vaccine_status___container">
            
            <th>
                <td>Phases</td>
                <td>Candidates</td>
            </th>

           {
                vaccinePhases.map( (element, index) =>(
                    <tr>
                        <td>{element.phase}</td>
                        <td>{element.candidates}</td>
                    </tr>
                ))
           }
        </div>
    )
}
