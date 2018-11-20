import React, { Component } from 'react'
import api from '../api';

export default class postDetail extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       body: '',
       title: ''
       //서버로 부터 자료를 아직 안가져왔을때는 body랑 Title을 빈문자열로
       //가지고 있다가 가지고온 다음에는 나타내줘야하기 때문에 일단 가지고 있는거야.
    }
  }
  
  async componentDidMount(){
    const {data: {title, body}} = await api.get(`/posts/${this.props.postId}`)
    this.setState({
      title,
      body
    })
  }

  render() {
    const {postId} = this.props
    const {title, body} = this.state
    return (
      <div>
        <h1>게시물</h1>
        <div>{title}</div>
        <div>{body}</div>
      </div>
    )
  }
}
