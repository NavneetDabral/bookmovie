var app = angular.module('library' ,['ui.router','ngCookies']);
app.config(['$stateProvider', '$urlRouterProvider' ,function ($stateProvider,$urlRouterProvider ) {
   $urlRouterProvider.otherwise("/")
    $stateProvider
    .state('register',
      {
      url:"/register",
      templateUrl:"pages/adminlog.html",
      controller:"driverctrl"
      })
         .state('movies',
         {
           url:"/movies",
           templateUrl:"pages/movies.html",
           controller: "moviectrl"   
         })
       .state('dashboard',{      
               url: "/dashboard",
               templateUrl:"pages/dashboard.html",
               controller:function($scope,$cookies,$location,$http)
                   {
                       $scope.value=0;
        
              $scope.user=$cookies.get('user');
              console.log($scope.user);
              $scope.email=$cookies.get('email');
                       if($scope.user==undefined)
                           {
                               $scope.value=1;
                               $scope.mesg="please register"
                               
                           }
                       else{
                           console.log("jumbo");
                            $scope.value=2;
                           $scope.user=$cookies.get('user');
    $http.post("http://127.0.0.1:3036/mybooks/",{email:$scope.user}).then(function(res)
            {
            $scope.cat=res.data.data;
            $scope.booking=0;
             if($scope.cat==undefined)
                 {    $scope.booking=1;
                     $scope.mesg1="NO movies booked yet";
                 }
                console.log($scope.cat);
            })
                           
                       }
                       $scope.logout=function()
                       {
                            $cookies.remove('user');
                           $cookies.remove('email');
                        $location.url('/register');
                           
                           
                       }
                   }
    })
         .state('city',
        {
          url:"/cities",
          templateUrl:("pages/cities.html"),
          controller:"cityctrl"
        }) 
    
    .state('city.theater', {
            url: "city/theater?c_id",
              templateUrl: "pages/theater.html",
              controller:function($scope,$stateParams,$http)
           {
            $http.get("http://127.0.0.1:3036/gettheat/"+$stateParams.c_id).then(function(res)
            {
                $scope.cat=res.data.data;
                console.log($scope.cat);
            })
           }
          })
    
    .state('city.theater.show', {
            url: "/show?th_id",
              templateUrl: "pages/shows.html",
              controller:function($scope,$stateParams,$http)
           {
            $http.get("http://127.0.0.1:3036/getshow/"+$stateParams.th_id).then(function(res)
            {
                $scope.cat=res.data.data;
                console.log($scope.cat);
            })
           }
          })
    
     .state('city.theater.show.avail', {
            url: "/avail?sh_id",
              templateUrl: "pages/avail.html",
              controller:function($scope,$stateParams,$http,$cookies)
           {
            $http.get("http://127.0.0.1:3036/getavail/"+$stateParams.sh_id).then(function(res)
            {
                $scope.cat=res.data.data;
                console.log($scope.cat);
            })
            
            $scope.book=function(seat_no,screen_no,sh_id){
                 console.log(seat_no);
                 $scope.email=$cookies.get('email');
                $scope.user=$cookies.get('user');
                if($scope.user==undefined)
                    {
                        $scope.value=1;
                        $scope.mesg="please Register first";
                    }
                else{
                    $scope.user=$cookies.get('user');
        $http.post("http://127.0.0.1:3036/booking",{seat_no:seat_no,screen_no:screen_no,sh_id:sh_id,email:$scope.user}).then(function(res)
     {
        if(res.data.err==0)
        {
           $scope.value=1; 
             $scope.mesg=res.data.msg;
            console.log($scope.mesg);
            }
        if(res.data.err==1)
        {
             console.log("hello2");
            $scope.value=1;
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
     })
                    
                }
               
                
            }
           }
          })
    
    
    /*.state('city.theater.show.avail.book',{
            url: "/book?sh_id?seat_no?screen_no?email",
            templateUrl:"pages/conf.html",
  controller:function($scope,$stateParams,$http,$cookies,$location)
           {
               $scope.value=0;
               $scope.email=$cookies.get('email');
               $scope.user=$cookies.get('user');
               if($scope.user=undefined)
                   {
                   
                       $scope.value=1;
                       $scope.mesg="Please Register First";
                   }
                   
               else
                   { 
                       $http.get("http://127.0.0.1:3036/booking/",{params:{sh_id:$stateParams.sh_id,seat_no:$stateParams.seat_no,screen_no:$stateParams.screen_no,email:$stateParams.email}}).then(function(res)
            {
               if(res.data.err==0)
              {
              $scope.value=1; 
              $scope.mesg=res.data.msg;
            }
        if(res.data.err==1)
          {
             console.log("hello2");
            $scope.value=1;
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
            
                   })
           }
                   
          }
    })
    */
    
    
}]);
app.controller('driverctrl',function($scope, $http, $location,$cookies)
 {
 console.log("I am working");
    $scope.value=0;
$scope.regis=function()
{
    console.log("i am  inside driver");
     console.log($scope.reg);
    if( $scope.reg.passw===$scope.reg.cpass)
        {  
       $cookies.put('email',$scope.reg.email);
       $cookies.put('user',$scope.reg.name);        $http.post("http://127.0.0.1:3036/getdata",$scope.reg).then(function(res)
     {
        if(res.data.err==0)
        {
            $scope.value=1; 
             $scope.mesg=res.data.msg;
            $location.url("/dashboard");

            }
        if(res.data.err==1)
        {
             console.log("hello2");
            $scope.value=1;
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
     })
        }
    else
      {
   $scope.value=1;
          $scope.mesg="Password and Confirm password not matched";
    }
}
$scope.studsig=function()
{
    console.log("i am  inside of sign");
   console.log($scope.sign);
    $scope.value=0;
    $http.post("http://127.0.0.1:3036/signin",$scope.sign).then(function(res)
     {
        if(res.data.err==0)
        {
           $scope.value=1; 
             $scope.mesg=res.data.msg;
            $cookies.put('user',res.data.user);
            $cookies.put('email',res.data.email);
            $location.url('/dashboard');
            }
        if(res.data.err==1)
        {
             console.log("hello2");
            $scope.value=1;
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
     })
}
})    
app.controller('moviectrl',function($scope,$http)
              {
      $scope.movies={ };
    $http.get("http://127.0.0.1:3036/getmovie").then(function(res)
     {
        if(res.data.err==0)
        {
             console.log(res.data);
             $scope.movies=res.data.data;
            console.log($scope.movies);
            }
        if(res.data.err==1)
        {
             console.log("its an error");
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
     })

})
app.controller('cityctrl',function($scope,$http,)
              {
    $http.get("http://127.0.0.1:3036/getcity").then(function(res)
     {
        if(res.data.err==0)
        {
             console.log(res.data);
            $scope.cities=res.data.data;
            }
        if(res.data.err==1)
        {
             console.log("hello2");
            
            console.log(res.data.msg);
          $scope.mesg=res.data.msg;
        }
     })

})

/*app.controller('homectrl',function($scope,$http)
          { 
            console.log("controller is working");
          //request to get category list
            $scope.callme=function()
            {
                console.log("function is working");
         $http.get("http://localhost:3036/getdata").then(function(res)
           {
           $scope.mydata=res.data.data;
           console.log(res.data);
      })
            }
    })
    */