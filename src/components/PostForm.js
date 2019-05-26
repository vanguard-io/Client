import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPost} from '../actions/postActions';

class PostForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    };

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    this.props.createPost({title: this.state.title, body: this.state.body});
  }

  render() {
    return (<div>
      <h1>Add Post</h1>
      <div>
        <label>Title:
        </label><br/>
        <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
      </div>
      <div>
        <label>Body:
        </label><br/>
        <textarea name="body" onChange={this.onChange} value={this.state.body}></textarea>
      </div>
      <br/>
      <button type="button" onClick={this.onSubmit}>Submit</button>
    </div>);
  }

}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({post: state.posts.item})

export default connect(mapStateToProps, {createPost})(PostForm);
