import React, { Component } from 'react';

class MapView extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this._map = new BMap.Map("map");
    // let point=new BMap.Point(this.props.Longitude,this.props.Latitude);
    this._map.centerAndZoom(new BMap.Point(this.props.Longitude,this.props.Latitude), 15);
    // let marker=new BMap.Marker({point});
    this._map.addOverlay(new BMap.Marker(new BMap.Point(this.props.Longitude,this.props.Latitude)));               // 将标注添加到地图中
    // marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
    this._local = new BMap.LocalSearch(this._map, {
      renderOptions: { map: this._map },
      onInfoHtmlSet: poi => {
        if (typeof this.props.onSelect === 'function') {
          this.props.onSelect(poi.marker.getPosition());
        }
      }
    });
  }

  render(){
    return(
      <div id="map" style={{height:'300px', width:'100%',marginTop:'10px'}}/>
    )
  }
}

module.exports = MapView
