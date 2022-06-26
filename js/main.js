const apiKey ='eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR2pGmmMJfL53BxRog3ai3uoUrlo2nCynnkjo2c37XBxFaBcO6dfIQXPJHI';

const nowPlayingURL='https://api.themoviedb.org/3/movie/now_playing';
const popularURL='https://api.themoviedb.org/3/movie/popular';
const topRatedURL='https://api.themoviedb.org/3/movie/top_rated';
const trendingURL='https://api.themoviedb.org/3/trending/all/day';
const upcomingURL='https://api.themoviedb.org/3/movie/upcoming';
let data=[];

function getMovies(category){
    var httpRequest = new XMLHttpRequest;
    httpRequest.open('GET',`${category}?api_key=${apiKey}`);
    httpRequest.send();
    httpRequest.addEventListener('readystatechange',function(){
        if(httpRequest.readyState==4){
            data = JSON.parse(httpRequest.response).results;  
            displayData();
        };
    })
};
getMovies(popularURL);

function displayData(){
    var moviesCollection=``;
    for(var i=0; i<data.length;i++){
        moviesCollection+=
        `
    <div class="col-md-4 my-3">
        <div class="movie-item position-relative overflow-hidden rounded">
            <img class="w-100 movie-image" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" alt="">
            
            <div class="movie-layer d-flex justify-content-center align-items-center text-center p-1">
                <div class="movie-info">
                    <h4>${data[i].original_title}</h4>
                    <p>${data[i].overview}</p>
                    <p>Rate :${data[i].vote_average}</p>
                    <p>${data[i].release_date}</p>
                </div>
            </div>
        
        </div>
    </div>
        `
    }
    document.getElementById('moviesList').innerHTML=moviesCollection;
};

$('#toggleIcon').click(function(){
    let currentWidth= $('.nav-menu').outerWidth();
   
    
    if($('nav').css('left')=='0px'){
        $('nav').animate({'left':-currentWidth},1000);
        $('#toggleIcon').addClass('fa-align-justify');
        $('#toggleIcon').removeClass('fa-times');
        $('.list-group li').addClass('moveingDown');
        $('.list-group li').removeClass('moveingUp');
        
    }
    else{
        $('nav').animate({'left':0},1000);
        $('#toggleIcon').removeClass('fa-align-justify');
        $('#toggleIcon').addClass('fa-times');
        $('.list-group li').removeClass('moveingDown');
        $('.list-group li').addClass('moveingUp');
        
        
    }
})

$('.item1 a').click(function(){
    getMovies(nowPlayingURL);
});
$('.item2 a').click(function(){
    getMovies(popularURL);
});
$('.item3 a').click(function(){
    getMovies(topRatedURL);
});
$('.item4 a').click(function(){
    getMovies(trendingURL);
});
$('.item5 a').click(function(){
    getMovies(upcomingURL);
});

function getMoviesSeach(e){
    var httpRequest = new XMLHttpRequest;
    httpRequest.open('GET',`https://api.themoviedb.org/3/search/movie?query=${e}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`);
    httpRequest.send();
    httpRequest.addEventListener('readystatechange',function(){
        if(httpRequest.readyState==4){
            data = JSON.parse(httpRequest.response).results;   
            displayData();
        };
    })
};
$('#searchName').keyup(function(){
    getMoviesSeach(this.value)
})
function getMovieWord(searchWord){
    var currentSearchWord = searchWord.toLowerCase();
    var moviesCol=``;
    for(var i=0; i<data.length;i++){
        var currentMovieTiltle =data[i].original_title.toLowerCase();
        
        if(currentMovieTiltle != '' && currentMovieTiltle.includes(currentSearchWord)){
            moviesCol+=
            `
        <div class="col-md-4 my-3">
            <div class="movie-item position-relative overflow-hidden rounded">
                <img class="w-100 movie-image" src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}" alt="">
                
                <div class="movie-layer d-flex justify-content-center align-items-center text-center p-1">
                    <div class="movie-info">
                        <h4>${data[i].original_title}</h4>
                        <p>${data[i].overview}</p>
                        <p>Rate :${data[i].vote_average}</p>
                        <p>${data[i].release_date}</p>
                    </div>
                </div>
            
            </div>
        </div>
            `
        }
        
    }
    document.getElementById('moviesList').innerHTML=moviesCol;
};

$('#searchWord').keyup(function(){
    getMovieWord(this.value);
})
let userName = document.getElementById("name"),
    userEmail = document.getElementById("email"),
    userPhone = document.getElementById("phone"),
    userAge = document.getElementById("age"),
    userPassword = document.getElementById("password"),
    userRePassword = document.getElementById("rePassword"),

    userNameAlert = document.getElementById("namealert"),
    userEmailAlert = document.getElementById("emailalert"),
    userPhoneAlert = document.getElementById("phonealert"),
    userAgeAlert = document.getElementById("agealert"),
    userPasswordAlert = document.getElementById("passwordalert"),
    userRepasswordAlert = document.getElementById("repasswordalert"),

    nameRejex =/^[a-zA-Z0-9]+$/,
    emailRejex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    phoneRejex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    ageRejex = /^[1-9][0-9]?$|^100$/,
    passwordRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

var userNameCheck = 0,
    userEmailCheck = 0,
    userPhoneCheck = 0,
    userAgeCheck = 0,
    userPasswordCheck = 0,
    userRePasswordCheck = 0,

    submitValidationCounter = userNameCheck+userEmailCheck+userPhoneCheck+userAgeCheck + userPasswordCheck + userRePasswordCheck;

function rejexValidation(rejexRule,ValidationTarget,alertTarget,check){
    if(rejexRule.test(ValidationTarget.value)){
        alertTarget.style.display = "none";
        check ==1;
    }
    else{
        alertTarget.style.display = "block";
        check ==0;
    }
}

userName.addEventListener("keyup", function(){
    rejexValidation(nameRejex,this,userNameAlert,userNameCheck);
    
}),userEmail.addEventListener("keyup", function(){
    rejexValidation(emailRejex,this,userEmailAlert);
}),userPhone.addEventListener("keyup", function(){
    rejexValidation(phoneRejex,this,userPhoneAlert);
}),userAge.addEventListener("keyup", function(){
    rejexValidation(ageRejex,this,userAgeAlert);
}),userPassword.addEventListener("keyup", function(){
    rejexValidation(passwordRejex,this,userPasswordAlert);
}),userRePassword.addEventListener("keyup", function(){
    if(userRePassword.value==userPassword.value){
        userRepasswordAlert.style.display = "none"
        userRePasswordCheck =1;
    }else{
        userRepasswordAlert.style.display = "block"
        userRePasswordCheck =0;
    }
    submitValidation();
});


function submitValidation(){
    if(userRePasswordCheck>0){
        document.getElementById("submitBtn").removeAttribute('disabled');
        
    }else{
        
        document.getElementById("submitBtn").disabled = 1;
    }
}
