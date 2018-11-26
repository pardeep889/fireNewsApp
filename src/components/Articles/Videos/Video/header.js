import React from 'react';
import TeamNfo from '../../Elements/TeamNfo';
// import PostData from '../../Elements/PostData';


const Header = (props) => {


    const teaminfo = (team) =>{
        return team ? (
            <TeamNfo team={team}/>
        ):null;
    }

    // const postData = (date,author) => (
    //     <PostData data={{date,author}}/>
    // )


    return(
        <div>
            {teaminfo(props.teamData)}
            {/* {postData(props.date, props.author)} */}
        </div>
    )
}

export default Header;