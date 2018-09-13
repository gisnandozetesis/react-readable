import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { changeCurrentCategory } from '../actions/post';

class Categories extends Component {


    state = {
        categories: []
      }
    
      componentDidMount() {
        API.getAllCategories()
          .then(categories => {
            this.setState({
              categories
            });
        
          })
      }
    
      changeCategory(newCategory) {
        API.getPosts(newCategory)
            .then(posts => {
                const { changeCurrentCategoryProp } = this.props;

                changeCurrentCategoryProp(newCategory, posts);
            })
    
        return false;
      }
    
      render() {
        return (
            <ul>
              {
                this.state.categories && this.state.categories.map(c => (
                  <li key={c.path} value={c.path}>
                    <a key={c.path} onClick={() => this.changeCategory(c.path)} href="#">{c.name}</a>
                  </li>
                ))
              }
            </ul>
        );
      }
}


function mapDispatchToProps(dispatch) {
  return {
    changeCurrentCategoryProp: (newCategory, posts) => dispatch(changeCurrentCategory(newCategory, posts))
  }
}



export default connect(null, mapDispatchToProps)(Categories);
