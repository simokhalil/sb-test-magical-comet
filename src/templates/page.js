import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, htmlToReact} from '../utils';

export default class Page extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              <article className="post page post-full">
                <header className="post-header bg-gradient outer">
                  {this.props.pageContext.frontmatter.img_path && 
                  <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(this.props.pageContext.frontmatter.img_path) + '\')')}/>
                  }
                  <div className="inner-small">
                    <h1 className="post-title">{this.props.pageContext.frontmatter.title}</h1>
                    {this.props.pageContext.frontmatter.subtitle && 
                    <div className="post-subtitle">
                      {htmlToReact(this.props.pageContext.frontmatter.subtitle)}
                    </div>
                    }
                  </div>
                </header>
                <div className="outer">
                  <div className="inner-medium">
                    <div className="post-content">
                      {htmlToReact(_.get(this.props, 'pageContext.html'))}
                    </div>
                  </div>
                </div>
              </article>
            </Layout>
        );
    }
}
