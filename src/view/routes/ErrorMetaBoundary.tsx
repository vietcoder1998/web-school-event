import React, { Component } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import DocumentMeta from 'react-document-meta';
import MetaConvert from '../../utils/meta.convert';

export default function loadBoudary(getComponent?: any) {
  class AsyncComponent extends Component {
    static Component = null;
    state = {
      Component: AsyncComponent.Component,
      meta: {
        title: "null",
        description: 'I am a description, and I can create multiple tags',
        canonical: 'http://example.com/path/to/page',
        meta: {
          charset: 'utf-8',
          name: {
            keywords: 'react,meta,document,html,tags'
          }
        }
      },
      error: null,
      errorInfo: null,
    };

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }

    render() {
      const { Component , error, errorInfo} = this.state;
      if (Component) {
        return (<DocumentMeta {...MetaConvert()}>
          <Component {...this.props} />
        </DocumentMeta>)
      } else return (
        <div style={{padding: '10vw'}}>
          <h2>Something went wrong. 
          <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
          <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
          <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
          </h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
  }
  return AsyncComponent;
}