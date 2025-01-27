import React from 'react';
import { Link } from 'react-router-dom';
import { PinkButton } from 'shared/CommonStyles';
import { Colors } from 'shared/Constants';
import Styled from 'styled-components';

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Wrapper = Styled.div`
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  min-height: 100vh;
`

export const OnboardingLabel = Styled.label`
  color: #3e3e3e;
`;

export const getOnboardingAction = (title: string, description: string, route: string, action = 'Get started') => {
  return (
    <>
      <hr style={{ marginTop: 40 }} />
      <h2 style={{ marginTop: 25, fontSize: 24, color: Colors.PINK, fontWeight: 'bold' }}>{title}</h2>
      <p>{description}</p>

      <Link to={route}>
        <PinkButton style={{ width: '100%' }}>
          <span>{action} &rarr;</span>
        </PinkButton>
      </Link>
    </>
  )
}

export const OnboardingWrapper: React.FC<IProps> = ({ children }: IProps) => {

  return (
    <Wrapper>
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-6 py-5">

            <div className="card o-hidden border-0 shadow-lg my-5" style={{ borderRadius: 20 }}>
              <div className="card-body p-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}