(function ($) {

    var langs = {
        en: {
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            second: 'second',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            seconds: 'seconds'
        }
    };

    $.fn.durationPicker = function (options) {

        var defaults = {
            lang: 'en',           
            // TODO put min and max, maybe one specific for field?
            min: 0,
            totalMin: 0,
            max: 59,
            totalMax: 259200000, // 3 days
            showSeconds: false,
            showDays: true
        };
        var settings = $.extend( {}, defaults, options );
                
        this.each(function (i, mainInput) {

            mainInput = $(mainInput);

            if (mainInput.data('bdp') === '1')
                return;

            function buildDisplayBlock(id, hidden) {
                return '<div class="bdp-block '+ (hidden ? 'hidden' : '') + '">' +
                            '<span id="bdp-'+ id +'"></span><br>' +
                            '<span class="bdp-label" id="' + id + '_label"></span>' +
                        '</div>';
            }

            var mainInputReplacer = $('<div class="bdp-input">' +
                buildDisplayBlock('days', !settings.showDays) +
                buildDisplayBlock('hours') +
                buildDisplayBlock('minutes') +
                buildDisplayBlock('seconds', !settings.showSeconds) +
            '</div>');

            mainInput.after(mainInputReplacer).hide().data('bdp', '1');
           
            // Store an instance of moment duration
            var totalDuration = null;

            var inputs = [];

            var disabled = false;
            if (mainInput.hasClass('disabled') || mainInput.attr('disabled')=='disabled') {
                disabled = true;
                mainInputReplacer.addClass('disabled');
            }

            function updateMainInput() {
                mainInput.val(totalDuration.milliseconds());
                mainInput.change(); // FIXME this resets total duration, executes init.
            }

            function updateMainInputReplacer() {
            	
            	console.info("totalDuration object");
            	console.info(totalDuration);
                mainInputReplacer.find('#bdp-days').text(totalDuration.days());
                mainInputReplacer.find('#bdp-hours').text(totalDuration.hours());
                mainInputReplacer.find('#bdp-minutes').text(totalDuration.minutes());
                mainInputReplacer.find('#bdp-seconds').text(totalDuration.seconds());

                mainInputReplacer.find('#days_label').text(totalDuration.humanize('days'));
                mainInputReplacer.find('#hours_label').text(totalDuration.humanize('hours'));
                mainInputReplacer.find('#minutes_label').text(totalDuration.humanize('minutes'));
                mainInputReplacer.find('#seconds_label').text(totalDuration.humanize('seconds'));
            }

            function updatePicker() {
                if (disabled)
                    return;
                inputs.days.val(totalDuration.days());
                inputs.hours.val(totalDuration.hours());
                inputs.minutes.val(totalDuration.minutes());
                inputs.seconds.val(totalDuration.seconds());
            }

            function init() {
                if (mainInput.val() === '') {
                	console.info("EMPTY INPUT");
                	console.info(mainInput.val());
                	mainInput.val(0);
                }
                
                // Initialize moment with locale                
                moment.locale(settings.lang);                
                
                totalDuration = moment.duration(parseInt(mainInput.val(), 10));
                updateMainInputReplacer();
                updatePicker();
            }

            function picker_changed() {
            	totalDuration = moment.duration({
            		seconds : parseInt(inputs.seconds.val()),
            		minutes : parseInt(inputs.minutes.val()),
            		hours : parseInt(inputs.hours.val()),
            		days :  parseInt(inputs.days.val())
            	});            	
                updateMainInput();
                updateMainInputReplacer();
            }

            // TODO assign limits based on the label. Min and Max
            function buildNumericInput(label, hidden, max) {
                var input = $('<input class="form-control input-sm" type="number" min="0" value="0">')
                    .change(picker_changed);
                if (max) {
                    input.attr('max', max);
                }
                inputs[label] = input;
                var ctrl = $('<div> ' + langs[settings.lang][label] + '</div>');
                if (hidden) {
                    ctrl.addClass('hidden');
                }
                return ctrl.prepend(input);
            }

            if (!disabled) {
                var picker = $('<div class="bdp-popover"></div>');
                buildNumericInput('days', false).appendTo(picker);
                buildNumericInput('hours', false, 23).appendTo(picker);
                buildNumericInput('minutes', false, 59).appendTo(picker);
                buildNumericInput('seconds', !settings.showSeconds, 59).appendTo(picker);

                mainInputReplacer.popover({
                    placement: 'bottom',
                    trigger: 'click',
                    html: true,
                    content: picker
                });
            }
            init();
            mainInput.change(init);
        });

    };

}(jQuery));