import React, { Component } from 'react'
import api from '../api'

const {Provider, Consumer} = React.createContext()

export default class UserProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       id: null,
       username: null
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('token')){
      await this.refreshUser()
    }
  }
  
      async login(username, password){
        const res = await api.post ('/users/login', {
            username,
            password
        })
        localStorage.setItem('token', res.data.token)
        await this.refreshUser()
        //TODO: 게시글 목록 보여주기
    }

    logout() {
      // 1. 로컬스토리지에서 토큰 제거
      localStorage.removeItem('token')
      //2. 사용자 정보 캐시 초기화 (항상 주의해서 신경써야대 ! 원본이랑 사본이랑 달라질수 있어)
      this.setState ({
        id: null,
        username: null
      })
      //TODO: 3. 로그인폼 보여주기
    }

    async refreshUser(){
      const res2= await api.get ('/me')
      this.setState({
        id: res2.data.id,
        username: res2.data.username
      })
    }
  render() {
    const value = {
      username : this.state.username,
      id: this.state.id,
      login : this.login.bind(this),
      logout: this.logout.bind(this)
    }
    return (
      <Provider value={value}>{this.props.children}</Provider>
      //username에서 {} 중괄호를 2개 쓰는데 안에 있는건 객체중괄호, 밖의 것은 js 중괄호 이다.

    )
  }
}

export {
  UserProvider,
  Consumer as UserConsumer
}