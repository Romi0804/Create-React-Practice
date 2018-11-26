import React, { Component } from 'react'
import classNames from 'classnames'

import s from './PostForm.module.scss'

// defaultValue에 다른 값을 또 넣어주지 않도록 주의
export default class PostForm extends Component {
  render() {
    const {editing} = this.props
    const titleClass = classNames(s.titleInput, {
      [s.editing]: editing
    })
  //객체 리터럴에서 속성에 대괄호를 넣었을때는 대괄호 안에 있는 표현식의 결과값이
   //곧 속성의 결과값이 된다.
    return (
      <div>
        <form onSubmit={e => this.props.onSubmit(e)}>
          <input className={titleClass} type="text" name="title" defaultValue={this.props.title} />
          <textarea name="body" cols="30" rows="10" defaultValue={this.props.body}></textarea>
          <button>전송</button>
        </form>
      </div>
    )
  }
}

