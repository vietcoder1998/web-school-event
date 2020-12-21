import React from 'react';
import Map, { Marker } from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import { Input, Dropdown, Icon } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';

interface IProps {
    personalInfo?: any;
    position?: {
        lat: number,
        lng: number
    };
    location?: any;
    address?: string;
    marker?: any;
    hidden?: boolean;
    _fixData?: (params?: string) => any;
}

interface IState {
    position?: {
        lat?: number;
        lng?: number;
    },
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
            address: "",
            showInfo: false,
        }
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
        let {address, position} = this.props;
        console.log(position);
        return (
            <div style={{ position: "absolute", height: "80%", width: "100%", top: 0, right: 0 }}>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                 
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Dropdown 
                              
                                overlay={
                                <Menu className="autocomplete-dropdown-container " >
                                    {loading && <div>Loading...</div>}
                                    {suggestions && suggestions.length > 0 ? suggestions.map((suggestion, i) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        return (
                                            <MenuItem
                                                {...getSuggestionItemProps(suggestion, {
                                                    className
                                                })}
                                                key={i}
                                                className="Test"
                                                style={
                                                    suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' }
                                                } >
                                                <Icon type="environment" twoToneColor="red" theme="twoTone" /> <span>{suggestion.description}</span>
                                            </MenuItem>
                                        );
                                    }) : null}
                                </Menu>
                            }>
                                <Input
                                    {...getInputProps({
                                        placeholder: 'Gõ để tìm kiếm vị trí...',
                                        className: 'location-search-input',
                                    })}
                                    style={{display: this.props.hidden ? "none":""}}
                                />
                            </Dropdown>
                        </div>
                    )
                    }

                </PlacesAutocomplete>
                <Map
                    style={{ width: "100%", height: "100%", marginTop: 10, padding: 10 }}
                    google={window.google}
                    zoom={14}
                    center={position?position:this.state.position}
                    initialCenter={position?position:this.state.position}
                >
                    <Marker
                        name={address?address: this.state.address}
                        position={position?position:this.state.position}
                        draggable={false}
                        onDragend={(t, map, coord) => this.getAddress(coord)}
                    />
                </Map>
            </div >
        )
    }
}


export default GoogleMap