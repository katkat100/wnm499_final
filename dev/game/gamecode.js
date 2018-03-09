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

	var health = 100;
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

	// var crew = ["mem1", "mem2", "mem3", "mem4"];
	// var crewImage = ["crew1", "crew2", "crew3", "crew4
	var crew = [
		{
			name : "mem1",
			image : "crew1",
			death : "crewDeath1",
			health : 4,
			status : "alive"
		},
		{
			name : "mem2",
			image : "crew2",
			death : "crewDeath2",
			health : 4,
			status : "alive"
		},
		{
			name : "mem3",
			image : "crew3",
			death : "crewDeath3",
			health : 4,
			status : "alive"
		},
		{
			name : "mem4",
			image : "crew4",
			death : "crewDeath4",
			health : 4,
			status : "alive"
		}
	]

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

	function addWarning(text){
		$(".progressConsole").append("<p class='warning'>" + text + "</p>");
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

	function crewHealth(){
		var totalHealth = 0;
		for(var i = 0; i < crew.length; i++){
			if(crew[i]['health'] <= 0 && crew[i]["status"] == "alive"){
				theReaper(i);
			}
			if(crew[i]['status'] == "alive"){
				totalHealth += crew[i]["health"];
			}
		}

		health = (totalHealth / 16)*100;
		$("span.health").text(health);

		// c(health);
	}

	function theReaper(vic){
		crew[vic]["status"] = "dead";
		c(crew[vic]["name"] + " is dead");
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

	function DiceRoll(){
		diceOne = Math.ceil( ( Math.random() * 10) );
		c("Dice roll:" + diceOne);
	}
	var victimRoll;
	function painHappens(){
		victimRoll = Math.floor((Math.random() * crew.length));
		// c("victim " + victimRoll);
		if(crew[victimRoll]["status"] == "dead"){

			painHappens();
		} else{
			// var painRoll = Math.floor((Math.random() * 2)) + 1
			// c("pain " + painRoll);

			crew[victimRoll]["health"] -= 2;
			if(crew[victimRoll]["health"] <= 0){
				crew[victimRoll]["health"] = 0;
			}
			crewHealth();
			//scales from 1-2
		}

		
	}

	function encounterSituations(){
		var conDay = month + " " + day + ": ";
		switch(encounter){
			case 0:
				addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
			break;
			case 1://pirates
				addToConsole(conDay + "encounter 1");
			break;
			case 2://time warp
				addToConsole(conDay + "A disgruntled Spacetime Lord warps you back 3 days!");
				day -= 4;
				presentLocation -= blorpTravel['pace'];
				if(day < 1){
					if(month == 'April'){
						month = 'March';
						day = 31 + day;
					} else if(month == 'May'){
						month = 'April';
						day = 30 + day;
					} else if(month == 'June'){
						month = 'May';
						day = 31 + day;
					} else if(month == 'July'){
						month = 'June';
						day = 30 + day;
					} else if(month == 'August'){
						month = 'July';
						day = 31 + day;
					} else if(month == 'September'){
						month = 'August';
						day = 31 + day;
					} else if(month == 'October'){
						month = 'September';
						day = 30 + day;
					} else if(month == 'November'){
						month = 'October';
						day = 31 + day;
					} else if(month == 'Decmeber'){
						month = 'November';
						day = 30 + day;
					} else if(month == 'January'){
						month = 'December';
						day = 31 + day;
					} else if(month == 'February'){
						month = 'January';
						day = 31 + day;
					} else if(month == 'March'){
						month = 'February';
						day = 28 + day;
					}


					$("span.month").text(month);
					$("span.day").text(day);
				}
			break;
			case 3://black hole
				addToConsole(conDay + "encounter 3");
			break;
			case 4://pigeon
				addToConsole(conDay + "Oh No! Space Pigeons were found in your food bay and they ate EVERYTHING! Now all you have to eat is pigeon meat.");
				gameobj['food'] = 100;
				gameSpans('food');
				//change food icon to pigeon for funsies
			break;
			case 5://sickness
				DiceRoll();
				painHappens();
				

				if(diceOne <= 3){
					addWarning(conDay + crew[victimRoll]["name"] + " gets the rumbly tummy. They lose 2 health.");
				} else if (diceOne > 3 && diceOne <= 6){
					addWarning(conDay + crew[victimRoll]["name"] + " gets Icky-Sicky Disease. They lose 2 health.");
				} else {
					addWarning(conDay + crew[victimRoll]["name"] + " falls and hurts themselves because they worked too hard. They lose 2 health.");
				}
				

				//dysentery, measles, exhaustion
			break;
			case 6://weasels
				addToConsole(conDay + "encounter 6");
			break;
			case 7://thief
				addToConsole(conDay + "encounter 7");
			break;
			case 8://broken body part
				addToConsole(conDay + "encounter 8");
			break;
			case 9:
				addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
			break;
			case 10:
				addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
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
		crew[0]["name"] = $("input[name=crewOne]").val();
		crew[1]["name"] = $("input[name=crewTwo]").val();
		crew[2]["name"] = $("input[name=crewThree]").val();
		crew[3]["name"] = $("input[name=crewFour]").val();

		c("crew1: " + crew[0]['name']);
		c("crew2: " + crew[1]['name']);
		c("crew3: " + crew[2]['name']);
		c("crew4: " + crew[3]['name']);
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

		

		if(crew[0]["status"] == "dead" && crew[1]["status"] == "dead" && crew[2]["status"] == "dead"  && crew[3]["status"] == "dead"){
			addWarning("everyone is dead");
		} else{
			
			encounter = 5;
			encounterSituations();
		}
		for(var i = 0; i < crew.length; i++){
			c(crew[i]["name"] + ": " + crew[i]["health"]);
		}
	});

	













	//ideas
	//create a tombstone epitaph




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

	$("span.health").text(health);
	
})