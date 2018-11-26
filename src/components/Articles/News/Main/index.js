import React from 'react';
import NewsSlider from '../../../Widget/NewsSlider/slider';
import NewsList from '../../../Widget/NewsList/newsList';
const NewsMain = () =>{
    return(
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
                type ="cardMain"
                loadmore = {true}
                start = {3}
                amount = {3}
            />
        </div>
    )
}

export default NewsMain;