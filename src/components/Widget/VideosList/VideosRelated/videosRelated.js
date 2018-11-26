import React from 'react';
import styles from '../VideosList.css';

import VideosTemplate from '../VideosTemplate';
const VidoesRelated = (props) =>{
   return(
       <div className={styles.relatedWrapper}>
        <VideosTemplate
            data = {props.data}
            teams = {props.teams}
        />
       </div>
   )
}


export default VidoesRelated;