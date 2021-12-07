// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}
function estado_number(states){
	if (states[0] == "A" && states[1] == "DIRTY" && states[2] == "DIRTY") {
		return 1
	} else if (states[0] == "A" && states[1] == "CLEAN" && states[2] == "DIRTY"){
		return 2
	} else if (states[0] == "B" && states[1] == "DIRTY" && states[2] == "DIRTY"){
		return 3
	} else if (states[0] == "B" && states[1] == "DIRTY" && states[2] == "CLEAN"){
		return 4
	} else if (states[0] == "A" && states[1] == "DIRTY" && states[2] == "CLEAN"){
		return 5
	} else if (states[0] == "A" && states[1] == "CLEAN" && states[2] == "CLEAN"){
		return 6
	} else if (states[0] == "B" && states[1] == "CLEAN" && states[2] == "CLEAN"){
		return 7
	} else {
		return 8
	}
}

function test(states) {

	estado = "<br> <i> <h4>estado # ".concat(estado_number(states))
	var contador = states[3];
	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);
	document.getElementById("log").innerHTML += estado.concat("<br> location: ").concat(location).concat(" |A: ").concat(states[1]).concat(" |B: ").concat(states[2]).concat("</h4> </i> Action: ").concat(action_result);
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") {
			states[2] = "CLEAN";

		}
	}
	else if (action_result == "RIGHT") {
		states[0] = "B"; 
		if( states[3]<6){
			states[1] = "DIRTY";
		}
		
	}
	else if (action_result == "LEFT") {
		states[0] = "A";

		if (states[3]<4 || states[3] == 7){
			states[2] = "DIRTY"
		}
	}


	states[3]= contador + 1
	interval = setTimeout(function () { test(states); }, 2000);

	if (contador == 10){
		clearTimeout(interval)
		document.getElementById("log").innerHTML += "<br><i> FIN EJECUCION...</i>";

	}
}

var states = ["A", "DIRTY", "DIRTY",1];
test(states);
