var ProgressBarModule = (function () {

    var $pb;
    var $opt = {};
    var $defaultOpt = {
        warningBottom: 80,
        warningTop: 95
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
        if($newValue < $opt.warningBottom){
            setProgressBarStatus('normal');
        }else if($newValue >= $opt.warningBottom && $newValue < $opt.warningTop){
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

        checkStatus($newValue);
        $pb.attr('data-transitiongoal', $newValue).progressbar({display_text: 'center'});

    };


    var decreaseProgressBar = function($amount){
        var $value = getProgressBarCurrentValue();
        var $newValue = $value - $amount;
        checkStatus($newValue);
        $pb.attr('data-transitiongoal', $newValue).progressbar({display_text: 'center'});
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
   /* var $pb = $('.progress .progress-bar');


    var $pb1 = $('.progress .progress-bar-success');
    var $pb2 = $('.progress .progress-bar-warning');
    var $pb3 = $('.progress .progress-bar-danger');

    $('#trigger-0').click(function () {
        $pb.attr('data-transitiongoal', 0).progressbar({display_text: 'center'});
    });
    $('#trigger-50').click(function () {
        $pb.attr('data-transitiongoal', 50).progressbar({display_text: 'center'});
    });
    $('#trigger-100').click(function () {
        $pb.attr('data-transitiongoal', 100).progressbar({display_text: 'center'});
    });

    var normal = 0;
    var warning = 0;
    var danger = 0;


    $('#trigger-1').click(function () {
        var oldAttr;
        oldAttr = $pb1.attr('data-transitiongoal') || 0;
        oldAttr = Math.ceil(oldAttr);
        if (oldAttr < 80) {
            normal += 10;
            $pb1.attr('data-transitiongoal', normal).progressbar({display_text: 'center'});
        } else if (oldAttr >= 80 && oldAttr < 95) {
            warning += 5;
            $pb2.attr('data-transitiongoal', warning).progressbar({display_text: 'center'});
        } else {
            danger += 1;
            $pb3.attr('data-transitiongoal', danger).progressbar({display_text: 'center'});
        }
    });*/





    var progressbar = $('.progress .progress-bar')
    ProgressBarModule.init(progressbar);
//    ProgressBarModule.setProgressBar();

    $(".container").on('click', '#trigger-minus-10', function(){
        ProgressBarModule.decrease(10);
    });

    $(".container").on('click', '#trigger-minus-25', function(){
        ProgressBarModule.decrease(25);
    });

    $(".container").on('click', '#trigger-plus-10', function(){
        ProgressBarModule.increase(10);
    });

    $(".container").on('click', '#trigger-plus-25', function(){
        ProgressBarModule.increase(25);
    });
});