import './App.css'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import {useQuery, useMutation} from '@apollo/react-hooks'

import {
	Message_Query,
	Message_Create,
	Message_Subscription
} from './graphql'
//import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'

function App() {
  //const { status, opened, messages, sendMessage, clearMessages } = useChat()
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [M1, setM1] = useState('')
  const [M2, setM2] = useState('')
  const [M3, setM3] = useState('')
  const [M4, setM4] = useState('')
  const [M5, setM5] = useState('')
  const [M6, setM6] = useState('')
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')
  
  const {loading, error, data, subscribeToMore} = useQuery(Message_Query)
  const [addMessage] = useMutation(Message_Create)
  
  useEffect(() => {
	  subscribeToMore({
		  document: Message_Subscription,
		  updateQuery: (prev, { subscriptionData }) => {
			  if(!subscriptionData.data)  return prev
			  const newMessage = subscriptionData.data.message.data
			  
			  return {
				  ...prev,
				  message: [...prev.message, newMessage]
			  }
		  }
	  })
  }, [subscribeToMore])
	
  
	
  const handleMessageSubmit = useCallback(
	 async () => {
		  
		  
		  if(!username || !body) return
		 
		 await addMessage({
			  variables:{
				  from: from,
				  to: username,
				  body: body
			  }
		  })
		 
		 await setFrom('')
		 await setUsername('')
		 await setBody('')
		 setM1(''); setM2(''); setM3(''); setM4(''); setM5(''); setM6('');
		 
	  },
	  [addMessage, from, username, body]
  )

  const bodyRef = useRef(null)

  /*const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])*/
  if (!name){
	  return(
		  <div className="App">
		    <div className="App-title">
		      <h1>Simple Chat</h1>
		    </div>
		    <Input
		      placeholder = "Please input your name."
	          style={{ marginBottom: 30 }}
		      
              onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                      setName(e.target.value)
                  }
              }}
		    ></Input>
		  </div>
	  )
  }
//<Button type="primary" danger onClick={clearMessages}>
          //Clear
        //</Button>
  return (
  <div className = "container">
	  
	<div className="App" style = {{position: "absolute", left: "0px"}}>
      <div className="App-title">
        <h1>god</h1>
        
      </div>
      <div className="App-messages">
        {data.message.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {loading? 'Loading...' : 'No messages...'}
          </p>
        ) : (
          data.message.map(function({ from, to, body }){
			  if (to === 'god')
            { return (<p className="App-message">
              <Tag color="blue">{from}</Tag> {body}
            </p>
          )}})
        )}
      </div>
      <Input
        placeholder="Send message to?"
        value={M1}
        onChange={(e) => {setUsername(e.target.value)
				 setM1(e.target.value)
				 }}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={M2}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => {setBody(e.target.value)
				 setFrom('god')
				  setM2(e.target.value)
				 }}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            /*displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })*/
			message.error('Please enter a username and a message body.')
            return
          }

          //sendMessage({ name: username, body: msg })
           
           handleMessageSubmit()
          
        }}
      ></Input.Search>
    </div>
	  
    <div className="App">
      <div className="App-title">
        <h1>{name}(You)</h1>
        
      </div>
      <div className="App-messages">
        {data.message.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {loading? 'Loading...' : 'No messages...'}
          </p>
        ) : (
          data.message.map(function({ from, to, body }){
			  if(to === name){
				  
            return (<p className="App-message">
              <Tag color="blue">{from}</Tag> {body}
            </p>
          )}})
        )}
      </div>
      <Input
        placeholder="Send message to?"
        value={M3}
        onChange={(e) => {setUsername(e.target.value)
				 setM3(e.target.value)
				 }}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={M4}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => {setBody(e.target.value)
				 setFrom(name)
				  setM4(e.target.value)
				 }}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            /*displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })*/
			message.error('Please enter a username and a message body.')
            return
          }

          //sendMessage({ name: username, body: msg })
          
          handleMessageSubmit()
          
        }}
      ></Input.Search>
    </div>

    <div className="App" style = {{position: "absolute", right: "0px"}}>
      <div className="App-title">
        <h1>ghost</h1>
        
      </div>
      <div className="App-messages">
        {data.message.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {loading? 'Loading...' : 'No messages...'}
          </p>
        ) : (
          data.message.map(function({ from, to, body }){
            if (to === 'ghost'){
			  
			return (<p className="App-message">
              <Tag color="blue">{from}</Tag> {body}
            </p>
          )}})
        )}
      </div>
      <Input
        placeholder="Send message to?"
        value={M5}
        onChange={(e) => {setUsername(e.target.value)
				 setM5(e.target.value)
				 }}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={M6}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => {setBody(e.target.value)
				 setFrom('ghost')
				  setM6(e.target.value)
				 }}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            /*displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })*/
			message.error('Please enter a username and a message body.')
            return
          }

          //sendMessage({ name: username, body: msg })
          
          handleMessageSubmit()
          
        }}
      ></Input.Search>
    </div>

  </div>
  )
}

export default App
