import React from 'react'
import { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {axiosWithToken} from '../axiosWithToken';
import {useNavigate} from 'react-router-dom'


function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  let navigate = useNavigate();

  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/user-api/articles`)
    console.log(res)
    setArticlesList(res.data.payLoad)
  }

  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

    useEffect(()=>{
      getArticlesOfCurrentAuthor()
    },[])


  return (
    <div>
        <div className=" ms-2 row row-cols-1 p-2 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
          {articlesList.map((article) => (
            <div className="col" key={article.articleId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 80) + "...."}</p>
                  <button className="btn btn-primary" onClick={()=>readArticleByArticleId(article)}>
                    <span>Read More</span>
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Last updated on {article.dateOfModification}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    
  )
}

export default Articles
