import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {toStyleObj, safePrefix, getPages, Link} from '../utils';

export default class Blog extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pageContext.pages, '/posts'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
              <header className="page-header bg-gradient outer">
                {this.props.pageContext.frontmatter.img_path && 
                <div className="bg-img" style={toStyleObj('background-image: url(\'' + safePrefix(this.props.pageContext.frontmatter.img_path) + '\')')}/>
                }
                <div className="inner-small">
                  <h1 className="page-title">{this.props.pageContext.frontmatter.title}</h1>
                  {this.props.pageContext.frontmatter.subtitle && 
                  <p className="page-subtitle">{this.props.pageContext.frontmatter.subtitle}</p>
                  }
                </div>
              </header>
              <div className="outer">
                <div className="inner-medium">
                  <div className="post-feed">
                    {_.map(display_posts, (post, post_idx) => (
                    <article key={post_idx} className="post">
                      {post.frontmatter.thumb_img_path && 
                      <Link className="post-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                        <img className="thumbnail" src={safePrefix(post.frontmatter.thumb_img_path)} alt={post.frontmatter.title} />
                      </Link>
                      }
                      <header className="post-header">
                        <div className="post-meta">
                          <time className="published" datetime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                        </div>
                        <h2 className="post-title line-left"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{post.frontmatter.title}</Link></h2>
                      </header>
                      {post.frontmatter.excerpt && <React.Fragment>
                      <p className="post-excerpt">{post.frontmatter.excerpt}</p>
                      <p className="read-more"><Link to={safePrefix(_.get(post, 'url'))} className="read-more-link">Read More <span className="icon-arrow-right" aria-hidden="true" /></Link></p>
                      </React.Fragment>}
                    </article>
                    ))}
                  </div>
              </div>
            </div>
            </Layout>
        );
    }
}
