// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function(){

    var calendar = $('#calendar')

    // Create calendar cells.
    var cell_id = 0
    for(i = 0; i < 5; i++){
        var new_row = $('<tr></tr>').attr('id', 'week_' + i)
        for(j = 0; j < 7; j++){
            var new_cell = $('<td></td>')
                .attr('id', 'cell_' + cell_id++)
                .attr('class', 'col-md-1')
                .height(80).on("click", function(){
                    if($('#input_time').val() != "" && $('#input_description').val() != ""){
                        $(this).append($('#input_time').val() + ': ' + $('#input_description').val() + '<br>')
                        $('#input_time').val("")
                        $('#input_description').val("")
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
        $("#" + cell_id).html(day_counter + "<br>")

        cur_date = new Date()

        if(cur_date.getFullYear() == year &&
            cur_date.getMonth() == month_int &&
            cur_date.getDate() == day_counter){
            $("#" + cell_id).css('background-color', '#FFFF66')
        }
        day_counter++
    }
}

function resetCalendar(){
    for(i = 0; i < 35; i++){
        var cell_id = "cell_" + i
        $("#" + cell_id).html("").css('background-color', '#FFFFFF')
    }
}
