import React, { Component } from 'react'
import PostForm from './PostForm'
import api from '../api';

export default class EditPostForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      title: '',
      body: ''
    }
  }

  async componentDidMount() {
    const {data: {title, body}} = await api.get(`/posts/${this.props.postId}`)
    this.setState({
      title,
      body
    })
  }
  
  async handleSubmit(e) {
    e.preventDefault()
    const title = e.target.elements.title.value
    const body = e.target.elements.body.value
    await api.patch(`/posts/${this.props.postId}`, {
      title,
      body
    })
    // FIXME: 자기가 작성한 글만 수정 가능하도록 고쳐야 함
    this.props.onPostDetailPage(this.props.postId)
  }

  render() {
    const {title, body} = this.state
    if (!title) {
      return 'loading...'
    }
    return (
      <PostForm editing={true} onSubmit={e => this.handleSubmit(e)} title={title} body={body} />
    //  component들간에 정보를 주고 받는것은 prop으로 가능하니까 넣어주고 style 조금 다르게 먹이고 싶다고 얘기 하는건 
    // editing={true}로 표현해서 말해준다.
    )
  }
}

