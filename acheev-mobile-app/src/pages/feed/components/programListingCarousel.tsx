import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { ProgramQuery } from '../../../types/gqlReactTypings.generated.d';
import { ProgramCard } from './programCard';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image'

const programOutlineImage = require('../../../assets/images/programs/program_outline.png');

interface Props {
  program: ProgramQuery['program'];

  selectedFacetId?: number;
  setSelectedFacetId: (value: React.SetStateAction<number | undefined>) => void;
  allFacetsOrdered: ProgramQuery['program']['programFacets'];
  facetRef?: any;
}

export const ProgramListingCarousel: React.FC<Props> = ({ program, setSelectedFacetId, allFacetsOrdered, selectedFacetId, facetRef = null }: Props) => {
  const carouselRef = React.useRef<Carousel<any>>(null);

  const screenWidth = Dimensions.get('screen').width;

  const renderItem = React.useCallback((item: ProgramQuery['program']['programFacets'][0], index: number) => {
    // console.info({ name: item.name, index })
    if (item.id === selectedFacetId) {
      return (
        <View style={{ alignItems: 'center' }} key={`${item.id}-${index}-${selectedFacetId}`}>
          <Image source={programOutlineImage} style={{ width: 140, height: 155 }} />
          <FastImage key={item.id} source={{ uri: item.imageUrl,priority:FastImage.priority.high }}
            style={{ width: 135, height: 134, borderRadius: 120, position: 'absolute', top: 3 }} />
        </View>
      )
    }
    return (<ProgramCard
      key={`${item.id}-${index}-${selectedFacetId}`}
      program={item} size={65} style={{ alignItems: 'center' }}
      onPress={() => setSelectedFacetId(item.id)}
    />
    )
  }, [selectedFacetId, setSelectedFacetId,]);

  const snapToItem = (index: number) => {
    const newFacet = allFacetsOrdered[index];
    // console.info("Main item", index, newFacet)
    setSelectedFacetId(newFacet.id);
  }

  return (
    <View ref={facetRef} style={{ width: '100%', marginTop: 20, marginBottom: 25, marginLeft: -10 }}>
      <Carousel
        ref={carouselRef}
        removeClippedSubviews={false}
        data={allFacetsOrdered}
        loop={true}
        onSnapToItem={index => {
          snapToItem(index);
        }}
        onBeforeSnapToItem={index => {
          snapToItem(index);
        }}
        renderItem={({ item, index }) => {
          return renderItem(item, index);
        }}
        sliderWidth={screenWidth}
        itemWidth={screenWidth / 3}
      />
    </View>

  )
}