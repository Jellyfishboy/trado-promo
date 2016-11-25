function ajaxChimpCallback(a) {
    "success" === a.result ? ($(".beta-request-result").show(), $(".beta-request-form").hide(), $(".beta-request-title").hide()) : (a.msg.indexOf("already subscribed") >= 0 ? ($(".beta-request-form").hide(), $(".beta-request-title").hide(), $(".beta-request-already-subscribed").show()) : $(".beta-request-error").show(), $(".beta-request-btn").html("Invite me"))
};
function featherlightConfig()
{
    var configuration = ({
        afterContent: function(event)
        {
            sendContactMessage();
        }
    })
    $('.open-contact-form').click(function()
    {
        $.featherlight('#contactLightbox', configuration);
    });
}
function sendContactMessage() 
{
    $("form.sendingContactMessage").each(function()
    {
        var $form = $(this),
            service_id = "default_service",
            template_id = "trado_contact_message",
            currentModal = $.featherlight.current();

        $form.validate({
            rules: {
                from_name: "required",
                from_email: {
                    required: true,
                    email: true
                },
                message: "required"
            },  
            messages: {
                from_name: "Please enter your name",
                from_email: "Please enter a valid email address",
                message: "Please enter a message."
            },
            submitHandler: function(form, event) {
                var params = $form.serializeArray().reduce(function(obj, item) {
                        obj[item.name] = item.value;
                        return obj;
                    }, {});
                event.preventDefault();
                $form.find("button").text("Sending...");
                emailjs.send(service_id,template_id,params)
                .then(function(){ 
                    alert("Sent!");
                    currentModal.close();
                    $form.find("button").text("Send");
                }, function(err) {
                    $form.find("#errors").append('<p>' + JSON.parse(err.text).service_error + '</p>');
                    $form.find("button").text("Send");
                });
            }
        });
    });
    // $('body').on('submit', 'form#sendingContactMessage', function(event){
    //     // myform.submit(function(event){
    //     event.preventDefault();
    //     $('#errors').html('');

    //     var myform = $(this),
    //         service_id = "default_service",
    //         template_id = "trado_contact_message",
    //         currentModal = $.featherlight.current();
    //         params = myform.serializeArray().reduce(function(obj, item) {
    //         obj[item.name] = item.value;
    //         return obj;
    //     }, {});

    //     myform.validate({
    //         // Specify validation rules
    //         rules: {
    //             // The key name on the left side is the name attribute
    //             // of an input field. Validation rules are defined
    //             // on the right side
    //             from_name: "required",
    //             from_email: {
    //                 required: true,
    //                 // Specify that email should be validated
    //                 // by the built-in "email" rule
    //                 email: true
    //             },
    //             message: "required"
    //         },  
    //         // Specify validation error messages
    //         messages: {
    //             from_name: "Please enter your name",
    //             from_email: "Please enter a valid email address",
    //             message: "Please enter a message."
    //         },
    //         // Make sure the form is submitted to the destination defined
    //         // in the "action" attribute of the form when valid
    //         submitHandler: function(form) {
    //             form.find("button").text("Sending...");
    //             emailjs.send(service_id,template_id,params)
    //             .then(function(){ 
    //                 alert("Sent!");
    //                 currentModal.close();
    //                 form.find("button").text("Send");
    //             }, function(err) {
    //                 form.find("#errors").append('<p>' + JSON.parse(err.text).service_error + '</p>');
    //                 form.find("button").text("Send");
    //             });
    //         }
    //     });
    //     return false;
    // });
}
$(document).ready(function() {

    featherlightConfig();

    $(".beta-request-form").ajaxChimp({
        url: "http://tomdallimore.us9.list-manage.com/subscribe/post?u=b141eef8b30b7dc5813bd752a&amp;id=95c7eadbb9",
        callback: ajaxChimpCallback
    }); 
    $(".beta-request-form").submit(function() {
        ga("send", "event", "invite", "request");
        $(".beta-request-btn").html("<i class='fa fa-spinner fa-spin'></i>"); 
        $(".beta-request-error").hide(); 
        $(".beta-request-already-subscribed").hide();
    });
    if(!$('html').hasClass('touch'))
    {
        $(".first-name").first().focus();
    }else{
        bouncefix.add('html');
    }
    $('[data-ga="true"]').click(function()
    {
        var dataCategory    = $(this).attr('data-event-category'),
            dataAction      = $(this).attr('data-event-action');
        if(dataCategory == '' || dataAction == '')
        {
            return false;
        }
        else
        {
            ga("send", "event", dataCategory, dataAction);
        }
    });
    $('#menu').slicknav({
        label: "",
        brand: "<img src=\"http://cdn0.trado.io/trado-promo/assets/img/cropped.png\" height=\"100\">"
    });
});
jQuery.fn.capitalize = function() {
    return $(this).each(function(a, b) {
        $(b).keyup(function(a) {
            var b = a.target,
                c = $(this).val(),
                d = b.selectionStart,
                e = b.selectionEnd;
            $(this).val(c.replace(/^(.)|(\s|\-)(.)/g, function(a) {
                return a.toUpperCase()
            })), b.setSelectionRange(d, e)
        })
    }), this
};
$(".first-name").capitalize();
$('#documentation .content, #documentation .sidebar').theiaStickySidebar(
{
    additionalMarginTop: 30
});