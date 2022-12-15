const pos = 1;

let contadorPosts = 15;

const morePostsBtn = document.querySelector("#morePosts");

// LIMITO LA CANTIDAD DE POST

  fetch(`http://localhost:3000/posts?_pos=${pos}&_limit=${contadorPosts}`)
    .then((response) => response.json())
    .then((data) => listPosts(data));

  morePostsBtn.onclick = function(){
    fetch(`http://localhost:3000/posts?_pos=${pos}&_start=${contadorPosts}&_limit=15`)
  .then((response) => response.json())
  .then((data) => listPosts(data));
  contadorPosts += 15;
  }

  // window.onscroll = function() {scroll()};
  // function scroll() {
  //   let scroll = 500
  //   if (document.body.scrollTop > scroll || document.documentElement.scrollTop > scroll) {
  //     fetch(`http://localhost:3000/posts?_pos=${pos}&_limit=${contadorPosts}`)
  //     .then((response) => response.json())
  //     .then((data) => listPosts(data));
  //   }
  //   scroll +=1000;
  // }

  function listPosts(data) {
    let div = document.createElement("div");
    let cont = 0;
    data.forEach((post) => {
      listPost(post, cont, div);
      cont++;
    });
  }
  
//RENDERIZAR POST EN DIV
function  listPost(post, cont, div) {
  let content = document.getElementById("card-post");
  // console.log(cont)
  if (cont < 99) {
    div.className = "row";
    div.innerHTML +=
      `<div class="col-lg-4 col-md-6 col-sm-12">
        <div role="button" class="card   border-dark mb-3  d-flex  m-auto my-2" >
          
          <div class="card-body position-relative cursor-pointer" data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" style="height: 52.4vh">

           <img src="https://picsum.photos/id/${post.id}/200/200 " class="card-img-top cursor-pointer blur" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${post.id}"> 
        
            <h5 class="card-title card__letters title__post" data-id="${post.id}">${post.title}</h5>
            <!-- <p class="card-text">${post.body}</p>-->
          </div>
        </div>
      </div>`
    ;
    content.appendChild(div);
  }
}
 //CLICK IMAGEN POST 
  document.addEventListener("click", function (e) {
    if (e.target.matches("[data-id]")) infoModal(e);
  });
 // INFO CORRECTA DEL POST EN EL MODAL

 async function fetchPost(post) {
    return await fetch(`http://localhost:3000/posts/${post}`);
  }
  
  function infoModal(e) {
    fetchPost(e.target.dataset.id)
      .then((response) => response.json())
      .then((post) => modalContent(post));
  }
  async function fetchPost(post) {
    return await fetch(`http://localhost:3000/posts/${post}`);
  }

  // fetch("http://localhost:3000/users")
  // .then((response)=>response.json())
  // .then((data) => data.forEach(e => console.log(e.name)))

  // fetch("http://localhost:3000/comments/postID/3")
  // .then((response)=>response.json())
  // .then((data) => console.log(data))
let dataId;
let autor;
const bodyEdit = document.querySelector("#edit-body");
const titleEdit = document.querySelector("#edit-title");
  
  function modalContent(post) {
    document.querySelector(".modal-title").textContent = post.title;
    document.querySelector(".modal-body").textContent = post.body;
    document.querySelector("#edit-button").dataset.post = post.id;
    document.querySelector("#edit-button-icon").dataset.post = post.id;
    document.querySelector("#confirm-edit").dataset.edit = post.id;
    document.querySelector("#confirm-edit-icon").dataset.edit = post.id;
    document.querySelector("#confirm-delete").dataset.delete = post.id;
    document.querySelector("#confirm-delete-icon").dataset.delete = post.id;
    document.querySelector("#show-comments").dataset.comments = post.id;
    document.querySelector("#show-comments-icon").dataset.comments = post.id;
    document.querySelector("#comments").classList.remove("show");
    fetch(`http://localhost:3000/users/${post.userId}`)
  .then((response)=>response.json())
  .then((data) => userNameEmail(data)
  )
  dataId = post.id;
  autor = post.userId
  bodyEdit.textContent = post.body;
  titleEdit.value = post.title;
  }

  function userNameEmail(e){
    document.querySelector("#modalUsername").textContent = e.name
    document.querySelector("#modalUserEmail").textContent = e.email
  }
  
  document.addEventListener( "click", function(e){
    if(e.target.matches("[data-comments]")) viewComments(e.target.dataset.comments)
   
 })

 function viewComments(post){
 fetch(`http://localhost:3000/posts/${post}/comments/`)
 .then((response) => response.json())
 .then((comments) => {
   readComments(comments);
 })
}
function readComments(comments){
 let element = document.getElementById("comments");
    element.innerHTML = '<h3 class="text-center">Comments</h3>';
    comments.forEach((comment) => {
      element.innerHTML += `<div class="card card-body d-flex flex-row">
      <div>
      <div><b>${comment.name}</b></div>
      <div class="comment__body">${comment.body}</div>
      <div><i>${comment.email}</i></div>
      </div>
    </div>`;
    });
  }


  const confirmSuprimir = document.querySelector("#confirm-delete-icon");

  confirmSuprimir.onclick = ()=>{
    fetch(`http://localhost:3000/posts/${dataId}`, { method: 'DELETE'})
    .then(document.location.reload(true));
  }

  const confirmEdit = document.querySelector("#confirm-edit");

  const edited = " (Edited)"

  confirmEdit.onclick = ()=> {
    
    fetch(`http://localhost:3000/posts/${dataId}`,{
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId:autor, id:dataId, body: bodyEdit.value, title: titleEdit.value + edited })
    })
    .then(document.location.reload(true))}
    // bodyEdit.textContent = bodyEdit.value;
    // titleEdit.value = titleEdit.value;


//   fetch('http://localhost:3000/posts/16', {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ body: 'ññññ', title: 'ññññ' })
//  })
// .then(res => res.json())
// .then(res=> {
//       console.log(res);
// });