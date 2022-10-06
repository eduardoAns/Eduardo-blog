import { Button, Grid, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'

export const AddComent = () => {
  return (
    <Grid item mt={3} >
        <Grid item xs={12} mb={1}>
            <TextField 
                label="De :" 
                variant="filled" 
                fullWidth 
                size="small"
            />
        </Grid>
        <Grid item xs={12} mb={1}>
            <TextField 
              label="Contenido" 
              variant="filled" 
              fullWidth 
              size="medium"
              multiline
            />
        </Grid>  
        <Grid item xs={12} sx={{paddingLeft:2, }} mt={2}>
            <Button  
                type='submit'
                color="secondary" 
                className='circular-btn' 
                size='large'                 
            >
                Comentar
            </Button>
      </Grid>
    </Grid>
    
  )
}
