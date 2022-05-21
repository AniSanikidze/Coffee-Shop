import React from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../MetaData';
import {ErrorOutline} from '@material-ui/icons'
import './PageNotFound.css'

function PageNotFound() {
  return (
    <div className='page-not-found-container'>
    <MetaData title="Page Not Found - Coffee Berry"/>
      <ErrorOutline className='page-not-found-error'/>
      <h1>Page Not Found</h1>
      <Link to='/'><button className='home-button'>Home</button></Link>
    </div>
  );
}

export default PageNotFound;
