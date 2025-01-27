import React from 'react';
import { AppRoutes, NavigatorParams } from '../../shared/Routing';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeView } from '../../shared/components/SafeView';
import { ScrollView, Image, View, } from 'react-native';
import { useProgramSearchQuery } from '../../types/gqlReactTypings.generated.d';
import { AppText } from '../../shared/components/AppText';
import { ProgramSearch } from './components/programSearch';
import { AppView } from '../../shared/components/AppView';
import { gql } from '@apollo/client';
import { compact } from 'lodash';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ProgramCard } from './components/programCard';

const imageEmptySearch = require('../../assets/images/icons/empty_search.png');

interface Props extends StackScreenProps<NavigatorParams, AppRoutes.BASE> {
}

gql`
  query ProgramSearch($query: String!) {
    programSearch(query: $query) {
      ...ProgramFields
    }
  }
`

export const ProgramSearchPage: React.FC<Props> = ({ navigation, route }: Props) => {
  const [query, setQuery] = React.useState<string>("");
  const programSearchQuery = useProgramSearchQuery({ variables: { query }, skip: query.length <= 0 });

  const programs = React.useMemo(() => {
    return compact(programSearchQuery.data?.programSearch);
  }, [programSearchQuery]);

  return (
    <SafeView backgroundColor='black'>
      <ScrollView style={{ paddingTop: 0 }}>
        <AppView background padded style={{ marginTop: 8, minHeight: '98%', marginBottom: 10 }}>
          <View style={{ height: 60 }}>
            <ProgramSearch query={query} setQuery={setQuery} />
          </View>
          <AppText semiBold style={{ fontSize: 24, color: 'white', marginTop: 10, marginBottom: 10 }}>Recent searches</AppText>

          {query.length === 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <AppText style={{ fontSize: 42, color: 'white', opacity: .75 }}>Get Started</AppText>
              <AppText style={{ fontSize: 24, opacity: .5, color: 'white', marginBottom: 20 }}>Type a keyword</AppText>
              <Image source={imageEmptySearch} style={{ width: 250, height: 250 }} />
            </View>
            :
            <View style={{ backgroundColor: Colors.BACKGROUND, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', minHeight: '100%' }}>
              {programs.map(program =>
                <View style={{ marginBottom: 20 }} key={program.id}>
                  <ProgramCard program={program} key={program.id} />
                </View>
              )}
            </View>
          }
        </AppView>


      </ScrollView>
    </SafeView>
  )
}