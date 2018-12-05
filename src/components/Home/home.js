import React from 'react';
import NewsSlider from '../Widget/NewsSlider/slider';
import NewsList from '../Widget/NewsList/newsList';
import VideosList from '../Widget/VideosList/VideosList';
const Home = () => {
    return (
        <div>
            <NewsSlider
              type = "featured"
              start = {0}
              stop = {3}
              settings = {{
                  dots:false
              }}
            />
            <NewsList
                type ="card"
                loadmore = {true}
                start = {3}
                amount = {3}
            />
            <VideosList
                type ="card"
                title = {true}
                loadmore = {true}
                start = {0}
                amount = {3}
            />
        </div>
    );
};

export default Home;
