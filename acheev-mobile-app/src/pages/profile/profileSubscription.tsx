import React from 'react';
import { SafeView } from '../../shared/components/SafeView';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AuthContext } from '../../shared/auth/Authentication';
import { AppText } from '../../shared/components/AppText';
import { View, Image, Linking } from 'react-native';
import { Colors } from '../../shared/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

const logoLarge = require(`../../assets/images/logo_large.png`);
const iconCircleTick = require(`../../assets/images/icons/circle_tick.png`);

enum Plan {
  YEARLY, MONTHLY
}

export const ProfileSubscription: React.FC<Props> = ({ route, navigation }: Props) => {
  const { currentUser, refreshCurrentUser, signOut } = React.useContext(AuthContext);
  const [plan, setPlan] = React.useState<Plan>(Plan.MONTHLY);

  const changePlan = (type: Plan) => {
    setPlan(type);
  }

  const renderPlan = (type: Plan, timeFrame: string, cost: string) => {
    const isSelected = plan === type;
    return (
      <TouchableOpacity style={{ backgroundColor: isSelected ? Colors.YELLOW : '#C5C5C5', flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingHorizontal: 20, alignItems: 'center', borderRadius: 5, marginBottom: 15 }}
        onPress={() => changePlan(type)}
      >
        <View>
          <AppText semiBold style={{ fontSize: 18, marginBottom: 5 }}>{timeFrame}</AppText>
          <AppText semiBold style={{ fontSize: 18 }}>{cost}</AppText>
        </View>
        {isSelected &&
          <View style={{ alignItems: 'flex-end' }}>
            <Image source={iconCircleTick} style={{ width: 20, height: 20, marginBottom: 5 }} />
            <AppText semiBold style={{ fontSize: 16 }}>Current plan</AppText>
          </View>
        }
        {!isSelected && type === Plan.YEARLY &&
          <AppText semiBold style={{ backgroundColor: Colors.YELLOW, padding: 8, fontSize: 16 }}>Subscribe</AppText>
        }
      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeView backgroundColor={'black'} scroll={true} style={{
      }}>

        <View style={{ alignItems: 'center', backgroundColor: Colors.BACKGROUND, paddingBottom: 30, marginBottom: 30 }}>
          <Image source={logoLarge} style={{ resizeMode: 'contain', height: 150, width: 200, marginTop: 0 }} />

          <AppText style={{ color: 'white', fontSize: 20, marginBottom: 20, marginTop: 20 }} semiBold>Access unlimited programs</AppText>
          <AppText style={{ color: 'white', fontSize: 16, textAlign: 'center', paddingHorizontal: 50 }} light>Lorem ipsum dolor sit amet, consectetur ut enim ad adipiscing elit, sed do eiusmod tempor aliqua incididunt ut labore et dolore magna aliqua dolore.</AppText>

        </View>

        <View style={{ paddingHorizontal: 30 }}>
          {renderPlan(Plan.MONTHLY, 'Monthly', '$4/month')}
          {renderPlan(Plan.YEARLY, 'Yearly', '$25/year')}

          <AppText style={{ color: '#aaa', fontSize: 12, textAlign: 'center', marginTop: 25 }}>
            The subscription automatically renews unless it is cancelled via your subscription settings. For more information, please see our <AppText style={{ color: Colors.YELLOW }} onPress={() => Linking.openURL('https://www.waker.com')}>Terms of Service</AppText> and <AppText onPress={() => Linking.openURL('https://www.waker.com')} style={{ color: Colors.YELLOW }}>Privacy Policy</AppText>.
          </AppText>


          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ borderBottomWidth: 1, borderStyle: 'solid', borderBottomColor: '#aaa', paddingBottom: 3 }}>
              <AppText style={{ color: '#aaa', fontSize: 12, textAlign: 'center', marginTop: 20, }}>Restore Purchases</AppText>
            </TouchableOpacity>
          </View>

        </View>




      </SafeView>
    </>
  );
}