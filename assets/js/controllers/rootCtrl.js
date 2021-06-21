app.controller("rootCtrl", function ($scope, $http, $location) {

    $scope.registerForm = { name: "", profilephoto: "", gender: "", dob: "", aboutMe: "" };
    $scope.topicList = [{ topic_id: 1, topic_name: "Depression" }, { topic_id: 2, topic_name: "anxiety" }, { topic_id: 3, topic_name: "financial stress" }, { topic_id: 4, topic_name: "family stress" }, { topic_id: 5, topic_name: "sexual wellness" }, { topic_id: 6, topic_name: "alcohol abuse" }, { topic_id: 7, topic_name: "substance abuse" }, { topic_id: 8, topic_name: "bipolar disorder" }];
    $scope.selectedTopics = {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: "",
        eighth: ""
    }
    $scope.myTopic = {
        selected: {}
    };
    $scope.suggestedUserList = [];
    $scope.showRegisterForm = true;
    $scope.registerUser = function () {
        if ($scope.registerForm.name && $scope.registerForm.profilephoto && $scope.registerForm.gender && $scope.registerForm.dob && $scope.registerForm.aboutMe) {
            console.log(Date.parse($scope.registerForm.dob));
            if (isNaN(Date.parse($scope.registerForm.dob))) {
                $scope.errorMsg = "Please enter date of birth in the format of YYYY-MM-DD";
            } else {
                let registerObj = new Object();
                registerObj.name = $scope.registerForm.name;
                registerObj.profilePhoto = $scope.newFileName;
                registerObj.gender = $scope.registerForm.gender;
                registerObj.dob = $scope.registerForm.dob;
                registerObj.aboutMe = $scope.registerForm.aboutMe;

                $http.post('/api/user-details', registerObj)
                    .success(function (data, status, header, config) {
                        if (data) {
                            $scope.showRegisterForm = false;
                            $scope.userId = data.user_id;
                            //$location.path("/connect-users");
                        }
                    }).error(function (err) {
                        if (err) {
                            $scope.errorMsg = err.err.message;
                        }
                    });
            }
        } else {
            $scope.errorMsg = "Please fill all fields";
        }
    };


    $scope.selectProfilePhoto = function (file) {
        var myFile = file.files[0];
        $http({
            method: 'POST',
            url: "/api/uploadFile",
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function (data) {
                var fd = new FormData();
                fd.append('file', myFile);
                return fd;
            },
        }).success(function (data) {
            $scope.goalsFile = myFile;
            $scope.newFileName = data.FILE_NAME;
        }).error(function (error) {
            $scope.errorMsg = "Problem while selecting file.";
        });
    };


    $scope.saveTopics = function () {
        let topicFound = false;
        let reqObj = new Object();
        reqObj.user_id = $scope.userId;
        reqObj.user_topic = [];
        for (const property in $scope.selectedTopics) {
            if ($scope.selectedTopics[property]) {
                topicFound = true;
                reqObj.user_topic.push({ topic_id: $scope.selectedTopics[property] });
            }
        }
        if (topicFound) {
            $http.post('/api/user-topic', reqObj)
                .success(function (data, status, header, config) {
                    if (data) {
                        getSuggestedUsers();
                        $location.path("/connect-users");
                    }
                }).error(function (err) {
                    if (err) {
                        $scope.topicErrorMsg = err.err.message;
                    }
                });
        } else {
            $scope.topicErrorMsg = "Please select opics first.";
        }
    };

    function getSuggestedUsers() {
        $http.post('/api/users', { user_id: $scope.userId })
            .success(function (data, status, header, config) {
                if (data) {
                    $scope.suggestedUserList = data;
                }
            }).error(function (err) {
                if (err) {
                    $scope.userErrorMsg = err.err.message;
                }
            });
    };


    let colorArray = ['#2D8C1A', '#E54522', '#CEED09', '#087FF5', '#65F8F6']
    $scope.getRandomBG = function(){
        return colorArray[Math.floor(Math.random()*colorArray.length)];
    }

});
