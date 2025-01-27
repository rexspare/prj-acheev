import React from 'react';
import { Pagination } from 'types/gqlReactTypings.generated.d';

interface IProps {
  pagination?: Pagination;
  onChange?: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
  searchTerm?: string;
}

export const AdminPaginator: React.FC<IProps> = ({ onChange, pagination, searchTerm }: IProps) => {

  return (
    <form className="d-none d-sm-inline-block form-inline  ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div className="input-group">
        <input type="text" className="form-control bg-light border-1 small"
          placeholder={`Search ${searchTerm}...`}
          aria-label="Search" aria-describedby="basic-addon2"
          onChange={event => onChange?.({ ...pagination, query: event.target.value, page: 0 })} />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">
            <i className="fas fa-search fa-sm"></i>
          </button>
        </div>
      </div>
    </form>
  )
}
