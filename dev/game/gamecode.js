$(function(){
	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		money : 0
	};
	var gameobjLimit = {
		food : 1000,
		fuel : 1000,
		ammo : 50
	};

	var health = 4;
	var totalHealth = 0;
	var ration = "filling";
	var pace = "steady";
	var blorpTravel = {
		slow : 1,
		steady : 2,
		fast : 4
	}

	var captain = {
		job : "",
		name : "",
		image : "",
	};

	// var crew = ["mem1", "mem2", "mem3", "mem4"];
	// var crewImage = ["crew1", "crew2", "crew3", "crew4
	var crew = [
		{
			name : "mem1",
			image : "crew1",
			health : 4,
			status : "alive"
		},
		{
			name : "mem2",
			image : "crew2",
			health : 4,
			status : "alive"
		},
		{
			name : "mem3",
			image : "crew3",
			health : 4,
			status : "alive"
		},
		{
			name : "mem4",
			image : "crew4",
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

	var traderTitle = ["Space Voyager", "Hitchhiker", "Galaxy Vagabond", "Ex-Pirate", "Regional Space Liason", "Technician", "Dynamic Space Wanderer", "Lost"];
	var traderName = ["Bobbert", "Baltazar", "Hosanna", "Huxley", "Ivar", "Nevin", "Caess", "Sourdrop", "Aut", "Ophelia", "Titania", "Astrid", "Urman", "Nani", "Jata", "Quinn"];
	var tradeItems = [
		{one:'10 meals', two:'§50', add:'10', to:'food', minus:'50', from:'money'},
		{one:'20 meals', two:'§60', add:'20', to:'food', minus:'60', from:'money'},
		{one:'20 meals', two:'§70', add:'20', to:'food', minus:'70', from:'money'},
		{one:'30 meals', two:'70 fuel pods', add:'30', to:'food', minus:'70', from:'fuel'},

		{one:'100 fuel pods', two:'§60', add:'100', to:'fuel', minus:'60', from:'money'},
		{one:'200 fuel pods', two:'§100', add:'200', to:'fuel', minus:'100', from:'money'},
		{one:'300 fuel pods', two:'120 meals', add:'300', to:'fuel', minus:'120', from:'food'},

		{one:'2 energy shots', two:'20 meals', add:'2', to:'ammo', minus:'20', from:'food'},
		{one:'5 energy shots', two:'30 meals', add:'5', to:'ammo', minus:'30', from:'food'},
		{one:'3 energy shots', two:'§220', add:'3', to:'ammo', minus:'220', from:'money'},
	]
	var barName = ['Uemyrea', 'Linola', 'Hystise', 'Airiene', 'Pela', 'Voloya', 'Jozane', 'Boozyad', 'Ukhgahr', 'Squxuoss', 'Kuarcax', 'Algaxath', 'Kruogg', 'Baeff', 'Vizzag', 'Wriz', 'Hues', 'Pydh'];

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

	function addEmphasis(text){
		$(".progressConsole").append("<p class='emphasis'>" + text + "</p>");
		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});
	}

	function togClass(h,s){
		$(h).hide();
		$(s).show();
	}

	function hideMain(){
		$(".sidebar-left").hide();
		$(".sidebar-right").hide();
		$(".displayWindow").hide();
	}

	function showMain(){
		$(".sidebar-left").show();
		$(".sidebar-right").show();
		$(".displayWindow").show();
	}

	function changeImages(linkOne, linkTwo){
		$(".display-captain").css('background-image', 'url(../images/' + linkOne + '.svg)');
		$(".display-obstacle").css('background-image', 'url(../images/' + linkTwo + '.svg)');
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

	function deadCrew(){
		addWarning("Everyone has died. What is a captain without a crew at their side?");
		addToConsole("Shall we try again?");
		togClass(".basic-options", ".restart");
	}

	function crewHealth(){
		totalHealth = 0;
		health = 0;
		for(var i = 0; i < crew.length; i++){
			if(crew[i]['health'] <= 0 && crew[i]["status"] == "alive"){
				theReaper(i);
			}
			if(crew[i]['status'] == "alive"){
				totalHealth += crew[i]["health"];
				health++;
			}
		}

		// health = (totalHealth / 4);
		$("span.health").text(health);

		// c(health);
	}

	function theReaper(vic){
		crew[vic]["status"] = "dead";
		c(crew[vic]["name"] + " is dead");

		var deadCrewMem;

		for(var i = 0; i < crew.length; i++){
			if(crew[i]['status'] == "dead"){
				deadCrewMem++;
			}
		}
		if(deadCrewMem >= crew.length){
			deadCrew();
		}
		
	}

	function updateTime(){
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
		} else if(month == "February" && day > 28){
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

	function updateRation(){
		var ffp = 0;
		if(ration == "bare"){
			fpp = 1;
			c("bare");
		} else if(ration == "meager"){
			fpp = 2;
			c("meager");
		} else if(ration == "filling"){
			fpp = 4;
			c("filling");
		}
		c("first food" + gameobj['food']);
		crewHealth();
		gameobj['food'] -= fpp * (totalHealth / 4);
		gameSpans('food');
		c("food" + gameobj['food']);

		if(gameobj['food'] <= (ffp * health) && gameobj['food'] > 0){
			addToConsole("A crew member warns you that food is getting low. It's advisable to trade for food.");
		} else if(gameobj['food'] <= 0){
			gameobj['food'] = 0;
			$("span.food").text(gameobj['food']);
			addWarning("Warning! You have run out of food. Captain " + captain['name'] + ", if you continue to travel without food your crew members may die.");
			var hungryDice = Math.ceil( ( Math.random() * 10) );
			c("hungry: " + hungryDice)
			if(hungryDice == 5 || hungryDice == 3){
				painHappens();
				if(crew[victimRoll]["status"] == "alive"){
					addWarning(month + " " + day + ": " + crew[victimRoll]['name'] + " gets hurt from hunger. They lose 2 health.");

					changeImages("captain-unhappy", crew[victimRoll]['image'] + "-hurt");
				}else if(crew[victimRoll]["status"] == "dead"){
					addWarning(month + " " + day + ": " +  crew[victimRoll]["name"] + " died.")
					changeImages("captain-unhappy", crew[victimRoll]['image'] + "-death");
				}
				encounter = 20;
			}
		}
	}

	var doubleFuel = false;
	var extraFuel = 1;
	var fuelUsage;
	function updatePace(){
		if(doubleFuel){
			extraFuel = 2;
			c("double Fuel!");
		} else if (!doubleFuel){
			extraFuel = 1;
		}

		if(pace == "slow"){
			fuelUsage = 5 * extraFuel;
		} else if(pace == "steady"){
			fuelUsage = 12 * extraFuel;
		} else if(pace == "fast"){
			fuelUsage = 24 * extraFuel;
		}
		gameobj['fuel'] -= fuelUsage;
		gameSpans('fuel');

		presentLocation = presentLocation + parseInt(blorpTravel[pace]);

		if(gameobj['fuel'] < (fuelUsage * 2) && gameobj['fuel'] > fuelUsage){
			addToConsole("Fuel is getting low try trading for more fuel or adjusting the pace.")

		} else if(gameobj['fuel'] <= fuelUsage && gameobj['fuel'] > 0){
			addWarning("You are running very low on fuel.");
		} else if(gameobj['fuel'] <=0){
			gameobj['fuel'] = 0;
			$("span.fuel").text(gameobj['fuel']);
			addWarning("Warning! You have run out of fuel. Attempt to trade for fuel or drift helplessly through space.");
			$(".travel").css({'pointerEvents':'none','opacity':'.5'});
			encounter = 20;

		}

	}


	function encounterDice(){
		var diceOne, diceTwo, diceThree, ranEnDice;
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		diceThree = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo || ranEnDice == diceThree){
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

	var toBeThrow = 0;
	var throwTotal = 0;
	var throwRemain = 0;
	var thiefFood = 100;
	function encounterSituations(){
		var conDay = month + " " + day + ": ";
		switch(encounter){
			case 0:
				addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
				changeImages("captain-normal","ship-" + captain['job']);
			break;
			case 1://pirates
				addWarning(conDay + "ARRRRRRRGH! Pirates have stormed the ship! They demand §100 or else! What shall you do Captain " + captain['name'] + "!?");
				togClass(".basic-options", '.pirate-options');
				changeImages("captain-shock", "pirate");
			break;
			case 2://time warp
				addToConsole(conDay + "A disgruntled Spacetime Lord warps you back 3 days!");
				day = parseInt(day - 4);
				// c(blorpTravel[pace]);
				presentLocation = parseInt(presentLocation - blorpTravel[pace]);
				// c(presentLocation);
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
				changeImages("captain-sick", "");
			break;
			case 3://black hole
				addToConsole(conDay + "Your ship has been caught in a black holes' gravitational pull! You must shed some weight to escape unscathed.");
				hideMain();
				$(".blackHole-container").show();
				togClass(".basic-options", ".blackHole-options")

				$(".blackHole-options .throw-away").css({
					"pointerEvents" : "none", "opacity" : "0.5"
				})

				toBeThrow = (Math.floor(Math.random() * 50) + 1) * 10;
				c(toBeThrow);
				throwRemain = toBeThrow;

				$("span.to-throw").text(toBeThrow);
				$("span.throw-total").text(throwTotal);
				$("span.throw-left").text(throwRemain);
			break;
			case 4://pigeon
				addToConsole(conDay + "Oh No! Space Pigeons were found in your food bay and they ate EVERYTHING! Now all you have to eat is pigeon meat.");
				gameobj['food'] = 100;
				gameSpans('food');

				changeImages("captain-angry", "pigeons");

				//change food icon to pigeon for funsies
			break;
			case 5://sickness
				painHappens();

				if(crew[victimRoll]["status"] == "alive"){
					addWarning(conDay + crew[victimRoll]["name"] + " gets Icky-Sicky Disease. They lose 2 health.");
					changeImages("captain-unhappy", crew[victimRoll]["image"] + "-sick");
				}else if(crew[victimRoll]["status"] == "dead"){
					addWarning(conDay + crew[victimRoll]["name"] + " died of Icky-Sicky Disease.")
					changeImages("captain-sad", crew[victimRoll]["image"] + "-death");
				}

			break;
			case 6://weasels
				if(captain['job'] != "moneybags"){
					painHappens();
					if(crew[victimRoll]["status"] == "alive"){
						addWarning(conDay + crew[victimRoll]["name"] + " get attcked by the resident hitchhiking weasel! They lose 2 health.");
						changeImages("captain-unhappy", crew[victimRoll]["image"] + "-hurt");
					}else if(crew[victimRoll]["status"] == "dead"){
						addWarning(conDay + crew[victimRoll]["name"] + " died from a weasel attack.")
						changeImages("captain-sad", crew[victimRoll]["image"] + "-death");
					}
				} else {
					addToConsole(conDay + "You travel " + blorpTravel[pace] + " blorps.");
					changeImages("captain-normal","ship-" + captain['job']);
				}
			break;
			case 7://thief
				if(gameobj['food'] >= 100){
					thiefFood = 100;
				} else {
					thiefFood = gameobj['food'];
				}
				addToConsole(conDay + "A thief has been found trying to make off with " + thiefFood + " meals.");
				addToConsole("Captain " + captain['name'] + ", will you stop this thief?");
				togClass('.basic-options', '.thief-options');
				changeImages("captain-angry", "thief");
			break;
			case 8://broken body part
				painHappens();
				if(crew[victimRoll]["status"] == "alive"){
					addWarning(conDay + crew[victimRoll]['name'] + " broke a bone. They lose 2 health.");
					changeImages("captain-unhappy", crew[victimRoll]["image"] + "-hurt");
				}else if(crew[victimRoll]["status"] == "dead"){
					addWarning(conDay + crew[victimRoll]["name"] + " died from a broken bone.")
					changeImages("captain-sad", crew[victimRoll]["image"] + "-death");
				}
			break;
			case 9://sickness
				painHappens();
				if(crew[victimRoll]["status"] == "alive"){
					addWarning(conDay + crew[victimRoll]["name"] + " gets the Rumbly Tum Tum Sickness. They lose 2 health.");
					changeImages("captain-unhappy", crew[victimRoll]["image"] + "-sick");
				}else if(crew[victimRoll]["status"] == "dead"){
					addWarning(conDay + crew[victimRoll]["name"] + " died from a rumbly tummy.")
					changeImages("captain-sad", crew[victimRoll]["image"] + "-death");
				}
			break;
			case 10://sickness
				painHappens();
				if(crew[victimRoll]["status"] == "alive"){
					addWarning(conDay + crew[victimRoll]["name"] + " gets Nasty Feeling Disease. They lose 2 health.");
					changeImages("captain-unhappy", crew[victimRoll]["image"] + "-sick");
				}else if(crew[victimRoll]["status"] == "dead"){
					addWarning(conDay + crew[victimRoll]["name"] + " died froma Nasty Feeling Disease.")
					changeImages("captain-sad", crew[victimRoll]["image"] + "-death");
				}
			break;
				
		}

		if(encounter != 1 && encounter != 3){
			// location();
		}

		encounter = 0;
	}

	function blackHoleObjects(){
		foodInput = $("input[name = 'throw-food']").val();
		fuelInput = $("input[name = 'throw-fuel']").val();

		foodThrown = foodInput * 10;
		fuelThrown = fuelInput * 50;

		if(foodThrown > gameobj['food']){
			addToConsole("You don't have enough food for that.");
			$("input[name = 'throw-food']").val(0);
			foodInput = $("input[name = 'throw-food']").val()
			foodThrown = foodInput * 10;
		}

		if(fuelThrown > gameobj['fuel']){
			addToConsole("You don't have enough fuel pods for that.");
			$("input[name = 'throw-fuel']").val(0);
			fuelInput = $("input[name = 'throw-fuel']").val()
			fuelThrown = fuelInput * 50;
		}

		throwTotal = foodThrown + fuelThrown;
		throwRemain = toBeThrow - throwTotal;

		if(throwRemain < 0){
			throwRemain = 0;
		}

		$("span.throw-total").text(throwTotal);
		$("span.throw-left").text(throwRemain);

		if(throwRemain == 0){
			$(".throw-away").css({
				"pointerEvents" : "auto", "opacity" : "1"
			})
		} else {
			$(".throw-away").css({
				"pointerEvents" : "none", "opacity" : "0.5"
			})
		}
	}

	function location(){
		if(presentLocation >= stopLocations[0] && pastLocation == 0){
			c("yayayayayay local one");
			addEmphasis(month + " " + day + ": " + "You have neared the first location. Captain " + captain['name'] + ", will you touch down or keep travelling?");
			togClass(".basic-options",".locationOne-options");

			$(".pass").on('click', function(){
				togClass(".locationOne-options",".basic-options");
				addToConsole("You have decided to not touch down at this location.")

				pastLocation = 1
				presentLocation = 25;
			})

			$(".touchDown").on('click', function(){
				addToConsole(month + " " + day + ": " + "Touched down on the planet X.");
				addToConsole("What would you like to do while here?");
				$(".sidebar-left").hide();
				$(".sidebar-right").hide();
				$(".displayWindow").hide();

				togClass(".locationOne-options",".planetX");
			})
		} else if(presentLocation >= stopLocations[1] && pastLocation == 1){
			c("yayayayayay local two")

			addEmphasis(month + " " + day + ": " + "You have neared Nebula Y which is known for being a pirate hangout. Going around the nebula will use double the amount of fuel but will be much safer. Captain " + captain['name'] + " what will you do?");
			togClass(".basic-options", ".locationTwo-options");

			pastLocation = 2
			presentLocation = 55;
		} else if(presentLocation >= stopLocations[2] && pastLocation == 2){
			c("yayayayayay local three")
			doubleFuel = false;
			addEmphasis(month + " " + day + ": " + "You have reached the end of the nebula. Things seem to have returned to normal. You can feel that THX-11 is close.");

			pastLocation = 3
			presentLocation = 70;
		} else if(presentLocation >= stopLocations[3] && pastLocation == 3){
			c("yayayayayay done")

			addEmphasis(month + " " + day + ": " + "You see your new home coming closer and your crew gathers around the windows to take their first look.")

			togClass('.basic-options', '.locationEnd-options');

			pastLocation = 4
			presentLocation = 100;
		} else{
			encounterSituations();
		}
	}

	function barPerson(barPerson){
		nameNum = (Math.floor((Math.random() * $(barName).length + 1))) - 1;
		$("span" + barPerson + "-name").text(barName[nameNum]);
		// $(".img-" + barPerson).css({"backgroundImage" : "../images/" + "you" + ".svg"})
		$(barPerson).data({
			name: nameNum,
			image : "you",

		})
	}

	

	function trade(traderNum){
		titleNum = (Math.floor((Math.random() * $(traderTitle).length + 1))) - 1;
		nameNum = (Math.floor((Math.random() * $(traderName).length + 1))) - 1;
		itemNum = (Math.floor((Math.random() * $(tradeItems).length + 1))) - 1;
		$("." + traderNum + " .trader-title").text(traderTitle[titleNum]);
		$("." + traderNum + " .trader-name").text(traderName[nameNum]);
		$("." + traderNum + " .first-item").text(tradeItems[itemNum].one);
		$("." + traderNum + " .second-item").text(tradeItems[itemNum].two);

		$("." + traderNum).data({
			add: tradeItems[itemNum].add,
			minus: tradeItems[itemNum].minus,
			addTo: tradeItems[itemNum].to,
			minusFrom: tradeItems[itemNum].from
		})
	}

	function tradeItem(traderNum){
		c($(traderNum).data("minusFrom"));
		c(gameobj[$(traderNum).data("minusFrom")]);
		c($(traderNum).data("minus"));
		if(gameobj[$(traderNum).data("minusFrom")] >= $(traderNum).data("minus") ) {
			gameobj[$(traderNum).data("addTo")] += parseInt($(traderNum).data("add"));
			gameobj[$(traderNum).data("minusFrom")] -= parseInt($(traderNum).data("minus"));
			$("span." + $(traderNum).data("addTo")).text(gameobj[$(traderNum).data("addTo")]);
			$("span." + $(traderNum).data("minusFrom")).text(gameobj[$(traderNum).data("minusFrom")]);
		} else if(gameobj[$(traderNum).data("minusFrom")] < $(traderNum).data("minus")){
			c("trade unavailable");
			$(traderNum).addClass("overpriced");
		}else{
			c("uhhh");
		}
	}





//job
	$(".job-farmer").on('click',function(){
		captain["job"] = "farmer";
		gameobj["money"] = 1000;
		budget = gameobj["money"];
		setUpMove();
	})

	$(".job-engineer").on('click', function(){
		captain["job"] = "engineer";
		gameobj["money"] = 1500;
		budget = gameobj["money"];
		setUpMove();
	})

	$(".job-moneybags").on('click', function(){
		captain["job"] = "moneybags";
		gameobj["money"] = 2000;
		budget = gameobj["money"];
		setUpMove();
	})

	c("job " + captain["job"]);
	c("money " + gameobj["money"]);
	$("span.money").text(gameobj["money"]);

//name
	$("input[name=captain]").on('input',function(){
		$(this).css({"color": "#FFE387"});
	})
	$("#setUp-name .setUp-button").on('click',function(){
		captain['name'] = $("input[name=captain]").val();
		c("captain " + captain['name']);
		setUpMove();
	});
	$("input[name=captain]").on('click', function(){
		if($("input[name=captain]").val() == "Capitano"){
			$("input[name=captain]").val("");
		}
	})

//crew
	$("input[name=crewOne]").on('input',function(){
		$(this).css({"color": "#FFE387"});
	})
	$("input[name=crewTwo]").on('input',function(){
		$(this).css({"color": "#FFE387"});
	})
	$("input[name=crewThree]").on('input',function(){
		$(this).css({"color": "#FFE387"});
	})
	$("input[name=crewFour]").on('input',function(){
		$(this).css({"color": "#FFE387"});
	})
	$("input[name=crewOne]").on('click',function(){
		if( $(this).val() == "Clemence" ){
			$(this).val("");
		}
	})
	$("input[name=crewTwo]").on('click',function(){
		if( $(this).val() == "Parnell" ){
			$(this).val("");
		}
	})
	$("input[name=crewThree]").on('click',function(){
		if( $(this).val() == "Oswyn" ){
			$(this).val("");
		}
	})
	$("input[name=crewFour]").on('click',function(){
		if( $(this).val() == "Gilbert" ){
			$(this).val("");
		}
	})
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
	$(".month-choice.april").on('click', function(){
		month = "April";
		setUpMove();
	})
	$(".month-choice.may").on('click', function(){
		month = "May";
		setUpMove();
	})
	$(".month-choice.june").on('click', function(){
		month = "June";
		setUpMove();
	})
	$(".month-choice.july").on('click', function(){
		month = "July";
		setUpMove();
	})
	c("month: " + month);

//shop

	var numFood = 0; numFuel = 0; numAmmo = 0;
	var shopBill = 0;
	var budget = 0;
	// var budget = 2000;
	var shopTotal = 0;

	$("#setUp-b4Shop .setUp-button").on('click', function(){
		setUpMove();
		shopTotal = gameobj['money'];
		$("span.bill").text(shopBill);
		$("span.total").text(shopTotal);
		gameSpans('money');
	})

	

	function updateBill(){
		shopBill = (10 * numFood) + (20 * numFuel) + (20 * numAmmo);
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
			gameobj['food'] = numFood * 20;
			gameobj['fuel'] = numFuel * 60;
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

		trade("tradeOne");
		trade("tradeTwo");
		trade("tradeThree");

		crewHealth();

		changeImages("captain-normal", 'ship-' + captain["job"])

		$("span.ration").text(ration);
		$("span.pace").text(pace);
			
	})

//game
	// var bar = 100;
	// $(".inventory").mouseenter(function(){
	// 	var foodBar = bar*(gameobj['food']/gameobjLimit['food']);
	// 	var fuelBar = bar*(gameobj['fuel']/gameobjLimit['fuel']);
	// 	var ammoBar = bar*(gameobj['ammo']/gameobjLimit['ammo']);
	// 	$(".inven.food .bar").animate({width: foodBar});
	// 	$(".inven.food .full-bar").animate({width: bar - foodBar});
	// 	$(".inven.fuel .bar").animate({width: fuelBar});
	// 	$(".inven.fuel .full-bar").animate({width: bar - fuelBar});
	// 	$(".inven.ammo .bar").animate({width: ammoBar});
	// 	$(".inven.ammo .full-bar").animate({width: bar - ammoBar});
	// 	// $(".inventory span").animate({opacity: 0});
	// })

	// $(".inventory").mouseleave(function(){
	// 	$(".inven.food .bar").animate({width: 0});
	// 	$(".inven.food .full-bar").animate({width: 0});
	// 	$(".inven.fuel .bar").animate({width: 0});
	// 	$(".inven.fuel .full-bar").animate({width: 0});
	// 	$(".inven.ammo .bar").animate({width: 0});
	// 	$(".inven.ammo .full-bar").animate({width: 0});
	// 	// $(".inventory span").animate({opacity: 1});
	// })

//trading
	var tradeNoTrade = "Trade was attempted."
	$(".option.trade").on('click',function(){
		hideMain();
		$(".basic-options").hide();
		togClass(".progressConsole-container", ".trade-options");
		$('.trade-container').show();
	})
	$(".tradeOne").on("click",function(){
		tradeItem(this);

		tradeNoTrade = "Trade was made."
	});
	$(".tradeTwo").on("click",function(){
		tradeItem(this);

		tradeNoTrade = "Trade was made."
	});
	$(".tradeThree").on("click",function(){
		tradeItem(this);

		tradeNoTrade = "Trade was made."
	});

	$(".trade-options .no-trade").on('click', function(){
		showMain();
		$(".basic-options").show();
		togClass(".trade-options", ".progressConsole-container");
		$('.trade-container').hide();
		updateTime();
		addToConsole(month + " " + day + ": " + tradeNoTrade);

		tradeNoTrade = "Trading was attempted."
	})

//pirates
	$("body").on('click', '.attack', function(){
		var attackChance = 6;

		if(ration == 'bare'){
			attackChance = 9;
		} else {
			attackChance = 6;
		}
		if(gameobj['ammo'] > 0){
			DiceRoll();
			if(diceOne >= attackChance){
				addToConsole("Their gunslinging was no match for yours! The defeated pirates run back to their ship.");
				gameobj['ammo']--;
				$("span.ammo").text(gameobj['ammo']);
				togClass(".pirate-options", ".basic-options");
				changeImages("captain-happy", "pirate-scared");
			} else {
				if(gameobj['money'] >= 100 && gameobj['food'] >= 50){
					addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take §100 and 50 meals.");
					gameobj['money'] -= 100;
					gameobj['food'] -= 50;
					gameSpans('food');
					gameSpans('money');
				} else if(gameobj['money'] < 100 && gameobj['food'] < 50){
					addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take all your money and food.");
					gameobj['money'] = 0;
					gameobj['food'] = 0;
					gameSpans('food');
					gameSpans('money');
				} else if(gameobj['money'] < 100 && gameobj['food'] >= 50){
					addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take all your money and 50 meals.");
					gameobj['money'] = 0;
					gameobj['food'] -= 50;
					gameSpans('food');
					gameSpans('money');
				} else if(gameobj['money'] >= 100 && gameobj['food'] < 50){
					addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take §100 and all of your food.");
					gameobj['money'] -= 100;
					gameobj['food'] = 0;
					gameSpans('food');
					gameSpans('money');
				}
				togClass(".pirate-options", ".basic-options");
			}
		} else{
			addToConsole("You have no ammo! Are you going to bluff your way through or give in.");
			togClass('.pirate-options','.pirate-bluff-options');
		}
	})//end of attack
	$('.bluff').on('click', function(){
		DiceRoll();
		if(diceOne >= 7){
			addToConsole("The pirates believed your bluff and cautiously return to their ship.");
			togClass(".pirate-bluff-options", '.basic-options');
			changeImages("captain-happy", "pirate-scared");
		} else {
			if(gameobj['money'] >= 200){
				addToConsole("The pirates see through your bluff and take §200");
				gameobj['money'] -= 200;
				gameSpans('money');
			} else {
				addToConsole("The pirates see through your bluff and take all your money");
				gameobj['money'] = 0;
				gameSpans('money');
			}
			togClass(".pirate-bluff-options", '.basic-options');
		}
	})//end of bluff

	$('.giveUp').click('on', function(){
		if(gameobj['money'] >= 100){
			addToConsole("You give in to their demands and they take §100.");
			gameobj['money'] -= 100;
		} else{
			addToConsole("You give in to their demands and they take all your money.");
			gameobj['money'] = 0;
		}
		gameSpans('money');
		togClass(".pirate-options", ".basic-options");
	})

//thief
	$(".shoot").on('click', function(){
		if(gameobj['ammo'] > 0){
			DiceRoll();
			if(diceOne > 5){
				addToConsole("You successfully scared off the thief.");
				gameobj['ammo']--;
				gameSpans('ammo');
				changeImages("captain-happy", "thief-fail");
			} else {
				addToConsole("You missed the thief and they got off the ship with " + thiefFood + " meals.");
				gameobj['food'] -= thiefFood;
				gameSpans('food');
				changeImages("captain-unhappy", "thief-success");
			}
		} else {
			addToConsole("You have no ammo so the thief made off with " + thiefFood + " meals.");
			gameobj['food'] -= thiefFood;
			gameSpans('food');
			changeImages("captain-unhappy", "thief-success");
		}
		togClass(".thief-options", '.basic-options');
	})
	$(".no-shoot").on('click', function(){
		addToConsole("You let the thief go with " + thiefFood + " meals. Maybe this will give you good karma for later on.");

		gameobj['food'] -= thiefFood;
		gameSpans('food');
		togClass(".thief-options", '.basic-options');
		changeImages("captain-normal", "thief-success");

	})

//blackhole
	$("input[name = 'throw-food']").on('input',function(){
		blackHoleObjects();
	});

	$("input[name = 'throw-fuel']").on('input',function(){
		blackHoleObjects();
	});

	$(".throw-away").on('click', function(){
		gameobj['food'] -= foodInput * 10;
		gameobj['fuel'] -= fuelInput * 10;

		gameSpans('food');
		gameSpans('fuel');

		addToConsole("You were able to escape the pull of gravity!");

		togClass(".blackHole-options", ".basic-options");
		showMain();
		$(".blackHole-container").hide();

		//reset
		$("input[name = 'throw-food']").val(0);
		$("input[name = 'throw-fuel']").val(0);
		throwTotal = 0;
		throwRemain = 100;
	})

	$(".giveIn").on("click", function(){
		DiceRoll();
		if(diceOne >= 8){
			addToConsole("You made it out of the gravitational pull alive with a little hard work and a lot of luck.");
			changeImages("captain-happy", "ship-" + captain['job']);

		} else {
			painHappens();
			if(crew[victimRoll]["status"] == "alive"){
				addWarning(crew[victimRoll]['name'] + " was hurt in the attempt to get out of the gravitational pull.");
				changeImages("captain-unhappy", crew[victimRoll]['image'] + "-hurt");
			}else if(crew[victimRoll]["status"] == "dead"){
				addWarning(month + " " + day + ": " + crew[victimRoll]["name"] + " died in the struggle.");
				addToConsole("Well that's one way of losing some weight.");
				changeImages("captain-unhappy", crew[victimRoll]['image'] + "-death");
			}
		}

		togClass(".blackHole-options", ".basic-options");
			showMain();
		$(".blackHole-container").hide();

		//reset
		$("input[name = 'throw-food']").val(0);
		$("input[name = 'throw-fuel']").val(0);
		throwTotal = 0;
		throwRemain = 100;
	})

//Planet X
	$(".planetX .takeOff").on("click", function(){
		updateTime();

		addToConsole(month + " " + day + ": " + "Leaving the planet X.");
		$(".sidebar-left").show();
		$(".sidebar-right").show();
		$(".displayWindow").show();

		togClass(".planetX",".basic-options");

		pastLocation = 1
		presentLocation = 25;
		c("past location: " + pastLocation);
		c("present location: " + presentLocation);

	});

	$(".planetX .bar").on('click', function(){
		togClass(".planetX", ".bar-container");
		$(".bar-options").show();
		updateTime();
		addToConsole(month + " " + day + ": " + "You enter the local bar.");

	})
	


	$(".planetX .trade").on('click', function(){
		togClass(".progressConsole-container", ".trade-options-planetX");
		togClass(".planetX", ".trade-container");
	})

	$(".trade-options-planetX .no-trade").on('click', function(){
		togClass(".trade-options-planetX", ".progressConsole-container");
		togClass(".trade-container", ".planetX");

		updateTime();
		addToConsole(month + " " + day + ": " + tradeNoTrade);

		tradeNoTrade = "Trading was attempted."
	})

//bar
	var barFoodCount = 0;
	var barFoodAnnoyCount, barTalkAnnoyCount;
	var barGossipCount = 0;
	var barAnnoyance = 0;
	var barTalkCount = 0;

	$(".bar-food").on('click', function(){

		switch(barFoodCount){
			case 0:
			addToConsole("You order some food handing over §10 to pay.");
			gameobj["money"] -= 10;
			gameobj['food'] += 1;
			break;
			case 1:
			addToConsole("You order another meal set for §10.");
			gameobj['money']-= 10;
			gameobj['food'] += 1;
			break;
			case 2:
			addToConsole("As you order your third meal you can see that the bartender is getting annoyed at you for ordering, Three. Seperate. Meals.");
			gameobj['money'] -= 10;
			gameobj['food'] += 1;
			break;
			case 3:
			addToConsole("You order your fourth meal and it is delivered to you with much annoyance.");
			gameobj['money'] -= 10;
			gameobj['food'] += 1;
			barAnnoyance ++;
			break;
			case 4:
			addToConsole("Your fifth meal comes with a slam on the table and a sudden price increase.");
			gameobj['money'] -= 20;
			gameobj['food'] += 1;
			barAnnoyance++;
			$("span.barFood-cost").text("20")
			break;
			case 5:
			addToConsole("You try to order a sixth meal but the bartender says they will no longer serve you.");
			$(".bar-food").addClass("void");

			barAnnoyance += 2;
			break;
		}
		gameSpans("money");
		gameSpans("food");


		barFoodCount++;
		c(barAnnoyance);
	});

	$(".bar-gossip").on('click', function(){
		c("hello");
		barGossipAnnoyCount = barGossipCount + barAnnoyance;
		c(barGossipAnnoyCount);
		c(barAnnoyance);
		c(barGossipCount);
		if(barGossipAnnoyCount < 4){
			switch(barGossipAnnoyCount){
				case 0:
				addToConsole("You listen in on your bar mates as they talk about their job.");
				break;
				case 1:
				addToConsole("You lean in close to get a better listen on your bar mates conversation but you see them lean a bit away. You can still here them complaining about their job.");
				barAnnoyance++;
				break;
				case 2:
				addToConsole("You lean very close to your bar mates and they notice you eavesdropping. They leave and snitch on you to the hostess.");
				barAnnoyance +=2;
				break;
				case 3:
				addToConsole("There is no one around you to eavesdrop on.");

				$(".bar-gossip").addClass("void");
				break;
			}
		} else {
			addToConsole("No one wants to sit next to you. It seems you have annoyed the whole bar.");
			if(!$(".bar-gossip").hasClass("void")){
				$(".bar-gossip").addClass("void");
			}
		}

		barGossipCount++;
	});

	$(".bar-talk").on('click', function(){
		barTalkAnnoyCount = barTalkCount + barAnnoyance;
		switch(barTalkAnnoyCount){
			case 0:
				addToConsole("You make small talk with your bar mate.");
				bar
			break;

		}
	});

	$(".leave-bar").on('click', function(){
		togClass(".bar-container", ".planetX");
		$(".bar-options").hide();
		if(gameobj['fuel'] > fuelUsage){
			$(".travel").css({'pointerEvents':'initial','opacity':1})
		}
	});

	function barTalk(){//work on this do something like 3 options: order food, listen to gossip, talk to somebody. Ordering food is kind of expensive but will add to your total food. Listening in will create a risk of getting caught and people not sitting next to you to hear more gossip and will raise the talking risk. Everytime you talk to somebody you raise the risk of offending someone. If reach "10" then no one talks to you and when you leave the bar you cant go back.
		DiceRoll();

		if(diceOne == 1){
			addToConsole("Your new friend tells you a great joke and you bond together over other jokes.");
		} else if(diceOne == 2){
			addToConsole("They talk about their days problems and after their rant they thank you for listening by giving you 50 meals");
			gameobj['food'] += 50;
			$("span.food").text(gameobj['food']);
		} else if(diceOne == 3){
			addToConsole("You dare them to make a bet with you on the outcome of the flounder races.");
			addToConsole("You won! They give you §100 as your winnings.");
			gameobj['money'] += 100;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 4){
			addToConsole("You dare them to make a bet with you on the outcome of the flounder races.");
			addToConsole("You lost! That's embarassing! You give them §100 as their winnings.");
			gameobj['money'] -= 100;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 5){
			addToConsole("You buy your new friend a drink and local bar food.");
			addToConsole("The Barkeep slides your drinks and a spongy purple substance, that you assume to be local grub, towards you.")
			gameobj['money'] -= 10;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 6){
			painHappens();
			addWarning(crew[victimRoll]['name'] + " offends " + $(this).data('name') + "and gets punched. They lose 2 health.");
			if(crew[victimRoll]["status"] == "dead"){
				addWarning(conDay + crew[victimRoll]["name"] + " died.")
			}
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 7){
			addToConsole("After a few minutes the conversation trails off and you sit in a stew of uncomfortable silence");
		} else if(diceOne == 8){
			addToConsole("You get along well with this random stranger you've sat down with.");
		} else if(diceOne == 9 || diceOne == 10){
			addToConsole("You find out that " + $(this).data("name") + " knows Aunt Frale. What a small world!");
		} else{
			// addToConsole($(this).data("name") + " seems like a good person. You wonder if they would join you on your journey.");
			// if(crew.length < 4){
			// 	addToConsole($(this).data("name") + " agrees to join you on your journey.");

			// 	var newMember = {
			// 		name : $(this).data("name"),
			// 		image : $(this).data("image"),
			// 		death : $(this).data("death"),
			// 		health : 4,
			// 		status : "alive"
			// 	}

			// 	$(crew).merge(crew, newMember);

			// 	// crewHealth();
			// 	c(crew);
			// 	health = $(crew).length;
			// 	$("span.health").text(health);

			// } else if(crew.length >= 4){
			// 	addToConsole("Too bad there's no room in your ship for another person.");
			// }
		}
	}

//Nebula Y
	$(".go-through").on('click', function(){
		togClass(".locationTwo-options", ".basic-options");
		addToConsole("You decide to brave the Nebula and its pirates.")
	})
	$(".go-around").on('click', function(){
		doubleFuel = true;
		togClass(".locationTwo-options", ".basic-options");
		addToConsole("You decide to take a safer route and go around the dangerous Nebula.");
	})

//pace and ration
	$(".para.ration").on("click", function(){
		if(ration == "filling"){
			ration = "meager";
		} else if(ration == "meager"){
			ration = "bare";
		} else if(ration == "bare"){
			ration = "filling";
		}
		$("span.ration").text(ration);
	})

	$(".para.pace").on('click', function(){
		if(pace == "fast"){
			pace = "steady";
		} else if(pace == "steady"){
			pace = "slow";
		} else if(pace == "slow"){
			pace = "fast";
		}
		$("span.pace").text(pace);
	})

//travel
	$(".travel").on('click', function(){
		updateTime();
		encounterDice();


		updateRation();
		updatePace();

		//trade updates daily
		trade("tradeOne");
		trade("tradeTwo");
		trade("tradeThree");
		

		if(pastLocation == 2 && !doubleFuel){
			c("pirates?");
			DiceRoll();
			if(diceOne > 6){
				encounter = 1;
				c("encounter: " + encounter);
			}
		}
		
		
		c("encounter: " + encounter);
		if(crew[0]["status"] == "dead" && crew[1]["status"] == "dead" && crew[2]["status"] == "dead"  && crew[3]["status"] == "dead"){
			deadCrew();
		} else{
			
			// encounter = 3;
			// encounterSituations();
			location();
		}
		// for(var i = 0; i < crew.length; i++){
		// 	c(crew[i]["name"] + ": " + crew[i]["health"]);
		// }
		// c(blorpTravel[pace]);
		c("present location: " + presentLocation);
		// c(pastLocation)
	});

	
	

	$(".restartGame").on('click', function(){
		location.reload();
	})












	//ideas
	//create a tombstone epitaph




	gameobj['food'] = 2000;
	gameobj['fuel'] = 2000;
	gameobj['ammo'] = 10;
	gameobj['money'] = 2000;
	// gameobj['food'] = 280;
	// gameobj['fuel'] = 1148;
	// gameobj['ammo'] = 21;
	// gameobj['money'] = 0;
	gameSpans('food');
	gameSpans('fuel');
	gameSpans('ammo');
	gameSpans('money');

	month = "March";
	$("span.month").text(month);
	$("span.day").text(day);

	$("span.health").text(health);


// captain['name'] = 'Rodger';
captain['job'] = "farmer";
//end
	$(".land").on('click', function(){
		togClass('.spaceScreen-container', ".home-container");
		$("span.captain-name").text(captain['name']);

		crewHealth();

		// totalHealth = 1;

		var pFood = gameobj["food"] / 10;
		var pAmmo = gameobj["ammo"] / 2;
		var pFuel = gameobj['fuel'] / 10;
		var pMoney = gameobj["money"] / 5;
		var pHealth = (totalHealth / 4) * 200;

		var pSubtotal = pFood + pAmmo + pFuel + pMoney + pHealth;
		var JobBenefit = 0;

		c("food points: " + pFood);
		c("ammo points: " + pAmmo);
		c("fuel points: " + pFuel);
		c("money points: " + pMoney);
		c("health points: " + pHealth);

		c("subtotal points: " + pSubtotal);

		if(captain['job'] == "farmer"){
			JobBenefit = 3;
		} else if(captain['job'] == "engineer"){
			JobBenefit = 2;
		} else if(captain['job'] == "moneybags"){
			JobBenefit = 1;
		}

		c("job JobBenefit: " + JobBenefit)

		var pTotal = Math.floor(pSubtotal * JobBenefit);
		c(pTotal);

		$("span.end-points").text(pTotal);
	})
	
})