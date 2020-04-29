import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import React, { Component, CSSProperties } from 'react';
import './MapContainer.scss';
import { connect } from 'react-redux';
import GeoCode from 'react-geocode';
import { REDUX } from '../../../../const/actions';

interface IProps {
    mapState?: {
        marker?: {
            lat?: number;
            lng?: number;
        }
    };

    setMapState?: Function;
    style?: CSSProperties;
    disabled?: boolean;
}

interface IState {
    showingInfoWindow?: boolean,
    activeMarker?: any,
    selectedPlace?: any,
    marker?: {
        lat?: number, lng?: number
    },
    location?: string
}

class MapContainer extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
            marker: {
                lat: 0, lng: 0
            },
            location: ''
        };
    }

    componentDidMount() {
        let { marker } = this.props.mapState;
        this.setState({ marker, location: localStorage.getItem('location') });
        GeoCode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)

    }

    _onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    _setMapState = (t, map, coord) => {
        const { latLng } = coord;
        let { marker } = this.state;
        let { disabled } = this.props;
        if (!disabled) {
            const lat = latLng.lat();
            const lng = latLng.lng();
            marker.lat = lat;
            marker.lng = lng;
            GeoCode.fromLatLng(marker.lat, marker.lng).then(
                response => {
                    let { location } = this.state;
                    location = response.results[0].formatted_address;
                    localStorage.setItem('location', location);
                    this.setState({ location, marker });
                    this.props.setMapState(marker, location);
                },

                error => {
                    console.error(error);
                }
            )
        }
    }

    render() {
        let { marker, location, showingInfoWindow, activeMarker } = this.state;
        let { style } = this.props;

        return (
            <div>
                <div>{location}</div>
                <Map
                    className='map-wraper'
                    //@ts-ignore
                    google={window.google}
                    initialCenter={this.props.mapState.marker}
                    onClick={this._setMapState}
                    style={style ? style : undefined}
                >
                    <Marker
                        onClick={this._onMarkerClick}
                        name={location}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />

                    <InfoWindow
                        marker={activeMarker}
                        visible={showingInfoWindow}>
                        <div>
                            <h5>{this.state.selectedPlace.name}</h5>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

const mapStateTopProps = state => ({
    mapState: state.MapState
})

const mapDispatchToProps = dispatch => {
    return {
        setMapState: (marker, location) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, marker, location })
    }
}

export default connect(mapStateTopProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer))