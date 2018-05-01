import React, { Component } from 'react'
import { Form, Text, TextArea, Select, } from 'react-form'

import './css/EnquiryForm.css'

//TODO Look into making urgent emails as a result of this.
const enquiryOptions = [
    {
      label: 'Urgent',
      value: 'urgent',
    },
    {
      label: 'Not working',
      value: 'notworking',
    },
    {
      label: "Thank you",
      value: 'thankyou',
    },
 ]


class EnquiryForm extends Component {
	constructor(props) {
		super (props)
		this.state = {}

		this.handleSubmit = this.handleSubmit.bind(this)
	}
	

	handleSubmit(event) {
		console.log(event) //Shows form data on console
		//event.preventDefault(); Not working for some reason
		//const data = new FormData(event.target)	

		this.setState ({ 'submittedValues' : event }) //Set state //Probably not needed

		console.log(this.state)		
	}

	
	render() {
		return (						
			<div className='EnquiryForm'>
				<Form className="enquiry-form" onSubmit={this.handleSubmit} method="POST">				
	    			{formApi => (
				      	<form onSubmit={formApi.submitForm} id="form">
				      		
				      		<label htmlFor="enquiryType" className="d-block">Type of Enquiry: </label>
					        <Select field="enquiryType" id="enquiryType" options={enquiryOptions} className="mb-4" />
					       
					        <label htmlFor="firstName">First name: </label>					        
					        <Text field="firstName" id="firstName" />
					        
					        <label htmlFor="lastName">Last name: </label>
					        <Text field="lastName" id="lastName" />				        
					        
					        <label htmlFor="email">Email Address: </label>
					        <Text 	
					        	field="email" id="email" 
					        	//Might use this might not
				        		//validate={validate} asyncValidate={emailValidate}
					        />	

					        <label htmlFor="comments">Comments: </label>
					        <TextArea field="comments" id="comments" />        
					        
					        <button type="submit" className="submitEnquiry">
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