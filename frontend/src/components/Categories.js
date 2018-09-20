import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../utils/api';
import { changeCurrentCategory, categorySearchResult } from '../actions/post';

class Categories extends Component {

      componentDidMount() {
        const { categorySearchResultProp } = this.props;

        API.getAllCategories()
          .then(categories => {
            categorySearchResultProp(categories);
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
        const { categories } = this.props;

        return (

            <ul>
              {
                categories && categories.map(c => (
                  <li key={c.path} value={c.path}>
                    <a key={c.path} onClick={() => this.changeCategory(c.path)} href="#">{c.name}</a>
                  </li>
                ))
              }
            </ul>
        );
      }
}



function mapStateToProps({ categoryReducer }) {
  const { categories } = categoryReducer;
  return {
    categories
  };
}


function mapDispatchToProps(dispatch) {
  return {
    changeCurrentCategoryProp: (newCategory, posts) => dispatch(changeCurrentCategory(newCategory, posts)),
    categorySearchResultProp: (categories) => dispatch(categorySearchResult(categories))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Categories);
