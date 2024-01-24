var app = angular.module('webApplication', ['ui.mask']);
app.run(function ($rootScope) { });
app.controller("Controller", function ($scope) {
    
    $scope.data={};
    $scope.data.plan = "arcade";
    $scope.data.planDuration = 'monthly';
    $scope.addOn={};
    $scope.plan={};

    $scope.steps = [
        {id:"1", item1:"Step 1", item2:"Your info"},
        {id:"2", item1:"Step 2", item2:"Select plan"},
        {id:"3", item1:"Step 3", item2:"Add-ons"},
        {id:"4", item1:"Step 4", item2:"Summary"}
    ];

    $scope.plans = [
        {id:"arcade", name:"Arcade", monthlyPrice:9, yearlyPrice:90},
        {id:"advanced",name:"Advanced", monthlyPrice:12, yearlyPrice:120},
        {id:"pro",name:"Pro", monthlyPrice:15, yearlyPrice:150}
    ];

    $scope.addOns = [
        {id:"onlineService", name:"Online service", monthlyPrice:1,yearlyPrice:10 },
        {id:"largerStorage",name:"Larger storage", monthlyPrice:2,yearlyPrice:20},
        {id:"customProfile",name:"Customizable Profile", monthlyPrice:2,yearlyPrice:20},
    ];

    $scope.activeStep = $scope.steps[0];

    $scope.setActive = function(step, form) {
        if($scope.thankYou) return
        let index = $scope.steps.indexOf(step);
        $scope.thankYou = false;
        if(index !== 0){
            $scope.otherStep = true;
        }
        if(form.$valid){
            $scope.activeStep = step;
            if(index === 3){
                $scope.totalSum = finishUp();
            }
        }
    }

    $scope.selectedAddOnItem = function(item) {
        return $scope.addOnItems.indexOf(item.id) !== -1;
    }

    function finishUp(){
            //get selected obj from $scope.plans
            let selectedPlan = $scope.plans.find(o => o.id === $scope.data.plan);
            let addOnPrice = 0;
            let planPrice = 0;
            let a = [];
            if($scope.data.planDuration == "monthly"){
                planPrice = selectedPlan.monthlyPrice;
            }else{
                planPrice = selectedPlan.yearlyPrice;
            }
            if(Object.keys($scope.addOn).length > 0){
                // add-on obj to array
                $scope.addOnItems = Object.keys($scope.addOn).filter(key => $scope.addOn[key]);
                //get selected obj(s) from $scope.addOns and sum up price
                $scope.addOnItems.forEach((item) => {
                    let addOn = ($scope.addOns.find(o => o.id ==item));
                    if($scope.data.planDuration == "monthly"){
                        addOnPrice += addOn.monthlyPrice  
                    }else{
                        addOnPrice += addOn.yearlyPrice 
                    }
                });
                return planPrice + addOnPrice;
            }
            return planPrice;
            
    }

    $scope.next = function(step, form){
        $scope.clickNext = true;
        if(form.$valid){
            let index = $scope.steps.indexOf(step);
            $scope.activeStep = $scope.steps[index+1];
            if(index === 2){
                $scope.totalSum = finishUp();
            }
        }
     }

     $scope.back = function(step){
        let index = $scope.steps.indexOf(step);
        $scope.activeStep =  $scope.steps[index-1];
     }

     $scope.confirm = function(){
        // $scope.activeStep = false;
        $scope.thankYou = true;
     }

     $scope.selectPlan = function(id){
        document.querySelectorAll(".plan-card").forEach(
            el =>el.classList.remove("selected")
        );
        document.querySelector(`#${id}> input`).checked = true;
        document.getElementById(id).classList.add("selected");
        $scope.data.plan = id;
     }

     $scope.toggleCheck = function(category, id){
        if(document.querySelector(`#${id}> input`).checked){
            document.querySelector(`#${id}> input`).checked = false;
            document.getElementById(id).style.backgroundColor ="#fff";
            document.getElementById(id).style.border ="1px solid #d9d8dd";
            category[id] = false;
            console.log(category)
        }else{
            document.querySelector(`#${id}> input`).checked = true;
            document.getElementById(id).style.backgroundColor ="#f8f9fe";
            document.getElementById(id).style.border ="1px solid #352ebb";
            category[id] = true;
            console.log(category);
        }
     }

    
})
