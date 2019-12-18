import React, { Component } from 'react';
import OwnerCard from './OwnerCard/OwnerCard';
import {BASE_URL} from './../constants.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import HomeAwayPlainNavBar from './../HomeAwayPlainNavBar/HomeAwayPlainNavBar.js';


class OwnerDashboard extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            userid : this.props.match.params.ownerid,
            results:[],
            currentPage:1,
            minPages:1,
            maxPages:1,
            noOfRecordsPerPage:3
        }
        this.stepperHandler = this.stepperHandler.bind(this);
    }

    componentDidMount(){
    const {noOfRecordsPerPage,userid} = this.state;
    const data = {
        "email" : userid
    }
        axios.post(`${BASE_URL}/getUserProperties`,data).then((response)=>{
                if(response.status === 200){
                    const results = response.data;
                    const minPages=1;
                    const maxPages=parseInt(results.length/noOfRecordsPerPage,10);
                    this.setState({ results,minPages,maxPages});
                }else{
                    alert("There was an error in fetching your properties");
                }
        }).catch((error)=>{
            console.log(`In Owner dashboard.js ${error.data}`)
            Swal.fire('Oops...', `There was an error in fetching your properties`, 'error')
        });
    }

    stepperHandler = (e)=>{
        const stepper_value = parseInt(e.target.value,10);
        let {currentPage,maxPages,minPages} = this.state;
        if(stepper_value==1){
            currentPage = currentPage+1;
            currentPage = currentPage>maxPages?maxPages:currentPage
        }
        else if(stepper_value==-1){
            currentPage = currentPage-1;
            currentPage = currentPage<minPages?minPages:currentPage
        }
        
        this.setState({currentPage});
    }

    updateSuccess= (msg,id)=>{
        console.log("Updated success msg");
        console.log("posting ID",id);
        // alert(msg);
        // Swal.fire({
        //     title: "Congratulations!",
        //     text: msg,
        // });

        Swal.fire({
            title: "Successfully updated!",
            text: msg,
        }).then(()=>{
            const {noOfRecordsPerPage,userid} = this.state;
            const data = {  "email" : userid    };
            console.log("Here in success");
            axios.post(`${BASE_URL}/getUserProperties`,data).then((response)=>{
                if(response.status === 200){
                    const results = response.data;
                    const minPages=1;
                    const maxPages=parseInt(results.length/noOfRecordsPerPage,10);
                    this.setState({ results,minPages,maxPages});
                }
        }).catch((error)=>{
            console.log(`In Owner dashboard.js ${error.data}`)
            Swal.fire('Oops...', `There was an error in fetching your properties`, 'error')
        });

            // this.setState({ complete: true });
        });
        
    }

    deletePosting = (postingId)=>{
        console.log("Insided delete posting");
        console.log(postingId);
        const body = {id:postingId};
        axios.delete(`${BASE_URL}/posting`,body).then((response)=>{
            Swal.fire({
                title: "Congratulations!",
                text: "You have deleted the posting",
            }).then(async ()=>{
                const {noOfRecordsPerPage,userid} = this.state;
                const data = {  "email" : userid    };
                console.log("Here in success");
                try{
                    const resp = await axios.post(`${BASE_URL}/getUserProperties`,data);
                    const results = resp.data;
                    const minPages=1;
                    const maxPages=parseInt(results.length/noOfRecordsPerPage,10);
                    this.setState({ results,minPages,maxPages});
    
                }catch(error){
                    console.log("In error of fetch after delete");
                }
                
            })
        })
    }

    updateError= (msg,id)=>{
        console.log("Updated error msg");
        console.log("posting ID",id);
        // alert("We could not update your posting");
        Swal.fire('Oops...', `${msg}`, 'error')
    }

    render() { 
        const style={
            height:'100%',top:'0',left:'0',right:'0',left:'0',
            position:'absolute',backgroundColor:'#F4F4F4'
        }

        const {results} = this.state;
        const {currentPage,minPages,maxPages,noOfRecordsPerPage} = this.state;
        const visibleBlock = (results.length==0);
        const disbaledPrev= (currentPage<=minPages);
        const disableNext = (currentPage>=maxPages);
        let resultsSlice = [];
        
        
        if(results.length<noOfRecordsPerPage){
            resultsSlice = results;
        }else{

            if((currentPage)*noOfRecordsPerPage>results.length){
                resultsSlice = results.slice((currentPage-1)*noOfRecordsPerPage,results.length);
            }else{
                resultsSlice = results.slice((currentPage-1)*noOfRecordsPerPage,currentPage*noOfRecordsPerPage);
            }
        }
        
        return ( 
                <div style={style}>
                    
                    <HomeAwayPlainNavBar />

                    <div className="row w-100" >
                    <div className="col-md-1" ></div>
                    <div className="col-md-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.stepperHandler} disabled={disbaledPrev} value="-1" style={{ marginTop: '1rem' }}>Previous</button>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2">{currentPage}/{maxPages}</div>
                    <div className="col-md-2"></div>
                    
                    <div className="col-md-2">
                        <button className="btn btn-primary btn-lg btn-block" onClick={this.stepperHandler} disabled={disableNext} value="1" style={{ marginTop: '1rem' }}>Next</button>
                    </div>

                    <div className="col-md-1"></div>
                </div>

                    <div style={{display:visibleBlock? 'block':'none'}}>
                        <h2 style={{textAlign:'center'}}>No Properties to Fetch</h2>
                    </div>
                    
                    <div style={{ display: visibleBlock? 'none':'block'}}>
                    {
                        resultsSlice.map((res,index)=>{
                                return (
                                    <OwnerCard data={res} key={res.propertyId} onUpdateSuccess={this.updateSuccess} onUpdateError={this.updateError} onDeletePosting={this.deletePosting} />
                                );
                        })
                    }
                    </div>

                
                </div>
         );
    }
}
 
export default OwnerDashboard;