import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeView } from '../../shared/components/SafeView'
import { AppText } from '../../shared/components/AppText'
import { AppView } from '../../shared/components/AppView'
import { ProgramSearch } from '../feed/components/programSearch'
import { ProgramFieldsFragment, useProgramListsQuery } from '../../types/gqlReactTypings.generated.d'
import { Colors } from '../../shared/Constants'
import { ProgramCard } from '../feed/components/programCard'
import { useNavigation } from '@react-navigation/native'
import { AppRoutes, NavigatorParams } from '../../shared/Routing'
import { communityStateSelectors, useCommunityState } from '../../states/community'
import FastImage from 'react-native-fast-image'
import Feather from 'react-native-vector-icons/Feather'

const { width, height } = Dimensions.get('window')

const Community = () => {
  const navigation = useNavigation<any>()
  const programLists = useProgramListsQuery();
  const [searchValue, setsearchValue] = useState("")

  function extractPrograms() {
    const programsList: any = [];

    if (!programLists?.data?.programLists) {
      return []
    }

    const data: any = programLists.data?.programLists

    data.forEach((programList: any) => {
      programList.programs.forEach((program: any) => {
        programsList.push({
          ...program,
          programListId: programList.id
        });
      });
    });
    const list = programsList.filter((item: any) => !!item.live && !item.archived)
    return searchValue ?
      list.filter((x: ProgramFieldsFragment) => x.name?.toUpperCase().includes(searchValue?.toUpperCase()))
      :
      list;
  }

  const handleSelect = (program: ProgramFieldsFragment) => {
    navigation.navigate(AppRoutes.CHAT_ROOM, { program: program })
  }

  return (
    <>
      <SafeView backgroundColor='black'>
        <ScrollView style={{ paddingTop: 0, }}>
          <AppView background padded style={{ marginTop: 8 }}>
            <AppText style={{
              color: 'white', fontSize: 20, marginBottom: 20
            }} semiBold >Select Topic</AppText>
            <ProgramSearch
              placeholder='Search Program'
              query={searchValue}
              setQuery={setsearchValue}
            />
          </AppView>

          <View style={{
            backgroundColor: Colors.BACKGROUND,
            minHeight: '100%',
          }}>

            <View style={styles.infoContainer}>

              <AppText style={styles.infoTxt}>The community is a place where the people can gain assistance from coaches and other people completing the programs, feel free to throw your questions and input for others to make use of. Please be respectful and caring of others.</AppText>
            </View>

            <FlatList
              data={extractPrograms()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelect(item)}
                  style={styles.item}
                >

                  <View style={styles.imgFrame}>
                    <FastImage
                      source={{ uri: item.imageUrl, priority: FastImage.priority.high }}
                      style={styles.img}
                    />
                  </View>

                  <AppText style={styles.txt}>{item.name}</AppText>

                </TouchableOpacity>
              )}
            />
          </View>

        </ScrollView>
      </SafeView>
    </>
  )
}

export default Community

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1 / 2,
    borderColor: Colors.GRAY_LIGHT,
    paddingHorizontal: '5%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imgFrame: {
    width: 60,
    height: 60,
    padding: 3,
    borderWidth: 2,
    borderColor: Colors.YELLOW,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 60
  },
  txt: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10
  },
  infoContainer: {
    minHeight: 50,
    width: '92%',
    backgroundColor: Colors.BLACK,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  infoTxt: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500'
  }
})