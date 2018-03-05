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
	function gameSpans(object){
		$("span." + object).text(gameobj[object]);
	}



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
			budget = gameobj["money"];
		} else if($("#setUp-profession .active").hasClass("job-engineer")){
			captain["job"] = "engineer";
			gameobj["money"] = 1500;
			budget = gameobj["money"];
		} else if($("#setUp-profession .active").hasClass("job-moneybags")){
			captain["job"] = "moneybag";
			gameobj["money"] = 2000;
			budget = gameobj["money"];
		} else {

		}
		c("job " + captain["job"]);
		c("money " + gameobj["money"]);
		$("span.money").text(gameobj["money"]);
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
	var numFood = 0; numFuel = 0; numAmmo = 0;
	var shopBill = 0;
	// var budget = 0;
	var budget = 2000;
	var shopTotal = 0;

	function updateBill(){
		shopBill = (20 * numFood) + (50 * numFuel) + (20 * numAmmo);
		shopTotal = budget - shopBill;
		$("span.bill").text(shopBill);
		$("span.total").text(shopTotal);
	}

	$("input[name=shop-food]").on('change', function(){
		numFood = $("input[name=shop-food]").val();
		updateBill();
		c("food: " + numFood);
		c("bill: " + shopBill);
	})

	$("input[name=shop-fuel]").on('change', function(){
		numFuel = $("input[name=shop-fuel]").val();
		updateBill();
		c("fuel: " + numFuel);
		c("bill: " + shopBill);
	})

	$("input[name=shop-ammo]").on('change', function(){
		numAmmo = $("input[name=shop-ammo]").val();
		updateBill();
		c("ammo: " + numAmmo);
		c("bill: " + shopBill);
	})

	$("#setUp-shop .setUp-button").on('click', function(){
		gameobj['food'] = numFood * 10;
		gameobj['fuel'] = numFuel * 50;
		gameobj['ammo'] = numAmmo * 5;
		gameobj['money'] = shopTotal;
		gameSpans('food');
		gameSpans('fuel');
		gameSpans('ammo');
		gameSpans('money');
	});
	
})