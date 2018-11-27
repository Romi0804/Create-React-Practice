import React from 'react'
import {UserConsumer, withUser} from '../contexts/UserContext'
import {Form} from 'semantic-ui-react'

class LoginForm extends React.Component {
  static defaultProps={
    //사용자가 로그인 폼을 전송했을때 호출되는 함수
    //username과 password 인수를 받음
    login: (username, password) => {},
    // 회원 가입 버튼을 눌렀을때 호출되는 함수
    onRegister: () => {}
  }
  //prop이 뭔지 알려줘야해 그럴때 static defaultprops를 써서 명시한다.
  //defaulprops는 기본값으로 사용되는거잖아 기본값으로 사용되는게 문제일수 있다.
  //onregister가 반드시 실행되어야 실행하고 싶다면 
  //onRegister:null로 써주면 된다. 이런경우 함수를 반드시 넘겨줘야한다.

  constructor(props) {
    super(props)
  
    this.usernameRef = React.createRef()
    this.passwordRef = React.createRef()
  }

        // async handleSubmit(e){
    //     e.preventDefault()
    //     const username = this.usernameRef.current.value
    //     const password = e.target.elements.password.value
    //     //Ref.current와 e.target.elements는 같다. 비교할겸 남겨두는 것
    //     //form을 안쓰고 제어되지 않는 컴포넌트를 쓰고 싶다 그렇다면 DOM 객체를 가지고 올 방법이 필요해
    //     //그럴때 Ref를 써야해. 그럴때는 Ref밖에 방법이 없거든 
    //     const res = await api.post ('/users/login', {
    //         username,
    //         password
    //     })
    //     localStorage.setItem('token', res.data.token)
    //     //TODO: 게시글 목록 보여주기
    // }
  
  handleSubmit(e) {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    this.props.login(username, password)
  }

  render() {
    const {onRegister} = this.props
    return (
      <React.Fragment>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <h1>로그인</h1>
          <Form.Input label="사용자 이름" type="text" name="username" />
          <Form.Input label="비밀번호" type="password" name="password" />

          <Form.Button>로그인</Form.Button>
        </Form>
        <button onClick={() => onRegister()}>회원 가입</button>
      </React.Fragment>
    )
  }
}

export default withUser(LoginForm)
// export default props => {
//   return <UserConsumer>
//     {({login}) => <LoginForm {...props} login={login} />}
//   </UserConsumer>
// }
