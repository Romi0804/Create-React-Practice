import React, { Component } from 'react'

import api from '../api'

const {Provider, Consumer} = React.createContext({
  username: 'fast',
  id: 0,
  login: () => {},
  logout: () => {}
})

export default class UserProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      id: null,
      username: null
    }
  }

  async componentDidMount() {
    if (localStorage.getItem('token')) {
      await this.refreshUser()
    }
  }
  
  async login(username, password) {
    const res = await api.post('/users/login', {
      username,
      password
    })
    localStorage.setItem('token', res.data.token)
    await this.refreshUser()
    // 게시글 목록 보여주기
    this.props.onPostListPage()
  }

  logout() {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token')
    // 사용자 정보 캐시 초기화
    this.setState({
      id: null,
      username: null
    })
    // TODO: 로그인 폼 보여주기
  }

  async refreshUser() {
    const res2 = await api.get('/me')
    this.setState({
      id: res2.data.id,
      username: res2.data.username
    })
  }

  render() {
    const value = {
      username: this.state.username,
      id: this.state.id,
      login: this.login.bind(this),
      logout: this.logout.bind(this)
    }
    return (
      <Provider value={value}>{this.props.children}</Provider>
    )
  }
}

function withUser(WrappedComponent) {
  return function (props) {
    return (
      <Consumer>
        {value => <WrappedComponent {...value} {...props} />}
      </Consumer>
    )
  }
  //WithUser.displayName= `withUser(${getDisplayName(WrappedComponent)})`
  //WithUser.displayName = 'WithUser(!!!)'
  //React 개발자 도구에서 Unknown으로 뜨는걸 방지하기 위해 쓰는 코드
  //팀 프로젝트 할때에는 쓰는 것이 좋다 
  //return WithUser
}


export {
  UserProvider,
  Consumer as UserConsumer,
  withUser
}