import React, { Component } from 'react';
import  CheckBox  from './CheckBox';
import axios from 'axios';
import {url } from '../../config/config';

class CheckList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            industryList : []
        //   industryList: [
        //     {id: 1, value: "banana", isChecked: false},
        //     {id: 2, value: "apple", isChecked: false},
        //     {id: 3, value: "mango", isChecked: false},
        //     {id: 4, value: "grap", isChecked: false}
        //   ]
        }
      }
      
      componentDidMount() {
        let industryList =[]
            
        axios.get(`${url}/companys/unique-in-industry`)
          .then(res => {
            //   console.log('=====industryList data====',res.data)
              if(res.data)
              industryList = res.data.map((data,i) =>{

                let obj = {}
                obj["id"] = i;
                obj["value"] = data;
                obj["isChecked"] = false;
                return obj;
              })
              console.log('componentDidMount = industryList = ',industryList)
            this.setState({
              industryList: industryList
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
      handleAllChecked = (event) => {
        let industryList = this.state.industryList
        industryList.forEach(fruite => fruite.isChecked = event.target.checked) 
        this.setState({industryList: industryList})
      }
    
      handleCheckChieldElement = (event) => {
        let industryList = this.state.industryList
        industryList.forEach(fruite => {
           if (fruite.value === event.target.value)
              fruite.isChecked =  event.target.checked
        })
        console.log('industryList = ', industryList)
        // const result = industryList.filter(data => data.isChecked);
        const filtered = industryList.reduce((a, o) => (o.isChecked && a.push(o.value), a), [])      
        console.log('filter result = ', filtered)

        axios.post(`${url}/companys/filtering`,filtered )
        .then(res => {
            console.log('=====industryList data====',res.data)
        //   this.setState({
        //     industryList: res.data
        //   });
        this.props.onchangeclick(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
        this.setState({industryList: industryList})
      }
    
      render() {
        return (
          <div className="App">
          <h2> IndustryType1</h2>
          <h6> Total count =  {this.props.countconpany}</h6>
          {/* <input type="checkbox" onClick={this.handleAllChecked}  value="checkedall" /> Check / Uncheck All */}
            <ul>
            {
              this.state.industryList.map((fruite) => {
                return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...fruite} />)
              })
            }
            </ul>
          </div>
        );
      }
    }
export default CheckList;