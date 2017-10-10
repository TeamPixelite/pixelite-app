/* eslint-disable no-whitespace-before-property, arrow-parens */
// REACT NATIVE IMPORTS
import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Text, TextInput, Image, ImageBackground, TouchableOpacity, NativeModules, CameraRoll, Modal, StatusBar, Dimensions, Alert } from 'react-native';
import { Icon, Button, FormLabel, FormInput, Divider } from 'react-native-elements';
// import { RNS3 } from 'react-native-aws3';
// import { GOOGLE_PLACES_API_KEY, AWS_ACCESS_KEY, AWS_SECRET_KEY } from '../../apis';
// import { API_KEY, API_SECRET } from 'react-native-dotenv';


// REDUX IMPORTS & AUTH
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import * as NewStoryActions from '../actions';
// import * as firebase from 'firebase';


// FOLLOWING ARE IMPORTS FROM JENNY
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import EachPhotoGrid from './EachPhotoGrid';
import StoryMapModal from './StoryMapModal';


// const ImagePicker = NativeModules.ImageCropPicker;
const windowWidth = Dimensions.get('window').width;
// const options = {
//   keyPrefix: "uploads/",
//   bucket: "pixelite-s3-oregon",
//   region: "us-west-2",
//   accessKey: AWS_ACCESS_KEY,
//   secretKey: AWS_SECRET_KEY,
//   successActionStatus: 201
// }


class EachStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      image: null,
      images: null,
      user: null,
      sendData: null,

    }
  }

  makeSelectedPhotos(items) {
    const result = {};
    items.forEach( item => {
      const date = item.date;
      if(result.hasOwnProperty(item.date)) {
        result[date].push(item);
      } else {
        result[date] = [item];
      }
    })
    return result;
  }

  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  toggleStoryMap() {
    this.props.newStoryToggleStoryMap(this.props.isStoryMapClicked);
    // this.setState({ isStoryMapClicked: !this.state.isStoryMapClicked });
  }

  toggleEditable() {
    this.props.newStoryToggleEditable(this.props.isTextEditable);
  }

  toggleStory() {
    this.props.toggleModal();
    // this.props.newstoryToggleStory();
  }

  // cancelNewStory() {
  //   Actions.pop();
  // }

  render() {
    const { isStoryMapClicked } = this.props;
    const { title, description, city, country, travelPeriod, coverPhotoUrl, dates, items, maplocations, coordinates } = this.props.selectedStory;
    console.log(this.props.selectedStory);
    return (
//       <View style={{ flex: 1, paddingTop: 25, backgroundColor: 'white' }}>
// {/*FIRST PAGE HEADING*/}
//         <View style={{ position: 'relative', width: windowWidth, height: 40 }}>
//           <View style={{ position: 'absolute', left: 8, justifyContent: 'center', alignItems: 'flex-start', width: 38, height: 38, zIndex: 10 }}>
//             <Icon
//               type="material-community"
//               name="close"
//               color="grey"
//               size={23}
//               onPress={() => this.cancelNewStory()}
//             />
//           </View>
//           <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: windowWidth, height: 40 }}>
//             <Text style={{ fontFamily: 'Avenir', fontSize: 20, color: '#2d2d2d' }}>
//               Create Story
//             </Text>
//           </View>
//         </View>
//  {/*FIRST PAGE INPUTS*/}
//         <View style={{ position: 'relative', width: windowWidth }}>
//           <FormLabel
//             fontFamily='Avenir'
//             labelStyle={{ fontSize: 15, color: '#373535', fontWeight: 'normal' }}
//           >
//             Story Title
//           </FormLabel>
//           <FormInput
//             containerStyle={{ borderBottomWidth: 0.83, borderBottomColor: '#b5b5b5', width: windowWidth - 40, height: 33 }}
//             inputStyle={{ fontFamily: 'Avenir', fontSize: 15, color: 'black', paddingLeft: 5, paddingRight: 5, paddingTop: 4.5, paddingBottom: 4.5 }}
//             placeholder='e.g. Summer escapades in Australia'
//             placeholderTextColor='#A8A8A8'
//             value={this.props.titleValue}
//             onChangeText={(titleValue) => this.props.newStoryChangeTitleInput(titleValue)}
//             maxLength={35}
//             selectionColor={'#4286f4'}
//           />
//           <Text style={{
//             fontFamily: 'Avenir', fontSize: 15, color: '#373535', marginTop: 15,
//             marginLeft: 20, marginRight: 20
//           }}>
//             Where did you travel to?
//           </Text>
//           {/* FIRST PAGE GOOGLE autocomplete */}
//           <GooglePlacesAutocomplete
//             placeholder='Search cities'
//             minLength={2} // minimum length of text to search
//             autoFocus={false}
//             returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
//             listViewDisplayed='auto'    // true/false/undefined
//             fetchDetails={true}
//             renderDescription={(row) => row.description} // custom description render
//             onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
//               const locationInfo = {
//                 selectedCity: data.description.split(', ')[0],
//                 selectedCountry: data.description.split(', ')[data.description.split(', ').length - 1],
//                 selectedCoordinates: {
//                   latitude: details.geometry.location.lat,
//                   longitude: details.geometry.location.lng,
//                 }
//               };
//
//               this.props.newStoryGooglePlacesAtuocomplete(locationInfo);
//               // this.setState({
//               //   selectedCity: data.description.split(', ')[0],
//               //   selectedCountry: data.description.split(', ')[data.description.split(', ').length - 1],
//               //   selectedCoordinates: {
//               //     latitude: details.geometry.location.lat,
//               //     longitude: details.geometry.location.lng,
//               //   }
//               // });
//             }}
//             getDefaultValue={() => {
//               return ''; // text input default value
//             }}
//             query={{
//               // available options: https://developers.google.com/places/web-service/autocomplete
//               key: GOOGLE_PLACES_API_KEY,
//               language: 'en', // language of the results
//               types: '(cities)', // default: 'geocode'
//             }}
//             styles={{
//               container: {
//                 flex: 0,
//                 marginTop: 10,
//                 marginLeft: 20,
//                 marginRight: 20,
//                 zIndex: 2,
//                 backgroundColor: 'white'
//               },
//               description: {
//                 fontWeight: 'bold',
//                 fontFamily: 'Avenir',
//               },
//               textInputContainer: {
//                 height: 28.8,
//                 borderTopWidth: 0,
//                 borderBottomWidth: 0.8,
//               },
//               textInput: {
//                 fontFamily: 'Avenir',
//                 borderRadius: 0,
//                 paddingLeft: 5,
//                 paddingRight: 5,
//                 marginTop: 0,
//                 marginLeft: 0,
//                 marginRight: 0,
//               },
//             }}
//             nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
//             filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
//             debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
//           />
// {/*First Page ImageClick BTN*/}
//           <View style={{ position: 'absolute', top: 200, alignSelf: 'center' }}>
//             <Button
//               icon={{ name: 'ios-images-outline', size: 45, color: '#5b5959', type: 'ionicon', style: { marginRight: 0 } }}
//               buttonStyle={{ alignItems: 'center', width: 300, height: 75, flexDirection: 'column', padding: 0, margin: 0, zIndex: -1 }}
//               color='#5b5959'
//               backgroundColor="white"
//               fontFamily="Avenir"
//               fontSize={15}
//               title="Add photos, and you'll see magic!"
//               onPress={() => this.pickMultiple()}
//             />
//           </View>
//         </View>
// {/*MODAL STARTS*/}
//         <Modal
//           animationType="fade"
//           transparent={false}
//           onRequestClose={() => { }}
//           visible={arePhotosSelected}
//         >

// {/*ParallaxScrollView STARTS*/}
          <ParallaxScrollView
            headerBackgroundColor="#333"
            stickyHeaderHeight={63}
            parallaxHeaderHeight={350}
            backgroundSpeed={3}
            renderBackground={() => (
              <View key="background">
                <ImageBackground
                  source={{uri: coverPhotoUrl }}
                  style={{ width: windowWidth, height: 350, zIndex: -1}}
                >
                  <View style={{position: 'absolute',
                                top: 0,
                                width: windowWidth,
                                backgroundColor: 'rgba(0,0,0,.4)',
                                height: 350,
                                zIndex: 1}}/>

                  <View key="parallax-header" style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'column',
                    paddingTop: 110,
                    zIndex: 10
                  }}>
                  <Text style={{
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 'bold',
                    paddingBottom: 7,
                    fontFamily: 'Avenir',
                    backgroundColor: 'transparent',
                  }}>
                    {city === country
                      ? city.toUpperCase()
                      : city.toUpperCase().concat(', ').concat(country.toUpperCase())}
                  </Text>
                  <View style={{ justifyContent: 'center', paddingVertical: 7 }}>
                    <Text style={{
                      color: 'white',
                      fontSize: 23,
                      fontWeight: 'bold',
                      paddingVertical: 5,
                      fontFamily: 'Avenir',
                      backgroundColor: 'transparent',
                      textAlign: 'center',
                      width: 300, flexWrap: 'wrap'
                    }}>
                      {title.toUpperCase()}
                    </Text>
                  </View>
                    <Text style={{
                      color: 'white',
                      fontSize: 12,
                      paddingTop: 5,
                      fontFamily: 'Avenir',
                      backgroundColor: 'transparent',
                    }}>
                      {travelPeriod}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            )}

            renderForeground={() => (
//THREE ICONS TOP
              <View style={{ flexDirection: 'row', justifyContent: 'center', position: 'absolute', top: 295, width: '100%' }}>
                <View style={{ alignItems: 'center', marginHorizontal: 7,
                  backgroundColor: 'transparent' }}>
                  <Icon
                    type="simple-line-icon"
                    name="map"
                    size={18}
                    color="white"
                    iconStyle={{ textAlign: 'center', paddingTop: 11, paddingBottom: 8, paddingHorizontal: 11, borderRadius: 20.5, borderWidth: 1, borderColor: '#b3adad' }}
                    onPress={() => this.toggleStoryMap()}
                  />
                </View>
                {/* <View style={{ alignItems: 'center', marginHorizontal: 7,
                  backgroundColor: 'transparent' }}>
                  <Icon
                    type="simple-line-icon"
                    name="picture"
                    size={18}
                    color="white"
                    iconStyle={{ textAlign: 'center', paddingTop: 11, paddingBottom: 8, paddingHorizontal: 11, borderRadius: 20.5, borderWidth: 1, borderColor: '#b3adad' }}
                    onPress={() => this.pickMultiple()}
                  />
                </View>
                <View style={{ alignItems: 'center', marginHorizontal: 7,
                  backgroundColor: 'transparent' }}>
                  <Icon
                    type="material-community"
                    name="format-text"
                    size={18}
                    color="white"
                    iconStyle={{ textAlign: 'center', paddingTop: 11, paddingBottom: 8, paddingHorizontal: 11, borderRadius: 20.5, borderWidth: 1, borderColor: '#b3adad' }}
                    onPress={() => this.toggleEditable()}
                  />
                </View> */}
              </View>
            )}

            renderStickyHeader={() => (
              <View key="sticky-header" style={{
                width: windowWidth - 70,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                paddingTop: 27
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                  fontFamily: 'Avenir'
                }}>{title}</Text>
              </View>
            )}

            renderFixedHeader={() => (
              <View style={{ position: 'absolute', top: 0, flexDirection: 'row' }}>
                <StatusBar
                  barStyle='light-content'
                />
                <View style={{ flex: 1, alignItems: 'flex-start', top: 25, left: 8 }}>
                  <Icon
                    type="material-community"
                    name="close"
                    color="white"
                    size={26}
                    onPress={() => this.props.toggleModal()}
                  />
                </View>
                {/* <View style={{ flex: 1, alignItems: 'flex-end', top: 25, right: 12 }}>
                  <Icon
                    type="material-community"
                    name="check"
                    color="white"
                    size={28}
                    onPress={() => Alert.alert(
                      'Upload story',
                      'Are you sure you want to upload this story?',
                      [
                        { text: 'Nah', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'Yes', onPress: () => { this.props.newStoryCreateStory(this.props); console.log('uploaded!') } }
                      ]
                    )}
                  />
                </View> */}
              </View>
            )}>
{/* Actual Content starts */}
            <View style={{ marginVertical: 20 }}>
{/* Map Modal */}
              <Modal
                animationType="fade"
                transparent={false}
                onRequestClose={() => { }}
                visible={isStoryMapClicked}
              >
                <StoryMapModal
                  toggleStoryMap={this.toggleStoryMap.bind(this)}
                  locations={maplocations}
                  regionCoordinates={coordinates}
                />
                {console.log('maplocations: ', maplocations, ', coordinates: ', coordinates)}
              </Modal>
{/* isTextEditable */}
              <View style={{ alignItems: 'center', alignSelf: 'center', width: windowWidth - 50 }}>
                <Text style={{ color: '#707070', fontFamily: 'AvenirNext-Italic', fontSize: 14, textAlign: 'center' }}>
                  {description}
                </Text>
                {description === ''
                  ? null
                  : <Divider style={{ width: 20, height: 4, backgroundColor: '#f7d074', marginTop: 15, marginBottom: 25 }} />
                }
              </View>


{/*PHOTO CONTENTS */}
                {
                  dates.map(date => (
                    <View key={`entireView-${date}`} style={{ marginBottom: 18 }}>
                      <View key={`dateTextView-${date}`} style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#282626', fontWeight: 'bold', fontFamily: 'Avenir', fontSize: 14, marginLeft: 20, marginBottom: 8 }}>{date}</Text>
                        <Divider style={{ width: 15, height: 3, backgroundColor: '#282626', marginLeft: 20, marginBottom: 20 }} />
                      </View>
                      <EachPhotoGrid
                        allPhotosla={this.makeSelectedPhotos(items)}
                        photosList={this.makeSelectedPhotos(items)[date]}
                        eachPhotogridDates={dates}
                      />
                    </View>
                  ))
                }

            </View>
          </ParallaxScrollView>
      //   </Modal>
      // </View>
    );
  }
}

const mapStateToProps = ({ auth, newStory, PhotoGrid }) => {
  const { user } = auth;
  return { user, ...newStory, ...PhotoGrid };
}

const matchDispatchToProps = dispatch => bindActionCreators(NewStoryActions, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(EachStory);
