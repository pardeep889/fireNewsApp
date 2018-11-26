import React, { Component } from 'react';
import styles from './VideosList.css';
import { firebaseTeams, firebaseVideos,firebaseLooper } from '../../../firebase';
import Button from '../Buttons/buttons';
import VideosTemplate from './VideosTemplate';


class VideosList extends Component {
        state = {
            teams: [],
            videos: [],
            start: this.props.start,
            end: this.props.start + this.props.amount,
            amount: this.props.amount
        }
        
        componentWillMount(){
            this.request(this.state.start,this.state.end)
        }

        request = (start,end) => {
            if(this.state.teams.length < 1 ){
                firebaseTeams.once('value')
                .then( (snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })
                // axios.get(`${URL}/teams`).then(
                //     response => {
                //         this.setState({
                //             teams: response.data
                //         })
                //     }
                // )
            }
        firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value')
        .then( (snapshot) => {
            const videos = firebaseLooper(snapshot);
                this.setState({
                    videos: [...this.state.videos,...videos],
                    start,
                    end
                })
        }).catch( e => {
            console.log(e);
        })
            // axios.get(`${URL}/videos?_start=${start}&_end=${end}`).then(
            //     response => {
            //         this.setState({
            //             videos:[...this.state.videos,...response.data],
            //             start,
            //             end
            //         })
            //     }
            // )
        }

        loadMore = () => {
            let end = this.state.end + this.state.amount;
            this.request(this.state.end+1,end)
        }


        renderTitle =()=>{
            return this.props.title ? 
            <h3><strong>NBA</strong>Videos</h3>
            : null
        }
        renderButton =()=>{
            return this.props.loadmore ?
            <Button
              type ="loadmore"
              loadmore = {()=> this.loadMore()}
              cta = "Load More Videos"
              />
                : 
                <Button type="linkTo" cta="More Videos" linkTo="/videos"/>
        }
        renderVideos = () => {
            let template = null;
            switch(this.props.type){
                case('card'):
                    template = <VideosTemplate data = {this.state.videos} teams = {this.state.teams}/>
                break;
                default:
                    template = null;
            }
            return template
        }
        render(){
            // console.log(this.state.videos)
            return(
                <div className={styles.VideosList_wrapper}>
                    {this.renderTitle()}
                    { this.renderVideos() }
                    {this.renderButton()}
                </div>
            )
        }
}
export default VideosList;