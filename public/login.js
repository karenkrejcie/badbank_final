function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail]       = React.useState('');

  //keep the context so we don't have to keep hitting the DB
  const [myUser, setMyUser] = React.useContext(UserContext);

  function handleLogin(){

    //This path is handled in /index.js and then /dal.js
    const url = `/account/login/${email}/${password}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();
      console.log(JSON.stringify(data));
      //If there was an error in finding the user login information:
      if (data.Error == 0) {
        setStatus('No user found. Please try again.');
        
    } else {
       //Set context if successful
       setStatus('');
       setMyUser(data);
       
       setShow(false);
        
    } 
      })();
  }    
   
  function SubmitButton () {
    if (password && email){
      return <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleLogin}>Login</button>
    };
  }


  return (
    <Card
      bgcolor="primary"
      header="Login"
      status={status}
      body={show ? (  
              <>Email<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
                <SubmitButton/>
              </>
            ):(
              <>
              <h5>Welcome, {myUser.name}!</h5>
              <p>How can we serve you today at Bad Bank?</p>
              </>
            )}
    />
  )  
}
