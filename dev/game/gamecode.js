$(function(){
	var gameobj = {
		food : 0,
		fuel : 0,
		ammo : 0,
		money : 0
	}

	var captain = {
		job : "",
		name : ""
	}

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
		} else if($("#setUp-profession .active").hasClass("job-engineer")){
			captain["job"] = "engineer";
		} else if($("#setUp-profession .active").hasClass("job-moneybags")){
			captain["job"] = "moneybag";
		} else {

		}
		c("job " + captain["job"]);
	})


	//name
	$("#setUp-name .setUp-button").on('click',function(){
		captain['name'] = $("input[name=captain]").val();
		c("captain " + captain['name']);
	})
	
})