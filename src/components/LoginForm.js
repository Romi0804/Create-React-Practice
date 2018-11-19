import React from 'react'
import api from '../api';

export default class LoginForm extends React.Component {
    constructor(props) {
      super(props)
    
     this.usernameRef = React.createRef()
     this.passwordRef = React.createRef()
    }
    
    async handleSubmit(e){
        e.preventDefault()
        const username = this.usernameRef.current.value
        const password = e.target.elements.password.value
        //Ref.current와 e.target.elements는 같다. 비교할겸 남겨두는 것
        //form을 안쓰고 제어되지 않는 컴포넌트를 쓰고 싶다 그렇다면 DOM 객체를 가지고 올 방법이 필요해
        //그럴때 Ref를 써야해. 그럴때는 Ref밖에 방법이 없거든 
        const res = await api.post ('/users/login', {
            username,
            password
        })
        localStorage.setItem('token', res.data.token)
        //TODO: 게시글 목록 보여주기
    }
    render(){
        const{onRegister} = this.props
        return (
            <React.Fragment>
            <form onSubmit={e => this.handleSubmit(e)}>
                <h1>로그인</h1>
                <input ref={this.usernameRef} type="text" name="username" />
                <input ref={this.passwordRef} type="password" name="password" />
                <button>로그인</button>
            </form>
            <button onClick={() => onRegister()}>회원가입</button>
            </React.Fragment>
        )
    }
}