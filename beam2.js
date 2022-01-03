// MIT License
// Copyright (c) 2021 Luis Espino



function heuristic(start, end, h) {
	console.log(start, end, h);
	if (h == 1) {
		var casillas_fuera = 0;
		for (var i = 0; i < start.length; i++) {
			if (start[i] != end[i] && start[i] !== "0") casillas_fuera++;
		}
		return casillas_fuera;
	} else if (h == 2) {
		// Manhattan
		var manhattan = 0;
		for (var i = 0; i < start.length; i++) {
			if (start.substring(i, i + 1) !== "0")
				manhattan += Math.abs(i - end.indexOf(start.substring(i, i + 1)));
		}
		return manhattan;
	}
}

function moveMatrix(matrix, zero, index) {
	const matrix_ = matrix.split("");
	const num = matrix[index];
	matrix_[zero] = num;
	matrix_[index] = "0";
	return matrix_.join("");
}
function successors(n, e, h) {
    let sucesores = [];
    const matriz = n[0];
    const posCero = matriz.indexOf("0");
    let arreglotmp = [];

    if (posCero == 0) {
        
        arreglotmp.push(moveMatrix(matriz, posCero, 1));
        arreglotmp.push(moveMatrix(matriz, posCero, 3));
    } else if (posCero == 1) {
        arreglotmp.push(moveMatrix(matriz, posCero, 0));
        arreglotmp.push(moveMatrix(matriz, posCero, 2));
        arreglotmp.push(moveMatrix(matriz, posCero, 4));
    } else if (posCero == 2) {
        arreglotmp.push(moveMatrix(matriz, posCero, 1));
        arreglotmp.push(moveMatrix(matriz, posCero, 5));
    } else if (posCero == 3) {
        arreglotmp.push(moveMatrix(matriz, posCero, 0));
        arreglotmp.push(moveMatrix(matriz, posCero, 4));
        arreglotmp.push(moveMatrix(matriz, posCero, 6));
    } else if (posCero == 4) {
        arreglotmp.push(moveMatrix(matriz, posCero, 1));
        arreglotmp.push(moveMatrix(matriz, posCero, 3));
        arreglotmp.push(moveMatrix(matriz, posCero, 5));
        arreglotmp.push(moveMatrix(matriz, posCero, 7));
    } else if (posCero == 5) {
        arreglotmp.push(moveMatrix(matriz, posCero, 2));
        arreglotmp.push(moveMatrix(matriz, posCero, 4));
        arreglotmp.push(moveMatrix(matriz, posCero, 8));
    } else if (posCero == 6) {
        arreglotmp.push(moveMatrix(matriz, posCero, 3));
        arreglotmp.push(moveMatrix(matriz, posCero, 7));
    } else if (posCero == 7) {
        arreglotmp.push(moveMatrix(matriz, posCero, 4));
        arreglotmp.push(moveMatrix(matriz, posCero, 6));
        arreglotmp.push(moveMatrix(matriz, posCero, 8));
    } else if (posCero == 8) {
        arreglotmp.push(moveMatrix(matriz, posCero, 5));
        arreglotmp.push(moveMatrix(matriz, posCero, 7));

    }
    arreglotmp.forEach((ar) => {
		sucesores.push([ar, heuristic(ar, e, h), incrementar()]);
	});
	sucesores = sucesores.sort((a, b) => a[1] - b[1]);
	sucesores = sucesores.slice(0, 2);
	return sucesores;
}

function bestfirst(start, end, h){
	var cont = 0
	var dot = '{'
	var list = [[start,heuristic(start, end, h), incrementar()]];
	dot+=list[0][2]+' [label="'+list[0][0]+'"];'
	while (list.length > 0){		
		var current = list.shift();
		if (current[0] == end) {			
			dot += '}'
			return dot
		}		
		var temp = successors(current, end, h);
		//temp.reverse();
		temp.forEach(val => dot+=val[2]+' [label="'+val[0]+'"];'+current[2]+'--'+val[2]+' [label="'+val[1]+'"] ;')
		list = list.concat(temp);
		list = list.sort( function(a,b) { return a[1] - b[1] });
		cont++
		if (cont > 100) {
			alert("The search is looped!")
			dot += '}'
			return dot
		}
	}
	dot += '}'
	return dot
}

var id = 1
function incrementar() {
    return id++
}

function puzzle() {
    var nodes = prompt("Ingrese texto inicial, texto final y heurstica (1 o 2) separados por un espacio")
    if (nodes == null || nodes == '') nodes = '012463758 123456780 2'
    nodes = nodes.split(' ')
    return bestfirst(nodes[0], nodes[1], nodes[2])
}