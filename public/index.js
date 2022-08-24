function Spa() {

  const [myUser, setMyUser] = React.useState('Default User');

 return (
    <HashRouter>
      <div>  
   
      <UserContextProvider>
        <NavBar/>
        <div className="container" style={{padding: "20px"}}>
          <Route exact path="/"         component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/login/"         component={Login} />
          <Route path="/deleteAll/"     component={DeleteAll} />
          <Route path="/deposit/"       component={Deposit} />
          <Route path="/withdraw/"      component={Withdraw} />
          <Route path="/balance/"       component={Balance} />
          <Route path="/alldata/"       component={AllData} />
          <Route path="/logout/"        component={Logout} />
          
        </div>
      </UserContextProvider>   

      </div>      
      </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);