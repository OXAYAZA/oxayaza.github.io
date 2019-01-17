/**
 * @desc    A static, reusable donut chart for D3.js v4
 * @module  donutChart
 * @require d3
 * @author  Michael Hall
 * @license MIT
 * @see     https://bl.ocks.org/mbhall88/b2504f8f3e384de4ff2b9dfa60f325e2
 */
function donutChart() {
	var
		floatFormat = d3.format('.4r'),
		percentFormat = d3.format(',.0%'),
		colour = d3.scaleOrdinal( d3.schemeCategory20c ), // colour scheme
		params = {
			width: null,
			height: null,
			thickness: .2,
			variable: null, // value in data that will dictate proportions on chart
			category: null, // compare data by
			fill: null,
			padAngle: null, // effectively dictates the gap between slices
			cornerRadius: null // sets how rounded the corners are on each slice
		};

	function chart(selection){
		selection.each(function(data) {
			// generate chart
			// Set up constructors for making donut. See https://github.com/d3/d3-shape/blob/master/README.md
			var radius = Math.min(params.width, params.height) / 2;

			// creates a new pie generator
			var pie = d3.pie()
				.value(function(d) { return floatFormat(d[params.variable]); })
				.sort(null);

			// contructs and arc generator. This will be used for the donut. The difference between outer and inner
			// radius will dictate the thickness of the donut
			var arc = d3.arc()
				.outerRadius(radius * 0.8)
				.innerRadius(radius * ( 0.8 - params.thickness) )
				.cornerRadius(params.cornerRadius)
				.padAngle(params.padAngle);

			// this arc is used for aligning the text labels
			var outerArc = d3.arc()
				.outerRadius(radius * 0.9)
				.innerRadius(radius * 0.9);

			// append the svg object to the selection
			var svg = selection.append('svg')
				.attr('class', 'donut-chart-svg')
				.attr('width', params.width)
				.attr('height', params.height)
				.attr('viewBox', [ 0, 0, params.width, params.height ].join(' '))
			  .append('g')
				.attr('transform', 'translate(' + params.width / 2 + ',' + params.height / 2 + ')');

			// add labels
			selection.append('div').attr('class', 'donut-chart-labels');

			// g elements to keep elements within svg modular
			svg.append('g').attr('class', 'donut-chart-slices');
			svg.append('g').attr('class', 'donut-chart-lines');

			// add and colour the donut slices
			var path = svg.select('.donut-chart-slices')
				.datum(data).selectAll('path')
				.data(pie)
				.enter().append('path')
				.attr('class', 'donut-chart-slice')
				.attr('fill', function(d) { return d.data[params.fill] ? d.data[params.fill] : colour(d.data[params.category]); })
				.attr('d', arc);

			// add text labels
			var label = selection.select('.donut-chart-labels').selectAll('div')
				.data(pie)
				.enter().append('div')
				.attr('class', function(d) {
					return 'donut-chart-label '+ (midAngle(d) < Math.PI ? 'donut-chart-label-right' : 'donut-chart-label-left');
				})
				.html( function(d) { // add "key: value" for given category.
					return [ '<span class="donut-chart-title">', d.data[params.category], '</span>', ' <span class="donut-chart-percentage">', percentFormat(d.data[params.variable]), '</span>' ].join( '' );
				})
				.style('left', function(d) {
					// effectively computes the centre of the slice.
					// see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
					var pos = outerArc.centroid(d);

					// changes the point to be on left or right depending on where label is.
					pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
					pos[0] = (params.width/2 + pos[0])/params.width*100;
					return pos[0] +'%';
				})
				.style('top', function(d) {
					var pos = outerArc.centroid(d);
					pos[1] = (params.height/2 + pos[1])/params.height*100;
					return pos[1] +'%';
				});

			// IE svg crutch
			selection.select('.donut-chart-labels')
				.style( 'width', function() {
					return params.width +'px'
				})
				.style( 'padding-top', function() {
					return ( params.height/params.width*100 ) +'%';
				});

			// add lines connecting labels to slice. A polyline creates straight lines connecting several points
			var polyline = svg.select('.donut-chart-lines')
				.selectAll('polyline')
				.data(pie)
				.enter().append('polyline')
				.attr('class', 'donut-chart-line')
				.attr('points', function(d) {
					// see label transform function for explanations of these three lines.
					var pos = outerArc.centroid(d);
					pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
					return [arc.centroid(d), outerArc.centroid(d), pos]
				});


			// Functions
			// calculates the angle for the middle of a slice
			function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; }
		});
	}

	// getter and setter functions. See Mike Bostocks post "Towards Reusable Charts" for a tutorial on how this works.
	for ( var key in params ) {
		chart[ key ] = (function( value ) {
			if (!arguments.length) return params[ this ];
			params[ this ] = value;
			return chart;
		}).bind( key );
	}

	return chart;
}
