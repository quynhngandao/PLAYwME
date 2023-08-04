import { Box} from '@mui/system'
import React from 'react'
import PopoverPopupState from './PopoverPopupState'
import { Typography } from '@mui/material'

function ContactForm() {
  return (
    <Box className='contact-form'>
 <Typography variant="h3" color="primary.main" className="page-heading">
        Make a Schedule Request 
      </Typography>
        <PopoverPopupState/>
    </Box>
  )
}

export default ContactForm