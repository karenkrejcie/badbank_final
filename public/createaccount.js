function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  
  //keep the context so we don't have to keep hitting the DB
  const [myUser, setMyUser] = React.useContext(UserContext);

  function validate(field, label){
      if (!field) {
        setStatus('Please provide your ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      else{
        if(password.length < 8){
          setStatus('Passwords must be at least 8 characters long');
          setTimeout(() => setStatus(''),3000);
          return false;
        }
      }
      return true;
  }

  function handleCreate(){
    //Submit clicked. Validate all data provided
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
   
    //passed validation so create the user in MongoDB users collection.  
    //This path is handled in /index.js and then /dal.js
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      var res  = await fetch(url);
      var data = await res.json();

      //Email address already registered?
      if (data.Error == 0) {
        setStatus('Email address already registered. Please login or use a different email address.');
        clearForm();
      } 
      else {
       //Set local and context if successful
       setName(data.name);
       setEmail(data.email);
       setStatus('');
       setMyUser(data);
       setShow(false);
      }
    })
    ();
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  function SubmitButton () {
    if (name || password || email){
      return <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
    } else {
      return <button type="submit" disabled className="btn btn-light" onClick={handleCreate}>Create Account</button>
    };
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>

              <SubmitButton/>
              
              </>
            ):(
              <>
              <h5>Your Account has been Successfully created</h5>
              <h6>User Name: {name}</h6>
              <h6>Email: {email}</h6>
              </>
            )}
    />
  )
};