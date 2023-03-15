import React, {useState} from "react";

const Register = ({setUser, setHasAccount, setIsLoggedIn}) =>{
    const [registerEmail, setRegisterEmail] = useState(""); 
    const [registerPassword, setRegisterPassword] = useState(""); 
    const [registerName, setRegisterName] = useState(""); 

    const handleSubmitRegister = (e) =>{
       e.preventDefault();
       
       //IF FORM DATA IS NOT EMPTY THEN USER WILL BE REGISTERED
       if(registerName !== "" && registerPassword !== "" && registerEmail !== ""){
        
        //CALLS SERVER AND GIVES DATA ABOUT NEW USER
        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email:registerEmail,password:registerPassword, name:registerName})
        })
            .then(res => res.json())
            //THEN STORE USER AS CURRENT USER TO ADD HIS LEVEL AND DISPLAY HIS PROFILE
            .then(data => {
                if (data){
                    let user ={
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        entries: data.entries,
                        joined: data.joined
                    };
                    setUser(user);
                    setIsLoggedIn(true);
                }
            })
    }else{
        console.log("YOU NEED TO FILL EVERY INPUT")
    }
      
    }
    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center" >
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Name</label>
                        <input onChange={(e)=>setRegisterName(e.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6">Email</label>
                        <input onChange={(e)=>setRegisterEmail(e.target.value)} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" >Password</label>
                        <input onChange={(e)=> setRegisterPassword(e.target.value)} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                    </fieldset>
                    <div className="">
                    <input onClick={handleSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    <a  onClick={()=> setHasAccount(true)}className="f6 link dim black db mt5 pointer">Back to Login</a>
                    </div>
                </form>
            </main>
        </article>
    );  
}
export default Register;