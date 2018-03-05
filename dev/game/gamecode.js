$(function(){
	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		money : 0
	};

	var captain = {
		job : "",
		name : ""
	};

	var crew = []; var crewImage = ["crew1", "crew2", "crew3", "crew4"];

	var month = '';
	var day = 1;

//shortcut functions
	function c(print){
		console.log(print);
	}

	function toggleClasses(target, targetClass){
		$(target).addClass(targetClass).siblings().removeClass(targetClass);
	}


//functions




//job
	$(".job-farmer").on('click',function(){
		toggleClasses(this, "active");
	})

	$(".job-engineer").on('click', function(){
		toggleClasses(this, "active");
	})

	$(".job-moneybags").on('click', function(){
		toggleClasses(this, 'active');
	})

	$("#setUp-profession .setUp-button").on('click',function(){
		if($("#setUp-profession .active").hasClass("job-farmer")){
			captain["job"] = "farmer";
			gameobj["money"] = 1000;
		} else if($("#setUp-profession .active").hasClass("job-engineer")){
			captain["job"] = "engineer";
			gameobj["money"] = 1500;
		} else if($("#setUp-profession .active").hasClass("job-moneybags")){
			captain["job"] = "moneybag";
			gameobj["money"] = 2000;
		} else {

		}
		c("job " + captain["job"]);
		c("money " + gameobj["money"]);
	})

//name
	$("#setUp-name .setUp-button").on('click',function(){
		captain['name'] = $("input[name=captain]").val();
		c("captain " + captain['name']);
	});

//crew
	$("#setUp-crew .setUp-button").on('click',function(){
		crew[0] = $("input[name=crewOne]").val();
		crew[1] = $("input[name=crewTwo]").val();
		crew[2] = $("input[name=crewThree]").val();
		crew[3] = $("input[name=crewFour]").val();

		c("crew: " + crew);
	});

//month
	$("#setUp-month li").on('click', function(){
		toggleClasses(this, "active");
	})

	$("#setUp-month .setUp-button").on('click', function(){
		if($("#setUp-month .active").children(".month-choice").hasClass("april")){
			month = "April";
		} else if($("#setUp-month .active").children(".month-choice").hasClass("may")){
			month = "May";
		} else if($("#setUp-month .active").children(".month-choice").hasClass("june")){
			month = "June";
		} else if($("#setUp-month .active").children(".month-choice").hasClass("july")){
			month = "July";
		} else {

		}
		c("month: " + month);
	});

//shop
	$().on('click', function(){

	});
	
})