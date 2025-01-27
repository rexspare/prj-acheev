import React from 'react';
import { TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeView } from '../../shared/components/SafeView';
import { Colors } from '../../shared/Constants';
import type { StackScreenProps } from '@react-navigation/stack';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { AppText } from '../../shared/components/AppText';
import { gql } from '@apollo/client';
import { OrderByDirection, useWeightStatsQuery } from '../../types/gqlReactTypings.generated.d';
import { AppDivider } from '../../shared/components/AppDivider';
import { compact, groupBy, max, maxBy, min, orderBy } from 'lodash';
import moment from 'moment';
import { useOnFocus } from '../../shared/Utilities';
import {
  LineChart,
} from "react-native-chart-kit";
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

const iconPlaceholder = require(`../../assets/images/icons/placeholder_image.png`);


interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

gql`
  query WeightStats($pagination: Pagination) {
    weightStats(pagination: $pagination) {
      id, weight, date, imageUrl
    }
  }

  mutation UpdateWeight($weightStatId: Int, $updateWeightInput: UpdateWeightInput!) {
    updateWeight(weightStatId: $weightStatId, updateWeightInput: $updateWeightInput) {
      id
    }
  }
`

const Tab = {
  WEEK: { title: 'Week', cutoff: moment().startOf('day').subtract(1, 'week') },
  MONTH: { title: 'Month', cutoff: moment().startOf('day').subtract(1, 'month') },
  THREE_MONTHS: { title: '3 Months', cutoff: moment().startOf('day').subtract(3, 'months') },
  YEAR: { title: 'Year', cutoff: moment().startOf('day').subtract(1, 'year') },
}

export const ProfileWeightStats: React.FC<Props> = ({ route, navigation }: Props) => {
  const weightStatsQuery = useWeightStatsQuery({ variables: { pagination: { orderBy: [{ column: 'date', direction: OrderByDirection.Desc, }], limit: 200 } } });
  const [tab, setTab] = React.useState<keyof typeof Tab>("WEEK");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(AppRoutes.PROFILE_WEIGHT_STAT_UPDATE, {})}>
          <AppText fontSize={32} semiBold style={{ marginRight: 15, color: Colors.YELLOW, marginTop: -10 }}>+</AppText>
        </TouchableOpacity >
      ),
    });
  }, [navigation]);

  useOnFocus(navigation, () => {
    weightStatsQuery?.refetch?.();
  });



  const renderedTabs = React.useMemo(() => {
    const tabs = Object.entries(Tab).map(([key, val]) => {
      const isActive = key === tab;
      return (
        <TouchableOpacity key={key} onPress={() => setTab(key as keyof typeof Tab)}
          style={{
            borderBottomWidth: isActive ? 2 : 1, borderBottomColor: isActive ? Colors.YELLOW : '#777',
            flex: 1, paddingBottom: 10, marginTop: 10
          }}
        >
          <AppText style={{ color: isActive ? 'white' : '#777', fontSize: 16, textAlign: 'center' }}>{val.title}</AppText>
        </TouchableOpacity>
      )
    });

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        {tabs}
      </View>
    )
  }, [tab, setTab]);

  const stats = React.useMemo(() =>
    compact(weightStatsQuery.data?.weightStats),
    [weightStatsQuery.data]
  );

  const statEntries = React.useMemo(() =>
    stats.map(item => (
      <TouchableOpacity key={item.id}
        style={{ backgroundColor: Colors.BACKGROUND, padding: 10, marginBottom: 15, borderRadius: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        onPress={() => navigation.navigate(AppRoutes.PROFILE_WEIGHT_STAT_UPDATE, { weightStat: item })}
      >
        <View style={{ padding: 5, }}>
          <AppText style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>{moment(item.date).toDate().toLocaleDateString()}</AppText>
          <AppText style={{ color: 'white', fontSize: 18 }} light>{item.weight} lbs</AppText>
        </View>
        <Image source={item.imageUrl != null ? { uri: item.imageUrl } : iconPlaceholder} style={{ height: 80, width: 80, resizeMode: 'contain', borderRadius: 5, overflow: 'hidden' }} />
      </TouchableOpacity>
    ))
    , [stats]);


  const filteredStats = React.useMemo(() => stats.filter(item => moment(item.date).isBetween(Tab[tab].cutoff, moment().endOf('day'))), [stats, tab]);

  const groupedByMonth = groupBy(filteredStats, item => moment(item.date).toDate().toLocaleDateString());
  const orderedByMonth = orderBy(Object.values(groupedByMonth), group => moment(group[0].date), 'asc').filter(month => month.length > 0);
  const percents = orderedByMonth.map(group => {
    return maxBy(group, item => item.weight)?.weight ?? 0;
  });

  const data: LineChartData = {
    labels: orderedByMonth.map(group => orderedByMonth.length < 20 ? moment(group[0].date).format('MM/DD') : ''),
    datasets: [
      {
        data: percents,
        color: (opacity = 1) => `rgba(253, 218, 80, ${opacity})`, // optional
        strokeWidth: 4 // optional, 
      },
      {
        data: [(min(percents) ?? 10) - 5],
        color: () => 'rgba(0, 0, 0, 0)',
        strokeWidth: 0,
        withDots: false
      },
    ],
  };


  return (
    <>
      <SafeView backgroundColor={'black'} padded={true} scroll={true} style={{
        paddingTop: 10,
      }}>
        {renderedTabs}

        <LineChart
          data={data}
          width={Dimensions.get('screen').width - 20}
          height={256}
          verticalLabelRotation={0}
          yAxisInterval={1}
          bezier
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: Colors.YELLOW
            }
          }}
          style={{ marginLeft: -20, paddingTop: 20 }}
        />

        <AppText style={{ color: 'white', fontSize: 20, marginTop: 0 }} semiBold>Entries</AppText>
        <AppDivider />
        {statEntries}
      </SafeView>
    </>
  );
}