import React, { ReactNode } from 'react';

interface IProps {
  header?: ReactNode
  children?: ReactNode | ReactNode[]
}

export const AppCard: React.FC<IProps> = ({ header, children }: IProps) => {
  return (
    <div className="card shadow mb-4">
      {header &&
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">{header}</h6>
        </div>
      }
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}




