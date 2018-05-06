import React, { Component } from 'react'
import { Form, Text, TextArea, Select, } from 'react-form'
import axios from 'axios'
import './css/EnquiryForm.css'

const enquiryOptions = [
    {
      label: 'Urgent',
      value: 'Urgent',
    },
    {
      label: 'Not working',
      value: 'Not working',
    },
    {
      label: "Thank you",
      value: 'Thank you',
    },
 ]

class EnquiryForm extends Component {
	constructor(props) {
		super (props)
		this.state = {
			formData: {
				enquiryType: '',
				firstName: '',
				lastName: '',
				email: '',
				comments: '' 
			}
		}
		//this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}	

	handleSubmit(event) {
		this.setState ({ 'formData' : event }) //Set state 

		const formData = this.state.formData
		//console.log(formData)

		//Call Express post function sending the form data. 
		//Waits for response of successful or failed sending.
		axios.post('http://localhost:3002/send', { formData }) 
			.then((response) => {
				console.log(response)
				if (response.data.msg === 'success') {
					alert('Message Sent.')
					//this.resetForm()  //Function needed, not sure if compatible with react-form
				} else if (response.data.msg === 'fail') {
					alert('Message failed to send.')
				}
			})			
	}
	
	render() {
		return (						
			<div className='col-sm-4 offset-sm-4'>
				<Form id='contact-form' className="enquiry-form" onSubmit={this.handleSubmit} method="POST">				
	    			{formApi => (
				      	<form onSubmit={formApi.submitForm} id="contact-form">		
				      	<div className="form-group">		      		
				      		<label htmlFor="enquiryType" >Type of Enquiry: </label>
					        <Select field="enquiryType" id="enquiryType" className="form-control" options={enquiryOptions} />	
					    </div>
					    <div className="form-group">    				       
					        <label htmlFor="firstName">First name: </label>					        
					        <Text field="firstName" id="firstName" className="form-control"/>
				        </div>
				        <div className="form-group">					        
					        <label htmlFor="lastName">Last name: </label>
					        <Text field="lastName" id="lastName" className="form-control" />	  
				        </div>
					    <div className="form-group">    
					        <label htmlFor="email">Email Address: </label>
					        <Text 	
					        	field="email" id="email" className="form-control"
					        	//Might use this might not //Validation was the reason I chose to try react-form
				        		//validate={validate} asyncValidate={emailValidate}
					        />	
				        </div>
				        <div className="form-group">
					        <label htmlFor="comments">Comments: </label>
					        <TextArea field="comments" className="form-control" id="comments" />   	
				        </div>		        
					        <button type="submit" className="btn btn-primary">
					          Submit
					        </button>
	      				</form>
	    			)}
	  			</Form>		  			
			</div>	  		
		)
	}
}

export default EnquiryForm