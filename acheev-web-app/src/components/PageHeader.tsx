import React, { ReactNode } from 'react';

interface IProps {
  title: ReactNode;
  subtitle?: ReactNode;
  rightItem?: ReactNode;
}

export const PageHeader: React.FC<IProps> = ({ title, subtitle, rightItem }: IProps) => {

  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4" style={{ width: '100%' }}>
      <div>
        <h1 className="h3 mb-1 text-gray-800" style={{ justifyContent: 'center' }}>{title}</h1>
        {subtitle &&
          <h6 className='text-secondary mb-0'>{subtitle}</h6>
        }
      </div>
      {rightItem}
      {/* <a href="#hi" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a> */}
    </div>
  )
}