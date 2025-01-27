import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  margin: ${({theme}) => theme.margin || '0'};
  padding: ${({theme}) => theme.padding || '0'};
`;

interface ThemeMain {
  margin: string;
  padding: string;
}

interface IProps {
  children?: React.ReactNode;
  themeMain?: ThemeMain;
}

export const PageMain: React.FC<IProps> = ({children, themeMain}: IProps) => (
  <Main {...themeMain}>{children}</Main>
);
