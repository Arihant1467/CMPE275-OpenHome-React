import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../constants';
import {FETCH_SERVER_TIME} from '../actions/types';
import { advanceTimeStyle } from './../../components/home/HomeNavBar/homenavbarstyle.js';
import Logo from './../../logo/openhome.png';


class HomeAwayPlainNavBar extends Component {
    
    constructor(props){
        super(props);
    }

    getServerTime = ()=>{
        const url = `${BASE_URL}/getTime`;
        console.log(`For server time url : ${url}`);
        axios.get(url).then((response)=>{
            console.log("Getting time from server");
            console.log(response.data);
            if(response.data!=null){
                const serverTime = response.data;
                this.props.fetchLatestServerTime(serverTime);
            }
           
        })
    }

    render() { 
        //this.getServerTime();
        const serverTime = this.props.serverTime;
        // const date = serverTime.getDate(); //Current Date
        // const month = serverTime.getMonth() + 1; //Current Month
        // const year = serverTime.getFullYear(); //Current Year
        // const hours = serverTime.getHours(); //Current Hours
        // const min = serverTime.getMinutes(); //Current Minutes
        // const sec = serverTime.getSeconds(); //Current Seconds
        console.log("server Time in navbar")
        console.log(serverTime);
        const {year,dayOfMonth,monthValue,hour,minute,second} = serverTime
        const timeString = year + '/' + monthValue + '/' + dayOfMonth + ' ' + hour + ':' + minute + ':' + second; 
        console.log(`TImestring: ${timeString}`);

        return (
            <div className="row w-100 add-border-signup pb-3" style={{ backgroundColor: '#FFFFFF', height: '80px', borderTopStyle: 'none', borderLeftStyle: 'none', borderRightStyle: 'none' }}>
                <div className="col-md-1"></div>
                <div className="col-md-1">
                    <Link to="/home"> <img className="mt-2" src={Logo} alt="Open Home" /> </Link>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-3">
                        <h4 style={{color:'#D82010'}}>Current-Time:</h4>
                        <p style={{color:'#D82010'}}>{timeString}</p>
                </div>
                <div className="col-md-2">
                    <Link className="btn btn-block text-center" target="_blank" style={advanceTimeStyle} to="/timeAdvancement">Advance time</Link>
                </div>
                <div className="col-md-1">
                    <img src="https://img.icons8.com/color/64/000000/cottage.png" />
                </div>
                <div className="col-md-1">
                   <p>Welcome {JSON.stringify(this.props.user)==="{}"?"Guest" : this.props.user.userid}</p>
                </div>
            </div>
          );
    }
}

const mapStateToProps = (state) => {
    const { user,serverTime } = state;
    console.log("In map state to props of home advanced");
    console.log(JSON.stringify(serverTime));
    return {
        user,
        serverTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchLatestServerTime: (serverTime) => {
        dispatch({
          type: FETCH_SERVER_TIME,
          payload: serverTime
        })
      },
  
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomeAwayPlainNavBar);
//export default HomeAwayPlainNavBar;