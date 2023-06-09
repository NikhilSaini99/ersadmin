import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function GalleryItem({ img, title, description, key: id }) {

  return (
    <>
      <Card >
        <CardMedia
          sx={{ height: 140 }}
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant='outlined'>delete</Button>
          <Button size="small"variant='outlined'>update</Button>
        </CardActions>
      </Card>



    </>
  )
}