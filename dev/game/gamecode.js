$(function(){
	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		money : 0
	};
	var gameobjLimit = {
		food : 500,
		fuel : 500,
		ammo : 50
	};
	var ration = "filling";
	var pace = "quick";
	var blorpTravel = {
		slow : 1,
		moderate : 2,
		quick : 4,
		fast : 8
	}

	var captain = {
		job : "",
		name : ""
	};

	var crew = ["mem1", "mem2", "mem3", "mem4"];
	var crewImage = ["crew1", "crew2", "crew3", "crew4"];

	var month = '';
	var day = 1;

	var presentLocation = 0;
	var stopLocations = [25, 55, 70, 100];
	var pastLocation = 0;
	var encounter = 0;

//shortcut functions
	function c(print){
		console.log(print);
	}

	function toggleClasses(target, targetClass){
		$(target).addClass(targetClass).siblings().removeClass(targetClass);
	}

	function addToConsole(text){
		$(".progressConsole").append("<p>" + text + "</p>");
		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});
	}


//functions
	function gameSpans(object){
		$("span." + object).text(gameobj[object]);
	}

	var windowHeight = $(window).height();
	var baseCard = windowHeight;
	var moveCard = 0;
	var setUpEnd = false
	function setUpMove(){
		moveCard +=baseCard;
		$(".card-container").animate({
			top : -moveCard
		}, 700, function(){
			if(setUpEnd == true){
				$('.setUp-container').hide();
				$('.spaceScreen-container').show();
			}
		})
	}

	function upadateTime(){
		day++;
		if(month == "April" && day > 30){
			month = "May";
			day = 1;
		} else if(month == "May" && day > 31){
			month = "June";
			day = 1;
		} else if(month == "June" && day > 30){
			month = "July";
			day = 1;
		} else if(month == "July" && day > 31){
			month = "August";
			day = 1;
		} else if(month == "August" && day > 31){
			month = "September";
			day = 1;
		} else if(month == "September" && day > 30){
			month = "October";
			day = 1;
		} else if(month == "October" && day > 31){
			month = "November";
			day = 1;
		} else if(month == "November" && day > 30){
			month = "Decmeber";
			day = 1;
		} else if(month == "Decmeber" && day > 31){
			month = "January";
			day = 1;
		} else if(month == "January" && day > 31){
			month = "Febuary";
			day = 1;
		} else if(month == "Febuary" && day > 28){
			month = "March";
			day = 1;
		} else if(month == "March" && day > 31){
			month = "April";
			day = 1;
		}

		// c(day);
		// c(month);
		$("span.month").text(month);
		$("span.day").text(day);
	}


	function encounterDice(){
		var diceOne, diceTwo, ranEnDice;
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo){
			encounter = Math.ceil( ( Math.random() * 10) );
		}

		// c("One: " + diceOne + ", Two: " + diceTwo + ", Random Dice: " + ranEnDice);
	}

	function encounterSituations(){
		var conDay = month + " " + day + ": ";
		switch(encounter){
			case 0:
				addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
			break;
			case 1:
				addToConsole(conDay + "encounter 1");
			break;
			case 2:
				addToConsole(conDay + "encounter 2");
			break;
			case 3:
				addToConsole(conDay + "encounter 3");
			break;
			case 4:
				addToConsole(conDay + "encounter 4");
			break;
			case 5:
				addToConsole(conDay + "encounter 5");
			break;
			case 6:
				addToConsole(conDay + "encounter 6");
			break;
			case 7:
				addToConsole(conDay + "encounter 7");
			break;
			case 8:
				addToConsole(conDay + "encounter 8");
			break;
			case 9:
				addToConsole(conDay + "encounter 9");
			break;
			case 10:
				addToConsole(conDay + "encounter 10");
			break;
		}
		encounter = 0;
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
			setUpMove();
		} else if($("#setUp-profession .active").hasClass("job-engineer")){
			captain["job"] = "engineer";
			gameobj["money"] = 1500;
			budget = gameobj["money"];
			setUpMove();
		} else if($("#setUp-profession .active").hasClass("job-moneybags")){
			captain["job"] = "moneybag";
			gameobj["money"] = 2000;
			budget = gameobj["money"];
			setUpMove();
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
		setUpMove();
	});

//crew
	$("#setUp-crew .setUp-button").on('click',function(){
		crew[0] = $("input[name=crewOne]").val();
		crew[1] = $("input[name=crewTwo]").val();
		crew[2] = $("input[name=crewThree]").val();
		crew[3] = $("input[name=crewFour]").val();

		c("crew: " + crew);
		setUpMove();
	});

//month
	$("#setUp-month li").on('click', function(){
		toggleClasses(this, "active");
	})

	$("#setUp-month .setUp-button").on('click', function(){
		if($("#setUp-month .active").children(".month-choice").hasClass("april")){
			month = "April";
			setUpMove();
		} else if($("#setUp-month .active").children(".month-choice").hasClass("may")){
			month = "May";
			setUpMove();
		} else if($("#setUp-month .active").children(".month-choice").hasClass("june")){
			month = "June";
			setUpMove();
		} else if($("#setUp-month .active").children(".month-choice").hasClass("july")){
			month = "July";
			setUpMove();
		} else {

		}
		c("month: " + month);
	});

//shop

	$("#setUp-b4Shop .setUp-button").on('click', function(){
		setUpMove();
	})

	var numFood = 0; numFuel = 0; numAmmo = 0;
	var shopBill = 0;
	var budget = 0;
	// var budget = 2000;
	var shopTotal = 0;

	function updateBill(){
		shopBill = (20 * numFood) + (50 * numFuel) + (20 * numAmmo);
		shopTotal = budget - shopBill;
		$("span.bill").text(shopBill);
		$("span.total").text(shopTotal);

		c("food: " + numFood);
		c("fuel: " + numFuel);
		c("ammo: " + numAmmo);
		c("bill: " + shopBill);
	}

	$("input[name=shop-food]").on('change', function(){
		numFood = $("input[name=shop-food]").val();
		updateBill();
	})

	$("input[name=shop-fuel]").on('change', function(){
		numFuel = $("input[name=shop-fuel]").val();
		updateBill();
	})

	$("input[name=shop-ammo]").on('change', function(){
		numAmmo = $("input[name=shop-ammo]").val();
		updateBill();
	})

	$("#setUp-shop .setUp-button").on('click', function(){
		if(shopTotal >= 0){
			gameobj['food'] = numFood * 10;
			gameobj['fuel'] = numFuel * 50;
			gameobj['ammo'] = numAmmo * 5;
			gameobj['money'] = shopTotal;
			gameSpans('food');
			gameSpans('fuel');
			gameSpans('ammo');
			gameSpans('money');
			setUpMove();
		} else {
			$(".overSpent").show();
		}
		
	});

//setUp end
	$('#setUp-end').on('click', function(){
		setUpEnd = true;
		setUpMove();

	})

	//game
	var bar = 200;
	$(".inventory").mouseenter(function(){
		var foodBar = bar*(gameobj['food']/gameobjLimit['food']);
		var fuelBar = bar*(gameobj['fuel']/gameobjLimit['fuel']);
		var ammoBar = bar*(gameobj['ammo']/gameobjLimit['ammo']);
		$(".inven.food .bar").animate({width: foodBar});
		$(".inven.food .full-bar").animate({width: 200 - foodBar});
		$(".inven.fuel .bar").animate({width: fuelBar});
		$(".inven.fuel .full-bar").animate({width: 200 - fuelBar});
		$(".inven.ammo .bar").animate({width: ammoBar});
		$(".inven.ammo .full-bar").animate({width: 200 - ammoBar});
		// $(".inventory span").animate({opacity: 0});
	})

	$(".inventory").mouseleave(function(){
		$(".inven.food .bar").animate({width: 0});
		$(".inven.food .full-bar").animate({width: 0});
		$(".inven.fuel .bar").animate({width: 0});
		$(".inven.fuel .full-bar").animate({width: 0});
		$(".inven.ammo .bar").animate({width: 0});
		$(".inven.ammo .full-bar").animate({width: 0});
		// $(".inventory span").animate({opacity: 1});
	})


//travel
	$(".travel").on('click', function(){
		upadateTime();
		encounterDice();

		presentLocation = presentLocation + blorpTravel[pace];
		if(presentLocation >= stopLocations[0] && pastLocation == 0){
			c("yayayayayay local one")

			pastLocation = 1
			presentLocation = stopLocations[0];
		}



		// encounter = 0;
		encounterSituations();
		//move closer to location
		//roll dice for situation
	});

	

















	gameobj['food'] = 200;
	gameobj['fuel'] = 200;
	gameobj['ammo'] = 10;
	gameobj['money'] = 2000;
	gameSpans('food');
	gameSpans('fuel');
	gameSpans('ammo');
	gameSpans('money');

	month = "March";
	$("span.month").text(month);
	$("span.day").text(day);

	$("span.health").text(4);
	
})