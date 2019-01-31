import React from 'react';
import { Box } from 'grommet';

export default (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='start'
        border={{ color: 'brand', side: 'bottom', size: 'medium' }}
        height='xsmall'
        pad={{ left: 'none', right: 'none', vertical: 'small' }}
        elevation='medium'
        style={{ zIndex: '1' }}
        {...props}
    />
)