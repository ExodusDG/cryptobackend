/* COOKIE DATA  */
var cookieArray;
getCookie()

function getCookie() {
    var str = document.cookie;

    cookieArray = str.split(/[;] */).reduce(function(result, pairStr) {
        var arr = pairStr.split('=');
        if (arr.length === 2) { result[arr[0]] = arr[1]; }
        return result;
    }, {});
}

var userID = 'nw9Ih938nGl'

/* GET DASHBOARD DATA */
var targetReach;
var dashData = {};

var settings = {
    "url": "https://server.kattenradar.nl/test-get-dashboard-data",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": {
        "id": userID
    }
};

$.ajax(settings).done(function(response) {
    dashData = response

    generateHTML(dashData)
    initMap(dashData)
});

/* GET DASHBOARD DATA END */
var catName;
var searchLocations = [];
var defCatImage;
var defCatDesc;

function generateHTML(arr) {
    var tipsArray = arr.tips
    var searchArray = arr.searchareas;
    searchLocations = arr.searchareas;
    var statsArray = arr.stats

    targetReach = arr.targetReach
    tipsGenerate(tipsArray)
    searchAreas(searchArray)
    statsGenerate(statsArray)
    console.log(arr)
    defCatImage = arr.catImage
    $('.edit__cat_image').attr('src', arr.catImage)
    $('.chat__inst_text').html('<span>kattenradar </span>' + arr.textContent)
    defCatDesc = arr.textContent;
    $('.chat__fb_text').html(arr.textContent)
    $('.dash__title span').text(arr.userName)
    $('.facebook_ad').attr('href', arr.fbPost)
    $('#insta_ad').attr('href', arr.instaPost)
    catName = arr.catName;
    if (arr.searchStatus == 2) {
        $('#dash_step_2').removeClass('step__incative')
    } else if (arr.searchStatus == 3) {
        $('#dash_step_2').removeClass('step__incative')
        $('#dash_step_3').removeClass('step__incative')
    }
    $('.catfound_button span').text(arr.catName)
    $('.dash__info_desc span').text(arr.catName)
    $('.targetReach').text(arr.targetReach)

    /* SUMMA */
    var impressions = 0;
    $.each(arr.stats.impressions, function(key, value) {
        impressions = impressions + Number(value);
    })
    $('.views > p > span').text(impressions)

    var interactions = 0;
    $.each(arr.stats.interactions, function(key, value) {
        interactions = interactions + Number(value);
    })
    $('.smiles > p > span').text(interactions)

    var likes = 0;
    $.each(arr.stats.likes, function(key, value) {
        likes = likes + Number(value);
    })
    $('.likes > p > span').text(likes)

    if (arr.searchStatus == 3) {
        $('#fb__phone').attr('src', arr.fbMockup)
        $('#insta__phone').attr('src', arr.igMockup)
        console.log(arr.fbMockup)
        return false;
    } else {
        $('#targetReach__text').attr('style', 'display:none')
    }
    $('#fb__phone').attr('src', arr.fbMockup)
    $('#insta__phone').attr('src', arr.igMockup)
}

var circleList = [];

function searchAreas(arr) {
    circleList = arr
    $.each(arr, function(key, value) {
        var searchNumber = key + 1;
        $('.dash__places_items').append(`
<div class="dash__places_block" lat=` + arr[key].lat + ` lng=` + arr[key].lng + ` radius=` + arr[key].radius + ` targetReach=` + arr[key].targetReach + `>
                                    <div>
                                        <h1>Zoekgebied # ` + searchNumber + `</h1>
                                        <p>` + arr[key].city + `, ` + arr[key].street + `</p>
                                    </div>
                                    <div>
                                        <hr>
                                    </div>
                                </div>
`)
    })
}


function tipsGenerate(arr) {
    $.each(arr, function(key, value) {
        var avatarName;
        var tipName;
        if (value.platform == 'FB') {
            avatarName = 'FacebookTip'
            tipName = 'Facebook Tip'
        } else if (value.platform == 'IG') {
            avatarName = 'InstaTip'
            tipName = 'Instagram Tip'
        } else {
            avatarName = 'KattenTip'
            tipName = 'KattenRadar Tip'
        }

        $('.tips__list').append(`<div class="tips__items">
        <img src="img/dashboard/icons/` + avatarName + `.svg" alt="Tip">
        <div class="tips__title">
        <h1>` + tipName + `</h1>
        <p>` + value.date + `</p>
        </div>
        <div class="tips__item">
        <img src="img/dashboard/icons/Bubble.svg" alt="Bubble">
        <div class="tips__text">
                                        <p>` + value.content + `</p>
        </div>
        </div>
        </div>`)
    })
}

var minCircleRadius;

function statsGenerate(arr) {
    viewsGenerate(arr)
    likesGenerate(arr)
    SmilesGenerate(arr)

    function viewsGenerate() {
        //VIEWS
        var firstArray = [];
        var secondArray = [];
        var Arrcounter = 0;
        $.each(arr.impressions, function(key, value) {
            if (Arrcounter < 7) {
                firstArray.push(value)
            } else {
                secondArray.push(value)
            }
            Arrcounter++
        })

        const titleTooltipViews = (tooltipItems) => {
            return 'Views';
        }
        const ctxViews = document.getElementById('viewsChart').getContext('2d');
        const chartViews = new Chart(ctxViews, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: '',
                    data: secondArray,

                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    fill: 'start',
                    backgroundColor: [
                        'rgba(248,163,91, 0.3)',
                    ],
                    borderColor: [
                        'rgba(248,163,91, 1)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        yAlign: 'bottom',
                        backgroundColor: '#F8A35B',
                        titleFontSize: 16,
                        titleFontColor: 'red',
                        bodyFontColor: 'red',
                        bodyFontSize: 14,
                        displayColors: false,
                        callbacks: {
                            title: titleTooltipViews
                        }
                    }
                }
            }
        });

        $('#dash__arrow_right').click(function() {
            $('.week__info').text('2')

            chartViews.data.datasets[0].data = secondArray
            chartViews.update();
        })

        $('#dash__arrow_left').click(function() {
            $('.week__info').text('1')

            chartViews.data.datasets[0].data = firstArray
            chartViews.update();
        })
    }

    function likesGenerate() {
        var firstArray = [];
        var secondArray = [];
        var Arrcounter = 0;
        $.each(arr.likes, function(key, value) {
                if (Arrcounter < 7) {
                    firstArray.push(value)
                } else {
                    secondArray.push(value)
                }
                Arrcounter++
            })
            //Likes
        const titleTooltipLikes = (tooltipItems) => {
            return 'Likes';
        }
        const ctxLikes = document.getElementById('likesChart').getContext('2d');
        const chartLikes = new Chart(ctxLikes, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: '',
                    data: secondArray,
                    fill: 'start',
                    backgroundColor: [
                        'rgba(248,163,91, 0.3)',
                    ],
                    borderColor: [
                        'rgba(248,163,91, 1)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        yAlign: 'bottom',
                        backgroundColor: '#F8A35B',
                        titleFontSize: 16,
                        titleFontColor: 'red',
                        bodyFontColor: 'red',
                        bodyFontSize: 14,
                        displayColors: false,
                        callbacks: {
                            title: titleTooltipLikes
                        }
                    }
                }
            }
        });
        $('#dash__arrow_right').click(function() {
            $('.week__info').text('2')

            chartLikes.data.datasets[0].data = secondArray
            chartLikes.update();
        })

        $('#dash__arrow_left').click(function() {
            $('.week__info').text('1')

            chartLikes.data.datasets[0].data = firstArray
            chartLikes.update();
        })
    }

    function SmilesGenerate() {
        var firstArray = [];
        var secondArray = [];
        var Arrcounter = 0;
        $.each(arr.interactions, function(key, value) {
                if (Arrcounter < 7) {
                    firstArray.push(value)
                } else {
                    secondArray.push(value)
                }
                Arrcounter++
            })
            //Likes
        const titleTooltipInteractions = (tooltipItems) => {
            return 'Interactions';
        }
        const ctxSmiles = document.getElementById('smilesChart').getContext('2d');
        const chartSmiles = new Chart(ctxSmiles, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [{
                    label: '',
                    data: secondArray,
                    fill: 'start',
                    backgroundColor: [
                        'rgba(248,163,91, 0.3)',
                    ],
                    borderColor: [
                        'rgba(248,163,91, 1)',
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        yAlign: 'bottom',
                        backgroundColor: '#F8A35B',
                        titleFontSize: 16,
                        titleFontColor: 'red',
                        bodyFontColor: 'red',
                        bodyFontSize: 14,
                        displayColors: false,
                        callbacks: {
                            title: titleTooltipInteractions
                        }
                    }
                }
            }
        });
        $('#dash__arrow_right').click(function() {
            $('.week__info').text('2')

            chartSmiles.data.datasets[0].data = secondArray
            chartSmiles.update();
        })

        $('#dash__arrow_left').click(function() {
            $('.week__info').text('1')

            chartSmiles.data.datasets[0].data = firstArray
            chartSmiles.update();
        })
    }
}


$('.arrow').hover(function() {
    imagePath = $(this).find('img').attr('src').replace('.svg', '');
    $(this).find('img').attr('src', imagePath + '_hover.svg');
}, function() {
    $(this).find('img').attr('src', imagePath + '.svg')
});


$('.dash__stats_arrow').hover(function() {
    imagePath = $(this).find('img').attr('src').replace('.svg', '');
    $(this).find('img').attr('src', imagePath + '_hover.svg');
}, function() {
    $(this).find('img').attr('src', imagePath + '.svg')
});
setTimeout(() => {

}, 1000);

var circlesArray = []
var currentCircle = [];
var poly, map, bounds;
var mapRadius;
var cityCircleNew;
var targetReach;

function initMap() {

    let mapTimer = setInterval(() => {
        if (searchLocations.length == 0) {

        } else {
            initMapDash()
            clearInterval(mapTimer);
        }
    }, 100);

    function initMapDash() {
        const componentForm = [
            'location',
            'locality',
            'administrative_area_level_1',
            'country',
            'postal_code',
        ];
        var zoomNumber = 13;

        var mapConfig = {
            center: {
                lat: Number(searchLocations[0].lat),
                lng: Number(searchLocations[0].lng),
            },
            radius: searchLocations[0].radius
        }
        map = new google.maps.Map(document.getElementById("dash_map"), {
            zoom: Number(zoomNumber),
            center: mapConfig.center,
            mapTypeControl: false,
            mapTypeId: "terrain",
            fullscreenControl: false,
            zoomControl: false,
            draggable: false,
            scrollwheel: false,
            streetViewControl: false
        });

        var cityCircle = new google.maps.Circle({

        });

        setTimeout(() => {
            $(".dash__places_block").trigger('click');

            $(".dash__places_block").first().trigger('click');
            $(".dash__places_block").first().addClass('dash__places_active')
        }, 500);

        var productTypes = [];
        var thisCircle;
        $.ajax({
            url: 'https://server.kattenradar.nl/get-extension-product-types',
            method: 'get',
            dataType: 'json',
            async: false,
            data: productTypes,
            success: function(data) {
                productTypes = data.extendArea;
            }
        });

        circlesArray.reverse()

        $('.dash__places_items').delegate('.dash__places_block', 'click', function() {
            $(".dash__places_block").removeClass('dash__places_active')
            $(this).addClass('dash__places_active')
            if ($(this).attr('on-map') == 'true') {
                map.setCenter(new google.maps.LatLng(Number($(this).attr('lat')), Number($(this).attr('lng'))));
                var currentLat = Number($(this).attr('lat'))

                $.each(circlesArray, function(key, value) {
                    if (currentLat == value.circleLat) {} else {
                        value.circleArray.setRadius(Number(value.circleRadius + '000'))
                    }
                })

                $('.search__map_population').text($(this).attr('targetReach') + ' + ')
                var radius = Number($(this).attr('radius'));
                minCircleRadius = radius;
                prevRadius = minCircleRadius;
                var scrollWidth = radius * 55;
                //    $('.map__radius_draggable').attr('style', 'left:' + scrollWidth + 'px')
                $.each(productTypes, function(key, value) {
                    if (value.radius == radius) {
                        //    $('.range__km').text(Number($(this).attr('radius')) + ' km')
                        //    $('.range__price').text(value.price + ' €')
                        return false;
                    }
                })

                if (radius == 1) {
                    map.setZoom(13.5)
                } else if (radius == 2) {
                    map.setZoom(13)
                } else if (radius == 3) {
                    map.setZoom(13)
                } else if (radius == 4) {
                    map.setZoom(12)
                } else if (radius == 5) {
                    map.setZoom(12)
                } else if (radius == 6) {
                    map.setZoom(11.7)
                } else if (radius == 7) {
                    map.setZoom(11.5)
                } else if (radius == 8) {
                    map.setZoom(11)
                }
                $.each(circlesArray, function(key, value) {
                    if (currentLat == value.circleLat) {
                        currentCircle = this.circleArray
                        return false;
                    } else {

                    }
                })
                prevCircle = currentCircle


            } else {
                thisCircle = $(this)
                updateCircle(thisCircle)
            }
        })



        var currentArray = []

        function updateCircle(thisCircle) {
            map.setCenter(new google.maps.LatLng(Number(thisCircle.attr('lat')), Number(thisCircle.attr('lng'))));
            thisCircle.attr('on-map', 'true')
            cityCircle = new google.maps.Circle({
                strokeColor: "#F8A35B",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#F8A35B",
                fillOpacity: 0.3,
                clickable: false,
                map,
                center: { lat: Number(thisCircle.attr('lat')), lng: Number(thisCircle.attr('lng')) },
                radius: Number(thisCircle.attr('radius') + '000'),
            });

            minCircleRadius = Number(thisCircle.attr('radius'))
            currentArray = {
                circleLat: thisCircle.attr('lat'),
                targetReach: thisCircle.attr('targetReach'),
                circleRadius: thisCircle.attr('radius'),
                circleArray: cityCircle
            }
            targetReach = thisCircle.attr('targetReach'),
                circlesArray.push(currentArray)

            var scrollWidth = Number(thisCircle[0].attributes.radius.value) * 50;
            //    $('.map__radius_draggable').attr('style', 'left:' + scrollWidth + 'px')

            $.each(productTypes, function(key, value) {
                if (value.radius == Number(thisCircle[0].attributes.radius.value)) {
                    //    $('.range__km').text(Number(thisCircle[0].attributes.radius.value) + ' km')
                    //    $('.range__price').text(value.price + ' €')
                    return false;
                }
            })
        }

        /* RANGE DRAGGABLE */
        var trackStep = $('.map__radius_track').width();
        mapRadius = 1000
        var productType = 1;
        var mapZoom;
        var radiusZoom;
        $(".map__radius_draggable").draggable({
            containment: "parent",
            axis: "x",

            drag: function(e, ui) {
                x2 = ui.position.left;
                var trackPercent = ((x2 * 110) / trackStep).toFixed(0)

                if ($('.dash__places_select').attr('style') == 'display: flex') {
                    radiusZoom = 1;
                } else {
                    radiusZoom = (currentCircle.radius / 1000) - 1
                }


                if (trackPercent > (11 * 8.5)) {
                    var radiusKM = 8;
                    $('.range__km').text('8 km')
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)

                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(11)
                        mapZoom = 11;
                    } else {
                        map.setZoom(mapZoom)
                    }

                } else if (trackPercent > (11 * 7)) {
                    var radiusKM = 7;
                    $('.range__km').text('7 km')
                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(11.5)
                        mapZoom = 11.5;
                    } else {
                        map.setZoom(mapZoom)
                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                } else if (trackPercent > (11 * 6)) {
                    var radiusKM = 6;
                    $('.range__km').text('6 km')
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)

                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(11.5)
                        mapZoom = 11.5;
                    } else {
                        map.setZoom(mapZoom)
                    }
                } else if (trackPercent > (10 * 5)) {
                    var radiusKM = 5;
                    $('.range__km').text('5 km')
                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(12)
                        mapZoom = 12;
                    } else {
                        map.setZoom(mapZoom)
                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                } else if (trackPercent > (10 * 4)) {
                    var radiusKM = 4;
                    $('.range__km').text('4 km')
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(12)
                        mapZoom = 12;
                    } else {
                        map.setZoom(mapZoom)
                    }
                } else if (trackPercent > (11 * 2)) {
                    var radiusKM = 3;
                    $('.range__km').text('3 km')
                    if (radiusZoom < radiusKM) {
                        console.log(radiusZoom < radiusKM)
                        map.setZoom(12.5)
                        mapZoom = 12.5;
                    } else {
                        map.setZoom(mapZoom)
                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                } else if (trackPercent > (5 * 2)) {
                    var radiusKM = 2;
                    $('.range__km').text(radiusKM + ' km')
                    if (radiusZoom < radiusKM) {

                        map.setZoom(13.5)
                        mapZoom = 13.5;
                    } else {
                        map.setZoom(mapZoom)
                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                } else if (trackPercent > (10 * 1)) {
                    var radiusKM = 1;
                    $('.range__km').text('1 km')
                    if (radiusZoom < radiusKM) {

                        map.setZoom(14)
                        mapZoom = 14;
                    } else {
                        map.setZoom(mapZoom)
                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                } else if (trackPercent < (10 * 1)) {
                    var radiusKM = 1;
                    $('.range__km').text('1 km')
                    if (radiusZoom < radiusKM) {
                        map.setZoom(16)
                        mapZoom = 16;
                    } else {
                        map.setZoom(mapZoom)

                    }
                    productTypesArr(radiusKM)
                    currentCircleUpdate(radiusKM)
                }

            }
        });

        function productTypesArr(radiusKM) {
            $.each(productTypes, function(key, value) {
                if (value.radius == radiusKM) {
                    $('.range__price').text(value.price + ' €')
                    $('.map__price_count span').text(value.discount)

                    $('.dash__radius_number').text(value.impressions)
                    productType = $('.range__km').text().replace(' km', '')
                    cityCircle.setRadius(Number(radiusKM + '000'));
                    if (cityCircleNew) {
                        cityCircleNew.setRadius(Number(radiusKM + '000'));
                    }
                }
            })
        }

        /* MAP ADD LOCATION */

        $('.dash__places_button button').click(function() {
            $('.search__map_center').attr('style', 'display: none')
            $('.search__map_population').attr('style', 'display: none')
            $('.dash__places_lists').attr('style', 'display: none')
            $('.dash__places_select').attr('style', 'display: flex')
            $(this).addClass('select__new_zone')

        })

        $('.select__new_zone').click(function() {
            $('.search__map_center').attr('style', 'display: block')
            $(".dash__places_block").first().trigger('click');
            $('.search__map_population').attr('style', 'display: inline-block')
            $('.dash__places_lists').attr('style', 'display: flex')
            $('.dash__places_select').attr('style', 'display: none')
            $(this).removeClass('select__new_zone')

        })

        function currentCircleUpdate(radiusKM) {
            if (radiusKM < minCircleRadius) {
                return false;
            } else {
                if ($('.dash__places_lists').attr('style') == 'display: none') {} else {
                    currentCircle.setRadius(Number(radiusKM + '000'));
                }
            }
        }

        $('.select__new_zone').click(function() {
            $.ajax({
                url: 'https://server.kattenradar.nl/get-extension-product-types',
                method: 'get',
                dataType: 'json',
                async: false,
                data: productTypes,
                success: function(data) {
                    productTypes = data.newArea;
                }
            });
        })

        $('#map__button_top').click(function() {
            var settings = {
                "url": "https://server.kattenradar.nl/test-payment-extension",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "id": userID,
                    "catName": catName,
                    "productType": productType
                }

            };
            $.ajax(settings).done(function(response) {
                window.open(response.redirectLink);
            });
        })
    }
    const autocompleteInput = document.getElementById('dash__location');
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
    });

    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        adressSelect()
    });

    function adressSelect() {
        $('.search__map_center').attr('style', 'display: block')
        const place = autocomplete.getPlace();
        map.setCenter(place.geometry.location);
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert('No details available for input: \'' + place.name + '\'');
            return;
        }
        renderAddress(place);
        //  fillInAddress(place);

        var markersArray = [];
        markersArray.push(
            [
                place.name, {
                    center: place.geometry.location,
                    population: mapRadius,
                }
            ]
        )

        if (cityCircleNew == null) {
            cityCircleNew = new google.maps.Circle({
                strokeColor: "#F8A35B",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#F8A35B",
                fillOpacity: 0.3,
                map,
                center: markersArray[0][1].center,
                radius: 1000,
            });
        } else {
            cityCircleNew.setMap(null)
            cityCircleNew = new google.maps.Circle({
                strokeColor: "#F8A35B",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#F8A35B",
                fillOpacity: 0.3,
                map,
                center: markersArray[0][1].center,
                radius: 1000,
            });

        }

        prevCircle = cityCircleNew;
        var currentArray = {
            circleLat: place.geometry.location.lat().toString(),
            circleArray: cityCircleNew
        }
        circlesArray.push(currentArray)
        console.log(circlesArray)
        map.setZoom(14)
        $('.map__radius_draggable').css('left', '0px')
    }


    function renderAddress(place) {

        map.setCenter(place.geometry.location);
        //    marker.setPosition(place.geometry.location);
        //  marker.setVisible(true);
    }
}

$('.dash__stats_link').click(function() {
    var clickedSlide;
    if ($(this).attr('id') == 'views_link') {
        clickedSlide = 0;

        $('.dash__stats_info > div').removeClass('stats__active')
        $('.views').addClass('stats__active')
        $('.views__top_link').addClass('stats__active')

    } else if ($(this).attr('id') == 'likes_link') {
        clickedSlide = 1;

        $('.dash__stats_info > div').removeClass('stats__active')
        $('.likes').addClass('stats__active')
        $('.likes__top_link').addClass('stats__active')

    } else {
        clickedSlide = 2;
        $('.smiles__top_link').addClass('stats__active')
        $('.dash__stats_info > div').removeClass('stats__active')
        $('.smiles').addClass('stats__active')
    }

    $('.dash__stats_link').removeClass('stats__active')
    $(this).addClass('stats__active')

    var translateWidth = clickedSlide * $('canvas').width();

    $('.canvas__wrapper').attr('style', 'transform: translateX(-' + translateWidth + 'px)')
})


$('.dash__stats_info div').click(function() {
    $('.dash__stats_link').removeClass('stats__active')
    $('.dash__stats_info > div').removeClass('stats__active')
    var clickedSlide;
    if ($(this).attr('id') == 'views_link') {
        clickedSlide = 0;
        $('.views').addClass('stats__active')
        $('.views__top_link').addClass('stats__active')

    } else if ($(this).attr('id') == 'likes_link') {
        clickedSlide = 1;

        $('.likes').addClass('stats__active')
        $('.likes__top_link').addClass('stats__active')
    } else {
        clickedSlide = 2;
        $('.smiles').addClass('stats__active')
        $('.smiles__top_link').addClass('stats__active')
    }
    $(this).addClass('stats__active')

    var translateWidth = clickedSlide * $('canvas').width();

    $('.canvas__wrapper').attr('style', 'transform: translateX(-' + translateWidth + 'px)')
})
$('.catfound__button, .dash__stop_button button').click(function() {
    setTimeout(() => {
        $('.catfound').addClass('feedbackShow');
    }, 100);
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
})

$('.popup_close_cat').click(function() {
    catFoundClose()
})

$('.feedback').click(function() {
    catFoundClose()
})

$('.catfound_red_back').click(function() {
    catFoundClose()
})
$('.blur__wrapper').click(function() {


    if ($('.catfound').hasClass('feedbackShow')) {
        catFoundClose()
    }
})

$('.catfound_orange').click(function() {

    $('.catfound__button, .dash__stop_button button').text('Geef ons een beoordeling')
})
$('.catfound_2').click(function() {
    $('#chat__msg_1 p').text('Wat vervelend dat ' + catName + ' nog niet thuisgekomen is. We gaan wel de zoekactie voor je stopzetten.')
    $('#chat__msg_2 p').text('Wil je ons nog iets laten weten of heb je feedback voor KattenRadar?')
    $('.catfound__button, .dash__stop_button button').text('Geef ons een beoordeling')
})

function catFoundClose() {
    $('.catfound').removeClass('feedbackShow');
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')

    header.addClass('header__fixed')
    header.removeClass('header__hidden')
}

$('.review_star').click(function() {
    var clickedStar = Number($(this).attr('id').replace('star_', ''))

    if (clickedStar == 1) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        leaveFeedback()
    } else if (clickedStar == 2) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        leaveFeedback()
    } else if (clickedStar == 3) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
        leaveFeedback()
    } else if (clickedStar == 4) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
        $('#star_4').find('path').attr('fill-opacity', '1')
        leaveFeedback()
    } else if (clickedStar == 5) {
        $('.review_star').find('path').attr('fill-opacity', '0.1')
        $('#star_1').find('path').attr('fill-opacity', '1')
        $('#star_2').find('path').attr('fill-opacity', '1')
        $('#star_3').find('path').attr('fill-opacity', '1')
        $('#star_4').find('path').attr('fill-opacity', '1')
        $('#star_5').find('path').attr('fill-opacity', '1')
        reviewStep();
    }

})

$('.catfound_orange').click(function() {
    $('.catfound__block').attr('style', 'display: none')
    $('.feedback__stars').attr('style', 'display: block')
})

function reviewStep() {
    $('.catfound').addClass('catfound__big')
    $('.catfound__block').attr('style', 'display: none')
    $('.feedback__stars').attr('style', 'display: none')
    $('.feedback_review').attr('style', 'display: block')
    $('.feedback_reviews').attr('style', 'display: none')
}

function leaveFeedback() {
    $('.catfound').addClass('catfound__big')
    $('.catfound__block').attr('style', 'display: none')
    $('.feedback__stars').attr('style', 'display: none')

    $('.feedback_reviews').attr('style', 'display: block')
}
$('.catfound__2_button').click(function() {
    leaveFeedback()
})
$('.feedback__send').click(function() {
    var typedText = $('#feedback').val();
    $('.feedback__input').attr('style', 'display: none')
    $('#bot__msg_1').attr('style', 'display: flex')
    $('.chat__user_text_body p ').text(typedText);
    $('.cat__name_chat').attr('style', 'display: flex')
    $('.cat__name_chat').addClass('user__msg_show');
})


/* EDIT DATA  */

var imageData;

$(".data__edit_photo img").click(function() {
    $("input[type='file'").trigger('click');
});

var base64Img;

var imageReplace = false;
var textReplace = false;

function encodeImage(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        getCookie()
        var urlencoded = new URLSearchParams();

        urlencoded.append("img", reader.result);
        urlencoded.append("id", userID);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://server.kattenradar.nl/test-upload-edit-image", requestOptions)
            .then(response => response.text())
            .then(result => {
                result = result.replace('"', '').replace('"', '')
                $('.chat__phone__body').attr('style', 'background: url(' + result + ')')
                $('.chat__phone__body').html('');
                $('.image__photo_upload').attr('style', 'display: none')
                $('.imagebox').attr('style', 'display: block')
                $('#file').prop('value', null);
            })
            .catch(error => console.log('error', error));
        if (imageReplace == false) {
            var currentPrice = Number($('.data_edit_price').text().replace('€', ''))
            $('.data_edit_price').text('€' + Number(currentPrice + 2))
            imageReplace = true;
        }
        $('.cat_image').attr('src', 'data:image/jpeg;base64' + reader.result)
    }
    reader.readAsDataURL(file);
}



$('#removeImg').click(function() {
    $('#file').prop('value', null);
    $('.imagebox').attr('style', 'display: none')
    $('.image__photo_upload').attr('style', 'display: block')
    var price = $('.data_edit_price').text().replace('€', '')
    $('.data_edit_price').text('€' + (price - 2))
    $('.edit__cat_image').attr('src', defCatImage)
})

$('.data__edit_send').click(function() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("img", base64Img);
    urlencoded.append("id", 'nw9Ih938nGl');
    urlencoded.append("text", $('#desc__change').val());


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://server.kattenradar.nl/test-edit-search", requestOptions)
        .then(response => response.text())
        .then(result => {
            alert(result)

            $('.data__edit').removeClass('feedbackShow')
            $('.blur__wrapper').attr('style', 'filter: blur(0px)')
        })
        .catch(error => console.log('error', error));
})

$('#dash__edit_button').click(function() {

    setTimeout(() => {
        $('.data__edit').addClass('feedbackShow')
    }, 100);
    header.removeClass('header__fixed')
    header.addClass('header__hidden')
    $('.blur__wrapper').attr('style', 'filter: blur(10px)')
})


/* LEAFLET MAP */
var secondMap;
secondMap = L.map('tip__mapbox', {
    zoomControl: false,
    gestureHandling: true
}).setView([0, 0], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 64,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FuaXN0cmF5IiwiYSI6ImNreGVueTljbTEzdTAybm1tYXRzaHBnaTYifQ.Ux9ySMRvhgcwFd7_gPXCWg',
}).addTo(secondMap);

var mapMarker = L.icon({
    iconUrl: 'img/dashboard/icons/dash_edit_marker.svg',
    iconSize: [35, 46],
    iconAnchor: [17, 46],
    popupAnchor: [-3, -45] // point from which the popup should open relative to the iconAnchor
});

var lastTipDate;

function tipsGenerate(arr) {
    $.each(arr, function(key, value) {
        var avatarName;
        var tipName;
        tipAray = arr;
        if (value.platform == 'FB') {
            avatarName = 'FacebookTip'
            tipName = 'Facebook Tip'
        } else if (value.platform == 'IG') {
            avatarName = 'InstaTip'
            tipName = 'Instagram Tip'
        } else {
            avatarName = 'KattenTip'
            tipName = 'KattenRadar Tip'
        }

        var date = value.date;

        var dateYear = date.substr(0, 4)
        date = date.replace(dateYear + '-', '')
        var dateMonth = date.substr(0, 2)
        date = date.replace(dateMonth + '-', '')
        var dateDay = date.substr(0, 2)
        date = date.replace(dateDay, '')
        var timeDay = date.substr(1, 5)

        if (lastTipDate != dateDay + '.' + dateMonth + '.' + dateYear) {
            $('.tips__list').append(`<div class="tip__date">
            <div>
                <p>` + dateDay + ' / ' + dateMonth + ' / ' + dateYear + `</p>
            </div>
            <hr>
        </div>`)
        }

        $('.tips__list').append(`<div class="tips__items" id=tip_` + key + `>
        <img src="img/dashboard/icons/` + avatarName + `.svg" alt="Tip">
        <div class="tips__title">
        <h1>` + tipName + `</h1>
        <p>` + dateDay + ' / ' + dateMonth + ' / ' + dateYear + ' | ' + timeDay + `</p>
        </div>
        <div class="tips__item">
        <img src="img/dashboard/icons/Bubble.svg" alt="Bubble">
        <div class="tips__text">
                                        <p>` + value.content + `</p>
        </div>
        </div>
        </div>`)

        lastTipDate = dateDay + '.' + dateMonth + '.' + dateYear;
    })
    var thisTip;
    $('.tips__list > div').click(function() {
        var clikedTip = Number($(this).attr('id').replace('tip_', ''))
        thisTip = tipAray[clikedTip]

        if (typeof thisTip.location != 'undefined') {
            $('.tip_map').attr('style', 'display: block')

            var markersList = [];
            markersList.push(thisTip.location.lat)
            markersList.push(thisTip.location.lng)
            secondMap.setView([thisTip.location.lat, thisTip.location.lng], 16);
            var marker = L.marker([Number(markersList[0]), Number(markersList[1])], { icon: mapMarker }).addTo(secondMap);

        } else {
            $('.tip_map').attr('style', 'display: none')
        }

        $('.tip__desc').text(thisTip.content)

        if (typeof thisTip.location != 'undefined') {
            $('.tips__loc').attr('style', 'display: block')
            $('.tip__data_adress p').text(thisTip.location.name)
        } else {
            $('.tips__loc').attr('style', 'display: none')
        }

        if (thisTip.platform == 'FB') {
            $('.tip__title_popup').text('Tip via Facebook')
        } else if (thisTip.platform == 'IG') {
            $('.tip__title_popup').text('Tip via Instagram')
        } else {
            $('.tip__title_popup').text('Tip via KattenRadar')
        }



        if (typeof thisTip.sightingDate != 'undefined') {
            $('.tip__data_time').attr('style', 'display: flex')

            var date = thisTip.sightingDate;
            var dateYear = date.substr(0, 4)
            date = date.replace(dateYear + '-', '')
            var dateMonth = date.substr(0, 2)
            date = date.replace(dateMonth + '-', '')
            var dateDay = date.substr(0, 2)
            date = date.replace(dateDay, '')
            var timeDay = date.substr(1, 5)

            $('#tip_day').text(dateDay)
            $('#tip_month').text(dateMonth)
            $('#tip_year').text(dateYear)
            $('#tip_time').text(timeDay)
        } else {
            $('.tip__data_time').attr('style', 'display: none')
        }



        if (typeof thisTip.contactDetails != 'undefined') {
            $('.tip_contact').attr('style', 'display: flex')
            $('.tip_contact p').text(thisTip.contactDetails)
        } else {
            $('.tip_contact').attr('style', 'display: none')
        }
        var tipsH = $('.tips__info').height()
        $('.tips__info').attr('style', 'top: calc((100vh - ' + tipsH + 'px)/2)')

        setTimeout(() => {
            $('.tips__info').addClass('feedbackShow')
        }, 100);

        header.addClass('header__fixed')
        header.removeClass('header__hidden')
        $('.blur__wrapper').attr('style', 'filter: blur(10px)')
    })
    $('.popup_close_tips').click(function() {
        $('.blur__wrapper').attr('style', 'filter: blur(0px)')
        $('.tips__info').removeClass('feedbackShow')
    })
}

$('.blur__wrapper').click(function() {
    if ($('.tips__info').hasClass('feedbackShow')) {
        $('.tips__info').removeClass('feedbackShow')
        $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    }

    if ($('.data__edit').hasClass('feedbackShow')) {
        $('.data__edit').removeClass('feedbackShow')
        $('.blur__wrapper').attr('style', 'filter: blur(0px)')
    }
})

$('.popup_close_cat').click(function() {
    $('.data__edit').removeClass('feedbackShow')
    $('.blur__wrapper').attr('style', 'filter: blur(0px)')
})

var backendText = $('.chat_edit_cat_text').text()

$('#desc__change').val(backendText.replace('kattenradar ', ''))
var originalText = backendText.replace('kattenradar ', '');
price = 0;
$('#desc__change').keyup(function() {
    var userText = $(this).val();
    $('.chat_edit_cat_text').html('<span>kattenradar</span>' + userText)

    if (userText == originalText) {
        price = $('.data_edit_price').text().replace('€', '')
        $('.data_edit_price').text('€' + (price - 2))
    }
});

var editText = $('#desc__change').val();

$('#desc__change').keyup(function() {
    if (textReplace == false) {
        var currentPrice = Number($('.data_edit_price').text().replace('€', ''))
        $('.data_edit_price').text('€' + Number(currentPrice + 2))
        textReplace = true;
    }

    var currentText = $(this).val();

    if (currentText = !editText) {
        $('.data__edit_send').prop("disabled", true);
    } else {
        $('.data__edit_send').prop("disabled", false);
    }
});


$('#dash__edit_button').click(function() {
    $('#desc__change').val(defCatDesc);
    $('#edit__cat_image').attr('src', defCatImage);
    $('.data_edit_price').text('€0')
})

$('.stars_skip_wrapper').click(function() {
    leaveFeedback()
})