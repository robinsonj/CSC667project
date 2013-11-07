// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){

    var calendar = $('#calendar')

    // Create calendar cells.
    var cell_id = 0
    for(i = 0; i < 6; i++){
        var new_row = $('<tr></tr>').attr('id', 'week_' + i)
        for(j = 0; j < 7; j++){
            var new_cell = $('<td></td>')
                .attr('id', 'cell_' + cell_id++)
                .attr('class', 'col-md-1')
                .height(80).on("click", function(){
                    if($('#input_time').val() != "" && $('#input_description').val() != ""){
                        var day = $(this).children("div").attr('day_num')
                        $.post("/appointments",
                            {year: year, month: month, day: day, time: $('#input_time').val(), description: $('#input_description').val()},
                            function(success){
                                writeEvent($("td[day_id = " + day + "]"), $('#input_time').val(), $('#input_description').val())
                        })
                    }
            })
            $(new_row).append(new_cell)
        }
        calendar.append(new_row)
    }

    var month = new Date().getMonth()
    var year = new Date().getFullYear()

    setCalendar(month, year)

    $('#dec_year').on("click", function(){
        year--
        resetCalendar()
        setCalendar(month, year)
    })

    $('#inc_year').on("click", function(){
        year++
        resetCalendar()
        setCalendar(month, year)
    })

    $('#inc_month').on("click", function(){
        if(++month > 11){
            month = 0
            year++
        }
        resetCalendar()
        setCalendar(month, year)
    })

    $('#dec_month').on("click", function(){
        if(--month < 0){
            month = 11
            year--
        }
        resetCalendar()
        setCalendar(month, year)
    })
});

function writeEvent(element, time, description){
    element.append(time + ': ' + description + '<br>')
    $('#input_time').val("")
    $('#input_description').val("")
}

function setCalendar(month_int, year){

    var month = new Array();
    month[0]="January"
    month[1]="February"
    month[2]="March"
    month[3]="April"
    month[4]="May"
    month[5]="June"
    month[6]="July"
    month[7]="August"
    month[8]="September"
    month[9]="October"
    month[10]="November"
    month[11]="December"
    var month_string = month[month_int]

    $('#month_year').html('<h5>' + month_string + ' ' + year + '</h5>')

    var num_days = new Date(year, month_int + 1, 0).getDate()
    var first_day = new Date(year, month_int, 1).getDay()
    var day_counter = 1

    for(i = first_day; i < num_days + first_day; i++){
        var cell_id = "cell_" + i
        $("#" + cell_id).attr('day_id', day_counter).html($("<div></div>").attr('day_num', day_counter).html(day_counter))

        cur_date = new Date()

        if(cur_date.getFullYear() == year &&
            cur_date.getMonth() == month_int &&
            cur_date.getDate() == day_counter){
            $("#" + cell_id).css('background-color', '#FFFF66')
        }
        day_counter++
    }



    $.get(
        "/appointments",
        {year: year, month: month_int},
        function(appointments){
            for(j = 0; j < appointments.length; j++){
                writeEvent($("td[day_id = " + appointments[j].day + "]"), appointments[j].time, appointments[j].description)
            }            
        },
        'json'
    )
}

function resetCalendar(){
    for(i = 0; i < 42; i++){
        var cell_id = "cell_" + i
        $("#" + cell_id).html("").css('background-color', '#FFFFFF').removeAttr('day_id')
    }
}
