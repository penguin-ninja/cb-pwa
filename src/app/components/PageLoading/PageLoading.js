import React from 'react';
import './PageLoading.css';

const PageLoading = () => (
  <div className="page-loading-container">
    <div className="page-loading">
      <i className="fa fa-circle-o-notch fa-spin" /> Loading...
    </div>
  </div>
);

export default PageLoading;
