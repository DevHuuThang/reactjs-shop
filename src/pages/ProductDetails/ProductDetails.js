import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import _ from 'lodash';
import ReactImageMagnify from 'react-image-magnify';

import MySpinner from '../../components/MySpinner';

import { loadProduct } from '../../store/actions/productDetails';

import './styles.css';

const ProductDetails = ({
  productDetails,
  loadProduct,
  match,
}) => {
  const { product, isLoading, error } = productDetails;

  useEffect(() => {
    loadProduct(match.params.id);
  }, []);

  if (error) return <Redirect to={'/error'} />;
  if (isLoading) return <MySpinner key={0} text={'Loading...'} />;

  //console.log(productDetails);
  return (
    product && (
      <div className="card mb-3">
        <div className="row no-gutters">
          <aside className="col-sm-5 border-right">
            <div>
              <img
                className="main-img d-md-none"
                src={require(`../../static/products/${product.image}`)}
              />
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: product.shortDescription,
                    isFluidWidth: true,
                    src: require(`../../static/products/${product.image}`),
                  },
                  largeImage: {
                    src: require(`../../static/products/${product.image}`),
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerStyle: {
                    zIndex: 9,
                    backgroundColor: 'white',
                    objectFit: 'cover',
                  },
                  enlargedImageContainerDimensions: {
                    width: '150%',
                    height: '120%',
                  },
                  className: 'd-none d-md-block ',
                }}
              />
            </div>
          </aside>
          <aside className="col-sm-7">
            <article className="p-5">
              <h3 className="title mb-3">{product.name}</h3>

              <div className="mb-3">
                <var className="price h3 text-success">
                  <span className="currency">US $</span>
                  <span className="num">{product.price.toFixed(2)}</span>
                </var>
              </div>
              <dl>
                <dt>Description</dt>
                <dd>
                  <p>{product.description}</p>
                </dd>
              </dl>
              <dl className="row">
                <dt className="col-sm-3">Model#</dt>
                <dd className="col-sm-9">{product.modelNum}</dd>

                <dt className="col-sm-3">Color</dt>
                <dd className="col-sm-9">{product.color}</dd>

                <dt className="col-sm-3">Delivery</dt>
                <dd className="col-sm-9">{product.delivery}</dd>
              </dl>

              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <dl className="dlist-inline">
                    <dt>Weight: </dt>
                    <dd className="pl-2">
                      <span className="form-check-label">{`${product.weight} g`}</span>
                    </dd>
                  </dl>
                </div>
                <div className="col-sm-7">
                  <dl className="dlist-inline">
                    <dt>Size: </dt>
                    <dd>
                      <span className="form-check-label">{`${product.size} cm`}</span>
                    </dd>
                  </dl>
                </div>
              </div>
              <hr />
            </article>
          </aside>
        </div>
      </div>
    )
  );
};

export default connect(
  state => ({
    productDetails: state.productDetailsReducer,
  }),
  {
    loadProduct,
  },
)(withRouter(ProductDetails));
