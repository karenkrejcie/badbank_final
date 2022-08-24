function NavBar(){
  const [myUser, setMyUser] = React.useContext(UserContext); 

  return(
    <>

    {/*Only Display Welcome message if they are logged in or newly created*/}
    {!myUser._id ? (
      <></>
      ):<ul className="nav justify-content-end">
      <li className="nav-item">
          <a className="nav-link disabled">Welcome, {myUser.name} at {myUser.email}</a>
      </li>
    </ul> 
    }

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          
          {/*If the user isn't logged in*/}
          {!myUser._id ? (
            <>
                <li className="nav-item tool">
                  <a className="nav-link tool" href="#/CreateAccount/">Create Account</a>
                </li>
                  <li className="nav-item tool">
                  <a className="nav-link" href="#/login/">Login</a>
                </li>  
            </>
          ):
            <>
                <li className="nav-item tool">
                  <a className="nav-link" href="#/deposit/">Deposit</a>
                </li>
                <li className="nav-item tool">
                  <a className="nav-link" href="#/withdraw/">Withdraw</a>
                </li>
                <li className="nav-item tool">
                  <a className="nav-link" href="#/balance/">Balance</a>
                </li>
            </>
            }
            <li className="nav-item tool">
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li> 
        </ul>
        
      </div>
       {/*If the user is logged in*/}
      {myUser._id ? (
          <>
            <ul className="nav justify-content-end">
              <li className="nav-item tool">
                <a className="nav-link" href="#/logout/">Logout</a>
              </li>
            </ul>
          </>
        ):<></>}
      
    </nav>
    </>
  );
}