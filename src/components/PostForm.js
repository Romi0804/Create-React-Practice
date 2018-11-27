import React, { Component } from 'react'
import classNames from 'classnames'

import s from './PostForm.module.scss'

// defaultValue에 다른 값을 또 넣어주지 않도록 주의
export default class PostForm extends Component {
  static defaultProps = {
    //true가 주어지면
    editing: false,
    onSubmit: () => {}
  }

  render() {
    const {editing} = this.props
    const titleClass = classNames(s.titleInput, {
      [s.editing]: editing
    })
  //객체 리터럴에서 속성에 대괄호를 넣었을때는 대괄호 안에 있는 표현식의 결과값이
   //곧 속성의 결과값이 된다.
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          const title = e.target.elements.title.value
          const body = e.target.elements.body.value
          this.props.onSubmit(title, body)
         }}>
          <input className={titleClass} type="text" name="title" defaultValue={this.props.title} />
          <textarea name="body" cols="30" rows="10" defaultValue={this.props.body}></textarea>
          <button>전송</button>
        </form>
      </div>
    )
  }
}

//어떤 코드를 사용하는 쪽에서는 그 코드의 구현 세부 사항에 대해 모른채로도
//그 코드를 사용할수 있어야한다. 그게 좋은 상황이야.