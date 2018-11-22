import React, { Component } from 'react'
import api from '../api';
import Layout from './Layout'
import {UserConsumer} from '../contexts/UserContext'

const posts = [
    {
        id:1,
        title: 'React 공부법'
    },
    {
        id:2,
        title: '프론트엔드 면접준비하기'
    }
]

export default class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: [],
         loading: false
      }
    }
 
async componentDidMount(){
    const res = await api.get('/posts')
    this.setState({
        posts: res.data
    }) 
}

  render() {
      const {posts} = this.state
      const {onPostDetailPage, onNewPostFormPage} = this.props
    return (
      <div>
        <button onClick={() => onNewPostFormPage()}>새글쓰기</button>
        <h1>게시물 목록</h1>
        <ul>
            {posts.map(post => (
              <li key={post.id} onClick={() => onPostDetailPage(post.id)}>{post.title}</li>  
            ))}
        </ul>
      </div>
    )
  }
}
