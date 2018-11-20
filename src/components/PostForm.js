import React, { Component } from 'react'

export default class PostForm extends Component {
 render() {
  return (
     <div>
            <form onSubmit={e => this.props.onSubmit(e)}>
             <input type="text" name="title" defaulValue={this.props.title} />
             <textarea name="body" cols="30" rows="10" defaultValue={this.props.body}></textarea>
             <button>전송</button>
            </form>             
          </div>
        )
      }
}
