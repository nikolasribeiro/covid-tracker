import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css';

export default function InfoBox({title, cases, total, active, infected, recovered, deaths, ...props}) {
    

    return (
        <Card className={`infobox ${active && "infobox selected"} ${infected && "infobox infected"} ${recovered && "infobox recovered"} ${deaths && "infobox deaths"}`} onClick={props.onClick}>

            <CardContent>
                {/* Title */}
                <Typography  className="infobox__title" color="textSecondary">{title}</Typography>
                {/* Cases */}
                <h2 className="infobox__cases">{cases}</h2>
                {/* Total */}
                <Typography color="textSecondary" className="infobox__total">{total} new</Typography>
            </CardContent>
        </Card>
    )
}
