import * as React from 'react';
import { Table } from 'react-bootstrap';

interface IProps {
  columns: string[];
  children?: React.ReactNode | React.ReactNode[];
}

export const TableWrapper: React.FC<IProps> = ({ columns, children }: IProps) =>
  <div style={{ overflow: 'scroll' }}>
    <Table >
      <thead>
        <tr>
          {columns.map((item, key) =>
            <th key={key}>{item}</th>
          )}
        </tr>
      </thead>
      {children}
    </Table>
  </div>;
