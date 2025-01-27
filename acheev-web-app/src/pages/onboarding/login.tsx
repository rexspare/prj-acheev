import React, { useContext, useState, } from 'react';
import { useLoginMutation } from 'types/gqlReactTypings.generated.d';
import { AuthContext } from 'shared/Authentication';
import { OnboardingLabel, OnboardingWrapper } from './components/onboardingWrapper';
import { Colors } from 'shared/Constants';
import { BlueButton } from 'shared/CommonStyles';
import { testingOnlyData } from 'shared/Utilities';

export const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(testingOnlyData('650-564-4594', ''));
  const [password, setPassword] = useState<string>(testingOnlyData('testtest', ''));
  const { signIn } = useContext(AuthContext);
  const [loginMutation] = useLoginMutation({ variables: { phoneNumber, password } });

  console.log("Showing login");

  const login = () => {
    console.log("Logging in");
    loginMutation().then(({ data }) => {
      if (!data) {
        throw Error('No data for login');
      }

      const { token, user } = data.login;

      if (!!token) {
        signIn(token, user);
      }
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <OnboardingWrapper>
      {/* <img src={imgLogo} style={{ maxWidth: '75%', marginBottom: 10 }} /> */}
      <h1 className="h3 mb-4" style={{ color: Colors.BLUE }}>Welcome Back!</h1>

      <div className="form-group">
        <OnboardingLabel>Email</OnboardingLabel>
        <input type="phone"
          onChange={e => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          className="form-control form-control-user" id="exampleInputEmail"
          aria-describedby="emailHelp" placeholder="email"
        />
      </div>
      <div className="form-group">
        <OnboardingLabel>Password</OnboardingLabel>

        <input type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="form-control form-control-user" id="exampleInputPassword"
          placeholder="Password"
        />
      </div>

      <div className="text-right" style={{ marginTop: -10, marginBottom: 15, opacity: .8 }}>
        <a style={{ color: Colors.BLUE }} className="small" href={`mailto:team@acheevapp.io?subject=Forgot Password&body=Hi, I forgot password for phoneNumber: ${phoneNumber}!`}>Forgot Password?</a>
      </div>

      <BlueButton onClick={login} style={{ width: '100%' }}>
        <span>Login &rarr;</span>
      </BlueButton>

    </OnboardingWrapper>
  )
}