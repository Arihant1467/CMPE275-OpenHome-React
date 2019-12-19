import React, {Component} from 'react';
import HomeAwayPlainNavBar from '../../components/HomeAwayPlainNavBar/HomeAwayPlainNavBar'
import Axios from 'axios';
import {BASE_URL} from '../constants.js';


const queryString = require('query-string');



class Transaction extends Component{

    constructor(props){
        super(props);
        const {userid} = queryString.parse(this.props.location.search);
        this.state = {
            userId:userid,
            transactions : [],
            allTransactions :[],
            month : ""
        }
    }
    componentDidMount(){
        var url= BASE_URL+'/transactions'
        console.log(url)
        var data = {
            "email" : this.props.match.params.userid
        }
        
        Axios.post(url,data)
        .then(response =>{ 
            this.setState({transactions : response.data})
            this.setState({allTransactions : response.data})
        
            console.log(response.data)}
            )
        .catch(error => console.log(error))
    }

    conditionChangeHandler = (e) => {

        this.setState({
            condition : e.target.value
        })

         

    if(e.target.value === 'ALL') {

        this.setState({ transactions : this.state.allTransactions});

    }

    else {

        const temp = this.state.allTransactions.filter(res => 
            new Date(res.date).getMonth() == e.target.value
    );

    this.setState({ transactions : temp});

        }

        



    }

    render(){
  
       if(this.state.transactions.length == 0)
       {
        var transactionCard = (
            <div>
                <h3>No Transaction History</h3>
            </div>
        )
       }
       else
       {
        var transactionCard = this.state.transactions.map(data =>
            {
                return(<div>
                <div className="mt-3 ml-3"><b>   Reservation ID</b>  <span>{data.reservationId}</span> </div>
                <ul class="list-group row" className="ml-3 mr-5">
                    <li class="list-group-item">
                <span class="col-sm-3"> Amount <span class="badge"> {data.amount}</span></span>
                <span class="col-sm-3">Current Balance<span class="badge">{data.currentBalance}</span></span>
                <span class="col-sm-3">Booking Type<span class="badge">{data.type}</span></span>
                <span class="col-sm-3">Transaction date<span class="badge">{new Date(data.date).toISOString().slice(0, 19).replace('T', ' ')}</span></span>
                    </li>
                </ul> 
            
                
                </div>)
            }    
            )
       }
       
        return(<div>
             <HomeAwayPlainNavBar />
             <h1>Transaction History</h1>

             <form onSubmit={this.filterFormSubmitHandler}>

             <div className="row form-group" style={{ border: '0.5px solid #0069D9', padding: '5px' }}>
             <div className="col-md-2">
                     <label htmlFor="reservationType">Monthly Summary </label>
                     <select name="reservationType" className="no-bg" style={{ border: '0.3px solid grey' }}  value={this.state.condition} onChange={this.conditionChangeHandler}> >
                         <option selected value="ALL">ALL</option>
                         <option value="0">January</option>
                         <option value="1">February</option>
                         <option value="2">March</option>
                         <option value="3">April</option>
                         <option value="4">May</option>
                         <option value="5">June</option>
                         <option value="6">July</option>
                         <option value="7">August</option>
                         <option value="8">September</option>
                         <option value="9">October</option>
                         <option value="10">November</option>
                         <option value="11">December</option>
                     </select>
                 </div>
             </div>


             </form>
             {transactionCard}
            
        </div>)
    }
}


export default Transaction;

