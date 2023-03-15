import React, {useState} from "react";



const SignIn = ({setUser, setIsLoggedIn, setHasAccount }) =>{
   const [singInEmail, setSignInEmail] = useState(""); 
   const [singInPassword, setSignInPassword] = useState(""); 
   

    const handleSubmitSignIn= (e)=>{
        e.preventDefault(); 
        
        //CALL SERVER AND CHECK IF INFO WE RECIEVED FROM FORM IS OK WITH WHAT WE HAVE IN DB
        fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:singInEmail,password:singInPassword})
        })
            .then(res => res.json())
            //IF EVERYTHING OK, SERVER WILL SEND US DATA ABOUT USER SO WE CAN STORE HIM AND USE HIM LATER IN APP
            .then(data => {
                let user ={
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    entries: data.entries,
                    joined: data.joined
                };
                setUser(user)
                //LOGIN USER IF EVERYTHING WAS SUCCESSFULL
                 if (user.id){
                     setIsLoggedIn(true)
                 }
            })
       
    }
    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center" >
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email</label>
                        <input onChange={(e)=>setSignInEmail(e.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" >Password</label>
                        <input onChange={(e)=>setSignInPassword(e.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={handleSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                    <a  onClick={()=> setHasAccount(false)}className="f6 link dim black db mt5 pointer">Register</a>
                    </div>
                </form>
            </main>
        </article>
    );  
}
export default SignIn;