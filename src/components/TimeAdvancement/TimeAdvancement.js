import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import HomeNavBar from '../home/HomeNavBar/homenavbar.js';
import {BASE_URL} from '../constants.js';
import {FETCH_SERVER_TIME} from '../actions/types';
import HomeAwayPlainNavBar from './../HomeAwayPlainNavBar/HomeAwayPlainNavBar.js';
import Swal from 'sweetalert2';


class TimeAdvancement extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            date: '',
        }

        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.reset = this.reset.bind(this);
       
    }

    componentDidMount()  {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        this.setState({
          //Setting the value of the date time
          date:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec 
        } );

        

    }

    changeDateHandler = (e)=>{
         e.preventDefault();

        this.setState({
            date : e.target.value
          } );
    }

    fetchServerTime = ()=>{
        const url = `${BASE_URL}/getTime`;
        console.log("in time advancemnet js");
        console.log(`For server time url : ${url}`);
        axios.get(url).then((response)=>{
            
            console.log(JSON.stringify(response.data));
            if(response.data!=null){
                const serverTime = response.data;
                this.props.fetchLatestServerTime(serverTime);
            }
           
        })
    }


    reset = () =>  {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        this.setState({
          //Setting the value of the date time
          date:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec 
        } );

          axios({
            method : 'PUT',
            url:`${BASE_URL}/changeTime`,
            headers:{
              'Content-Type' : 'text/plain',
              
            },
            data : "#"+this.state.date 
          })
          .then((result) => {
            console.log("result"+result)
            alert("Date set back to current time");
            this.fetchServerTime();
           
            //Grey out checkin
          })
          .catch(error =>
            { 
                
        console.log(error.data)
            }
          )

    }

    changeTime =() =>{
       axios({
            method : 'PUT',
            url:`${BASE_URL}/changeTime`,
            headers:{
              'Content-Type' : 'text/plain',
              
            },
            data : this.state.date
          }
          )
          .then((result) => {
            this.fetchServerTime();
            Swal.fire({
              title:"Request success",
              text: "Date advanced"
          }).then(()=>{
            console.log("result"+result);
           
          });

          })
          .catch(error =>
            { 

              Swal.fire({
                title:"Error",
                text: error.response.data
            }).then(()=>{
              console.log(error.response.data);
            });
    
            }
          )

    }


    render() { 

        const style1={
            height:'100%',top:'0',left:'0',right:'0',left:'0',
            position:'absolute',backgroundColor:'#F4F4F4'
        
        }

    
        const style2={
            height:'100%',top:'25%',left:'0',right:'0',left:'0',
            position:'absolute',backgroundColor:'#F4F4F4',
            'font-size' : 55
        }

        const style3={
            'font-size' : 40,
            backgroundColor:'#F4F4F4',
            'color' : 'grey',
            'left' : '5%',
            'align' : 'center',
            'position' : 'relative',
            'width' :'500px'
            

        }


        return ( 

            <div>
                
            <div style={style1}>

            <HomeAwayPlainNavBar />
                
                    <div align= "center"  style={style2}>

                    <p> Current Time</p>

                    <h1>{this.state.date}</h1>
                    
                  <p style ={{'font-size' : 30}}> You wanna time travel ??  Change time here : </p>
                  <input type="datetime-local" value= {this.state.date} style ={style3} onChange = {this.changeDateHandler}/>
                              
                  <button type="submit"  className="btn btn-primary btn-large btn-block"  onClick={this.changeTime} style ={{'width' : '300px' ,'margin' : '15px', 'font-size' : '25px', 'border-radius' : '20px'}}> Let's go </button>

                  <button type="Reset"  className="btn btn-success btn-large btn-block"  onClick={this.reset} style ={{'width' : '300px' ,'margin' : '15px', 'font-size' : '25px', 'border-radius' : '20px'}}> Reset </button>
                  </div>
                  


              

                </div>
               
                </div>

        );
    }
}


const mapStateToProps = (state) => {
  const { user,serverTime } = state;
  console.log("printing server time from redux");
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeAdvancement);
//export default TimeAdvancement;