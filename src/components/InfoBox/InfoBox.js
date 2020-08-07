import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export default function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* Title */}
                <Typography  className="infobox__title" color="textSecondary">{title}</Typography>
                {/* Cases */}
                <h2 className="infobox__cases">{cases}</h2>
                {/* Total */}
                <Typography color="textSecondary" className="infobox__total">{total} total</Typography>
            </CardContent>
        </Card>
    )
}
