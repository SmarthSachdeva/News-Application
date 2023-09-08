import React, { useEffect, useState } from "react";
import { getNews } from "../Service/getNews";
import alanBtn from '@alan-ai/alan-sdk-web';
import moment from "moment";

export default function NewsData() {
  const [newsData, setNewsData] = useState([]);
  const [select , setSelect] = useState('');

  const ALAN_KEY = '99e931f10be41e45018122781c03e5fc2e956eca572e1d8b807a3e2338fdd0dc/stage';


  const getAllNews = async () => {
    let data = await getNews(select);
    setNewsData(data.data.articles);
  };

  const selectCategory =(e)=>{
    setSelect(e.target.value);
  }

  useEffect(() => {
    getAllNews();
  }, [select]);
  console.log(newsData);

  useEffect(() => {
    alanBtn({
        key: ALAN_KEY,
        onCommand: (commandData) => {
          setSelect(commandData.data)
        }
    });
  }, []);

  return (
    <div className="main">
      <h1>News Application using alan Ai</h1>
      <div className="select">
        <label for="cars">Choose news category:</label>

        <select 
        className="select-box" 
        name="news" 
        id="news"
        onChange={selectCategory}
        value={select}
        >
            <option className="select-option" value="general">General</option>
            <option className="select-option" value="business">Business</option>
            <option className="select-option" value="sports">Sports</option>
            <option className="select-option" value="health">Health</option>
            <option className="select-option" value="entertainment">Entertainment</option>
        </select>
      </div>
      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <img src={news?.urlToImage} alt="" className="news-image" />
              <p className="news-title-class">{news?.title}</p>
              <p className="news-content">{news?.content}</p>
              <div className="space-btw">
                <p className="news-author">
                  Published On : {moment(news?.publishedAt).format("LL")}
                </p>
                <p className="news-author">
                  Author : {news?.author ? news?.author : "Anonymous"}{" "}
                </p>
              </div>
              <a href={news?.url} target="_blank">
                Read More ..
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
