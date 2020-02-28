import React, {useState} from 'react';
import logo from './logo.svg';
import FormikForm from './Form';
import styled from 'styled-components';
import './App.css';

const Container = styled.div`
border: solid black 2px;
margin: 3%;
`;

function App() {

  const [members, setMembers] = useState([{
    name: 'biskoi',
    email: 'biskoi@daydream.cafe',
    pw: 'password',
    tos: false
  }]);

  return (
    <div className="App">
      <FormikForm setMembers = {setMembers} members = {members}/>
      {members.map((item, index) => (
        <Container>
          <p>{`Name: ${item.name}`}</p>
          <p>{`Email: ${item.email}`}</p>
          <p>{`Password: ${item.pw}`}</p>
          <p>{`ToS: ${item.tos}`}</p>
        </Container>
      ))}
    </div>
  );

}

export default App;
