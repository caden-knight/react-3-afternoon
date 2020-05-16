import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(res => {
      return this.setState({posts: res.data})
    })
    .catch( err => 'WTF')
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts/?id=${id}`, {text})
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => 'Yo Mama')
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts/?id=${id}`)
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch("WTF")
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(res => {
      this.setState({posts: res.data})
    })
  }

  render() {
    //console.log(this.updatePost)
    const { posts } = this.state;
    const post = posts.map(post => <Post 
      key={post.id} 
      posts={post} 
      updatePostFn={this.updatePost} 
      id={post.id} 
      text={post.text}
      deletePostFn={this.deletePost}/>)

    
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {post}
          

            
        </section>
      </div>
    );
  }
}

export default App;
