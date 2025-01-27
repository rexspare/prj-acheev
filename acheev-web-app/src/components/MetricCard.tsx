import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  color: 'primary' | 'success' | 'info' | 'warning';
  label?: ReactNode;
  value?: ReactNode;
  faIcon?: string;
  progressBar?: boolean;
  to?: string;
}
export const MetricCard: React.FC<IProps> = ({ color, faIcon, label, value, progressBar, to }: IProps) => {
  const OptionalLinkTag = to != null ? Link : React.Fragment;

  return (

    <div className="col-xl-3 col-md-6 mb-4">
      <div className={`card border-left-${color} shadow h-100 py-2`}>
        <OptionalLinkTag to={to ?? ""}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{label}</div>
                {progressBar ?
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div className="progress-bar bg-info" role="progressbar" style={{ width: '50%' }} aria-valueNow="50" aria-valueMin="0" aria-valueMax="100"></div>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
                }
              </div>
              <div className="col-auto">
                <i className={`fas fa-${faIcon} fa-2x text-gray-300`}></i>
              </div>
            </div>
          </div>
        </OptionalLinkTag>
      </div>
    </div>
  )
}