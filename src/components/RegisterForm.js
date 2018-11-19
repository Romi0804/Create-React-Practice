import React, { Component } from 'react'
import api from '../api'

export default class RegisterForm extends Component {

  async handleSubmit (e) {
      e.preventDefault()
      const username = e.target.elements.username.value
      const password = e.target.elements.password.value

      //사용자 이름 중복체크
     const {data: users} = await api.get('users', {
         parmas: {
             username
         }
     })
    if(users.length > 0) {
        alert('이미 같은 이름이 사용중입니다.')
        return
    }

      const res = await api.post('/users/register', {
          username,
          password
      })

      //토큰 로컬 스토리지에 넣어서 로그인 해주는거
      localStorage.setItem('token', res.data.token)
      //TODO: 게시글 목록 보여주기
  }  
  
  render() {
    return (
    <form onSubmit={e => this.handleSubmit(e)}>
        <h1>회원가입</h1>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>가입</button>
    </form>
    )
  }
}
