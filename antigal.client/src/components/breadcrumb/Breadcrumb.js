import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import formatCamelCase from '../../utils/formatCamelCase';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((item) => item);

  return (
    <div className="breadcrumb">
      <p>
        <Link to="/">Inicio</Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = formatCamelCase(value);

          return isLast ? (
            <React.Fragment key={to}>
              <span>
                <img className='imgBread' src='/icons/flechaBreadgrumb.svg' alt='flecha de Antigal' />
              </span>
              <span className="active">{formattedValue}</span>
            </React.Fragment>
          ) : (
            <React.Fragment key={to}>
              <span>
                <img className='imgBread' src='/icons/flechaBreadgrumb.svg' alt='flecha de Antigal' />
              </span>
              <span>
                <Link to={to}>{formattedValue}</Link>
              </span>
            </React.Fragment>
          );
        })}
      </p>
    </div>
  );
};

export default Breadcrumb;
