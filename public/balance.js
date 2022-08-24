function Balance(){
  const [myUser, setMyUser] = React.useContext(UserContext); 
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


    //This path is handled in /index.js and then /dal.js
    const url = '/account/balance/' + myUser._id;
    
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();

      //If there was an error in finding the user login information:
      if (data.Error == 0) {
        setStatus('No user found. Please try again.');      
      } else {
       //Set context if successful
       setMyUser(data);        
      } 
    })();
  
  return(
      <Card
      txtcolor="black"
      header="Current USD Balance is:"
      title=""
      text=""
      body={
        <h3>${numberWithCommas(myUser.balance)}</h3>
      }
    />      
  );  
}