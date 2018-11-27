import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import PostForm from './PostForm'

const actions = {
    onSubmit: action('onSubmit')
}


storiesOf('PostForm', module)
  .add('default', () => <PostForm {...actions} />)
  //action은 테스트용 함수를 좀더 쉽게 만들수 있는 함수 
  //여기에 넘겨진 함수가 호출되면 인수가 넘겨지는데 
  //특정상황을 연출해서 테스트하고자 할때 이용하면 된다.
  .add('editing', () => <PostForm onSubmit={action('onSubmit')} editing={true} />)

  //위처럼 변수로 만들어서 {...actions}로 펼쳐주는 방법이 있고 
  // onSubmit={action('onSubmit)} 으로 써주는 2가지 방법이 있다.


  //onSubmit={linkTo('PostDetailView)}는 submit을 누르면
  //PostDetailView 컴포넌트로 넘어간다.
  //여러페이지를 시연할때 이 기능을 이용해서 시연하기도 한다.