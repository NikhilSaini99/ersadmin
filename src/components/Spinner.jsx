import React from 'react'
import { CircularProgress, experimentalStyled } from '@mui/material'

// const Screen = experimentalStyled('div')(() => ({
//     position: 'fixed',
//     width: '100%',
//     height: '100%',
//     display: 'grid',
//     placeContent: 'center'

// }));
const Spinner = () => {
    return (
        <div style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            display: 'grid',
            placeContent: 'center'
        }} >
            <CircularProgress />
        </div>
    )
}

export default Spinner