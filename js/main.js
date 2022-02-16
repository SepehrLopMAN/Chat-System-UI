    var chatnum = 1;
    var photoCol = document.getElementById("new_cont_photo");
    var newContactName = document.getElementById("contact_name_inp");
    var newContactSname = document.getElementById("contact_sname_inp");
    var chatBot = $(".current-chat").height();
    var message_inp = $("#msg_input");
    var msg_inp = document.getElementById("msg_input");
    var Offshiftchars = [ "`","1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "-", "=", "q", "w", "e", "r", "t", "y", "u", "i",
        "o", "p", "[", "]", "\\", "a", "s", "d", "f", "g", "h",
        "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n","m",",",".","/"
    ];

    var Onshiftchars = ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",
    "_", "+", "Q", "W", "E", "R", "T", "Y", "U", "I",
        "O", "P", "{", "}", "|", "A", "S", "D", "F", "G", "H",
        "J", "K", "L", ":", "\"", "Z", "X", "C", "V", "B", "N","M","<",">","?"
    ];

    
    function contPhotoColor(elem) { 
        photoCol.style.color = elem;
    }

    function addNewContact() {
        if( newContactName.value === "" || newContactSname.value === ""){
            $("#contact_name_inp").addClass("red-border");
            $("#contact_sname_inp").addClass("red-border");
        }
        else{
            $("#modal").fadeOut("0.6s");
            $(".contacts").append("<div id='contact" + chatnum +"' onclick=\"showChat("+ chatnum +");\"><div class='contact-photo'><div><i class='fas fa-user-circle fa-3x' style='color:"+photoCol.style.color+";'></i></div></div><div class='contact-name'><div>"+newContactName.value+" "+newContactSname.value+"</div></div><div class='recent-pv-pm current-recent-msg' id='last_PM"+chatnum+"'></div></div>");
            $("#conversation").append("<div id='chat"+chatnum+"' class='chat'> </div>");
            newContactName.value = "";
            newContactSname.value= "";
            showChat(chatnum);
            chatnum++;
        }
    }

    function showChat(numid) {
        $(".current-chat").hide("0.5s");
        $("div").removeClass("current-chat");
        $("div").removeClass("current-contact");
        $("div").removeClass("current-recent-msg")
        $("#chat"+numid).show("0.6s");
        $("#chat"+numid).addClass("current-chat");
        $("#contact"+numid).addClass("current-contact");
        $("#last_PM"+numid).addClass("current-recent-msg");
    }

    message_inp.focus( () => {
        $("#keyboard").slideDown(500, () => {
            $(".kb-row").css("display","flex");
            $("#conversation").animate({scrollTop: chatBot},400);
        });
    });

    function hideKB(){ // hide on-screen keyboard
        $("#keyboard").slideUp(500);
        $(".kb-row").css("display","none");
    }
    function onSCRkbVal(e,i) { //on-screen keybaord value
        (i === parseInt(i))? i = String.fromCharCode(i): i ;
        (e === parseInt(e))? e = String.fromCharCode(e): e ;
        msg_inp.value += ($("#shift_btn").hasClass("shift-active"))? i:e;
        $("#shift_btn").removeClass("shift-active");
        for( s = 0 ; s < 47 ; s++ )   {
            btn = document.getElementById("key" + s );
            btn.innerHTML = Offshiftchars[s];
        }
    }
    function ToggleShift(){
        var shiftBtn = $("#shift_btn");
        if(shiftBtn.hasClass("shift-active")) {
            shiftBtn.removeClass("shift-active");
            for( i = 0 ; i < 47 ; i++ ){
                btn = document.getElementById("key" + i );
                btn.innerHTML = Offshiftchars[i];
            }
        }
        else {
            shiftBtn.addClass("shift-active");
            for( i = 0 ; i < 47 ; i++ ){
                btn = document.getElementById("key" + i );
                btn.innerHTML = Onshiftchars[i];
            }
        }
    }
    $("#backsp_btn").click( () => {
        msg_inp.value = msg_inp.value.substr(0, msg_inp.value.length - 1);
    });
    function sendPM() {
        if(msg_inp.value!=""){

            message_inp.each( () => {
                var str = message_inp.val();
                var newmsg = str.match(/.{1,28}/g).join("<br>");
                message_inp.val(newmsg); // adding br if characters are more than div len
            });
            $(".current-chat").append("<div class='outgoing-pm chat-bot'> <span>"+message_inp.val()+"</span></div>");
            $("div").removeClass("chat-bot");
            updateLstMsg(message_inp.val());
            message_inp.val("");
            chatBot=$(".current-chat").height();
            $("#conversation").animate({scrollTop:chatBot},400);
        }
        

    }
    function updateLstMsg(contval) {
        var str = contval;
        str=str.substr(0,28);
        var divelem = $(".current-recent-msg");
        divelem.html(contval);
    }
    message_inp.on("keydown",function(e){
        if(e.code === "Enter") sendPM();
    });