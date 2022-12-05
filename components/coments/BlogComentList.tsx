import { Grid, Typography } from '@mui/material'
import React, { FC, useContext, useEffect, useState } from 'react'
import blogApi from '../../api/blogApi'
import { ComentContext } from '../../context/coment'
import { useComent } from '../../hooks/useComent'
import { Coment } from '../../interfaces'
import { BlogComent } from './BlogComent'

interface Props {
  idBlog?: number
}


export const BlogComentList:FC<Props> = ({idBlog}) => {

  const { isComment, getComents } = useContext( ComentContext );
  const [coments, setComentarios] = useState<Coment[]>([])
  const onGetComents = async () =>{
    const data = await getComents()
    setComentarios(data)
  }

  const comentsByIdBlog:Coment[] = coments.filter(({idPost})=> idPost == idBlog )
  
  useEffect(() => {
    console.log("actualizando comentarios")
    onGetComents()
  }, [isComment])

  
  return (
    <Grid item >
      {
        comentsByIdBlog.map( coment => (
          <BlogComent coment={coment} key={coment.id}/>
        ))
      }
          
    </Grid>
  )
}
