var time_limit = 30;

var time_out = setInterval(() => {

    if (time_limit == 0) {

        $('#timer').html('Time Over');

    } else {

        if (time_limit < 10) {
            time_limit = 0 + '' + time_limit;
        }

        $('#timer').html('00:' + time_limit);

        time_limit -= 1;

    }

}, 1000);
