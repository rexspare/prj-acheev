import { Button, Card } from 'react-bootstrap';
import Styled from 'styled-components';
import { Colors } from './Constants';

export const GraphLabel = Styled.h5`
  color: ${Colors.BLUE};
  text-align: center;
`;

export const TableContainer = Styled.div`
  overflow: auto;
`;

export const DarkButton = Styled(Button)`
  background-color: ${Colors.BLUE} !important;
  height: 45px;
  border-radius: 10px !important;
`;

export const BlueButton = Styled(Button)`
  background-color: ${Colors.BLUE} !important;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  height: 40px;
  border-width: 0 !important;
  border-color: ${Colors.BLUE};
`;

export const PinkButton = Styled(BlueButton)`
  background-color: ${Colors.PINK} !important;
  border-color: ${Colors.PINK} !important;
`;

export const PaddedCard = Styled(Card)`
  padding: 20px;
  border-radius: 10px !important;
`;

export const CardHeader = Styled.p`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;
