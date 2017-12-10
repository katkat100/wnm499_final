$(function(){
	$(".change-pace, .change-rations, .restart, .trading, .planetX, .local-trading, .local-chatting, .piratesOne, .piratesTwo, .blackHole, .throw-cont, .throw-giveCont").hide();
	function c(print){
		console.log(print);
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
	function oneDiceRoll(){
		diceOne = Math.ceil( ( Math.random() * 10) );
		c("Dice roll:" + diceOne);
	}
//variables
	// var player = [];
	var captainName = "";
	var captainJob = "";
	var crew = ["rachel","spencer", "marg", "thom"];

	var supplyCost = [
		fuel = 50,
		food = 20,
		ammo = 20,
		parts = 100
	];
	// var money = 0;
	var numOfParts = 0, numOfFuel = 0, numOfFood = 0, numOfAmmo = 0;
	var costOfItems = 0;
	var oldBillParts = 0, oldBillFuel = 0, oldBillFood = 0, oldBillAmmo = 0;
	var storeBill = 0;
	var storeTotal = 0;

	var startCounter = false;
	var counter = 0;

	var screenCount = 0;
	var docHeight = $("body").height();
	var mainMargin = 0;

	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		parts : 0,
		money : 0,

	}
	var pace = "quick";
	var paceOpt = ["stopped", "slow", "moderate", "quick", "fast"];
	var health = $(crew).length;
	var rations = "filling";
	// var food = 0;
	var ffp = 0;
	// var ammo = 0;
	// var parts = 0;
	// var fuel = 0;
	var fuelUsage = 0;
	var day = 1;
	// var month = "";

	var diceOne = 0;
	var diceTwo = 0;
	var ranEnDice = 0;
	var encounter = 0;

	var traderTitle = ["Space Voyager", "Hitchhiker", "Galaxy Vagabond", "Ex-Pirate"];
	var traderName = ["Bobbert", "Baltazar", "Hosanna", "Huxley", "Ivar", "Nevin", "Caess", "Sourdrop", "Aut"];
	var tradeItems = [
		{one:'10 meals', two:'§50', add:'10', to:'food', minus:'50', from:'money'},
		{one:'20 meals', two:'§60', add:'20', to:'food', minus:'60', from:'money'},
		{one:'20 meals', two:'§70', add:'20', to:'food', minus:'70', from:'money'},
		{one:'30 meals', two:'§70', add:'30', to:'food', minus:'70', from:'money'},

		{one:'100 fuel pods', two:'§60', add:'100', to:'fuel', minus:'60', from:'money'},
		{one:'200 fuel pods', two:'§100', add:'200', to:'fuel', minus:'100', from:'money'},
		{one:'300 fuel pods', two:'§120', add:'300', to:'fuel', minus:'120', from:'money'},

		{one:'2 energy shots', two:'20 meals', add:'2', to:'ammo', minus:'20', from:'food'},
		{one:'5 energy shots', two:'30 meals', add:'5', to:'ammo', minus:'30', from:'food'},
		{one:'3 energy shots', two:'§220', add:'3', to:'ammo', minus:'220', from:'money'},
	]
	var itemNum = 0;
	var nameNum = 0;
	var jobNum = 0;
	var traderNum = 0;
	var titleNum = 0;

	var locationGoal = 1;
	var locationOne = 25;
	var locationTwo = 55;
	var locationThree = 70;
	var locationEnd = 100;

	var ranNum = [0,1,2,3,4,5,6,7,8];
	
	var localJob = ['Hooman', 'Erutzanans', 'Teegafane', 'Vleslon', 'Dlahiri', 'Bosolians', 'TuVav', 'Swerzog', 'Catali', 'Heerians', 'Gorganub'];
	var localName = ['Uemyrea', 'Linola', 'Hystise', 'Airiene', 'Pela', 'Voloya', 'Jozane', 'Boozyad', 'Ukhgahr', 'Squxuoss', 'Kuarcax', 'Algaxath'];

	var doubleFuel = false;
	var extraFuel = 1;

	var toBeThrow = 100;
	var throwTotal = 0;
	var throwRemain = toBeThrow;
	var foodThrown = 0;
	var fuelThrown = 0;
	var foodInput = $("input[name = 'throw-food']").val();
	var fuelInput = $("input[name = 'throw-fuel']").val();

//function
	// function addJob(job){
	// 	captainJob = $.merge([],job);
	// 	console.log(player);
	// 	$("span.money").text(player[1]);
	// };

	function addMembers(num){
		var inputMember = $("input[name = " + num + "]").val();
		var name  = [num = inputMember];
		// player = $.merge(player,name);
		crew = $.merge([],name);
		c[crew];
	}
	function updateMonth(){
		// console.log(month);
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
		c("day:" + day);

		$("span.month").text(month);
		$("span.day").text(day);
	}

	function storeBilling(bill){
		storeBill -= bill;
		storeBill += costOfItems;
		storeTotal = gameobj['money'] - storeBill;
		console.log("bill: " + storeBill);
		console.log("total: " + storeTotal);
		$("span.bill").text(storeBill);
		$("span.total").text(storeTotal);
		if(storeTotal >= 0){
			$(".exitStore").show();
		} else if(storeTotal < 0){
			$(".exitStore").hide();
		}
	}
	
	

	function encounterSituations(){
		if(encounter == 0){
			$(".display-box").css({"backgroundImage":"url(../images/you.svg)"});
			//addToConsole("You travel a days worth");
			if(pace == "slow"){
				addToConsole(month + " " + day + ": You travel 10 blorps");
			} else if(pace == "moderate"){
				addToConsole(month + " " + day + ": You travel 25 blorps");
			} else if(pace == "quick"){
				addToConsole(month + " " + day + ": You travel 50 blorps");
			} else if(pace == "fast"){
				addToConsole(month + " " + day + ": You travel 75 blorps");
			}
			
			//when have time do animation of getting closer to location
		} else if(encounter == 1){
			addToConsole("ARRRRRRRGH! Pirates have stormed the ship!");
			addToConsole("The space pirates demand §500 or else!");
			addToConsole("What will you do?");
			$(".display-box").css({"backgroundImage":"url(../images/pirate.svg)"});
			$(".travel").hide();
			$(".piratesOne").show();

			$("body").off().on('click', '.pirate-attack', function(){
				var attackChance = 6;

				if(rations == 'bare'){
					attackChance = 9;
				} else {
					attackChance = 6;
				}

				c("attack chance: " + attackChance);

				if(gameobj['ammo'] > 0){
					oneDiceRoll();
					c("dice: " + diceOne);
					if(diceOne >= attackChance){
						addToConsole("Their gunslinging was no match for yours! Defeated the pirates run back to their ship.");
						gameobj['ammo']--;
						$("span.ammo").text(gameobj['ammo']);
						$(".travel").show();
						$(".piratesOne").hide();
						atLocation();
					} else{
						if(gameobj['money'] >= 500 && gameobj['food'] >= 50){
							addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take §500 and 50lbs of food.");
							gameobj['money'] -= 500;
							gameobj['food'] -= 50;
							$("span.money").text(gameobj['money']);
							$("span.food").text(gameobj['food']);
						} else if(gameobj['money'] < 500 && gameobj['food'] < 50){
							addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take all your money and food.");
							gameobj['money'] = 0;
							gameobj['food'] = 0;
							$("span.money").text(gameobj['money']);
							$("span.food").text(gameobj['food']);
						} else if(gameobj['money'] < 500 && gameobj['food'] >= 50){
							addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take all your money and 50lbs of food.");
							gameobj['money'] = 0;
							gameobj['food'] -= 50;
							$("span.money").text(gameobj['money']);
							$("span.food").text(gameobj['food']);
						} else if(gameobj['money'] >= 500 && gameobj['food'] < 50){
							addToConsole("You fumble as you try to draw your gun. The pirates don't appreciate you trying to fight back and take §500 and all of your food.");
							gameobj['money'] -= 500;
							gameobj['food'] = 0;
							$("span.money").text(gameobj['money']);
							$("span.food").text(gameobj['food']);
						}
						$(".travel").show();
						$(".piratesOne").hide();
						atLocation();
					}
				} else {
					addToConsole("You have no ammo! Are you going to bluff your way through or give in.");
					$('.piratesOne').hide();
					$(".piratesTwo").show();
				}
			});

			$("body").on('click', '.pirate-bluff', function(){
				oneDiceRoll();
				if(diceOne >= 7){
					addToConsole("The pirates believe your bluff and cautiously return to their ship.");
					$(".piratesTwo").hide();
					$(".travel").show();
					atLocation();
				} else {
					if(gameobj['money'] >= 700){
						addToConsole("The pirates see through your bluff and take §700");
						gameobj['money'] -= 700;
						$("span.money").text(gameobj['money']);
					} else {
						addToConsole("The pirates see through your bluff and take all your money");
						gameobj['money'] = 0;
						$("span.money").text(gameobj['money']);
					}
					$(".piratesTwo").hide();
					$(".travel").show();
					atLocation();
				}
			});

			$("body").on('click','.pirate-givein', function(){
				if(gameobj['money'] >= 500){
					addToConsole("You give in to their demands and they take §500.");
					gameobj['money'] -= 500;
				} else if(gameobj['money'] < 500){
					addToConsole("You give in to their demands and they take all your money.");
					gameobj['money'] = 0;
				}
				
				$("span.money").text(gameobj['money']);
				$(".travel").show();
				$(".piratesOne").hide();
				$(".piratesTwo").hide();
				atLocation();
			});

		} else if(encounter == 2){
			addToConsole("Space whales pass by and sooth your soul");
			$(".display-box").css({"backgroundImage":"url(../images/spaceWhale.svg)"});			
		} else if(encounter == 3 && role > 3){
			addToConsole("Woaahhh! Woaahhh! Time Warp sends you back three days!");
			day -= 4;
			role -= 4;
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
			$("span.day").text(day);
		} else if(encounter == 4){
			toBeThrow = (Math.floor(Math.random() * 50) + 1) * 10;
			c(toBeThrow);
			throwRemain = toBeThrow;

			$("span.to-throw").text(toBeThrow);
			$("span.throw-total").text(throwTotal);
			$("span.throw-left").text(throwRemain);

			$(".display-box").css({"backgroundImage":"url(../images/blackHole.png)"});

			addToConsole("Your ship has been caught in a black hole gravitational pull!");
			addToConsole("Shed some weight to escape!");
			$(".travel").hide();
			// $(".conditions").hide();
			$(".progressConsole").css({'height':'20%'});
			$('.blackHole').show();
			$(".throw-giveCont").show();

			$("input[name = 'throw-food']").on('input',function(){
				blackHoleObjects();
			});

			$("input[name = 'throw-fuel']").on('input',function(){
				blackHoleObjects();
			});

			$(".throw-button").on('click', function(){
				c("hello");
				gameobj['food'] -= foodInput * 10;
				gameobj['fuel'] -= fuelInput * 10;

				$("span.food").text(gameobj['food']);
				$("span.fuel").text(gameobj['fuel']);

				$(".progressConsole").css({'height':'80vh'});
				$('.blackHole').hide();
				$(".throw-cont").hide();
				$(".travel").show();

				$("input[name = 'throw-food']").val(0);
				$("input[name = 'throw-fuel']").val(0);
				throwTotal = 0;
				throwRemain = 100;

				atLocation();
			});

			$("body").off().on('click', '.throw-giveUp', function(){
				oneDiceRoll();
				if(diceOne >= 8){
					addToConsole("You made it out of the gravitational pull alive with a little hard work and a lot of luck.");
				} else {
					var death = Math.floor((Math.random() * health+1));

					c("death num: " + death);
					c(crew);

					// addToConsole("You didn't make it out of the pull in time.");
					addWarning(crew[death - 1] + " died in the attempts getting out of the gravitational pull.");
					addToConsole("Well that's one way of losing some weight");

					crew.splice(death - 1,1);
					health = $(crew).length;
					$("span.health").text(health);
					c(crew);
					deadCrew();
				}
					$(".progressConsole").css({'height':'80vh'});
					$('.blackHole').hide();
					$(".travel").show();
					$(".throw-cont").hide();
					$(".throw-giveCont").hide();
			});

		} else if(encounter == 5){
			addToConsole("Asteroids fly by but you make it out unscathed! Thank the space lords!");
		} else if(encounter == 6){
			var death = Math.floor((Math.random() * health+1));

			c("death num: " + death);
			c(crew);
			addWarning(crew[death - 1] + " gets space mites and dies!");
			crew.splice(death - 1,1);
			health = $(crew).length;
			$("span.health").text(health);
			c(crew);
			deadCrew();
		} else if(encounter == 7){
			var death = Math.floor((Math.random() * health+1));

			c("death num: " + death);
			c(crew);
			addToConsole("Weasles! Weasles! SPACE WEASLES! They are in the suits! AHHHHH!");
			addWarning(crew[death - 1] + " dies from an infected bite.");
			crew.splice(death - 1,1);
			health = $(crew).length;
			$("span.health").text(health);
			c(crew);
			deadCrew();
		} else if(encounter == 8){
			addToConsole("Space Pigeons are found in the storage area. They have eaten all the food but now you have space pigeons to eat.");
			gameobj['food'] = 100;
			$("span.food").text(gameobj['food']);
			$(".display-box").css({"backgroundImage":"url(../images/spacePigeon.svg)"});
 
		} else if(encounter == 9){
			addToConsole("You catch flotsam passing by your ship. You inspect it closer. NEVERMIND IT'S SPACE WHALE POOP! NOOOOOOO!");
		} else if(encounter == 10){
			addToConsole("You wish on a falling star. What a beautiful time.");
		} else if(encounter >= 20){

		} else{
			addToConsole("You travel a days worth");
			$(".display-box").css({"backgroundImage":"url(../images/you.svg)"});
 
		}

		if(encounter != 1 && encounter != 4){
			atLocation();
		}
	}

	function paceChange(clickPace){
		$("." + clickPace).on('click', function(){
			pace = clickPace;
			$(".pace-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}

	function rationChange(clickRation){
		$("." + clickRation).on('click', function(){
			rations = clickRation;
			$(".ration-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}
//locations
	function atLocation(){
		if(role >= locationOne && role <= locationTwo && locationGoal == 1){
			addToConsole("You have neared Planet X, what will you do?");
			$(".travel").hide();
			$(".xPlanet").show();
			$(".twoChoices").show();
			$(".twoChoices .one").text("Touch Down");
			$(".twoChoices .two").text("Avoid");

			$(".display-box").css({"backgroundImage":"url(../images/xplanet-arrive.png)"});

			$(".one").on('click',function(){

				addToConsole("You have touched down on Planet X. This is a main hub for those who favor themselves as cosmopoliton.")
				
				$(".twoChoices").hide();
				$(".travel").hide();
				$(".planetX").show();
				updateMonth();
				$(".one").off('click');
			});
			$(".two").on('click',function(){
				addToConsole("You chose to avoid Planet X. Was this a good idea? Only time will tell.");
				$(".travel").show();
				$(".twoChoices").hide();
				// $(this).off("click");
				locationGoal ++;
				$(".one").off('click');
				$(".two").off('click');
				
			});
		} else if(role >= locationTwo && role <= locationThree && locationGoal == 2){
			c("second location");
			addToConsole("You have neared Nebula Y.");
			addToConsole("You have the choice of going through the expanse with the risk of space pirates or going around and using twice the amount of fuel.");
			$(".twoChoices").show();
			$(".travel").hide();
			$(".yNebula").show();
			$(".twoChoices .one").text("Go through");
			$(".twoChoices .two").text("Go around");

			$(".display-box").css({"backgroundImage":"url(../images/nebula-arrive.png)"});

			$(".one").on('click', function(){
				addToConsole("You have decided to go through the Nebula. Be wary, the magnetic dust that is found in this Nebula causes malfunctions in your gear making you easier targets to space pirates.");
				$(".twoChoices").hide();		
				$(".travel").show();
				$(".one").off('click');
				$(".two").off('click');

			});
			$(".two").on('click', function(){
				addToConsole("You have decided to go around the Nebula. The Nebula is expansive so double the fuel will be used to travel a normal days travel.");
				doubleFuel = true;
				$(".twoChoices").hide();		
				$(".travel").show();
				$(this).off('click');

			});

			locationGoal ++;
			c("location" + locationGoal);
			c(locationThree);

		} else if(role >= locationThree && locationGoal == 3){
			// c("third location");
			addToConsole("You have reached the end of the Nebula system seems to have returned to normal. THX-11 is close. You can feel it.")
			locationGoal ++;
			extraFuel = false;
		} else if(role >= locationEnd && locationGoal == 4){
			c("Yay made it! Woo!");
			addToConsole("You have reached the ends of your travels. Your crew crowds the front window to get the first look of your new home.");
			$(".travel").hide();
			$(".display-box").css({"backgroundImage":"url(../images/newHome.png)"});
			$(".homePlanet").show();
			$(".oneChoices").show();
			$(".landOn").text("Land on your new home");
			
		}
	}


	
	

	var chat1name, chat1job, chat2name, chat2job, chat3name, chat3job, chat4name, chat4job;

	function chat(name){
		

		nameNum = (Math.floor((Math.random() * $(localName).length + 1))) - 1;
		jobNum = (Math.floor((Math.random() * $(localJob).length + 1))) - 1;
		if(name == "chatterbox1"){
			chat1name = localName[nameNum];
			chat1job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat1job);
			$("." + name + " .chatter-name").text(chat1name);
		} else if (name == "chatterbox2"){
			chat2name = localName[nameNum];
			chat2job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat2job);
			$("." + name + " .chatter-name").text(chat2name);
		} else if (name == "chatterbox3"){
			chat3name = localName[nameNum];
			chat3job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat3job);
			$("." + name + " .chatter-name").text(chat3name);
		} else if (name == "chatterbox4"){
			chat4name = localName[nameNum];
			chat4job = localJob[jobNum];

			$("." + name + " .chatter-job").text(chat4job);
			$("." + name + " .chatter-name").text(chat4name);
		}
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
			$(".throw-cont").show();
			$(".throw-giveCont").hide();
		} else {
			$(".throw-cont").hide();
			$(".throw-giveCont").show();
		}
	}











	

	function deadCrew(){
		if(health <= 0){
			addToConsole("Your whole crew has passed away.");
			addToConsole("What is a captain without a good crew by their side?");
			addToConsole("Shall we try again?");
			$(".restart").show();
			$(".travel").hide();
			encounter = 20;
		}
	}

	

	


//next
	$(".next").on('click', function(){
		screenCount++;
		// console.log(docHeight);
		mainMargin += docHeight;
		$(".atMain").css('marginTop',  -mainMargin);
		// console.log(mainMargin);
	});

//jobs
	$(".farmer").on('click', function(){
		captainJob = "farmer";
		gameobj['money'] = 1000;
		storeTotal = gameobj['money'];
		c(storeTotal);
		$("span.money").text(gameobj['money']);
		$("span.total").text(storeTotal);
		$("span.bill").text(storeBill);
	});
	$(".engineer").on('click', function(){
		captainJob = "engineer";
		gameobj['money'] = 1500;
		storeTotal = gameobj['money'];
		c(storeTotal);
		$("span.money").text(gameobj['money']);
		$("span.total").text(storeTotal);
		$("span.bill").text(storeBill);
	});
	$(".moneybags").on('click', function(){
		captainJob = "moneybags";
		gameobj['money'] = 2000;
		storeTotal = gameobj['money'];
		c(storeTotal);
		$("span.money").text(gameobj['money']);
		$("span.total").text(storeTotal);
		$("span.bill").text(storeBill);
	});


//names
	$(".leaderName").on('click', function(){
		var inputLeader = $("input[name = 'captain']").val();
		var name = [inputLeader];
		captainName = $.merge([],name);
		console.log(captainName);
	});

	$(".memberName").on('click', function(){
		var inputMember = $("input[name = 'member1']").val();
		var name = [inputMember];
		crew = $.merge([],name);

		inputMember = $("input[name = 'member2']").val();
		name = [inputMember];
		crew = $.merge(crew,name);
		
		inputMember = $("input[name = 'member3']").val();
		name = [inputMember];
		crew = $.merge(crew,name);

		inputMember = $("input[name = 'member4']").val();
		name = [inputMember];
		crew = $.merge(crew,name);
		console.log("crew:" + crew);
	});

//month
	$(".april").on('click', function(){
		month = 'April';
		updateMonth();
	});
	$(".may").on('click', function(){
		month = 'May';
		updateMonth();
	});
	$(".june").on('click', function(){
		month = 'June';
		updateMonth();
	});
	$(".july").on('click', function(){
		month = 'July';
		updateMonth();
	});

//shop
	

	$("input[name = 'parts']").on('input',function(){
		numOfParts = $("input[name = 'parts']").val();
		costOfItems = 100 * numOfParts;
		storeBilling(oldBillParts);
		oldBillParts = costOfItems;
	});
	$("input[name = 'fuel']").on('input',function(){
		numOfFuel = $("input[name = 'fuel']").val();
		costOfItems = 50 * numOfFuel;
		storeBilling(oldBillFuel);
		oldBillFuel = costOfItems;
	});
	$("input[name = 'food']").on('input',function(){
		numOfFood = $("input[name = 'food']").val();
		costOfItems = 10 * numOfFood;
		storeBilling(oldBillFood);
		oldBillFood = costOfItems;
	});
	$("input[name = 'ammo']").on('input',function(){
		numOfAmmo = $("input[name = 'ammo']").val();
		costOfItems = 20 * numOfAmmo;
		storeBilling(oldBillAmmo);
		oldBillAmmo = costOfItems;
	});
	$(".exitStore").on('click', function(){
		gameobj['parts'] = numOfParts;
		gameobj['fuel'] = numOfFuel * 100;
		gameobj['food'] = numOfFood * 100;
		gameobj['ammo'] = numOfAmmo * 5;
		gameobj['money'] = storeTotal;
		c("parts: " + gameobj['parts']);
		c("fuel: " + gameobj['fuel']);
		c("food: " + gameobj['food']);
		c("ammo: " + gameobj['ammo']);
		c("money: "+ gameobj['money']);
	});



	$(".departure").on('click', function(){
		$("span.money").text(gameobj['money']);
		$("span.pace").text(pace);
		$("span.health").text(health);
		$("span.rations").text(rations);
		$("span.food").text(gameobj['food']);
		$("span.ammo").text(gameobj['ammo']);
		$("span.fuel").text(gameobj['fuel']);
		$("span.month").text(month);
		day = 1;
		$("span.day").text(day);
		$(".options").show();
		$(".departure").hide();
	});


var role = 1;

month = "April";
gameobj['food'] = 1500;
gameobj['ammo'] = 10;
gameobj['fuel'] = 1200;
gameobj['money'] = 2000;


$("span.money").text(gameobj['money']);
$("span.food").text(gameobj['food']);
$("span.fuel").text(gameobj['fuel']);




//day
	$(".traverse").on('click', function(){
		updateMonth();

		if(doubleFuel){
			extraFuel = 2;
		} else if (!doubleFuel){
			extraFuel = 1;
		}

		if(pace == "slow"){
			fuelUsage = 5 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role++;
		} else if(pace == "moderate"){
			fuelUsage = 12 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=2
		} else if(pace == "quick"){
			fuelUsage = 24 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=4
		} else if(pace == "fast"){
			fuelUsage = 36 * extraFuel;
			gameobj['fuel'] -= fuelUsage;
			$("span.fuel").text(gameobj['fuel']);
			role +=5
		}

		if(rations == "bare"){
			fpp = 1;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);
			$("svg#rations .teal, svg#rations .red").addClass("plate");
		} else if(rations == "meager"){
			fpp = 2;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);
			$("svg#rations .teal").addClass("plate");
			$("svg#rations .red").removeClass("plate");
		}else if(rations == "filling"){
			fpp = 3;
			gameobj['food'] -= (fpp * health);
			$("span.food").text(gameobj['food']);
			$("svg#rations .red, svg#rations .teal").removeClass("plate");

		}
		
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo){
			encounter = Math.ceil( ( Math.random() * 10) );
		}
		if(locationGoal == 3 && !doubleFuel){
			c("pirates?");
			oneDiceRoll();
			if(diceOne > 6){
				encounter = 1;
				c("encounter: " + encounter);
			}
		}


		

		if(gameobj['fuel'] <= fuelUsage && gameobj['fuel'] > 0){
			// $(".travel").hide();

			addToConsole("You are running low on fuel. Try trading for more fuel or adjusting your pace.");
		} else if(gameobj['fuel'] <=0){
			gameobj['fuel'] = 0;
			$("span.fuel").text(gameobj['fuel']);
			addWarning("Warning! You have run out of fuel. Attempt to trade for fuel or drift helplessly through space.");
			// $(".traverse").addClass("noFuel").removeClass("traverse").off('click');
			$(".traverse").css({'pointerEvents':'none','opacity':'.5'});
			encounter = 20;

		}

		if(gameobj['food'] <= (ffp * health) && gameobj['food'] > 0){
			addToConsole("A crew member warns you that food storage is getting low. It's advisable to make a trade for food.");
		} else if(gameobj['food'] <= 0){
			gameobj['food'] = 0;
			$("span.food").text(gameobj['food']);
			addWarning("Warning! You have run out of food. If you continue to travel without food your crew members may die.");
			var hungryDice = Math.ceil( ( Math.random() * 10) );
			c("hungry: " + hungryDice)
			if(hungryDice == 5 || hungryDice == 3){
				var death = Math.floor((Math.random() * health+1));

				addWarning(crew[death - 1] + " has passed away from hunger.");

				crew.splice(death - 1,1);
				health = $(crew).length;
				$("span.health").text(health);
				c(crew);
				encounter = 20;
			}
		}

		deadCrew();
		

//change the encounter
		encounter = 4;
		encounterSituations();
	

		c("role:" + role);
		// c(diceOne);
		// c(diceTwo);
		// c(ranEnDice);
		// c(encounter);
		encounter = 0;

		ship();

		function ship(){
			var trailWidth = $(".locationProgress").width() - 40;
			var propulsion = ((role/locationEnd) * trailWidth);
			

			$(".ship").css({
				transform:"translateX(" + propulsion + "px)"
			})
			
		};
	});





//pace
	$(".check-pace").on('click', function(){
		$(".change-pace").show();
		$(".travel").hide();
		$(".progressConsole").hide();
		$(".displayWindow").hide();
	});

	paceChange("slow");
	paceChange("moderate");
	paceChange("quick");
	paceChange("fast");
	
	$(".set-pace").on('click', function(){
		$("span.pace").text(pace);
		$(".change-pace").hide();
		$(".travel").show();
		$(".progressConsole").show();
		$(".displayWindow").show();
	})
	
//rations
	$(".check-rations").on('click', function(){
		$(".change-rations").show();
		$(".travel").hide();
		$(".progressConsole").hide();
		$(".displayWindow").hide();
	});

	rationChange("bare");
	rationChange("meager");
	rationChange("filling");

	$(".set-rations").on('click', function(){
		$("span.rations").text(rations);
		$(".change-rations").hide();
		$(".travel").show();
		$(".progressConsole").show();
		$(".displayWindow").show();
	});


//trade
	$(".attempt-trade").on('click', function(){
		$(".progressConsole").hide();
		$(".displayWindow").hide();
		$(".travel").hide();
		$(".trading").show();

		trade("trade-one");
		trade("trade-two");
		trade("trade-three");
		

	});

	$(".trade-done").on('click', function(){
		if(gameobj['fuel'] > fuelUsage){
			$(".traverse").css({'pointerEvents':'initial','opacity':1})
		}
		$(".progressConsole").show();
		$(".displayWindow").show();
		$(".travel").show();
		$(".trading").hide();
		
		addToConsole("trade attempted");
	})
	
//Planet X
	
	$(".local-trade").on('click', function(){
		updateMonth();
		$(".progressConsole").hide();
		$(".displayWindow").hide();
		$(".planetX").hide();
		$(".local-trading").show();
		trade("trade-one");
		trade("trade-two");
		trade("trade-three");

	});

	function trade(traderNum){
		titleNum = (Math.floor((Math.random() * $(traderTitle).length + 1))) - 1;
		nameNum = (Math.floor((Math.random() * $(traderName).length + 1))) - 1;
		itemNum = (Math.floor((Math.random() * $(tradeItems).length + 1))) - 1;
		$("." + traderNum + " .traderTitle").text(traderTitle[titleNum]);
		$("." + traderNum + " .trader").text(traderName[nameNum]);
		$("." + traderNum + " .first-item").text(tradeItems[itemNum].one);
		$("." + traderNum + " .second-item").text(tradeItems[itemNum].two);

		$("." + traderNum + " .make-trade").data({
			add: tradeItems[itemNum].add,
			minus: tradeItems[itemNum].minus,
			addTo: tradeItems[itemNum].to,
			minusFrom: tradeItems[itemNum].from
		})
	}

	$(".make-trade").on("click",function(){
		c($(this).data("minusFrom"));
		c(gameobj[$(this).data("minusFrom")]);
		c($(this).data("minus"));
		if(gameobj[$(this).data("minusFrom")] >= $(this).data("minus") ) {
			gameobj[$(this).data("addTo")] += parseInt($(this).data("add"));
			gameobj[$(this).data("minusFrom")] -= parseInt($(this).data("minus"));
			$("span." + $(this).data("addTo")).text(gameobj[$(this).data("addTo")]);
			$("span." + $(this).data("minusFrom")).text(gameobj[$(this).data("minusFrom")]);
		} else if(gameobj[$(this).data("minusFrom")] < $(this).data("minus")){
			c("trade unavailable")
		}else{
			c("uhhh");
		}

	});

	$(".local-trade-done").on('click', function(){
		$(".progressConsole").show();
		$(".displayWindow").show();
		$(".planetX").show();
		$(".local-trading").hide();
	});

	$(".local-chat").on('click', function(){
		updateMonth();
		// $(".progressConsole").css({'height':'15%'});
		addToConsole("You enter a local bar called Dravent's Watering Hole.");

		$(".planetX").hide();
		$(".local-chatting").show();
	});

	$(".chat-talk").on('click', function(){

		nameNum = (Math.floor((Math.random() * $(localName).length + 1))) - 1;
		jobNum = (Math.floor((Math.random() * $(localJob).length + 1))) - 1;
		addToConsole("You start talking with " + localJob[jobNum] + " " + localName[nameNum] + ".");

		diceOne = Math.ceil( ( Math.random() * 10) );
		if(diceOne == 1){
			addToConsole("Your new friend tells you a great joke and you bond together over other jokes.");
		} else if(diceOne == 2){
			addToConsole("They talk about their days problems and after their rant they thank you for listening by giving you 50 lbs of food");
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
			addToConsole("You find some money on the floor and decide to keep it");
			addToConsole("You gain §20.");
			gameobj['money'] += 20;
			$("span.money").text(gameobj['money']);
		} else if(diceOne == 7){
			addToConsole("After a few minutes the conversation trails off and you sit in a stew of uncomfortable silence");
		} else if(diceOne == 8){
			addToConsole("You get along well with this random stranger you've sat down with.");
		} else if(diceOne == 9){
			addToConsole("You find out that " + localJob[jobNum] + " " + localName[nameNum] + " knows Aunt Frale. What a small world");
		} else{
			addToConsole(localJob[jobNum] + " " + localName[nameNum] + " seems like a good person. You wonder if they would join you on your journey.");
			if(crew.length < 4){
				addToConsole(localJob[jobNum] + " " + localName[nameNum] + " agrees to join you.");
				addToConsole(localJob[jobNum] + " " + localName[nameNum] + " joins you.");
				var newmember = [localName[nameNum]];
				crew = $.merge(crew,newmember);
				c(crew);
				health = $(crew).length;
				$("span.health").text(health);

			} else if(crew.length >= 4){
				addToConsole("Too bad there's no room in your ship for another person.");
			}
		}
		$(".chat-talk").text("Talk to Somebody Else")
	});
	
	$(".chat-leave").on('click', function(){
		$(".local-chatting").hide();
		$(".planetX").show();
	});

	$(".leave-planet").on('click', function(){
		updateMonth();
		$(".travel").show();
		$(".planetX").hide();
		$(".display-box").css({"backgroundImage":"url(../images/xplanet-arrive.png)"});
		addToConsole("You take off from Planet X to once again travel across the galaxy towards your new home.")
		c("leave planet");
		locationGoal ++;
	});

	// $(".landOn").on('click', function(){
	// 	c("home!");
	// 	$(".progressConsole").hide();
	// 	$(".conditions").hide();
	// 	$(".travel").hide();
	// 	$(".landOn").hide();
	// 	$(".newHome").show();
	// });











//restart
	$(".restart h4").on('click', function(){
		location.reload();
	});

	// window.g = gameobj;

});