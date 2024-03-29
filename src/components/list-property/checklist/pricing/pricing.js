import React, { Component } from 'react';
import serialize from 'form-serialize';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import {BASE_URL} from '../../../constants.js';


class PropertyPricing extends Component {
    constructor(props){
        super(props);

        this.state = {
            cardState: false
        }
        
    }

    componentDidMount() {

        var url= BASE_URL+'/getPayments'
        console.log(url)
        var data = {
            
                "email" : this.props.user.email,
              "cardnumber" :0,
                "cvv" : 0,
              "balance" : 0.0,
               "expiryDate": ""
            
            
        }
        
        Axios.post(url,data)
        .then(response =>{ 
 
            if(response.data) {

                this.setState({ cardState : true});
            console.log("card state"+ this.state.cardState)
        
        }
            console.log(response.data)}
            )
        .catch(error => console.log(error))

    
    }

    saveActionHandle =(e)=>{
        e.preventDefault();
        var form = serialize(e.target, { hash: true });

        if(this.validation(form)){
            this.props.onSave(form);
        }
    }

    onCancel = (e)=>{
        this.myForm.reset();
    }
    validation(data){
        return true;
    }

    render() { 
        var showThisBlock = {
            display: this.props.visible ? 'block':'none'
        }

        let cardUrl = null;
        if(JSON.stringify(this.props.user)!=="{}" && !this.state.cardState){
            cardUrl= <Link target="_blank" className="btn btn-primary btn-lg btn-block" to={`/registerCard/${this.props.user.userid}`} >Add Card</Link>;
        }

        return (
            <form onSubmit={this.saveActionHandle} ref={(myForm)=>{this.myForm=myForm}}>
            <div class="full-width no-bg" id="nav-frames" style={showThisBlock}>
                <div class="row no-bg justify-content-center">
                    <div class="location-checklist" style={{ margin: '20px 15px 10px 10px', width: '100%' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Availibility &amp; Pricing</h3>
                    </div>
                    <div class="full-width" style={{ margin: '10px 15px 10px 10px', height: '1px', background: '#D3D8DE' }}></div>
                </div>

                <div class="row no-bg justify-content-center">

                <div className="form-element">
                            <div className="form-label">
                                <label className="form-label">Contact Number</label>
                            </div>
                            <div className="street-address child-margin">
                                <input type="text" maxLength="10" minLength="10" name="contactNumber" placeholder="1234567890" />
                            </div>
                        </div>

                    <div class="form-element">
                        <div class="form-label">
                            <label class="form-label">Start Date</label>
                        </div>
                        <div class="selector child-margin" style={{ marginTop: '20px' }}>
                            <input type="date" class="form-control no-bg" id="startDate" name="startDate"  style={{ border: 'none', background: 'transparent',fontSize:'15px' }} required />
                        </div>
                    </div>

                    <div class="form-element">
                        <div class="form-label">
                            <label class="form-label">End Date</label>
                        </div>
                        <div class="selector child-margin" style={{ marginTop: '20px' }}>
                            <input type="date" class="form-control no-bg" id="endDate" name="endDate"  style={{ border: 'none', background: 'transparent', fontSize:'15px' }} required />
                        </div>
                    </div>


                    

                    <div className="form-element">
                        <div className="form-label">
                            <label className="form-label">Weekday Rent</label>
                        </div>
                        <div className="street-address child-margin">
                            <input type="number" name="weekRent" placeholder="weekRent" style={{ background: 'transparent' }} required />
                        </div>
                    </div>

                    <div className="form-element">
                        <div className="form-label">
                            <label className="form-label">Weekend Rent</label>
                        </div>
                        <div className="street-address child-margin">
                            <input type="number" name="weekendRent" placeholder="Weekend Rent" style={{ background: 'transparent' }} required />
                        </div>
                    </div>

                    <div className="form-element">
                        <div className="form-label">
                            <label className="form-label">Daily Parking Fee</label>
                        </div>
                        <div className="street-address child-margin">
                            <input type="number" name="dailyParkingFee" placeholder="dailyParkingFee" style={{ background: 'transparent' }} required />
                        </div>
                    </div>

                    <div className="form-element">
                        <div className="form-label">
                            <label className="form-label">Extra Parking Pay</label>
                        </div>
                        <div className="street-address child-margin">
                            <input type="number" name="parkingPay" placeholder="parkingPay" style={{ background: 'transparent' }} />
                        </div>
                    </div>

                </div>

                <div className="row justify-content-center mt-2">


                    <div className="col-md-2">
                        <button className="btn btn-default btn-block btn-rounded btn-cancel" onClick={this.onCancel}>Cancel </button>
                    </div>
                    <div className="col-md-2">
                        {cardUrl}
                    </div>

                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary btn-block btn-rounded btn-save" >Done </button>
                    </div>
                </div>

            </div>
            </form>


        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}


export default connect(mapStateToProps,null)(PropertyPricing)
//export default PropertyPricing;