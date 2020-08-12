import { PropTypes } from 'prop-types';
import React from 'react';
import Map, { Marker } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { Input } from 'antd';

interface IProps {
    personalInfo?: any;
    address?: any;
    location?: any;
    marker?: any;
    _fixData?: (params?: string) => any;
}

interface IState {
    position?: object,
    address?: string,
    showInfo?: boolean
}

function findAddress(lat, lng) {
    const google = window.google;
    //const codeApi = 'AIzaSyA55QnSD4Xj6-zTyCbWUs8iKOyYyjmhv08';
    var geocoder = new google.maps.Geocoder();
    return new Promise(function (resolve, reject) {
        geocoder.geocode({ 'latLng': new google.maps.LatLng(lat, lng) }, function (results, status) {
            if (status === 'OK') {
                resolve(results);
            } else {
                alert('Không có thông tin nơi bạn chọn!')
            }
        })
    })
}

interface IProps {
    location?: any
}
class GoogleMap extends React.Component<IProps, IState>{
    constructor(props) {
        super(props);
        this.state = {
            position: {
                lat: 21.027763,
                lng: 105.834160
            },
            address: null,
            showInfo: false,
        }
    }

    componentDidMount() {

    }

    SendData = (lat, lng, address) => {
        this.props.GetLatLngToParent(lat, lng, address);
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {

                this.SendData(latLng.lat, latLng.lng, address);
                this.setState({
                    address
                })
                this.setState(prevState => ({
                    position: {
                        ...prevState.position,
                        lat: latLng.lat,
                        lng: latLng.lng,
                    }
                }));
            })
            .catch(error => console.error('Error', error));
    };

    getAddress = (coord) => {
        let { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState(prevState => ({
            position: {
                ...prevState.position,
                lat: lat,
                lng: lng,
            }
        }));
        let { address } = this.state;
        findAddress(lat, lng)
            .then(res => {
                address = res[0].formatted_address;
                this.setState({
                    address
                });
                this.SendData(latLng.lat(), latLng.lng(), address);
            })


    };

    render() {
        return (
            <div>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Input

                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                </PlacesAutocomplete>
                <Map
                    style={{ width: 570, height: 450, marginTop: 10 }}
                    google={window.google}
                    zoom={14}
                    center={{
                        lat: this.state.position.lat,
                        lng: this.state.position.lng,
                    }}
                    initialCenter={{
                        lat: this.state.position.lat,
                        lng: this.state.position.lng,
                    }}
                >
                    <Marker
                        name={this.state.address}
                        position={this.state.position}
                        draggable={true}
                        onDragend={(t, map, coord) => this.getAddress(coord)}
                    />
                </Map>
            </div>
        )
    }
}


export default GoogleMap