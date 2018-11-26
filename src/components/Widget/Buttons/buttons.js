import React from 'react';
import { Link } from 'react-router-dom';

import styles from './buttons.css';

const Button = (props) => {
    let template = null;
    switch(props.type){
        case 'loadmore':
            template = (
                <div className = {styles.blue_button}
                onClick={props.loadmore}
                >
                    {props.cta}
                </div>
            )
            break;
        case 'linkTo':
                template = (
                    <Link to={props.linkTo} className={styles.blue_button}>
                        {props.cta}
                    </Link>
                )
            break;
        default:
            template = null;        
    }
    return template;
}

export default Button;