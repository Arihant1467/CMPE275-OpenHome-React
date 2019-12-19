import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PropertyOverviewRight extends Component {
    constructor(props){
        super(props)
        
        this.bookNowHandler = this.bookNowHandler.bind(this);
    }

    bookNowHandler = (e)=> {
        this.props.onSave();
    }

    getNumberOfWeekDaysAndWeekEnds = (start, end) => {
        let startDate = new Date(start);
        const endDate = new Date(end);

        const days = {
            numberOfWeekends:0,
            numberOfWeekdays:0
        }

        const milliSecondInOneDay = 24 * 60 * 60 * 1000;
        while (startDate.getTime() <= endDate.getTime()) {
            const day = startDate.getDay();
            if (day == 1 || day == 2 || day == 3 || day == 4) {
                days.numberOfWeekdays += 1;
            }
            else {
                days.numberOfWeekends += 1;
            }
            startDate = new Date(startDate.getTime() + milliSecondInOneDay);
        }

        return days;
    }


    render() { 
        
        const startDate = this.props.startDate;
        const endDate = this.props.endDate;
        const { data } = this.props;
        const { weekendRent,weekRent } = data;
        const { userId,contactNumber } = data;
        const { numberOfWeekends,numberOfWeekdays} = this.getNumberOfWeekDaysAndWeekEnds(startDate,endDate);
        const bookingCost = numberOfWeekends*weekendRent + numberOfWeekdays*weekRent;
        
        

        const enableBookNow = (this.props.userLoggedIn && JSON.stringify(this.props.user)!=="{}" && this.props.user.email.indexOf("@sjsu.edu")==-1);
        console.log(enableBookNow);
        let cardUrl = null;
        if(enableBookNow){
            cardUrl= <Link target="_blank" className="btn btn-primary btn-lg btn-block" to={`/registerCard/${this.props.user.userid}`}>Add Card</Link>;
        }

        // const start = new Date(startDate).toLocaleDateString();
        // const end = new Date(endDate).toLocaleDateString();

        const start = new Date(startDate).toISOString().split("T")[0];
        const end = new Date(endDate).toISOString().split("T")[0];

        return (  
            <div>
                <div className="row pl-2">
                    <div className="col-md-6">
                        <h1 className="clearfix">$ {weekRent}</h1>
                        <p>Weekday Rent</p>
                    </div>

                    <div className="col-md-6">
                        <h1 className="clearfix">$ {weekendRent}</h1>
                        <p>Weekend Rent</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 check-in-col-border">
                        <p className="clearfix mb-0 right-p">Check in</p>
        <h2 className="mt-0 right-h2">{start}</h2>
                    </div>
                    <div className="col-md-6 check-out-col-border">
                        <p className="clearfix mb-0 right-p">Check Out</p>
                        <h2 className="mt-0 right-h2">{end}</h2>
                    </div>
                </div>
                <div className="row justify-content-center guests-in-col-border">
                    <div className="col-md-6">
                        <h3 className="clearfix mb-0">Total</h3>
                    </div>
                    <div className="col-md-6">
                        <h3 className="clearfix mb-0" style={{textAlign:'left'}}>${bookingCost}</h3>
                    </div>
                </div>

                <div className="row justify-content-center mt-2">
                    <div className="col-md-6">
                        <button className="btn btn-primary btn-lg btn-block" disabled={!enableBookNow} onClick={this.bookNowHandler} >Book Now</button>
                    </div>
                    <div className="col-md-6">
                            {cardUrl}
                    </div>
                </div>



            </div>
        );
    }
}


//export default PropertyOverviewRight;
const mapStateToProps = (state) => {
    const { user } = state;
    return {
      user,
    }
}

export default connect(mapStateToProps, null)(PropertyOverviewRight);