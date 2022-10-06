import { FC } from 'react';
import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css';
import { Image } from '../../interfaces';
import styles from './BlogSlideshow.module.css';

interface Props {
    images: Image[]
}

export const BlogSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide
        easing="ease"
        duration={ 7000 }
        indicators
    >
        {
            images.map( image =>  {
                const url = image.url;
                return (
                    <div className={ styles['each-slide'] } key={ image.id }>
                        <div style={{
                            backgroundImage: `url(${ url })`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                    </div>
                )

            })
        }

    </Slide>
  )
}
