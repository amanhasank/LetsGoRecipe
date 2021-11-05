import { Container } from '@material-ui/core';
import styled from "styled-components";
import { useState } from 'react';
import Axios from "axios";
import React from 'react';
import { DialogContent } from '@material-ui/core';
import { DialogTitle } from '@material-ui/core';
import { DialogActions } from '@material-ui/core';


import Dialog from '@material-ui/core/Dialog';

// const Container = styled.div `
//   display: flex;
//   flex-directon: column;
//   maxWidth: "lg";
// `;

const Header = styled.div` 
 color: white;
 background-color: #4ab30c;
 display: flex;
 flex-direction: row;
 align-items: center;
 padding : 10px;
 font-size: 22px;
 font-weight: bold;
 justify-content: space-between;
 box-shadow: 0 3px 6px 0 #555
`;

const Appname = styled.div`
  display: flex;
  align-items: center;
`; 
const Searchbar = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  padding: 5px;
  border-radius: 9px;
  width: 50%;
`;
const SearcInput = styled.input`
  border: none;
  outline: none;
  margin-left: 15px;
  font-size: 16px;
  font-weight: bold;

`;
const Appicon = styled.img`
width: 36px;
height: 36px;
margin: 15px;`;
const Seachicon = styled.img`
width: 30px;
height: 30px;
margin: 15px;`;

const SearchComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color:white;
  padding:10px;
  border-radius: 6px;
  width: 50%;
`;

const ReceipeListcontainer = styled.div `
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 padding: 30px;
 justify-content: space-evenly;
 gap:20px;
 
`;

const Receipecontainer = styled.div `
display: flex;
flex-direction: column;
padding: 10px;
width: 300px;
box-shadow: 0 3px 10px 0 #aaa;
`;

const ReceipeComponent = (props) => {
  const [show, setShow] = React.useState(false);
  const { recipeobj} = props;
 return(
   <>
   <Dialog open ={show}>
   <DialogTitle id="alert-dialog-title">Ingredients</DialogTitle>
   <DialogContent>
   <table>
     <thead>
       <th>Ingredients</th>
       <th>Weight</th>
     </thead>
     <tbody>
       {recipeobj.ingredients.map((ingredientsobj)=>(
           <tr>
           <td>{ingredientsobj.text}</td>
           <td>{ingredientsobj.weight}</td>
         </tr>
       ))}
    
     </tbody>
   </table>
   </DialogContent>
   <DialogActions>
          <Ingredientname onClick={()=>window.open(recipeobj.url)}>See Complete recipe</Ingredientname>
          <Seemore onClick={()=> setShow("")}>Close</Seemore>
        </DialogActions>
   </Dialog>
   <Receipecontainer>
     <Coverimage src = {recipeobj.image}/>
     <Receipename>{recipeobj.label}</Receipename>
     <Ingredientname onClick={()=>setShow(true)}>
       Ingredients
     </Ingredientname>
     <Seemore onClick={()=>window.open(recipeobj.url)}>See Full Recipe</Seemore>
   </Receipecontainer>
   </>
 );
};

const Coverimage = styled.img `
height: 200px;
object-fit:cover;
`;

const Placeholder = styled.img `
height: 120px;
width: 120px;
opacity: 50%;
margin: 200px;

`;
const Receipename = styled.span `
font-size: 18px;
font-weight: bold;
color: black;
margin: 10px 0;
`;

const Ingredientname = styled.span `
font-size: 18px;
border: solid 1px green;
color: black;
cursor: pointer;
padding: 10px 15px;
border-radius: 4px;
color: green;
text-align: center;

`;

const Seemore = styled.span `
font-size: 18px;
border: solid 1px red;
color: black;
margin: 10px 0;
cursor: pointer;
padding: 10px 15px;
border-radius: 4px;
color: red;
text-align: center;
`;
const axios = require('axios');
const appida = "3324cd56";
const APP_KEY= "b052d767b41b6a6dd18f75398b73705c";
function App() {
  const [timeoutID, updateTimeoutId] = useState();
  const [receipeList, updatereceipelist] = useState([]);

const Fetchreceipe = async (Searchstring)=>{
 const response= await Axios.get(`https://api.edamam.com/search?q=${Searchstring}&app_id=${appida}&app_key=${APP_KEY}`
 );
 console.log(response);
 updatereceipelist(response.data.hits);
};

  const ontextChange = (event) => {
    clearTimeout(timeoutID);
  const timeout= setTimeout(() =>  Fetchreceipe(event.target.value), 500);
  updateTimeoutId(timeout);
  };
  return (
    <Container maxWidth = "lg">
      <Header>
        <Appname> 
        <Appicon src ="/burger.png" />
        Let's Go Receipe</Appname>
        <Searchbar>
          <Seachicon src ="/searching.png" />
         
          <SearcInput placeholder="Search Recipe" onChange={ontextChange} />
        </Searchbar>
      </Header>
      <ReceipeListcontainer>
        {receipeList.length ?
        receipeList.map((recipeobj) => (
          <ReceipeComponent recipeobj ={recipeobj.recipe} />
        )): <Placeholder src="burger.png"/>}
      </ReceipeListcontainer>
      
    </Container>
  );
}

export default App;
