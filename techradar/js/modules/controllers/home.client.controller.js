(function () {

'use strict';

function randomFromTo (from, to){
   return Math.floor(Math.random() * (to - from + 1) + from);
}

function draw (isPaused, planets, scope) {

	var t0 = Date.now();
	var reference = $('.radar');

	reference.empty();

	var w = reference.width();
	var h = reference.height();

	var nowTicks = new Date().getTime();
	var smallest = (w < h ? w : h) - 100;
	var center = {
		x: w / 2,
		y: h /2
	};



	var categories = {
		language:  { fill: '#248B67' },
		database:  { fill: '#658FB7' },
		framework: { fill: '#e87d7d' },
		tool:      { fill: '#c267ef' },
		devops:    { fill: '#FFAC84' },
		practice:  { fill: '#FFCD84' }
	};

	var orbits = {
		hold:   { R: smallest / 1.6, Rn: smallest / 2, level: 'hold',   fill: '#484848'},
		assess: { R: smallest / 2,   Rn: smallest / 3, level: 'assess', fill: '#248B67'},
		trial:  { R: smallest / 3,   Rn: smallest / 6, level: 'trial',  fill: '#000'},
		adopt:  { R: smallest / 6,   Rn: smallest / 9, level: 'adopt',  fill: '#FF9843'}
	};

	var orbitData = [
		orbits.hold,
		orbits.assess,
		orbits.trial,
		orbits.adopt
	];



	d3.selection.prototype.moveToFront = function() {
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
	};

	var svg = d3.select('.radar')
		.insert('svg')
		.attr('width', w)
		.attr('height', h);

	svg.append('circle')
		.attr('r', 20)
		.attr('cx', w / 2)
		.attr('cy', h / 2)
		.attr('class', 'sun');

	var container = svg.append('g')
		.attr('transform', 'translate(' + w/2 + ',' + h/2 + ')');

	container
		.selectAll('g.orbits')
		.data(orbitData)
		.enter()
		.append('g')
		.attr('class', 'orbit').each(function(d, i) {

			d3.select(this)
				.append('circle')
				.attr('class', 'orbit-circle')
				.style('fill', d.fill)
				.attr('r', d.R);

			d3.select(this)
				.append('text')
				.attr('class', 'orbit-text')
			    .text(function(d){
			        return d.level;
			    })
			    .attr('y',function(d,i){
			    	return 0;
			    })
			    .attr('x', function(d,i){
			        return d.R;
			    });
		});

	container
		.selectAll('g.planet')
		.data(planets)
		.enter()
		.append('g')
		.attr('class', 'planet').each(function(d, i) {

			// Set optioanl values that are not currently set by data

			if (!d.phi0) {
				d.phi0 = randomFromTo(0, 359);
			}

			if (!d.r) {
				d.r = randomFromTo(5, 25);
			}

			var randomOrbit = randomFromTo(orbits[d.level].Rn + d.r, orbits[d.level].R - d.r);
			
			d3.select(this)
				.append('circle')
				.attr('r', d.r)
				.attr('cx', randomOrbit)
				.attr('cy', 0)
				.attr('class', 'planet-body')
				.style('fill', categories[d.category].fill);

			d3.select(this)
				.append('text')
				.attr('class', 'planet-text')
			    .text(function(d){
			        return d.title;
			    })
			    .attr('y',function(d, i){
			    	return 0;
			    })
			    .attr('x', function(d, i){
			        return randomOrbit + d.r + 5;
			    });
		}).on('mouseover',function(d){
			var sel = d3.select(this);
			sel.moveToFront();
			scope.$apply(function () { 
				scope.isPaused = true; 
				scope.selectedItem = d;
			});

		})
		.on('mouseout', function (d) {
			scope.$apply(function () { 
				scope.isPaused = false; 
			});
		})
		.on('click', function(d) { 
			scope.$apply(function () { scope.selectedItem = d; });
		});


	var pauseDiff = 0, delta = 0;

	var timer = d3.timer(function() {

		if (isPaused()){
			pauseDiff = Date.now() - t0 - delta;
		}

		delta = (Date.now() - t0) - pauseDiff;

		var rotation = function (d) {
			var date = new Date(d.created);
			date.setDate(date.getDate()-30);
			return (d.phi0 + delta * ( 10000000 / (nowTicks - date.getTime())));
		};

		svg.selectAll('.planet')
			.attr('transform', function(d) {
				return 'rotate(' + rotation(d) + ')';
			});
	});
}

angular.module('core').controller('HomeController', ['$scope',
	function($scope) {

		function isPaused () {
			return $scope.isPaused;
		}
		
		function drawDebounce () {
			var timeout = -1;
			return function () {
				timeout = window.setTimeout(function () {
					draw(isPaused, planets, $scope);
					window.clearTimeout(timeout);
				}, 50);				
			};
		}

		var planets = [];

		d3.json("/techradar.json", function(error, json) {
		  	if (error) return console.warn(error);

		  	planets = json;

			draw(isPaused, planets, $scope);
		});
		

		$scope.isPaused = false;
		$scope.selectedItem = planets[0];
		$scope.categoryOptions = ['framework', 'tool', 'devops', 'database', 'practice', 'language'];
		$scope.levelOptions = ['hold', 'assess', 'trial', 'adopt'];


		$scope.addNew = function () {
			$scope.selectedItem = {
				phi0: randomFromTo(0, 359),
				r: 15,
				isNew: true
			};
		};

		$scope.save = function () {

			// DO SOMETHING SERVERISH.

			var date = new Date();
			date.setHours(-720);
			$scope.selectedItem.created = date.getTime();

			if ($scope.selectedItem.isNew){
				$scope.selectedItem.isNew = false;
				planets.push($scope.selectedItem);
			}

			draw(isPaused, planets, $scope);
		};

		$(window).resize(drawDebounce());
	}
]);

} ());