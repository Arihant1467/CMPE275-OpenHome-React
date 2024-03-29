import React, { Component } from 'react';
import cookie from 'react-cookies';
import {FETCH_SERVER_TIME} from '../../actions/types'
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { linkStyle, navBtnUserStyle, navBarStyle } from './homenavbarstyle.js';

class HomeNavBar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            userLoggedIn: !(JSON.stringify(this.props.user) == "{}"),
            loginButtonClicked: false
        }

    }

    loginButtonHandler = (e) => {

        const { userLoggedIn } = this.state;

        if (!userLoggedIn) {
            this.setState({
                loginButtonClicked: true
            });
        }
    }

    logOutHandler = (e) => {
        this.props.logOut();
    }

    render() {

        let redirectVar = null;
        let tripBoardsUrl = "#";
        let ownerDashboardUrl = "#";
        let userProfileUrl = "#";
        let transactionHistory="#";
        let registerCards="#";
        let inboxUrl = "#";
        let timeAdvancement = "#";
        let hostReservationsurl = '#';

        if (this.state.loginButtonClicked) {
            redirectVar = <Redirect to="/login" />
        }

        const { userLoggedIn } = this.state;

        if (userLoggedIn) {
            const { userid } = this.props.user;
            //const userid = this.props.user.email;
            tripBoardsUrl = `/userdashboard/${userid}`;
            ownerDashboardUrl = `/ownerdashboard/${userid}`;
            userProfileUrl = `/userprofile/${userid}`;
            inboxUrl = `/inbox/${userid}`;
            transactionHistory=`/transactions/${userid}`;
            registerCards = `/registerCard/${userid}`;
            timeAdvancement = `/timeAdvancement`;
            hostReservationsurl = `/hostReservations/${userid}`
        }
        const serverTime = this.props.serverTime;
        const {year,dayOfMonth,monthValue,hour,minute,second} = serverTime
        const timeString = year + '/' + monthValue + '/' + dayOfMonth + ' ' + hour + ':' + minute + ':' + second; 
        console.log(`TImestring: ${timeString}`);
        const isHost = (JSON.stringify(this.props.user)!=="{}" && this.props.user.usertype==="HOST")
        const isGuest = (JSON.stringify(this.props.user)!=="{}" && this.props.user.usertype==="GUEST")
        return (
            <nav className="navbar navbar-expand-lg">
                {redirectVar}
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="ml-3" style={navBarStyle} >
                        <h1 style={{ color: 'white' }}>OpenHome</h1>
                    </div>
                    <ul className="navbar-nav ml-auto">


                    <li className="nav-item">
                      <Link style={{ pointerEvents: 'none' }} className="btn btn-lg text-center" to="" style={linkStyle}>
                                Server Time: {timeString}
				        </Link>
                    </li>

                    <li className="nav-item" >
                            <Link className="btn btn-lg text-center" target="_blank" style={linkStyle} to="/timeAdvancement">Advance time</Link>
                        </li>

                        <li className="nav-item" style={{ display: isGuest ? 'block' : 'none' }}>
                            <Link className="btn btn-lg text-center" to={tripBoardsUrl} style={linkStyle}>
                                Reservations
				            </Link>
                        </li>

                        <li className="nav-item" style={{ display: isHost ? 'block' : 'none' }}>
                      
                            <Link className="btn btn-lg text-center" to={hostReservationsurl} style={linkStyle}>
                                Host Reservations
				            </Link>
                        </li>
                        <li className="nav-item" style={{ display: isHost ? 'block' : 'none' }}>
                            <Link className="btn btn-lg text-center" to="/checklist" style={linkStyle}>
                                List Your Property
				            </Link>
                            
                        </li>
                        

                        <li className="nav-item dropdown">
                            <div className="btn-group">
                                <button type="button" onClick={this.loginButtonHandler} style={navBtnUserStyle} className={"btn btn-lg dropdown-toggle"} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {userLoggedIn ? this.props.user.username : "Log In"}
                                </button>

                                <div className="dropdown-menu dropdown-home" style={{ visibility: userLoggedIn ? 'visible' : 'hidden' }}>
                                    {/* <Link className="dropdown-item" to={inboxUrl}>Inbox</Link> */}
                                    {/* <Link className="dropdown-item" to={userProfileUrl}>Edit Profile</Link> */}
                                    <Link className="dropdown-item" to={ownerDashboardUrl}>Owner Dashboard</Link>
                                    <Link className="dropdown-item" to={transactionHistory}>Transactions</Link>
                                    <Link className="dropdown-item" target="_blank" to={registerCards}>Add Card</Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" to="#" onClick={this.logOutHandler}>Log out</Link>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}



const mapStateToProps = (state) => {
    const { user,serverTime } = state;
    console.log("In map state to props of home advanced");
    console.log(JSON.stringify(serverTime));
    console.log(state.serverTime);
    return {
        user,
        serverTime
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchLatestServerTime: (serverTime) => {
          console.log(serverTime);
        dispatch({
          type: FETCH_SERVER_TIME,
          payload: serverTime
        })
      },
  
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(HomeNavBar);
//export default HomeNavBar;
