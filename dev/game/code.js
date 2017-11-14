$(function(){
	function conlog(print){
		console.log(print);
	}
	var player = [];

	var farmer = [job = "Meteorite Farmer", startmoney = 1000, ];
	var engineer = [job = "Spaceship Engineer", startmoney = 1500];
	var moneybags = [job = "Moneybags", startmoney = 2000];
	var supplyCost = [
		fuel = 50,
		food = 20,
		ammo = 20,
		parts = 100
	];
	var money = 0;
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

	var weather = "perfect";
	var weatherOpt = ["heated", "freezing", "fair", "perfect"];
	var pace = "quick";
	var paceOpt = ["stopped", "slow", "moderate", "quick", "fast"];
	var health = 5;
	var rations = "filling";
	var food = 0;
	var ammo = 0;
	var fuel = 0;
	var day = 1;

	var diceOne = 0;
	var diceTwo = 0;
	var ranEnDice = 0;
	var encounter = 0;

	// console.log(farmer);
	// console.log(engineer);
	// console.log(moneybags);

//functions
	function addJob(job){
		player = $.merge([],job);
		console.log(player);
		$("span.money").text(player[1]);
	};

	function addMembers(num){
		var inputMember = $("input[name = " + num + "]").val();
		var name  = [num = inputMember];
		player = $.merge(player,name);
	}
player[7] = "April";
	function updateMonth(){
		$("span.month").text(player[7]);
		$("span.day").text(day);
		// console.log(player[7]);
		day++;
		if(player[7] == "April" && day > 30){
			player[7] = "May";
			day = 1;
		} else if(player[7] == "May" && day > 31){
			player[7] = "June";
			day = 1;
		} else if(player[7] == "June" && day > 30){
			player[7] = "July";
			day = 1;
		} else if(player[7] == "July" && day > 31){
			player[7] = "August";
			day = 1;
		} else if(player[7] == "August" && day > 31){
			player[7] = "September";
			day = 1;
		} else if(player[7] == "September" && day > 30){
			player[7] = "October";
			day = 1;
		} else if(player[7] == "October" && day > 31){
			player[7] = "November";
			day = 1;
		} else if(player[7] == "November" && day > 30){
			player[7] = "Decmeber";
			day = 1;
		} else if(player[7] == "Decmeber" && day > 31){
			player[7] = "January";
			day = 1;
		} else if(player[7] == "January" && day > 31){
			player[7] = "Febuary";
			day = 1;
		} else if(player[7] == "Febuary" && day > 28){
			player[7] = "March";
			day = 1;
		} else if(player[7] == "March" && day > 31){
			player[7] = "April";
			day = 1;
		} 
		conlog("day:" + day);
	}

	function storeBilling(bill){
		storeBill -= bill;
		storeBill += costOfItems;
		storeTotal = money - storeBill;
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

	// function step(){
	// 	console.log(counter);
	// 	counter++;
	// 	console.log(counter);
	// 	if(counter > 129600) t = 0;
	// 	window.requestAnimationFrame(step);

	// 	//20 chances for randomness
	// }

	function addToConsole(text){
		$(".progressConsole").append("<p>" + text + "</p>");
	}

	function encounterSituations(){
		if(encounter == 0){
			addToConsole("You travel a days worth");
			//when have time do animation of getting closer to location
		} else if(encounter == 1){
			addToConsole("ARRRRRRRGH! Pirates have stormed the ship!");
			addToConsole("The space pirates demand §500 or else!");
			addToConsole("What will you do?");
			$(".travel").hide();
			$(".twoChoices .one").text("Attack!");
			$(".twoChoices .two").text("Give In");
			$(".twoChoices").show();
			$(".twoChoices .one").click(function(){
				if(ammo > 0){
					diceOne = Math.ceil( ( Math.random() * 10) );
					conlog("Dice roll:" + diceOne);
					if(diceOne >= 6){
						addToConsole("Your gunslinging ways superior to the space pirates and they run away!");
						$(".travel").show();
						$(".twoChoices").hide();
					} else {
						addToConsole("The space pirates draw their laser guns before you're able to!");
						addToConsole("They loot §500 and 100lbs of food because of the trouble you caused.");
						money -= 500;
						food -= 100;
						$("span.money").text(money);
						$("span.food").text(food);
						$(".travel").show();
						$(".twoChoices").hide();
					}
				} else {
					addToConsole("You have no ammo! What will you do?");
					$(".twoChoices .one").text("Bluff!");
					$(".twoChoices .one").addClass("bluff");
					$(".twoChoices .bluff").removeClass("one");

				}
				$(".twoChoices .bluff").click(function(){
					diceOne = Math.ceil( ( Math.random() * 10) );
					if( diceOne < 6){
						addToConsole("They believe you and back off only taking §10.");
						money -= 10;
						$("span.money").text(money);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					} else{
						addToConsole("They laugh when they realize there's no ammo and take §700 instead.");
						money -= 700;
						$("span.money").text(money);
						$(".twoChoices .bluff").addClass("one").removeClass("bluff");
						$(".twoChoices").hide();
						$(".travel").show();
					}
				});

			});
			$(".twoChoices .two").click(function(){
				addToConsole("You give the pirates what they want and they saunter off the ship with their pockets full");
				money -= 500;
				$("span.money").text(money);
				$(".twoChoices").hide();
				$(".travel").show();
			});



		} else if(encounter == 2){
			addToConsole("Space whales pass by and sooth your soul");
		} else if(encounter == 3){
			addToConsole("Woaahhh! Woaahhh! Time Warp sends you back three days!");
		} else if(encounter == 4){
			addToConsole("You see poop in space. That was weird.");
		} else if(encounter == 5){
			addToConsole("Asteroids fly by but you make it out unscathed! Thank the space lords!");
		} else if(encounter == 6){
			addToConsole(player[4] + " gets space mites and dies!");
		} else if(encounter == 7){
			addToConsole("Weasles! Weasles! SPACE WEASLES! They are in the suits! AHHHHH! " + player[5] + " dies from an infected bite.");
		} else if(encounter == 8){
			addToConsole("Space Pigeons are found in the storage area. They have eaten all the food but now you have space pigeons to eat.");
		} else if(encounter == 9){
			addToConsole("You catch flotsam passing by your ship. You inspect it closer. NEVERMIND IT'S SPACE WHALE POOP! NOOOOOOO!");
		} else if(encounter == 10){
			addToConsole("You wish on a falling star. What a beautiful time.");
		}
	}

	function paceChange(clickPace){
		$("." + clickPace).click(function(){
			pace = clickPace;
			$(".pace-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}

	function rationChange(clickRation){
		$("." + clickRation).click(function(){
			rations = clickRation;
			$(".ration-container h4").css({'color':'#ffffff'});
			$(this).css({'color':'#2dfffe'});
		});
	}


//next
	$(".next").click(function(){
		screenCount++;
		// console.log(docHeight);
		mainMargin += docHeight;
		$(".atMain").css('marginTop',  -mainMargin);
		// console.log(mainMargin);
	});

//jobs
	$(".farmer").click(function(){
		addJob(farmer);
		money = 1000;
	});
	$(".engineer").click(function(){
		addJob(engineer);
		money = 1500;
	});
	$(".moneybags").click(function(){
		addJob(moneybags);
		money = 2000;
	});


//names
	$(".leaderName").click(function(){
		var inputLeader = $("input[name = 'captain']").val();
		var name = [leader = inputLeader];
		player = $.merge(player,name);
		console.log(player);
	});

	$(".memberName").click(function(){
		var inputMember = $("input[name = 'member1']").val();
		var name  = [member1 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member2']").val();
		name  = [member2 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member3']").val();
		name  = [member3 = inputMember];
		player = $.merge(player,name);
		inputMember = $("input[name = 'member4']").val();
		name  = [member4 = inputMember];
		player = $.merge(player,name);
		console.log(player);
	});

//month
	$(".april").click(function(){
		player[7] = 'April';
		updateMonth();
	});
	$(".may").click(function(){
		player[7] = 'May';
		updateMonth();
	});
	$(".june").click(function(){
		player[7] = 'June';
		updateMonth();
	});
	$(".july").click(function(){
		player[7] = 'July';
		updateMonth();
	});

//shop
	money = 2000;
	// // money = parseInt(player[1]);
	$("span.money").text(money);

	$("input[name = 'parts']").change(function(){
		numOfParts = $("input[name = 'parts']").val();
		costOfItems = 100 * numOfParts;
		storeBilling(oldBillParts);
		oldBillParts = costOfItems;
	});
	$("input[name = 'fuel']").change(function(){
		numOfFuel = $("input[name = 'fuel']").val();
		costOfItems = 50 * numOfFuel;
		storeBilling(oldBillFuel);
		oldBillFuel = costOfItems;
	});
	$("input[name = 'food']").change(function(){
		numOfFood = $("input[name = 'food']").val();
		costOfItems = 20 * numOfFood;
		storeBilling(oldBillFood);
		oldBillFood = costOfItems;
	});
	$("input[name = 'ammo']").change(function(){
		numOfAmmo = $("input[name = 'ammo']").val();
		costOfItems = 20 * numOfAmmo;
		storeBilling(oldBillAmmo);
		oldBillAmmo = costOfItems;
	});
	$(".exitStore").click(function(){

		player[1] = storeTotal;
		player[8] = numOfParts;
		player[9] = numOfFuel;
		player[10] = numOfFood;
		food = player[10] * 100;
		player[11] = numOfAmmo;
		ammo = player[11] * 2;
		money = storeTotal;
		console.log(player);
	});

food = 200;
ammo = 2;
fuel = 200;

	$(".departure").click(function(){
		counter = 0;
		startCounter = true;
		console.log(startCounter);
		$("span.weather").text(weather);
		$("span.pace").text(pace);
		$("span.health").text(health);
		$("span.rations").text(rations);
		$("span.food").text(food);
		$("span.ammo").text(ammo);
		$("span.fuel").text(fuel);
		$(".options").show();
	});

// //counter
	
// 			//Math.ceil rounds up
// 			var diceOne = Math.ceil( ( Math.random() * 10) );
// 			var diceTwo = Math.ceil( ( Math.random() * 10) );
// 			var randomEncounterDice = Math.floor((diceOne + diceTwo)/2);
// 			var encounter = 0;
// 			console.log(diceOne);
// 			console.log(diceTwo);
// 			console.log(randomEncounterDice);
var role = 1;

//day
player[7] = "April";
	$(".traverse").click(function(){
		updateMonth();

		if(pace == "slow"){
			fuel -= 5;
			$("span.fuel").text(fuel)
		} else if(pace == "moderate"){
			fuel -= 15;
			$("span.fuel").text(fuel)
		} else if(pace == "quick"){
			fuel -= 30;
			$("span.fuel").text(fuel)
		} else if(pace == "fast"){
			fuel -= 50;
			$("span.fuel").text(fuel)
		} else{

		}
		
		diceOne = Math.ceil( ( Math.random() * 10) );
		diceTwo = Math.ceil( ( Math.random() * 10) );
		ranEnDice = Math.floor((diceOne + diceTwo)/2);
		if(ranEnDice == diceOne || ranEnDice == diceTwo){
			encounter = Math.ceil( ( Math.random() * 10) );
		}
		// encounter = 2;
		encounterSituations();

		$(".progressConsole").stop().animate({
			scrollTop: $(".progressConsole")[0].scrollHeight
		});

		conlog("role:" + role);
		conlog(diceOne);
		conlog(diceTwo);
		conlog(ranEnDice);
		conlog(encounter);
		encounter = 0;
		role++;
	});

//pace
	$(".check-pace").click(function(){
		$(".change-pace").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	paceChange("slow");
	paceChange("moderate");
	paceChange("quick");
	paceChange("fast");
	
	$(".set-pace").click(function(){
		$("span.pace").text(pace);
		$(".change-pace").hide();
		$(".travel").show();
		$(".progressConsole").show();
	})
	
//rations
	$(".check-rations").click(function(){
		$(".change-rations").show();
		$(".travel").hide();
		$(".progressConsole").hide();
	});

	rationChange("bare");
	rationChange("meager");
	rationChange("filling");

	$(".set-rations").click(function(){
		$("span.rations").text(rations);
		$(".change-rations").hide();
		$(".travel").show();
		$(".progressConsole").show();
	})





});