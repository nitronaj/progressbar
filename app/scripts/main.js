var ProgressBarModule = (function () {

    var $pb;
    var $opt = {};
    var $defaultOpt = {
        warningBottom: 80,
        warningTop: 100
    }

    var setProgressBar= function($elem){
        $pb = $elem;
    }

    var getProgressBar = function(){
        return $pb;
    }

    var setOption = function($option){
        $option = $option || {};
        $opt = $.extend({},$defaultOpt, $option);
        console.log($opt);

    }

    var setStart = function($start){
        $pb.attr('data-transitiongoal', $start).progressbar({display_text: 'center'});
        checkStatus($start);
    }



    var getProgressBarCurrentValue = function()
    {
        return Math.ceil($pb.attr('data-transitiongoal')) || 0;
    }

    var checkStatus = function($newValue){
        if($newValue <= $opt.warningBottom){
            setProgressBarStatus('normal');
        }else if($newValue > $opt.warningBottom && $newValue <= $opt.warningTop){
            setProgressBarStatus('warning');

        }else{
            setProgressBarStatus('danger');
        }
    }

    var setProgressBarStatus = function ($status){
        $status = $status || 'normal';
        if($status.toLowerCase() == 'warning' ){
            $pb.removeClass('progress-bar-success progress-bar-danger')
            $pb.addClass('progress-bar-warning');
        }else if($status.toLowerCase() == 'danger' ){
            $pb.removeClass('progress-bar-success progress-bar-warning');
            $pb.addClass('progress-bar-danger');
        }else{
            $pb.removeClass('progress-bar-warning progress-bar-danger');
            $pb.addClass('progress-bar-success');
        }
    }


    var increaseProgressBar = function ($amount) {
        var $value = getProgressBarCurrentValue();
        var $newValue = $value + $amount;


        $pb.attr('data-transitiongoal', $newValue).progressbar({display_text: 'center'});
        checkStatus($newValue);

    };


    var decreaseProgressBar = function($amount){
        var $value = getProgressBarCurrentValue();
        var $newValue = $value - $amount;
        $newValue = ($newValue < 0) ? 0 : $newValue;

        $pb.attr('data-transitiongoal', $newValue).progressbar({display_text: 'center'});
        checkStatus($newValue);
    }

    return {

        init: function (elem, option){
            setOption(option);
            setProgressBar(elem);
            setStart(0);
        },
        //elem is jquery object
        setPB: function (elem) {
            setProgressBar(elem)
        },

        getPB: function () {
            return getProgressBar();
        },

        increase: function (percent) {
            increaseProgressBar(percent);
        },

        decrease: function(percent){
            decreaseProgressBar(percent);
        }


    };

})();



$(document).ready(function () {

    var progressbar = $('#progress1 .progress-bar')
    ProgressBarModule.init(progressbar);

    $(".btn-group .dropdown-menu").on('click', 'a', function(){
        var index = $(this).parents('li').index();
        var progressbar = '#progress' + ++index  + ' .progress-bar';
        ProgressBarModule.setPB($(progressbar));
    });

    var $container = $(".container-fluid");

    $container.on('click', '#trigger-minus-10', function(){
        ProgressBarModule.decrease(10);
    });

    $container.on('click', '#trigger-minus-25', function(){
        ProgressBarModule.decrease(25);
    });

    $container.on('click', '#trigger-plus-10', function(){
        ProgressBarModule.increase(10);
    });

    $container.on('click', '#trigger-plus-25', function(){
        ProgressBarModule.increase(25);
    });
});