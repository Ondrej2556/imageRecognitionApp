

const Navigation = ({isLoggedIn}) =>{
        if (isLoggedIn){
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={(e) => { e.preventDefault(); window.location.reload();}} className="f3 link dim black underline pa3 pointer ">Sign Out </p>
                </nav>
            );
        }
}

export default Navigation