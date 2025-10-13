const restPassTemp =(username,link)=>{
    return `
     <div>
        <h1>Hello ${username}</h1>
        <p>your password reset link is <a href="${link}" >Reset link</a></p>
     </div>
     `;
}

module.exports=restPassTemp;