import React, { Component } from 'react'

import PostDetailView from '../components/PostDetailView'
import api from '../api';

export default class PostDetail extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      body: '',
      title: '',
        //서버로 부터 자료를 아직 안가져왔을때는 body랑 Title을 빈문자열로
       //가지고 있다가 가지고온 다음에는 나타내줘야하기 때문에 일단 가지고 있는거야.
      userId: null,
      loading: true
    }
  }
  
  async componentDidMount() {
    const {data: {title, body, userId}} = await api.get(`/posts/${this.props.postId}`)
    this.setState({
      title,
      body,
      userId,
      loading: false
    })
  }
  
  render() {
    const {onEditPostFormPage, postId} = this.props
    const {userId, title, body, loading} = this.state
    return (
      <PostDetailView
        loading={loading}
        userId={userId}
        onEditPostFormPage={onEditPostFormPage}
        postId={postId}
        title={title}
        body={body}
      />
    )
  }
}