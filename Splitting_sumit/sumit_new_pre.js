
function UserCookie() { }
UserCookie.prototype.getCookie = function (cookie_Name) {
  var documentCookie = document.cookie;
  var search = cookie_Name + "=";
  if (isSet(documentCookie) && documentCookie.length > 0) {
    var offset = documentCookie.indexOf(search);
    if (offset !== -1) offset += search.length;
    else return "";

    var end = documentCookie.indexOf(";", offset);
    if (end === -1) end = documentCookie.length;

    //return unescape(documentCookie.substring(offset, end));
    try {
      return decodeURIComponent(documentCookie.substring(offset, end));
    } catch (err) {
      return unescape(documentCookie.substring(offset, end));
    }
  }
  return "";
};

UserCookie.prototype.getParameterValue = function (cookie, key) {
  if (isSet(cookie) && cookie !== "") {
    var cookie_arr = cookie.split("|");
    var len = isSet(cookie_arr) ? cookie_arr.length : 0;
    for (var i = 0; i < len; i++) {
      var sub_cookie_arr = cookie_arr[i].split("=");
      if (sub_cookie_arr[0] === key)
        return isSet(sub_cookie_arr[1]) && sub_cookie_arr[1] !== ""
          ? sub_cookie_arr[1]
          : "";
    }
    return ""; /* will return null if key doesn't exists */
  }
  return "";
};

UserCookie.prototype.setCookie = function (name, value, days, modId) {
  /* modID iploc */

  var expires = "";
  var loc = window.location.href;
  if (days && value) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  if (isSet(modId) && modId === "TDW") {
    var dom = document.location.hostname;

    document.cookie =
      name + "=" + value + expires + "; domain=" + dom + ";path=/";
  } else {
    if (loc.match("hellotrade.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.hellotrade.com;path=/";
    } else if (loc.match("indianindustry.com")) {
      document.cookie =
        name +
        "=" +
        escape(value) +
        expires +
        "; domain=.indianindustry.com;path=/";
    } else if (name == "ImeshVisitor") {
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        expires +
        "; domain=.indiamart.com;path=/";
    } else {
      document.cookie =
        name + "=" + escape(value) + expires + "; domain=.indiamart.com;path=/";
    }
  }
};
UserCookie.prototype.deleteCookie = function (cookie_Name) {
  document.cookie = cookie_Name + "=;expires=;domain=.indiamart.com;path=/";
};

var usercookie = new UserCookie();function UserLogin(what) {
    this.tmpId = "";
    this.imeshCookie = "";
    this.iplocCookie = "";
    this.userCountry = "";
    this.loginhtml = "";
    this.tid = "";
    this.username = "";
    this.blurcalled = false;
  
    this.className = "UserLogin";
    this.what = what;
    this.UserLoginCssObj = {};
    this.UserloginHtmlObj = {
      Label: "",
      UserInput: "",
      OuterWrapper: "",
      ClosingWrapper: "",
    };
    this.UserloginHtmlObjArray = [];
    this.toChange = false;
    this.isNotCalled = false;
  
    this.cookies();
    this.classCount = 0;
  }
  UserLogin.prototype.toUpdate = function (tmpId) {
    if (imeshExist()) return true;
    else if (this.isNotCalled === true) return true;
    return false;
  };
  UserLogin.prototype.cookies = function () {
    this.imeshCookie = imeshExist();
    this.iplocCookie = usercookie.getCookie("iploc");
    this.userCountry = usercookie.getParameterValue(this.iplocCookie, "gcniso");
    ReqObj.changeUserCountry =
      isSet(ReqObj.changeUserCountry) && ReqObj.changeUserCountry !== ""
        ? ReqObj.changeUserCountry
        : usercookie.getParameterValue(this.iplocCookie, "gcnnm");
  };
  
  UserLogin.prototype.displayAnswer = function (tmpId) {
    var name = this.toChange === true ? "" : ReturnBlUserName(tmpId);
    var toget = this.toChange === true ? "toChange" : "PrimaryInfo";
    var classtotest = chatBlClass(tmpId, "right");
    var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
    $("#t" + tmpId + "mflag").css("display", "none");
    return [
      ConversationRightWrapper(tmpId, returnAnswer(tmpId, toget), {
        classtotest: classtotest,
        leftright: leftright,
      }),
      name,
    ];
  };
  
  UserLogin.prototype.defaultEvents = function (tmpId) {
    if (isSet(tmpId)) {
  
      //next->submit
      //hide pns unidentified user
      var pnsno = ReqObj.Form[tmpId].pnsNumber;
      if (isPnsEnq(tmpId) ) {
        if(isSet(ReqObj.Form[tmpId].ctaName) && ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e"){
        
        if(pnsno[0]!='+'){
        pnsno = pnsno.substring(0,4) + "xxxxxxx ";
        }
        else
        pnsno = pnsno.substring(0,7) + "xxxxxxx ";
        $("#pnsnoenq").html(pnsno);
      }
      else{
      $(".pnsEnq").hide();
      }
      
      }
      if (currentISO() !== "IN") {
        if (EnqPopupDIR(tmpId) && $("#yajaca").css("display") != "block") {
          $("#yajaca").show();
          $("#t" + tmpId + "submit_wrapper #t" + tmpId + "_submitdiv input").addClass("toConv");
          $("input.toConv").attr("value", "Submit");
          ReqObj.Form[tmpId].toShowMsg = 0;
          ReqObj.Form[tmpId].msgFromOtp = 0;
        }
      }
      else {
        if ($("#yajaca").css("display") == "block") {
          hideClickMsg(tmpId);
          ReqObj.Form[tmpId].toShowMsg = 1;
        }
      }
  
  
  
      ReqObj.Form[tmpId].flags.isFlagSuggSet = false;
      if (IsChatbl(tmpId)) {
        this.handleUI({
          data: {
            todo: "default",
            obj: this,
            tmpId: tmpId,
          },
        });
        this.handleUI({
          data: {
            todo: "transition",
            obj: this,
            tmpId: tmpId,
          },
        });
      } // PBRENQFORM - 3620
      if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
        this.handleUI({
          data: {
            todo: "focus",
            obj: this,
            tmpId: tmpId,
          },
        });
      this.handleEvents(this, tmpId);
      this.handleUI({
        data: {
          todo: "isoFlag",
          obj: this,
          tmpId: tmpId,
        },
      });
      //   this.handleUI({
      //     data: {
      //       todo: "chatblFlag",
      //       obj: this,
      //       tmpId: tmpId
      //     }
      //   });
      get_buyer_info(tmpId);
      if (imeshExist() === "") $("#t" + tmpId + "_leftR").addClass("lftMgn");
    }
  
    if (
      !(isSSB(tmpId) || Bl01(tmpId) || Bl04(tmpId) || IsChatbl(tmpId)) &&
      currentISO() !== "IN" &&
      $("#t" + tmpId + "_gSignInWrapper").length === 0
    ) {
      var stylo =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "4px;"
          : "10px;";
      var styl =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "0;"
          : "10px 0px 15px 0px;";
      var cls =
        Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl"
          ? "pdlr10"
          : "";
      var orline = (isInactiveBL(tmpId)) ? "orline" : "";
      var customG = (isInactiveBL(tmpId)) ? "customG2" : "customG";
      var ghtml =
        '<div id = "t' +
        tmpId +
        '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: ' +
        stylo +
        '" class=' + orline + '>OR</p> <div id="t' +
        tmpId +
        '_gSignInWrapper" style="text-align:center; margin: ' +
        styl +
        '" > <div id="t' +
        tmpId +
        'signinBtnFr" class="' + customG + '"> <span class="Gicon"> </span> <span class="buttonTextfr ' +
        cls +
        '"> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
      var ele = $("#t" + tmpId + "_submit");
      if (isSet(ele)) $("#" + ele.parent()[0].id).append(ghtml);
      this.registerForm(tmpId);
    }
    if (IsChatbl(tmpId) && currentISO() != "IN") this.registerForm(tmpId);
  };
  
  UserLogin.prototype.registerForm = function (tmpId) {
    var meta2 = document.createElement("script");
    meta2.src = "https://apis.google.com/js/platform.js";
    document.getElementsByTagName("head")[0].appendChild(meta2);
    var clientID = "";
    var that = this;
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    ) {
      clientID =
        "335658149809-o25hpstdu2tdo43j8ppg8l6n6i0dtfl0.apps.googleusercontent.com";
    } else {
      clientID =
        "432055510365-4for8jpqviklkgt2lssm41sfhhfo0ovs.apps.googleusercontent.com";
    }
    meta2.onload = function () {
      if (typeof gapi !== "undefined") {
        gapi.load("auth2", function () {
          auth2 = gapi.auth2.init({
            client_id: clientID,
            //cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          googleSigninFr(
            document.getElementById("t" + tmpId + "signinBtnFr"),
            tmpId,
            that
          );
        });
      }
    };
  };
  
  function googleSigninFr(element, tmpId, userlogin) {
    auth2.attachClickHandler(
      element,
      {},
  
      function (googleUser) {
        var form_type =
          ReqObj.Form[tmpId].formType === "Enq"
            ? "Send Enquiry"
            : "Post Buy Leads";
  
        var id_token = googleUser.getAuthResponse().id_token;
        gusrname = googleUser.getBasicProfile().getName();
        gusremail = googleUser.getBasicProfile().getEmail();
        blenqGATracking(form_type, "GoogleSigninClicked", getEventLabel(), 1, tmpId);
        if (gusremail != "") {
          userlogin.checkEmailExistOrNotFR(gusremail, id_token, gusrname, tmpId, userlogin);
        }
      },
      function (error) { }
    );
  }
  
  UserLogin.prototype.checkEmailExistOrNotFR = function (gusremail, id_token, gusrname, tmpId, userlogin) {
    var that = userlogin;
    var iso = currentISO();
    var ph_country = ReqObj.isoFlag;
    var url = this.getGoogleLoginAjaxURL();
    if (typeof country_ip === "undefined" || country_ip === null) {
      // country_ip not defined
      var iploc = usercookie.getCookie("iploc");
      var country_ip = usercookie.getParameterValue(iploc, "gip");
    }
    var params_request = {
      username: gusremail,
      iso: iso,
      modid: modIdf,
      format: "JSON",
      create_user: 1,
      originalreferer: window.location.href,
      GEOIP_COUNTRY_ISO: iso,
      ip: country_ip,
      screen_name: "BL/Enq Forms",
      id_token: id_token,
      gusername: gusrname,
      guseremail: gusremail,
      ph_country: ph_country,
    };
    var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var msg_ga = "failure";
    $.ajax({
      url: url,
      type: "POST",
      data: params_request,
      jsonpCallback: "create_callback",
      crossDomain: true,
      success: function (jsonResult) {
        // if(gusremail == "manisince1999@gmail.com"){
        //     jsonResult = '{"code":"204","message":"We have multiple account linked with this Email ID","access":"0","data_num":"7008439239,8456093931,1946948846,1658845666,7978532529","msg":"Multiple accounts are linked with this Email ID.  Please enter your registered mobile number to continue"}'
        // }
  
        // remove if error already present
        if (!$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")) {
          that.handleUI({
            data: {
              tmpId: tmpId,
              todo: "removeError",
              obj: that,
            },
          });
        }
        if (!$("#t" + tmpId + "_error_first_name1").hasClass("bedsnone")) {
          $("#t" + tmpId + "_q_first_nm" + "1")
            .removeClass("highlight-err mb-erbrd nb-erbrd")
            .siblings(".redc")
            .removeClass("redc");
          $("#t" + tmpId + "_error_first_name" + "1").addClass("bedsnone");
        }
  
        $("#t" + tmpId + "_login_field").val(gusremail);
        $("#t" + tmpId + "_q_first_nm1").val(gusrname);
        $("#t" + tmpId + "_q_first_nm1").parent().addClass("eqfcsed");
        var jsonResult = $.parseJSON(jsonResult);
        if (jsonResult["code"] == 200) {
          var access = jsonResult.access;
          if (access != undefined && access == "2") {
            document.cookie = "ImeshVisitor=; domain=.indiamart.com; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
            return;
          }
          if (isSet(jsonResult.DataCookie.iso) && jsonResult.DataCookie.iso == "IN") {
            that.handleUI({
              data: {
                tmpId: tmpId,
                todo: "tryagain",
                obj: userlogin,
                msg: "You seem to be from India. Select India as Country",
              },
            });
          } else {
            var msg = jsonResult["msg"];
            if (msg == "Unique Email found in Primary Email") {
              var glid = jsonResult["GLID"];
              var data1 = jsonResult.DataCookie;
              verifyEmailViaLWG(gusremail, glid);
              var loginSet = jsonResult.LoginCookie;
              var tokenSet = jsonResult.im_iss;
              imesh_obj.set(data1, "ImeshVisitor");
              v4iilex_obj.set(loginSet, "v4iilex");
              im_iss_obj.set(tokenSet, "im_iss");
              msg_ga = "success";
              UpdateAfterLogin("fn");
              UpdateAfterLogin("em");
              UpdateAfterLogin("ctid");
              UpdateAfterLogin("mb1");
              UpdateAfterLogin("uv");
              if (
                imeshExist() !== "" &&
                usercookie.getParameterValue(imeshExist(), "ctid") === ""
              ) {
                ReqObj.UserDetail.cityname = "";
                ReqObj.UserDetail.ctoth = "";
              }
              $("#t" + tmpId + "_q_first_nm1")
                .parent()
                .addClass("eqfcsed");
              ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
                source: "google-login",
                target: "google",
              });
            }
          }
        } else {
          if (jsonResult["code"] == "204") {
            var err_msg = jsonResult["msg"];
            if (jsonResult["message"] == "ISO MisMatch") {
              invalidMsgLogin(err_msg);
              $("#country-dropdown").css("pointer-events", "auto");
            } else if (jsonResult["message"].match(/suspicious/g)) {
              var msg = jsonResult["message"];
              invalidMsgLogin(err_msg);
            } else if (
              jsonResult["message"] ==
              "We have multiple account linked with this Email ID"
            ) {
              var var_msg = jsonResult["message"];
              var mobile_numbers = jsonResult["data_num"];
              that.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "tryagain",
                  obj: userlogin,
                  msg: var_msg,
                },
              });
            } else if (
              jsonResult["message"] == "No Email found in Primary Email"
            ) {
              $("#t" + tmpId + "_q_first_nm1")
                .parent()
                .addClass("eqfcsed");
              if (!isGDPRCountry()) {
                ReqObj.Form[tmpId].FormSequence.FormSubmit(tmpId, {
                  source: "google-login",
                  target: "google",
                  code: "204",
                });
                msg_ga = "success";
              }
            } else if (jsonResult["message"] == "Invalid Token ID") {
              invalidMsgLogin("Invalid token request");
            } else {
              invalidMsgLogin(err_msg);
            }
          }
        }
      },
      error: function (event) {
        msg_ga = "failure";
      },
      complete: function (event) {
        blenqGATracking(form_type, "GoogleSignin : " + msg_ga, getEventLabel(), 1, tmpId);
      },
    });
  };
  
  UserLogin.prototype.EventIfScreenPresent = function (tmpId) {
    if (isOtherEnq(tmpId)) {
      this.handleHeading(tmpId);
      ButtonNameUI("isq", tmpId);
    }
  };
  
  UserLogin.prototype.handleHeading = function (tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() !== "enq"){
      if(isInactiveBL(tmpId) && ReqObj.Form[tmpId].FormSequence._stepCounter === 0){
        $("#blheading").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
      }
      else{
        $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
      }
    }
    else if (isImageVidEnq(tmpId) &&ReqObj.Form[tmpId].FormSequence.StepCounter === 0)
      $("#t" + tmpId + "_hdg").addClass("bedsnone").html("");
    else
      $("#t" + tmpId + "_hdg").removeClass("bedsnone").html(getFormHeading(tmpId, ReqObj.Form[tmpId].currentScreen));
  };
  
  UserLogin.prototype.handleButton = function (tmpId) {
    ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
  };
  
  UserLogin.prototype.onSubmit = function (tmpId) {
    // $("#yajaca").hide(); // click away message on pns form
    // pns login screen changes
    if (isSet(tmpId)) {
      if(isPnsEnq(tmpId)){
        if(isSet(ReqObj.Form[tmpId].ctaName) && ReqObj.Form[tmpId].ctaName.toLowerCase() == "view mob e")
        $("#pnsnoenq").html(ReqObj.Form[tmpId].pnsNumber);
      }
    }
    if (isSet(tmpId)) {
      //mob track
      if(currentISO() === "IN"){    
           ReqObj.Form[tmpId].mobEntered=1;
          //  console.log("mob entered");
      }
      else{
        ReqObj.Form[tmpId].emailEntered=1;
        // console.log("email entered");
      }
  
      var logObject = PreAjax("UserLogin", tmpId);
      if (this.toChange === false) {
        this.sendRequest({
          data: {
            logObject: logObject,
            tmpId: tmpId,
            userlogin: this,
            blureve: false,
            todo: "login",
          },
        });
      } else {
        PostAjax(logObject, tmpId);
      }
    }
  };
  
  UserLogin.prototype.SaveDetails = function (tmpId, event) {
    if (IsChatbl(tmpId)) {
      ReqObj.Form[tmpId].UserInputs["PrimaryInfo"] = $(
        "#t" + tmpId + "_login_field"
      ).val(); /* change using event target Id */
      if (isSet(event.target.textContent) && event.target.textContent !== "")
        ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent;
    }
  };
  
  UserLogin.prototype.addHtmlObjToArray = function (htmlObj) {
    this.UserloginHtmlObjArray.push(htmlObj);
  };
  
  UserLogin.prototype.displayHtml = function (tmpId) {
    /* common for all classes */
    if (isSet(tmpId)) {
      $("#t" + tmpId + "_byrinfo").removeClass("bedsnone");
      $("#t" + tmpId + "_hdg").removeClass("bedsnone");
      $("#t" + tmpId + "_login").removeClass("bedsnone");
      var chathelpmsg = "";
      if (IsChatbl(tmpId)) {
        var helpiso = currentISO() === "IN" ? "number" : "email";
        chathelpmsg = "<div class='t" + tmpId + "_userInput cbl_br10 dn'><div class='befs11 beclr'><i class='chat-elip'>i</i>Seller Details are sent on this " + helpiso + "</div></div>";
        return [this.loginhtmlQues, this.loginhtmlInput];
      }
      if (isOtherEnq(tmpId)) {
        ReqObj.Form[tmpId].calledClassName[
          ReqObj.Form[tmpId].FormSequence.StepCounter
        ] = this.className;
      }
      return [this.loginhtml, chathelpmsg];
    }
  };
  
  UserLogin.prototype.hasHtml = function (UserloginObj) {
    if (isSet(UserloginObj)) {
      this.classCount = returnObjectSize(
        ReqObj.Form[UserloginObj.tmpId].ContactDetail
      );
      ReqObj.Form[UserloginObj.tmpId].nec.classCount = this.classCount;
      this.addHtmlObjToArray(this.getLoginHTML(UserloginObj.tmpId));
      var UserLoginSuffixHtmlObj = {};
      if (!IsChatbl(UserloginObj.tmpId)) {
        var tmpId = UserloginObj.tmpId;
        var sticky = isSticky(UserloginObj.tmpId) ? "FM_bedvh" : Bl04(tmpId) && currentISO() !== "IN" ? "bedvh fruflg" : "bedvh";
        if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
          sticky = "bedvh nflgm";
        var UserLoginSuffixOuterHtml = isSSB(UserloginObj.tmpId) ? "<div><div  id='t" + UserloginObj.tmpId + "_login' class='" + ssbClass("wrprClass", UserloginObj.tmpId) + "'>" : "<div  id='t" + UserloginObj.tmpId + "_login' class='" + sticky + "'>";
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var cntflg = flagd(countryDiv, UserloginObj.tmpId);
        var UserLoginSuffixClosingHtml = isSSB(UserloginObj.tmpId)
          ? "</div>" : Enq04(UserloginObj.tmpId) || (Bl04(tmpId) && !(ReqObj["Form"][UserloginObj.tmpId].modId === "DIR" && !isNotfoundBl(UserloginObj.tmpId)))
            ? "</div>" + cntflg : "</div>";
        UserLoginSuffixHtmlObj = {
          SuffixOuterHtml: UserLoginSuffixOuterHtml,
          SuffixClosingHtml: UserLoginSuffixClosingHtml,
          suffix: "_login",
        };
        this.loginhtml = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, UserLoginSuffixHtmlObj, "");
      } else {
        var countryDiv = this.countryDiv(UserloginObj.tmpId);
        var world_img = '<i class="oeWicn"></i>';
        var cls = "bepr oeCnty";
        ReqObj.Form[UserloginObj.tmpId].ctn = ReqObj.IPDetails["countryname"] == "" ? "India" : ReqObj.IPDetails["countryname"];
        var html = "<div id='t" + UserloginObj.tmpId + "mflag'class='oeChng'>" + world_img + "<div class='oef0'>Your Country is </div><div id='t" + UserloginObj.tmpId + "country' class='" + cls + "'>" + ReqObj.Form[UserloginObj.tmpId].ctn + countryDiv + "</div></div>";
        this.loginhtmlQues = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id='t" + UserloginObj.tmpId + "_login' class = 'cbl_ques cbl_vh'>", "</div>", "_login"), "ques");
        this.loginhtmlInput = MakeWrapper([this.UserloginHtmlObjArray], UserloginObj.tmpId, WrapperObj("<div id = 't" + UserloginObj.tmpId + "_login_input' class ='cbl_dtls cbl_mobile cbl_df cbl_aic t" + UserloginObj.tmpId + "_userInput cbl_br10 dn'>", "</div>", "_login"), "input");
        this.loginhtml = this.loginhtmlQues + this.loginhtmlInput;
        if ($("#t" + UserloginObj.tmpId + "mflag").length == 0) {
          $("#t" + UserloginObj.tmpId + "_tCond").before(html);
          ReqObj.Form[UserloginObj.tmpId]["flagcalling"] = 0;
        }
      }
  
      UserloginObj.that.NumberofClassCalled -= 1;
      if (this.loginhtml !== "") {
        ReqObj.Form[UserloginObj.tmpId].currentclassCount++;
        this.ifHtmlPresent(UserloginObj);
      } else {
        this.ifHtmlNotPresent(UserloginObj);
      }
      if (this.loginhtml !== "") return true;
      else return false;
    }
  };
  
  UserLogin.prototype.ifHtmlPresent = function (UserloginObj) {
    AttachObject(UserloginObj.object, UserloginObj.tmpId);
    if (isSet(UserloginObj.AfterService)) {
      for (var i = 0; i < UserloginObj.AfterService.length; i++) {
        UserloginObj.that.MakeSeq(
          UserloginObj.AfterService[i],
          UserloginObj.tmpId
        );
      }
    }
    if (UserloginObj.that.NumberofClassCalled === 0) {
      makeFinalSeq(UserloginObj, UserloginObj.tmpId);
    }
  };
  
  UserLogin.prototype.ifHtmlNotPresent = function (UserloginObj) {
    if (UserloginObj.hasFallback) {
      CreateSeq(UserloginObj.FallbackObj);
    }
  };
  
  UserLogin.prototype.validate = function (tmpId, event) {
    /* terms and condition if required */
    if (isSet(tmpId)) {
      var that = this;
      if (isSet(event.target.textContent) && event.target.textContent !== "") {
        ReqObj.Form[tmpId].UserInputs["toChange"] = event.target.textContent; //  to test
        that.toChange = true;
      } else that.toChange = false;
      if (that.toChange === false) {
        var iso_change = currentISO();
        that.captureDetails(iso_change, tmpId);
        if (!isSet(validation)) createGlobalObject();
        that.username = $("#t" + tmpId + "_login_field").val();
        var validlogin =
          iso_change === "IN"
            ? validation.isMobileValid(that.username)
            : validation.isEmailFilled(that.username);
        // remove if error already present
        if (
          !$("#t" + tmpId + "_msg_primary_info_err_login").hasClass("bedsnone")
        ) {
          that.handleUI({
            data: {
              tmpId: tmpId,
              todo: "removeError",
              obj: that,
            },
          });
        }
        if (
          $("#t" + tmpId + "_login").html() !== "" &&
          validlogin["type"] === false
        ) {
          if (
            !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
          ) {
            that.handleUI({
              data: {
                tmpId: tmpId,
                errormsg: validlogin["error"],
                todo: "validationError",
                obj: that,
              },
            });
          }
          ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
          return false;
        } else if (isGDPRCountry() && imeshExist() === "") {
          if (isSet(event.data) && event.data.todo.toLowerCase() === "blurlogin")
            return true;
          if (
            isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
            ReqObj.Form[tmpId].IsCheckboxChecked !== ""
          ) {
            if (ReqObj.Form[tmpId].IsCheckboxChecked === false) {
              ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
              return false;
            } else {
              return true;
            }
          } else return false;
        }
        return true;
      } else return true;
    }
  };
  
  UserLogin.prototype.captureDetails = function (iso_change, tmpId) {
    if (iso_change === "IN") {
      ReqObj.UserDetail["mb1"] = $("#t" + tmpId + "_login_field").val();
      ReqObj.TempMobile = ReqObj.UserDetail["mb1"];
    } else {
      ReqObj.UserDetail["em"] = $("#t" + tmpId + "_login_field").val();
      ReqObj.TempEmail = ReqObj.UserDetail["em"];
    }
  };
  UserLogin.prototype.returnText = function (iso_change, tmpId) {
    // if (isOtherEnq(tmpId) && isImageVidEnq(tmpId) && imeshExist() === "") {
    //   return (iso_change === "IN") ? "Enter your mobile" : "For example abc@gmail.com";
    // }
  
    return iplocExist() === "" &&
      ReqObj.ipLoc.zoneISO === "OTHER" &&
      ReqObj.ipLoc.onClose === false
      ? ""
      : iso_change === "IN"
        ? "Enter your mobile"
        : "Enter your email";
  };
  
  UserLogin.prototype.returnLoginFieldClass = function (iso_change, tmpId) {
    var sticky = isSticky(tmpId) ? "FM_benords" : "benords";
    var mob_html = isInactiveBL(tmpId) ? "mob-input" : "";
    var inputCls = IsChatbl(this.what)
      ? ""
      : isSSB(this.what)
        ? "mb-mNm"
        : iso_change === "IN"
          ? "be-input " + sticky + " beW3 beh32 " + mob_html
          : "be-input " + sticky + " beW3 beh32 beemail " + mob_html;
    inputCls = isBlInline(this.what)
      ? iso_change === "IN"
        ? "be-input beW3 beh32"
        : "be-input beW3 beh32 beemail"
      : inputCls;
    return inputCls;
  };
  
  UserLogin.prototype.returnLoginValue = function (iso_change, tmpId) {
    return rvalue(tmpId, "flogin");
  };
  
  UserLogin.prototype.returnErrorDiv = function (tmpId, formType) {
    if (isSSB(tmpId)) return loginErrorDivSSB(tmpId);
    var html = "";
    var sticky = isSticky(tmpId) ? "FM_beerrp" : "beerrp";
    var errorclass = IsChatbl(tmpId)
      ? "bltperor bedsnone"
      : "be-erbx " + sticky + " bedsnone";
    html += returnContainer(
      "t" + tmpId,
      "_msg_primary_info_err_login",
      errorclass,
      "",
      "",
      ""
    );
    html += returnContainer(
      "t" + tmpId,
      "_primary_info_errmsg_login",
      "",
      "content",
      "",
      ""
    );
    if (IsChatbl(tmpId)) html += "</div></div>";
    else {
      if (
        !isOtherEnq(tmpId) ||
        (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09")
      )
        html += '</div><a class="be-erarw" data-role="arrow"></a></div>';
      else if (isOtherEnq(tmpId) && tmpId.substring(0, 2) === "09")
        html += "</div></div>";
    }
    return html;
  };
  
  UserLogin.prototype.getLabel = function (tmpId, formType, iso_change) {
    var that = this;
    var label = pdpenqImage(tmpId) ? "" : isEcomProduct(tmpId) ? iso_change === "IN" ? "Mobile Number" : "Email ID" : isFirstImgVidCTA(tmpId)
      ? "Get customised quotes from seller" : iso_change === "IN" ? "Mobile Number" : "Email ID";
    if (isInactiveBL(tmpId)) {
      label = (currentISO() == 'IN') ? "Mobile Number <span class='redc'>*</span>" : "Email ID <span class='redc'>*</span>";
    }
    if (isBlInlineFr(tmpId)) label += "*";
    label = iplocExist() === "" && ReqObj.ipLoc.zoneISO === "OTHER" && ReqObj.ipLoc.onClose === false ? "" : label;
    var sticky = isSticky(tmpId) ? "FM_be-lbl" : "be-lbl";
    var frcls = isBlInlineFr(tmpId) ? " fadLbl" : "";
    var boldcls = pdpenqImage(tmpId) ? "" : "befwt ";
    var labelclass = isFirstImgVidCTA(tmpId) ? boldcls + sticky + " beml-50 fsciv eqmb20" : isSSB(tmpId) ? ssbClass("label", tmpId) : isBlInline(tmpId) ? "fs15 cl11 wf" + frcls : sticky + " beml-50";
    if (ReqObj.Form[tmpId].ctaName.toLowerCase() === "middle" && Bl04(tmpId) && ReqObj.Form[tmpId].FormSequence._screenCounter === 0)
      labelclass += " nflblm";
    var text = label;
    var html = ""; /* Do not change the html sequence */
    if (IsChatbl(tmpId)) {
      html += "Please share your ";
      html += returnSpan("t" + tmpId, "login_span_bold", label, "befwt");
      html += " to receive quotes from sellers";
      html += iso_change === "IN" ? "" : '<div id = "t' + tmpId + '_gwrap"> <p style="font-size:14px;font-weight:600;text-align: center;margin-top: 10px; ">OR</p> <div id="t' + tmpId + '_gSignInWrapper" style="text-align:center; margin: 10px 0px 15px 0px;" > <div id="t' + tmpId + 'signinBtnFr" class="customG"> <span class="Gicon"> </span> <span class="buttonTextfr "> Login with Google </span><input type="hidden" value="0" style="display:none;" id="LWG"> </div></div></div>';
    } else {
      if ((!isBlInline(tmpId) && !isSSB(tmpId) && !isOtherEnq(tmpId)) || (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
        html += that.returnErrorDiv(tmpId, formType);
  
      html += returnLabel("t" + tmpId, text, "_label-l", labelclass);
  
      if (!(isEcomProduct(tmpId) || pdpenqImage(tmpId)) && isFirstImgVidCTA(tmpId)) {
        text = "Contact seller";
        html = msg_firimgvid(text, tmpId);
      }
    }
    that.UserloginHtmlObj["Label"] = html;
  };
  UserLogin.prototype.flagDiv = function (tmpId) {
    var cls = IsChatbl(tmpId) ? "dropdown" : "dropdown bebdr be-flg";
    return $("#t" + tmpId + "flag").length > 0
      ? ""
      : "<dl id='t" + tmpId + "flag' class='" + cls + "'></dl>";
  };
  UserLogin.prototype.countryDiv = function (tmpId) {
    return $("#t" + tmpId + "flagdiv2").length > 0 && !IsChatBLInline(tmpId)  // new chat bl unidentified
      ? ""
      : "<dl id='t" +
      tmpId +
      "country_dropd' class='dropdown bebdr be-flg'></dl>";
  };
  
  ContactDetail.prototype.countryDiv = function (tmpId) {
    return $("#t" + tmpId + "flagdiv2").length > 0
      ? ""
      : "<dl id='t" +
      tmpId +
      "country_dropd' class='dropdown bebdr be-flg'></dl>";
  };
  UserLogin.prototype.getInput = function (tmpId, formType, iso_change) {
    var iploccookie = usercookie.getCookie("iploc");
    ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
      iploccookie,
      "gcnnm"
    );
    this.UserloginHtmlObj["UserInput"] = IsChatbl(tmpId)
      ? this.getmobhtml(tmpId, formType, iso_change)
      : this.getBlEnqInput(tmpId, formType, iso_change);
  };
  UserLogin.prototype.getNewSSbInput = function (
    tmpId,
    formType,
    iso_change,
    inputLogin
  ) {
    var that = this;
    var flagDiv = "";
    var html = '<div class="nb-flex">';
    html += isnewSSB(tmpId)
      ? currentISO() === "IN"
        ? "<div class='nb-w80 nb-lgn'>"
        : "<div class='nb-w80 nb-lgn nb-lgnf'>"
      : "";
    html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
    html += "<div id='t" + tmpId + "_dliso' class='mb-mIso'>";
    if (iso_change === "IN")
      html += isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? returnIsoHtml(tmpId, "") + "</div></div>"
          : returnIsoHtml(tmpId, "") + "</div>"
        : returnIsoHtml(tmpId, "be-flisq iso") + "</div>";
    else html += "</div></div>";
    html += "<div class='nb-frm nb-ml5 nb-flx1'>" + inputLogin + "</div>";
    //that.UserloginHtmlObj["Label"] = "";
    return html;
  };
  function flagd(countryDiv, tmpId) {
    ReqObj.Form[tmpId].ctn =
      ReqObj.IPDetails["countryname"] == ""
        ? "India"
        : ReqObj.IPDetails["countryname"];
    if ((Enq04(tmpId)) && $("#t" + tmpId + "flag").length)
      $("#t" + tmpId + "flag").removeClass();
    var world_img = '<i class="oeWicn"></i>';
    var cls = isFirstImgVidCTA(tmpId) ? "oeCnty oeCdrp" : "bepr oeCnty";
    var fcls = isNotfoundBl(tmpId) ? "oeChng fmcnf" : "oeChng";
    var cntflg =
      "<div id='t" +
      tmpId +
      "mflag' class='" +
      fcls +
      "'>" +
      world_img +
      "<div class='oef0'>Your Country is </div><div id='t" +
      tmpId +
      "country' class='" +
      cls +
      "'>" +
      ReqObj.Form[tmpId].ctn +
      countryDiv +
      "</div></div>";
    return cntflg;
  }
  UserLogin.prototype.getBlEnqInput = function (tmpId, formType, iso_change) {
    var html = isBlInline(tmpId)
      ? iso_change === "IN"
        ? "<div class='pflx1 pr'><div id='t" +
        tmpId +
        "_blin' class='idsf ilgn inW240'>"
        : "<div class='pflx1 pr'><div id='t" +
        tmpId +
        "_blin' class='idsf ilgn inW240 flgn'>"
      : "";
    if (isSSB(tmpId)) html = ssbLoginHtml(tmpId, "startDiv", iso_change);
    var style =
      iso_change !== "IN" && tmpId.substring(0, 2) === "09"
        ? "width : 282px"
        : "";
  
    var eqcntyClass = isSSB(tmpId) ? "mb-mIso"
      : Bl09(tmpId) && iso_change !== "IN" ? isInactiveBL(tmpId) ? "eqCnty be-flg bebdr brdlft8" : "eqCnty be-flg bebdr"
        : isNotfoundBl(tmpId) && iso_change !== "IN" ? "eqCnty pr nfblf" : "eqCnty pr";
  
    var flagDiv = "";
    var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
    if (formType.toLowerCase() === "bl") {
      //html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
      html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
      if (iso_change === "IN")
        html += isSSB(tmpId)
          ? returnIsoHtml(tmpId, "") + "</div>"
          : returnIsoHtml(tmpId, brdlft) + "</div>";
      else html += "</div>";
    } else {
  
      html += "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
      html += "<div id='t" + tmpId + "jsflagdiv'>" + flagDiv + "</div>";
  
      if (iso_change === "IN")
        html += returnIsoHtml(tmpId, brdlft) + "</div>";
      else html += "</div>";
    }
    //html = "<div id='t" + tmpId + "_dliso' class='" + eqcntyClass + "'>";
    //html += returnDl("t" + tmpId, "_Country_dropdown", "dropdown bebdr be-flg", "");/* Pass nothing if field to be enabled */
  
    var maxlength = iso_change === "IN" ? "10" : "";
  
    if (isOtherEnq(tmpId)) {
      html += returnInput(
        "t" + tmpId,
        "_login_field",
        "text",
        "login_field",
        this.returnText(iso_change, tmpId),
        this.returnLoginFieldClass(iso_change, tmpId) + " inPlace",
        this.returnLoginValue(iso_change, tmpId),
        "",
        maxlength,
        "request"
      );
      if (tmpId.substring(0, 2) === "09")
        html += this.returnErrorDiv(tmpId, formType);
    } else {
      var inputLogin = returnInput(
        "t" + tmpId,
        "_login_field",
        "text",
        "login_field",
        this.returnText(iso_change, tmpId),
        this.returnLoginFieldClass(iso_change, tmpId),
        this.returnLoginValue(iso_change, tmpId),
        style,
        maxlength,
        "request"
      );
      html += inputLogin;
    }
    var countryDiv = this.countryDiv(tmpId);
    var cntflg = flagd(countryDiv, tmpId);
    html += !isBlInline(tmpId) && !Enq04(tmpId) && !Bl04(tmpId) ? cntflg : "";
    ReqObj.Form[tmpId].flag = Enq04(tmpId) || Bl04(tmpId) ? 1 : 0;
    html = isnewSSB(tmpId)
      ? this.getNewSSbInput(tmpId, formType, iso_change, inputLogin)
      : html;
    var helpmsg = iso_change === "IN" ? "number" : "email";
    var helptextclass = isSSB(tmpId) ? "mb-mbuTxt mb-mt10 " : "be-msghlp";
    if (isSSB(tmpId) || isBlInline(tmpId))
      html += "</div>" + this.returnErrorDiv(tmpId, formType);
  
    var helpmsgDiv = returnContainer(
      "t" + tmpId,
      "_helpmsg",
      helptextclass,
      "",
      "Seller will contact you on this " + helpmsg,
      ""
    );
    html +=
      isBlInline(tmpId) && !ReqObj.Form[tmpId].isFrInline
        ? helpmsgDiv + "</div>"
        : "";
    html += isBlInline(tmpId) ? cntflg : "";
  
    if (isSSB(tmpId)) html += ssbLoginHtml(tmpId, "loader", iso_change);
  
    html += "</div>";
    html += isnewSSB(tmpId) ? cntflg : "";
    if (isFirstImgVidCTA(tmpId)) html = "<div class='enumpr'>" + html + "</div>";
    return html;
  };
  UserLogin.prototype.getmobhtml = function (tmpId, formType, iso_change) {
    var html = "";
    var style = iso_change !== "IN" && !IsChatbl(tmpId) ? "width :282px" : "";
    var classTobeAdded = iso_change === "IN" ? "bedsnone" : "cbl_flag";
    html = returnContainer("t" + tmpId, "_flagC", classTobeAdded, "", html, "");
    html += "</div>";
    var brdlft = (isInactiveBL(tmpId)) ? "be-flisq iso brdlft8" : "be-flisq iso";
    if (iso_change === "IN") {
      html +=
        returnContainer(
          "t" + tmpId,
          "_isoC",
          "cbl_iso",
          "",
          returnIsoHtml(tmpId, brdlft),
          ""
        ) + "</div>";
    }
  
    var maxlength = iso_change === "IN" ? "10" : "";
    html += returnInput(
      "t" + tmpId,
      "_login_field",
      "text",
      "login_field",
      this.returnText(iso_change, tmpId),
      this.returnLoginFieldClass(iso_change, tmpId),
      this.returnLoginValue(iso_change, tmpId),
      style,
      maxlength,
      "request"
    );
    if (IsChatbl(tmpId)) ReqObj.Form[tmpId].flags.isCountryFlagSuggSet = true;
    return html;
  };
  UserLogin.prototype.getLoginHTML = function (tmpId) {
    /* Do not change the html sequence */
    if (isSet(tmpId)) {
      var that = this;
      var formType = ReqObj.Form[tmpId].formType.toLowerCase();
      var iso_change =
        IsChatbl(tmpId) &&
          ReqObj.Form[tmpId].UserInputs["Country"] === "Change my Country".trim()
          ? ""
          : currentISO(); /* check if iploc not indian and user says yes */
      that.getLabel(tmpId, formType, iso_change);
      that.getInput(tmpId, formType, iso_change);
      if (isOtherEnq(tmpId)) {
        var clsnm = "";
        if (isImageVidEnq(tmpId) && imeshExist() === "") {
          clsnm = currentISO(tmpId) !== "IN" ? "enqLogInp eqFnu imgfv" : "enqLogInp imgfv";
          $("#t" + tmpId + "_question").addClass("mvta");
        } else {
          clsnm = "enqLogInp";
          if (iso_change !== "IN") clsnm += " eqFrUs";
          $("#t" + tmpId + "_question").removeClass("mvta");
        }
        if (tmpId.substring(0, 2) !== "09") clsnm = clsnm + " inllog";
        if (isFirstImgVidCTA(tmpId)) clsnm = clsnm + " eqimgvidm";
        that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) ? "" : "<div id='t" + tmpId + "clslog' class='" + clsnm + "'>";
        that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) ? "" : "</div>";
      } else {
        var frcls = Bl04(tmpId) && ReqObj.Form[tmpId].ctaName.toLowerCase() === "inline-bl" && currentISO() != "IN" ? "mb10imp" : Bl09(tmpId) && !isInactiveBL(tmpId) && currentISO() !== "IN" && imeshExist() === "" ? "blfr" : "";
        var clss = isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20";
        that.UserloginHtmlObj["OuterWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isBlInline(tmpId) ? '<div class="' + clss + '">' : isInactiveBL(tmpId) ? "<div class='idsf' id='name_email'><div class='belft bepr bT1-st3 " + frcls + "'>" : "<div class='belft bepr bemgb15 bT1-st3 " + frcls + "'>";
  
        that.UserloginHtmlObj["ClosingWrapper"] = IsChatbl(tmpId) || isSSB(tmpId) ? "" : isInactiveBL(tmpId) ? "</div></div>" : "</div>";
      }
      return that.UserloginHtmlObj;
    }
  };
  UserLogin.prototype.getData = function (tmpId, userlogin, todo) {
    var what = isSet(todo) ? todo : "";
    var iso = currentISO();
    var loginflag = new LoginFlag().returnLoginFlag(what);
  
    if (typeof imesh_obj === "undefined" && typeof userDataCookie === "function")
      /*  imesh_obj global var of header.js */
      imesh_obj = new userDataCookie();
  
    var data = {
      s_country_iso: iso,
      modid: modIdf,
      curr_page_url: window.location.href,
      s_ip_address: usercookie.getParameterValue(userlogin.iplocCookie, "gip"),
      s_ip_country: usercookie.getParameterValue(userlogin.iplocCookie, "gcnnm"),
      s_ip_country_iso: usercookie.getParameterValue(
        userlogin.iplocCookie,
        "gcniso"
      ),
      loginflag: loginflag,
    };
  
    data["flag"] = ReqObj.Form[tmpId].formType;
    if (IsChatbl(tmpId)) data["flag"] = "BL";
  
    if (typeof userlogin.username === "undefined" || userlogin.username === "") {
      data["username"] =
        iso === "IN"
          ? usercookie.getParameterValue(userlogin.imeshCookie, "mb1")
          : usercookie.getParameterValue(userlogin.imeshCookie, "em");
    } else data["username"] = userlogin.username;
  
    return ObjectTrim(data);
  };
  UserLogin.prototype.getLoginAjaxURL = function () {
    var url = "";
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    )
      url = "//dev1-login.indiamart.com/user/identify/";
    else url = "//login.indiamart.com/user/identify/";
    return url;
  };
  
  UserLogin.prototype.getGoogleLoginAjaxURL = function () {
    var url = "";
    if (
      appsServerName == "//dev-apps.imimg.com/" ||
      appsServerName == "//stg-apps.imimg.com/"
    )
      url = "//dev1-login.indiamart.com/user/loginwithgoogle_first/";
    else url = "//login.indiamart.com/user/loginwithgoogle_first/";
    return url;
  };
  
  UserLogin.prototype.getajaxData = function (data) {
    var ajaxData = {
      username: ReturnCorrectVal(data["username"], ""),
      iso: ReturnCorrectVal(data["s_country_iso"], ""),
      identified: 1,
      modid: ReturnCorrectVal(data["modid"], ""),
      token: "imobile@15061981",
      format: "JSON",
      screen_name:
        ReturnCorrectVal(data["flag"], "") +
        " Form on " +
        ReturnCorrectVal(data["modid"], ""),
      IP: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
      USER_IP: ReturnCorrectVal(
        data["s_ip_address"],
        ReqObj.IPDetails["ipaddress"]
      ),
      ip: ReturnCorrectVal(data["s_ip_address"], ReqObj.IPDetails["ipaddress"]),
      USER_IP_COUNTRY: ReturnCorrectVal(
        data["s_ip_country"],
        ReqObj.IPDetails["countryname"]
      ),
      GEOIP_COUNTRY_ISO: ReturnCorrectVal(
        data["s_ip_country_iso"],
        ReqObj.IPDetails["countryiso"]
      ),
      IPADDRESS: ReturnCorrectVal(
        data["s_ip_country"],
        ReqObj.IPDetails["countryname"]
      ),
    };
  
    if (
      data["loginflag"] === 1 ||
      data["loginflag"] === 4 ||
      data["loginflag"] === 5
    ) {
      ajaxData["originalreferer"] = ReturnCorrectVal(data["curr_page_url"], "");
      ajaxData["create_user"] = 1;
    }
    return ajaxData;
  };
  UserLogin.prototype.returnBool = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var blureve = event.data.blureve;
    if (isSet(event.data.iso)) var iso = event.data.iso;
    var bool = blureve === true && (isEnq(tmpId) || Bl09(tmpId)) && iso === "IN" ? false : isSet(blureve) && blureve === true ? userlogin.validate(tmpId, event) : true;
    return bool;
  };
  
  UserLogin.prototype.beforHitDefaults = function (logObject, todo, tmpId, userlogin) {
    if ((isSet(logObject) && logObject !== "") || (logObject === "" && todo === "blurlogin")) {
      if (IsChatbl(tmpId)) {
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "chatblur",
            fromwhere: "beforehit",
            obj: userlogin,
          },
        });
      } else {
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "disableNameField",
            fromwhere: "beforehit",
            obj: userlogin,
          },
        });
        isSSB(tmpId) ? addBlLoaderSSB(tmpId, "ssblogin") : addBlLoader(tmpId, "left");
      }
    }
  };
  UserLogin.prototype.reAuthenticate = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var imesh = imeshExist();
    var iploc = iplocExist();
    var data = {
      imesh: imesh,
      im_iss: im_issExist(),
      v4iilex: v4iilexExist(),
      s_glusrid: usercookie.getParameterValue(imesh, "glid"),
      username:
        currentISO() === "IN"
          ? ReqObj.UserDetail["mb1"]
          : ReqObj.UserDetail["em"],
      country: usercookie.getParameterValue(iploc, "gcnm"),
      IP: usercookie.getParameterValue(iploc, "gip"),
      loginmode:
        ReqObj.loginMode !== 0
          ? ReqObj.loginMode
          : new LoginMode().getLoginMode(),
      ph_country: usercookie.getParameterValue(imesh, "phcc"),
      iso: currentISO(),
      modid: modIdf,
    };
    $.ajax({
      cache: false,
      url: appsServerName + "index.php?r=Newreqform/Reauthenticate",
      type: "GET",
      crossOrigin: true,
      crossDomain: true,
      data: data,
      dataType: "json",
      success: function (res) {
        userlogin.updateUserDetails(data.loginmode, res, "reauth");
        userlogin.updateFlagDetails(data.loginmode, res);
        callToIdentifiedQ(tmpId, "from-Form", 0);
      },
    });
  };
  
  UserLogin.prototype.sendRequest = function (event) {
    var that = this;
    var logObject = event.data.logObject;
    var tmpId = event.data.tmpId;
    var userlogin = event.data.userlogin;
    var todo = event.data.todo;
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var bool = userlogin.returnBool(event);
    that.userBlocked = 0;
    if (
      isSSB(tmpId) &&
      !isSet(event.data.source) &&
      $.inArray(ConstructorName(this), ReqObj.Form[tmpId].servicecalled) !== -1
    ) {
      PostAjax(logObject, tmpId);
      return;
    }
    if (bool === true) {
      if (isSet(ReqObj.Form[tmpId].defSubmit))
        ReqObj.Form[tmpId].defSubmit.blurfired =
          todo === "blurlogin" ? true : false;
      if (todo === "blurlogin" && isSet(ReqObj.Form[tmpId].defSubmit))
        ReqObj.Form[tmpId].defSubmit.loginfval = $(
          "#t" + tmpId + "_login_field"
        ).val();
      userlogin.classCount = returnObjectSize(ReqObj.Form[tmpId].ContactDetail);
      userlogin.beforHitDefaults(logObject, todo, tmpId, userlogin);
      var data = userlogin.getData(tmpId, userlogin, todo);
      var ajaxdata = userlogin.getajaxData(data);
      var ajaxURL = userlogin.getLoginAjaxURL();
      $.ajax({
        cache: false,
        url: ajaxURL,
        type: "POST",
        crossOrigin: true,
        crossDomain: true,
        data: ajaxdata,
        dataType: "json",
        success: function (res) {
          // if(data.username == "manisince1999@gmail.com"){
          //     res = {"message":"ISO MisMatch","access":"0","code":"204","msg":"You seem to be from India. Select India as Country"};
          // }
          // res={"DataCookie":{"fn":"","em":"","phcc":"","iso":"IN","mb1":"","ctid":"","glid":"","cd":"","cmid":"","utyp":"","ev":"","uv":"","usts":"2","admln":"","admsales":""},"access":"0","code":"204","msg":"User blocked for Identification"}
          if (isSet(res)) {
            /* ::If response set ::*/
            if (data.loginflag === 3) {
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "defaultFlag3",
                  obj: userlogin,
                },
              });
            }
            if (
              (isSet(logObject) && logObject !== "") ||
              (logObject === "" && todo === "blurlogin")
            ) {
              /* logObject not empty - Login Hit :: blurlogin - blur Hit */
              IsChatbl(tmpId)
                ? removeBLLoader(tmpId, "left")
                : isSSB(tmpId)
                  ? removeBLLoaderSSB(tmpId, "ssblogin")
                  : removeBLLoader(tmpId, "center");
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "enableNameField",
                  obj: userlogin,
                },
              });
            }
  
            // ecom, first we have to save details and then redirect, before handling ui part
            if (
              ReqObj.Form[tmpId].typeofform === "image" &&
              isEcomProduct(tmpId)
            ) {
              if (isSet(res.code) && parseInt(res.code) === 200) {
                userlogin.updateUserDetails(data.loginflag, res);
                userlogin.updateFlagDetails(data.loginflag, res);
  
                if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
                  callToIdentifiedQ(tmpId, "from-Form");
                } else {
                  callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
                }
              }
              var isUserBlocked = 0;
              if (
                isSet(res.msg) &&
                res.msg.toLowerCase().trim() ===
                "user blocked for identification" &&
                res.DataCookie["iso"] === "IN"
              ) {
                isUserBlocked = 1;
              }
              var isIsoMismatch = 0;
              if (
                isSet(res.message) &&
                res.message.toLowerCase().trim() === "iso mismatch"
              ) {
                isIsoMismatch = 1;
              }
              if (
                imeshExist() !== "" ||
                isUserBlocked === 1 ||
                isIsoMismatch === 1
              ) {
                CloseForm(tmpId);
                window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
              }
            }
            userlogin.afterLoginHit({
              data: {
                tmpId: tmpId,
                res: res,
                obj: userlogin,
              },
            }); /* The Ui part is handled in afterLoginHit for 200/204 with saving necessary details  */
            if (
              (isSet(res.code) && parseInt(res.code) === 200) ||
              (isSet(that.userBlocked) && that.userBlocked === 1)
            ) {
              userlogin.updateUserDetails(data.loginflag, res);
              userlogin.updateFlagDetails(data.loginflag, res);
  
              if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
                /* Post Ajax */
                if (isSSB(tmpId)) afterLoginSSBstep(tmpId, todo, that);
                PostAjax(logObject, tmpId);
                callToIdentifiedQ(tmpId, "from-Form");
              } else {
                callToIdentifiedQ(tmpId, "from-Form", 0); /* Blur Hit */
              }
            } else if (isSet(res.code) && parseInt(res.code) === 204) {
              blenqGATracking(form_type, "service:EtoGlusrLogin:" + res.message, res, 1, tmpId);
              userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "showemail",
                  obj: userlogin,
                },
              });
              userlogin.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "showcity",
                  obj: userlogin,
                },
              });
            } else {
              /* Track Error if code not 200/204 */
              blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
              userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
            }
          } else {
            /* If response not set :: empty/null/undefined */
            blenqGATracking(form_type, "service:EtoGlusrLogin:failure", "response undefined", 1, tmpId);
            userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit*/
          }
        },
        error: function (res) {
          if (ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId)) {
            CloseForm(tmpId);
            window.open(ReqObj.Form[tmpId].ecomUrl, "_blank");
          }
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "tryagain",
              obj: userlogin,
              msg: "",
            },
          });
          res = isSet(res) ? JSON.stringify(res) : "response undefined";
          blenqGATracking(form_type, "service:EtoGlusrLogin:failure", res, 1, tmpId);
          userlogin.logObjectNoPostAjax(logObject, tmpId); /* no blur hit */
          if (logObject === "" && todo === "blurlogin") {
            // removeBLLoader(tmpId, "center");
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                obj: userlogin,
              },
            });
          }
        },
        complete: function (res) {
          if (IsChatbl(tmpId))
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "chatblur",
                fromwhere: "aftercomplete",
                obj: userlogin,
              },
            });
          if (logObject === "" && todo === "blurlogin") {
            removeBLLoader(tmpId, "center");
          }
        },
      });
    } else {
      if (
        $("#t" + tmpId + "_tCondCheckBox").length > 0 &&
        isSet(ReqObj.Form[tmpId].defSubmit)
      ) {
        ReqObj.Form[tmpId].defSubmit.blurfired = true;
        ReqObj.Form[tmpId].defSubmit.loginfval = $(
          "#t" + tmpId + "_login_field"
        ).val();
      }
    }
  };
  UserLogin.prototype.logObjectNoPostAjax = function (logObject, tmpId) {
    if (isSet(logObject) && isSet(tmpId) && logObject !== "") {
      /* Not Blur Hit. */
      removeBLLoader(tmpId, "center");
      RemoveObjFromHit(logObject, tmpId);
    }
  };
  //fdsfgsf
  UserLogin.prototype.afterLoginHit = function (event) {
    var tmpId = event.data.tmpId;
    var userlogin = event.data.obj;
    var res = event.data.res;
  
    if (parseInt(res.code) === 200) {
      if (isSet(res.DataCookie) && Object.keys(res.DataCookie).length > 0) {
        if ($("#t" + tmpId + "_q_first_nm" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] !== "") {
            if (IsChatbl(tmpId))
              ReqObj.Form[tmpId].UserInputs["Name"] = res.DataCookie["fn"];
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["fn"],
                todo: "disableNameField",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
            if (
              ReqObj.Form[tmpId].defSubmit.todo === false &&
              ReqObj.Form[tmpId].defSubmit.subfired === false
            ) {
              ReqObj.Form[tmpId].defSubmit.subfired = true;
              ReqObj.Form[tmpId].FormSequence.FormSubmit(
                tmpId,
                ReqObj.Form[tmpId].defSubmit.eve
              );
            }
          } else if (isSet(res.DataCookie["fn"]) && res.DataCookie["fn"] === "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                fromwhere: "emptyTempName",
                obj: userlogin,
              },
            });
            if (
              ReqObj.Form[tmpId].defSubmit.todo === false &&
              ReqObj.Form[tmpId].defSubmit.subfired === false
            ) {
              ReqObj.Form[tmpId].defSubmit.subfired = true;
              ReqObj.Form[tmpId].FormSequence.FormSubmit(
                tmpId,
                ReqObj.Form[tmpId].defSubmit.eve
              );
            }
          } else if (Object.keys(res.DataCookie).length === 0) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                todo: "enableNameField",
                fromwhere: "code",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_email_in" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["em"],
                todo: "hideemail",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (isSet(res.DataCookie["em"]) && res.DataCookie["em"] === "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["em"],
                todo: "showemail",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_city_oth" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["ctid"]) && res.DataCookie["ctid"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "hidecity",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (
            isSet(res.DataCookie["ctid"]) &&
            res.DataCookie["ctid"] === ""
          ) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "showcity",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
        if ($("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).length > 0) {
          if (isSet(res.DataCookie["mb1"]) && res.DataCookie["mb1"] !== "") {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["mb1"],
                todo: "hidemobile",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          } else if (
            isSet(res.DataCookie["ctid"]) &&
            res.DataCookie["ctid"] === ""
          ) {
            userlogin.handleUI({
              data: {
                tmpId: tmpId,
                value: res.DataCookie["ctid"],
                todo: "showmobile",
                fromwhere: "afterhit",
                obj: userlogin,
              },
            });
          }
        }
      } else
        userlogin.handleUI({
          data: {
            tmpId: tmpId,
            todo: "tryagain",
            obj: userlogin,
            msg: "Something went wrong.Please try again.",
          },
        });
  
      if (isSet(res.DataCookie["glid"]) && res.DataCookie["glid"] !== "") {
        ReqObj.glid = res.DataCookie["glid"];
        !isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled
          ? toCallMiniDetails(tmpId)
          : "";
      }
    } else if (parseInt(res.code) === 204) {
      $("#t" + tmpId + "_q_first_nm" + userlogin.classCount).val("");
      $("#t" + tmpId + "_q_mobile_f" + userlogin.classCount).val("");
      if (
        isSet(res.msg) &&
        (res.msg.trim() === "Email is not registered with Indiamart." ||
          res.msg.trim() === "Mobile Number is not registered with Indiamart.") &&
        isSet(ReqObj.Form[tmpId].defSubmit.todo) &&
        ReqObj.Form[tmpId].defSubmit.todo === false &&
        ReqObj.Form[tmpId].defSubmit.subfired === false
      ) {
        ReqObj.Form[tmpId].defSubmit.subfired = true;
        ReqObj.Form[tmpId].FormSequence.FormSubmit(
          tmpId,
          ReqObj.Form[tmpId].defSubmit.eve
        );
      }
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          todo: "enableNameField",
          fromwhere: "emptyTempName",
          obj: userlogin,
        },
      });
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          value: "",
          todo: "showcity",
          fromwhere: "afterhit",
          obj: userlogin,
        },
      });
      userlogin.handleUI({
        data: {
          tmpId: tmpId,
          value: "",
          todo: "showemail",
          fromwhere: "afterhit",
          obj: userlogin,
        },
      });
      if (
        isSet(res.msg) &&
        ((isSet(res.message) && res.message.trim() === "ISO MisMatch".trim()) ||
          res.msg.trim() === "Unable to Create User".trim() ||
          res.msg.trim() ===
          "Please use your registered Mobile Number to Login".trim() ||
          res.msg.trim() === "Invalid mobile Number".trim() ||
          res.msg.trim() === "GLUSER creation service unavailable".trim())
      ) {
        if (
          !(ReqObj.Form[tmpId].typeofform === "image" && isEcomProduct(tmpId))
        ) {
          userlogin.handleUI({
            data: {
              tmpId: tmpId,
              todo: "tryagain",
              obj: userlogin,
              msg: res.msg,
            },
          });
        }
      }
      if (
        isSet(res.msg) &&
        res.msg.toLowerCase().trim() === "user blocked for identification" &&
        res.DataCookie["iso"] === "IN"
      ) {
        this.userBlocked = 1;
        ReqObj.UserDetail["blusrdtl"] = {
          blkUsr: 1,
          blk_mb: event.data.obj.username,
          blk_iso: "91",
        };
      }
    }
  };
  
  UserLogin.prototype.updateUserDetails = function (loginflag, res, mode) {
    if (loginflag !== 3 && isSet(res.DataCookie) && res.DataCookie !== "") {
      if (
        mode === "reauth" ||
        !(isSet(res.DataCookie["usts"]) && res.DataCookie["usts"] === "2")
      ) {
        if (typeof imesh_obj !== "undefined")
          imesh_obj.set(res.DataCookie); /* to set imesh cookie */
      }
    }
    UpdateAfterLogin("fn");
    UpdateAfterLogin("em");
    UpdateAfterLogin("ctid");
    UpdateAfterLogin("mb1");
    UpdateAfterLogin("uv");
    if (
      imeshExist() !== "" &&
      usercookie.getParameterValue(imeshExist(), "ctid") === ""
    ) {
      ReqObj.UserDetail.cityname = "";
      ReqObj.UserDetail.ctoth = "";
    }
  };
  
  UserLogin.prototype.updateFlagDetails = function (loginflag, res) {
    if (loginflag === 3 || loginflag === 1) {
      ReqObj.userType = "UnIdentified";
      if (isSet(res.msg) && res.msg !== "") {
        ReqObj.loginMode =
          res.msg.trim() === "Mobile Number found in Primary Mobile".trim() ||
            res.msg.trim() === "Email found in Primary Email".trim()
            ? 4
            : res.msg.trim() ===
              "New User created via User creation service".trim()
              ? 3
              : 0;
      }
    } else if (isSet(loginflag) && loginflag !== 3 && loginflag !== 1) {
      ReqObj.userType = "Identified";
      ReqObj.loginMode = 2;
    }
  };
  UserLogin.prototype.handleEvents = function (obj, tmpId) {
    var addEvents = setInterval(function () {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        $("#t" + tmpId + "_login_field").attr("request", 0);
        if (!isSet(validation)) createGlobalObject();
        var iso_change = currentISO();
        if (iso_change !== "IN") {
          $("#t" + tmpId + "_submit").hover(
            function () {
              ReqObj.Form[tmpId].subhover = true;
            },
            function () {
              ReqObj.Form[tmpId].subhover = false;
            }
          );
        }
        $("#t" + tmpId + "flag")
          .off("click.Validation")
          .on(
            "click.Validation",
            {
              todo: "show",
              obj: obj,
              tmpId: tmpId,
            },
            obj.handleUI
          );
  
        isSSB(tmpId)
          ? $("#t" + tmpId + "_login_field")
            .off("keyup.Validation")
            .on(
              "keyup.Validation",
              {
                todo: "removeError",
                obj: obj,
                tmpId: tmpId,
              },
              obj.handleUI
            )
          : $("#t" + tmpId + "_login_field")
            .off("focus.Validation keypress.Validation")
            .on(
              "focus.Validation keypress.Validation",
              {
                todo: "removeError",
                obj: obj,
                tmpId: tmpId,
              },
              obj.handleUI
            );
  
        if (iso_change === "IN")
          $("#t" + tmpId + "_login_field")
            .off("keypress.Validation")
            .on("keypress.Validation", validation.isNumberKey);
  
        if (tmpId.substring(0, 2) === "09")
          obj.handleUI({
            data: {
              tmpId: tmpId,
              todo: "09defaultcss",
              obj: obj,
            },
          });
  
        //var prev_key = -1;
        if (!IsChatbl(tmpId)) {
          $("#t" + tmpId + "_login_field").on("keydown", function (event) {
            if (
              event.ctrlKey === true &&
              (event.keyCode === 67 ||
                event.keyCode === 65 ||
                event.keyCode === 90)
            ) {
            } else if (
              event.keyCode === 8 ||
              (event.keyCode >= 96 && event.keyCode <= 105) ||
              (event.keyCode >= 48 && event.keyCode <= 57) ||
              (event.keyCode >= 65 && event.keyCode <= 90)
            ) {
              if (obj.classCount == 0) {
                obj.classCount = 1;
                $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
                  "readonly",
                  false
                );
              }
              $("#t" + tmpId + "_q_first_nm" + obj.classCount).val("");
              ReqObj.CNSerCalled = false;
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  todo: "enableNameField",
                  obj: obj,
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showemail",
                  obj: obj,
                  task: "toempty",
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showmobile",
                  obj: obj,
                  task: "toempty",
                },
              });
              obj.handleUI({
                data: {
                  tmpId: tmpId,
                  value: "",
                  todo: "showcity",
                  obj: obj,
                },
              });
            }
            //prev_key = event.keyCode;
          });
          $("#t" + tmpId + "_login_field").on(
            "change",
            {
              logObject: "",
              tmpId: tmpId,
              userlogin: obj,
              blureve: true,
              todo: "blurlogin",
              iso: iso_change,
            },
            obj.sendRequest
          );
        }
        clearInterval(addEvents);
      }
    }, 200);
  };
  UserLogin.prototype.handleUI = function (event) {
    if (isSet(event)) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode !== 13) {
        var todo = event.data.todo;
        var tmpId = event.data.tmpId;
        var obj = event.data.obj;
        if (todo === "transition") {
          if (isSet($("#t" + tmpId + "_login"))) {
            ChatblfooterAns(tmpId);
          }
        }
        if (todo === "focus") {
          $("#t" + tmpId + "_login_field").focus();
        }
        if (todo === "default") {
          IsChatbl(tmpId)
            ? setTimeout(function () {
              $("#t" + tmpId + "_login_field").focus();
            }, 1800)
            : $("#t" + tmpId + "_login_field").focus();
        }
        if (todo === "isoFlag") {
          var iso_change = currentISO();
          var toAppend = IsChatbl(tmpId) ? "_flagC" : "jsflagdiv";
          $("#t" + tmpId + "flag").removeAttr("disabled");
          var ele = $("#t" + tmpId + "flag").detach();
          $("#t" + tmpId + toAppend).prepend(ele);
          var elel = $("#t" + tmpId + "country_dropd").detach();
          $("#t" + tmpId + "country").prepend(elel);
  
          if (IsChatbl(tmpId) && $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")) {
            $("#t" + tmpId + "flagdiv")
              .prepend(ele)
              .addClass("bedsnone");
          }
          if (ReqObj.isoFlag !== "" && iso_change === "IN") {
            $("#t" + tmpId + "_iso").attr("value", ReqObj.isoFlag);
          }
        } else if (todo === "removeError") {
          $("#t" + tmpId + "_msg_primary_info_err_login").addClass("bedsnone");
          $("#t" + tmpId + "_login_field").removeClass("highlight-err");
          $("#t" + tmpId + "_label-l").removeClass("redc");
          removechatblerror(tmpId);
          $(".cbl_error").removeClass("cbl_frnerr");
          if (IsChatBLInline(tmpId)) {
            $("#t" + tmpId + "mflag").removeClass("mb25");
            if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").removeClass("bt142");
          }
          if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").removeClass("bedsnone");
        } else if (todo === "tryagain") {
          if (isSet(event.data.msg) && event.data.msg !== "") {
            $("#t" + tmpId + "_primary_info_errmsg_login").html(event.data.msg);
            $("#t" + tmpId + "_msg_primary_info_err_login").removeClass(
              "bedsnone"
            );
            if (IsChatbl(tmpId)) {
              $(".cbl_error").addClass("cbl_frnerr");
              if (IsChatBLInline(tmpId)) {
                $("#t" + tmpId + "mflag").addClass("mb25");
                if (toShowTnc(tmpId))
                  $("#t" + tmpId + "_tCond").addClass("bt142");
              }
              addChatblError(tmpId, event.data.msg);
            }
            if (isSSB(tmpId)) $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
          }
        } else if (todo === "defaultFlag3") {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .removeClass("highlight-err mb-erbrd nb-erbrd")
            .siblings(".redc")
            .removeClass("redc");
          $("#t" + tmpId + "_error_first_name" + obj.classCount).addClass(
            "bedsnone"
          );
        } else if (todo === "enableNameField") {
          $("#t" + tmpId + "_q_first_nm" + obj.classCount)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
          if (
            event.data.fromwhere === "code" ||
            event.data.fromwhere === "emptyTempName"
          )
            ReqObj.TempName = "";
        } else if (todo === "disableNameField") {
          if (isSet(event.data.value)) {
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).val(
              event.data.value
            );
            $("#t" + tmpId + "_name-lb1").removeClass("redc");
            isSSB(tmpId)
              ? ""
              : $("#t" + tmpId + "_q_first_nm" + obj.classCount)
                .parents()
                .addClass("eqfcsed");
            //(isnewSSB(tmpId)) ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).parents().addClass('focused') :
          }
          if (event.data.fromwhere === "afterhit") {
            ReqObj.TempName = event.data.value;
            $("#t" + tmpId + "_q_first_nm" + obj.classCount).attr(
              "disabled",
              "disabled"
            );
            isSSB(tmpId)
              ? $("#t" + tmpId + "_q_first_nm" + obj.classCount).addClass(
                ssbClass("disable", tmpId)
              )
              : "";
          }
        } else if (todo === "validationError") {
          var errormsg = event.data.errormsg;
          $("#t" + tmpId + "_primary_info_errmsg_login").html(errormsg);
          $("#t" + tmpId + "_msg_primary_info_err_login").removeClass("bedsnone");
          if (IsChatbl(tmpId)) {
            $(".cbl_error").addClass("cbl_frnerr");
            if (IsChatBLInline(tmpId)) {
              $("#t" + tmpId + "mflag").addClass("mb25");
              if (toShowTnc(tmpId)) $("#t" + tmpId + "_tCond").addClass("bt142");
            }
            addChatblError(tmpId, errormsg);
          } else $("#t" + tmpId + "_login_field").addClass("highlight-err");
          if (isSSB(tmpId)) {
            $("#t" + tmpId + "_login_field").focus();
            $("#t" + tmpId + "_helpmsg").addClass("bedsnone");
          }
          if (
            !IsChatbl(tmpId) &&
            !isSSB(tmpId) &&
            (!isOtherEnq(tmpId) ||
              (isOtherEnq(tmpId) && tmpId.substring(0, 2) !== "09"))
          )
            $("#t" + tmpId + "_label-l").addClass("redc");
        } else if (todo === "09defaultcss") {
          $("#t" + tmpId + "_login_field").focus();
          if (!isOtherEnq(tmpId))
            $("#t" + tmpId + "_login_field").css({
              border: "1px solid #43bfb3 ",
              boxShadow: "1px 0px 4px #43bfb3 ",
            });
        } else if (todo === "chatblur") {
          if (event.data.fromwhere === "beforehit") {
            $("#t" + tmpId + "_login_field")
              .prop("disabled", true)
              .addClass("chatblur");
            $("#t" + tmpId + "_submit")
              .prop("disabled", true)
              .addClass("chatblur");
          } else if (event.data.fromwhere === "aftercomplete") {
            $("#t" + tmpId + "_login_field")
              .prop("disabled", false)
              .removeClass("chatblur");
            $("#t" + tmpId + "_submit")
              .prop("disabled", false)
              .removeClass("chatblur");
          }
        } else if (todo === "hideemail") {
          $("#t" + tmpId + "_q_email_in" + obj.classCount)
            .val(event.data.value)
            .prop("disabled", true)
            .addClass(ssbClass("disable", tmpId));
        } else if (todo === "hidecity") {
          isSSB(tmpId) && isnewSSB(tmpId)
            ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .addClass("cbl_vh")
            : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .parent()
              .addClass("cbl_vh");
        } else if (todo === "showemail") {
          var inputval =
            event.data.task === "toempty"
              ? ""
              : isSet(event.value) && event.value !== ""
                ? event.value
                : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
          $("#t" + tmpId + "_q_email_in" + obj.classCount)
            .val(inputval)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
        } else if (todo === "showcity") {
          isSSB(tmpId) && isnewSSB(tmpId)
            ? $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .removeClass("cbl_vh")
            : $("#t" + tmpId + "_q_city_oth" + obj.classCount)
              .parent()
              .parent()
              .removeClass("cbl_vh");
        } else if (todo === "hidemobile") {
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
            .val(event.data.value)
            .prop("disabled", true)
            .addClass(ssbClass("disable", tmpId));
          if (isEnq(tmpId))
            $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
              .parent()
              .addClass("eqfcsed");
        } else if (todo === "showmobile") {
          var inputval =
            event.data.task === "toempty"
              ? ""
              : isSet(event.value) && event.value !== ""
                ? event.value
                : $("#t" + tmpId + "_q_email_in" + obj.classCount).val();
          $("#t" + tmpId + "_q_mobile_f" + obj.classCount)
            .val(inputval)
            .prop("disabled", false)
            .removeClass(ssbClass("disable", tmpId));
        }
      }
    }
  };
  
  
function Validation() {
    var usercookie = new UserCookie(); //hatadena
    this.result = {
      type: true,
      error: "",
    };
    this.usercountry = currentISO();
  }

function checkJunkCname(cname) {
    var junkCname = [
      /\b(no company)\b/,
      /\b(no name)\b/,
      /\b(not applicable)\b/,
      /\b(person)\b/,
      /\b(personal)\b/,
      /\b(individual)\b/,
    ];
  
    for (var x in junkCname) {
      var re = new RegExp(junkCname[x]);
      if (isSet(cname.match(re))) return true;
    }
    return false;
  }
  
  var validation = new Validation();
  var isBlEnqLoaded = true;
  var isChatBlSequenceUpdated = false;
  var ischatblnextquestionasked = false;
  var isChatWidgetOpen = false;
  // for generating event
  var FormCloseEvent = jQuery.Event("formClose");
  var OnBlEnqClose = jQuery.Event("onBLEnqClose");
  //form load event
  var ReqFormScriptLoaded = jQuery.Event("ReqFormLoaded");
  $("body").trigger(ReqFormScriptLoaded);
  
function DescMapWithId(tmpId, optionDesc, optionId) {
    ReqObj.Form[tmpId].IdMapDesc = {};
    for (i = 0; i < optionDesc.length; i++) {
      ReqObj.Form[tmpId].IdMapDesc[optionDesc[i].toLowerCase()] = optionId[i];
    }
  }
  
  function convertHtml(IsqObj, tmpId, ObjectPosition) {
    if (!isSet(ObjectPosition)) ObjectPosition = 0;
    ReqObj.Form[tmpId].questionCount += 1;
    var option_desc = IsqObj.IM_SPEC_OPTIONS_DESC
      ? IsqObj.IM_SPEC_OPTIONS_DESC.split(IsqSeperator)
      : [];
    var option_id = IsqObj.IM_SPEC_OPTIONS_ID
      ? IsqObj.IM_SPEC_OPTIONS_ID.split(IsqSeperator)
      : [];
    var IsOptionIdEmpty = isSet(option_id) && option_id.length > 0 ? true : false;
    IsqObj.IM_SPEC_MASTER_FULL_DESC =
      isSet(IsqObj.IM_SPEC_MASTER_FULL_DESC) &&
        IsqObj.IM_SPEC_MASTER_FULL_DESC !== "" &&
        IsqObj.IM_SPEC_MASTER_FULL_DESC.length > 40
        ? IsqObj.IM_SPEC_MASTER_FULL_DESC.substr(0, 60) + "..."
        : IsqObj.IM_SPEC_MASTER_FULL_DESC;
    var prefilledAns = FillIsq(IsqObj.IM_SPEC_MASTER_DESC, tmpId);
    prefilledAns = prefilledAns === null ? "" : prefilledAns;
    var type = returnIsqObjType(tmpId, IsqObj);
    switch (type) {
      case 1:
        return typeText({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 2:
        return typeRadio({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 3:
        return typeSelect({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 4:
        return typeCheckBox({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
            },
          },
        });
      case 5:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "qt",
            },
          },
        });
      case 6:
        return typeQuantity({
          data: {
            tmpId: tmpId,
            IsqObj: IsqObj,
            keys: {
              ObjectPosition: ObjectPosition,
              prefilledAns: prefilledAns,
              option_id: option_id,
              option_desc: option_desc,
              IsOptionIdEmpty: IsOptionIdEmpty,
              type: "ut",
            },
          },
        });
    }
  }
  
  function returnIsqObjType(tmpId, IsqObj) {
    if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity") return 5;
    else if (IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit")
      return 6;
    else return parseInt(IsqObj.IM_SPEC_MASTER_TYPE);
  }
  /*---------------------------------------return Empty Object--------------------------------------------*/
  
  function returnEmptyObject() {
    return {
      OuterWrapper: "<div>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: "",
      ClosingWrapper: "</div>",
    };
  }
  /* ---------------------------------------------------TYPE : text ---------------------------------------------------- */
  
  function typeText(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var textboxObject = returnIsqHtmlObject(event, QuestionObject);
    textboxObject["optionId"] = event.data.keys.IsOptionIdEmpty
      ? event.data.keys.option_id
      : false;
    textboxObject["inputId"] =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount +
        (ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1)
        : "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["inputName"] =
      "t" +
      event.data.tmpId +
      "text_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    textboxObject["ans"] = event.data.keys.prefilledAns;
    textboxObject["placeholder"] = IsChatbl(event.data.tmpId)
      ? " Enter " + QuestionObject.questionText
      : "";
  
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      textboxObject.QuestionDesc.toLowerCase() === "quantity"
    )
      return returnEmptyObject();
    ReqObj.Form[event.data.tmpId].isQtutShown =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    /* CSS related */
    textboxObject["divClass"] =
      event.data.keys.ObjectPosition > 0 && !IsChatbl(event.data.tmpId)
        ? "bepr beclr isq-st19"
        : "bepr beclr";
    textboxObject["lblClass"] = " be-lbl";
    textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
      ? isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? "be-input beisq-tbx bg-white inpt_errorbx imgoneqty"
        : isSSB(event.data.tmpId)
          ? ""
          : (isInactiveBL(event.data.tmpId)) ? "be-w50 lgcont be-input beisq-tbx bg-white inpt_errorbx cbl_br10 cpNm" : "be-input beisq-tbx bg-white inpt_errorbx"
      : "cbl_txt"; /* WARNING - Don't use imgoneqty class anywhere else */
    textboxObject["inputClass"] =
      isOtherEnq(event.data.tmpId) &&
        textboxObject.QuestionDesc.toLowerCase() !== "quantity"
        ? textboxObject["inputClass"] + " txtblng"
        : textboxObject["inputClass"];
    if (event.data.keys.ObjectPosition > 0 && IsChatbl(event.data.tmpId)) {
      textboxObject["inputClass"] = !IsChatbl(event.data.tmpId)
        ? textboxObject["inputClass"] + " be-chatW"
        : "cbl_qunty";
    }
    var descriptionHtml =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? ""
        : Tooltip("text", event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC);
    var lblClass = "lbtool";
    textboxObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      textboxObject["lblin"] = false;
    }
    var typetextHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
          ? ""
          : "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: isSSB(event.data.tmpId)
        ? "<label class = '" +
        ssbClass("label", event.data.tmpId) +
        "'>" +
        textboxObject.QuestionDesc +
        "</label>"
        : "<div class='" +
        lblClass +
        "'>" +
        MakeLabel(textboxObject, descriptionHtml, event.data.tmpId) +
        "</div>",
      beforeInput: "",
      UserInput: isSSB(event.data.tmpId)
        ? isnewSSB(event.data.tmpId)
          ? TextBoxIp(textboxObject)
          : '<div class="mb-InCon">' + TextBoxIp(textboxObject) + "</div>"
        : TextBoxIp(textboxObject),
      ClosingWrapper: "</div>",
    };
    var html = "";
    html += returnContainer(
      textboxObject["inputId"],
      "_err",
      "texterr errpdg bedsnone",
      "",
      ""
    );
    html += returnContainer(
      textboxObject["inputId"],
      "_errmsg",
      "",
      "content",
      ""
    );
    html += "</div>Please enter valid input</div>";
    typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "" + html;
    //typetextHtmlObj["UserInput"] = typetextHtmlObj["UserInput"] + "</div>" + html; // isq disappear backbutton
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typetextHtmlObj;
  }
  /* ---------------------------------------------------TYPE : Radio ---------------------------------------------------- */
  
  function typeRadio(event) {
    ReqObj.Form[event.data.tmpId].toAppendQues = IsChatBLInline(event.data.tmpId)
      ? true
      : false;
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "RADIO",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var RadioboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (RadioboxObject["lblClass"] = " be-lbl");  js error unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (RadioboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "radio",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "radio_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      screen_no +
      "']";
    var typeRadioHtmlObj = {
      OuterWrapper:
        isSSB(event.data.tmpId) &&
          event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "<div class='" + ssbClass("wrprClass", event.data.tmpId) + "'>"
          : "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
          RadioboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        )
        : "<div class='lbtool'>" +
        LabelForCheckAndRadio(
          RadioboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        ) +
        "</div>",
      ClosingWrapper:
        isSSB(event.data.tmpId) &&
          event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers"
          ? "</div>"
          : "",
    };
  
    typeRadioHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? "<div class = 'cbl_radio'>"
      : isBlInline(event.data.tmpId)
        ? "<div class='iwChk'>"
        : isSSB(event.data.tmpId) && isnewSSB(event.data.tmpId)
          ? "<div class='nb-flex nb-aic nb-flwp nb-mt10'>"
          : "<div class=''>";
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var indexofAns = -1;
        var optionDesc = event.data.keys.option_desc[i];
        if (isSet(optionDesc)) {
          optionDesc = trimVal(optionDesc);
        }
        if (event.data.keys.prefilledAns.length > 0) {
          //indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns); // 1 Kg and kg case mismatch issue
          var defaultResult = -1;
          var indexofAns = defaultResult;
          $.each(event.data.keys.prefilledAns, function (index, value) {
            if (
              indexofAns == defaultResult &&
              value.toLowerCase() == optionDesc.toLowerCase()
            ) {
              indexofAns = index;
            }
          });
  
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
        if (
          checkdefaultIsq(
            event.data.tmpId,
            QuestionObject.questionText,
            QuestionObject.type,
            optionDesc
          )
        ) {
          indexofAns = 1;
          typeRadioHtmlObj["WrapClass"] = "dn";
        }
        if (
          optionDesc.trim().toLowerCase() === "others" ||
          optionDesc.trim().toLowerCase() === "other"
        ) {
          var cbl_br = (isInactiveBL(event.data.tmpId)) ? "cbl_br10" : "";
          var OtherObject = {
            divClass: isSSB(event.data.tmpId)
              ? "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox t" +
              event.data.tmpId +
              "other_radiotemp"
              : "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox oth_bx other_radio t" +
              event.data.tmpId +
              "other_radiotemp " + cbl_br,
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_radio_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: indexofAns === -1 ? event.data.keys.prefilledAns : "",
          };
          typeRadioHtmlObj["UserInput"] += OthersBox(
            OtherObject,
            event.data.tmpId
          );
          QuestionObject["others"].push(
            "#" +
            "t" +
            event.data.tmpId +
            "other_radio_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1)
          );
        } else {
          var RadioBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          var radSubmit = IsChatBLInline(event.data.tmpId)
            ? " t" + event.data.tmpId + "_radSubmit"
            : "";
          RadioBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          RadioBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : "bepr CheckboxClick";
          RadioBoxObject["divClass1"] =
            indexofAns !== -1
              ? "t" +
              event.data.tmpId +
              "be-radioboxtemp be-radiobox sl-box chksl be-chckbox"
              : IsChatbl(event.data.tmpId)
                ? IsChatBLInline(event.data.tmpId)
                  ? "cbl_rdon cbl_df cbl_aic cbl_ml20" + radSubmit
                  : "cbl_chekbx cbl_df cbl_aic cbl_ml20" + radSubmit
                : isSSB(event.data.tmpId)
                  ? ssbClass("radin", event.data.tmpId)
                  : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
          RadioBoxObject["divClass2"] =
            indexofAns !== -1 ? "berdio-sl" : "berdio-sl bedsnone";
          RadioBoxObject["inputClass"] =
            indexofAns !== -1
              ? "eqVam bedblk radioClick waschecked"
              : isSSB(event.data.tmpId)
                ? ssbClass("radio", event.data.tmpId)
                : "eqVam bedblk radioClick";
          RadioBoxObject["checked"] = indexofAns !== -1 ? "checked" : "";
          RadioBoxObject["spanClass"] =
            indexofAns !== -1
              ? IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt"
              : IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3";
          if (event.data.IsqObj.IM_SPEC_MASTER_DESC === "Looking for suppliers") {
            RadioBoxObject["cityFunc"] = "onclick = radCheck(this)";
            if (
              indexofAns !== -1 &&
              RadioBoxObject.option_desc.toLowerCase() === "specific city"
            )
              RadioBoxObject["spanClass"] += " specCity";
          }
          typeRadioHtmlObj["UserInput"] += RadioBox(
            event.data.tmpId,
            RadioBoxObject
          );
        }
      }
    }
    typeRadioHtmlObj["UserInput"] +=
      RadioboxObject["QuestionDesc"].toLowerCase() === "why do you need this" &&
        isSSB(event.data.tmpId)
        ? "</div></div>"
        : "</div>";
    // changes for ssb (single page)
    if (isSet(OtherObject) && isSet(OtherObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OtherObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OtherObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      typeRadioHtmlObj["UserInput"] =
        typeRadioHtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return typeRadioHtmlObj;
  }
  
  /* ---------------------------------------------------TYPE : Select ---------------------------------------------------- */
  
  function typeSelect(event) {
    var typeSelectHtmlObj = {};
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "SELECT",
        questionText: isSet(event.data.IsqObj.IM_SPEC_MASTER_DESC)
          ? event.data.IsqObj.IM_SPEC_MASTER_DESC
          : "",
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var tmpId = event.data.tmpId;
    var selectObject = returnIsqHtmlObject(event, QuestionObject);
    selectObject["onchange"] = false;
    selectObject["optionValue"] = "Select a value";
    selectObject["selectName"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    selectObject["selectId"] =
      "t" +
      event.data.tmpId +
      "select_name" +
      ReqObj.Form[event.data.tmpId].questionCount;
    QuestionObject.optionSelector = IsChatbl(event.data.tmpId)
      ? "#t" +
      event.data.tmpId +
      "_selectDD" +
      ReqObj.Form[event.data.tmpId].questionCount
      : "select[name='" + selectObject.selectName + "']";
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
      ReqObj.Form[event.data.tmpId].isQtutShown === true &&
      selectObject.QuestionDesc.toLowerCase() === "quantity unit"
    )
      return returnEmptyObject();
  
    selectObject["divClass"] =
      currentISO() !== "IN" &&
        QuestionObject.questionText.toLowerCase() === "total order value"
        ? "bedblk bepr mr20"
        : "bedblk bepr";
    selectObject["lblClass"] = "be-lbl";
    selectObject["selectClass"] = IsChatbl(event.data.tmpId)
      ? "cbl_selct_unit _ul_select dn"
      : isSSB(event.data.tmpId)
        ? isnewSSB(tmpId)
          ? "nb-selct betextclr"
          : "mb-selct mb-w230 betextclr"
        : isBlInline(tmpId)
          ? ""
          : (isInactiveBL(event.data.tmpId)) ? "be-input bewfull betextclr cbl_br10 cpNm" : "be-input bewfull betextclr";
    selectObject["selectClass"] =
      event.data.keys.ObjectPosition > 0 &&
        IsChatbl(event.data.tmpId) &&
        !IsChatbl(event.data.tmpId)
        ? selectObject["selectClass"] + " be-chatW slt-styl"
        : selectObject["selectClass"];
    selectObject["divClass"] = !IsChatbl(event.data.tmpId)
      ? selectObject["divClass"] + " be-w50 lgcont"
      : selectObject["divClass"];
    selectObject["optionValue"] = SelBoxMSg(
      selectObject.QuestionDesc,
      event.data.tmpId
    );
    if (isBlInline(tmpId)) selectObject["divClass"] = "";
    var optionHtml = ""; //
    var selBoxPrefilled = false;
    var OtherOptionId = "";
    var OtherOptionDesc = "";
    var OtherOptionVal = "";
    var chatBlSpecificObject = {
      readonly:
        '<input type="text" value = "" readonly="" class="cbl_unit" id = "t' +
        event.data.tmpId +
        "_selectDD" +
        ReqObj.Form[event.data.tmpId].questionCount +
        '" name="select_unit" maxlength="1000" autocomplete="off" placeholder= "' +
        selectObject["optionValue"] +
        '">',
      arrow:
        "<div onclick = \"funcClick(this,'" +
        event.data.tmpId +
        "', " +
        ReqObj.Form[event.data.tmpId].questionCount +
        ' )"><svg class="cbl_arw" id = "t' +
        event.data.tmpId +
        '_select_box"><use xlink:href="#t' +
        event.data.tmpId +
        'dwnarow"></use></svg></div>',
      chatblOuterdiv:
        selectObject.QuestionDesc === "Currency"
          ? '<div class="cbl_selct cbl_pr cbl_df cbl_aic cbl_curr">'
          : '<div class="cbl_selct cbl_pr cbl_df cbl_aic">',
      chatblClosingdiv: "</div>",
    };
  
    if (isSet(event.data.keys.option_desc)) {
      var len = event.data.keys.option_desc.length;
      for (var i = 0; i < len; i++) {
        var selected = "";
        var optionDesc = isSet(event.data.keys.option_desc[i])
          ? trimVal(event.data.keys.option_desc[i])
          : "";
        var str = handleSpecialQuotes(optionDesc);
        if ($.inArray(optionDesc, event.data.keys.prefilledAns) !== -1) {
          // maps!
          selected = " selected";
          selectObject["selectClass"] += " beclr3";
          selBoxPrefilled = true;
        }
        if (
          optionDesc.toLowerCase() === "others" ||
          optionDesc.toLowerCase() === "other"
        ) {
          selectObject["onchange"] = true;
          OtherOptionVal = str;
          OtherOptionId = event.data.keys.option_id[i];
          OtherOptionDesc = event.data.keys.option_desc[i];
        } else {
          var element = IsChatbl(event.data.tmpId) ? "li" : "option";
          optionHtml += returnCustomElement(
            event.data.tmpId,
            "",
            element,
            str,
            event.data.keys.option_id[i],
            selected,
            event.data.keys.option_desc[i]
          );
        }
      }
    }
    var descriptionHtml = Tooltip("text", selectObject.questionText);
    if (
      !isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
      selectObject.questionText !== ""
    ) {
      selectObject["lblClass"] + " bedbtip";
    }
    var OtherIpField = "";
    var OtherBoxAnswer = "";
    if (selectObject["onchange"]) {
      var OtherClasses = "be-slbox beisq-tbx be-othr othrwd inpt_errorbx";
      var OtherBoxAnswer =
        !selBoxPrefilled && notEmpty(event.data.keys.prefilledAns[0])
          ? event.data.keys.prefilledAns[0]
          : "";
      var OtherSelected = notEmpty(OtherBoxAnswer) ? "selected" : "";
      OtherClasses = !notEmpty(OtherBoxAnswer)
        ? OtherClasses + " bedsnone"
        : OtherClasses;
      // var OtherIpField = "<input type = 'text' id = 'other_" + "t" + event.data.tmpId + "select_name" + ReqObj.Form[event.data.tmpId].questionCount + "_1' class='" + OtherClasses + "' value ='" + OtherBoxAnswer + "'/>";
  
      var OtherIpField = isBlInline(tmpId)
        ? "<input type = 'text' id = 'other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1' class= bedsnone'" +
        OtherClasses +
        "' value ='" +
        OtherBoxAnswer +
        "'/>"
        : "<input type = 'text' id = 'other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1' class= '" +
        OtherClasses +
        "' value ='" +
        OtherBoxAnswer +
        "'/>";
      // box changes
  
      var element = IsChatbl(event.data.tmpId) ? "li" : "option";
      optionHtml += returnCustomElement(
        event.data.tmpId,
        "",
        element,
        OtherOptionVal,
        OtherOptionId,
        OtherSelected,
        OtherOptionDesc
      );
      QuestionObject["others"].push(
        "#other_" +
        "t" +
        event.data.tmpId +
        "select_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        "_1"
      );
    }
    var element = IsChatbl(event.data.tmpId) ? "ul" : "select";
    var popupChatUserInput =
      chatBlSpecificObject["chatblOuterdiv"] +
      chatBlSpecificObject["readonly"] +
      chatBlSpecificObject["arrow"] +
      "<div class='cbl_sclBr cbl_pa dn'>" +
      SelectBoxIp(selectObject, event.data.tmpId) +
      optionHtml +
      "</" +
      element +
      ">" +
      OtherIpField +
      chatBlSpecificObject["chatblClosingdiv"] +
      chatBlSpecificObject["chatblClosingdiv"];
    var lblClass = "lbtool";
    selectObject["lblin"] = true;
    if (
      isImageVidEnq(event.data.tmpId) &&
      ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
    ) {
      lblClass = "";
      selectObject["lblin"] = false;
    }
    typeSelectHtmlObj["OuterWrapper"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? ""
        : "<div class='" + selectObject.divClass + "'>";
    typeSelectHtmlObj["Label"] =
      isSSB(event.data.tmpId) || isBlInline(event.data.tmpId)
        ? MakeLabel(selectObject, descriptionHtml, event.data.tmpId)
        : "<div class='" +
        lblClass +
        "'>" +
        MakeLabel(selectObject, descriptionHtml, event.data.tmpId) +
        "</div>";
    typeSelectHtmlObj["ClosingWrapper"] = isSSB(event.data.tmpId) ? "" : "</div>";
    // typeSelectHtmlObj["UserInput"] = (IsChatbl(event.data.tmpId)) ? popupChatUserInput : SelectBoxIp(selectObject, event.data.tmpId) + optionHtml + "</" + element + ">" + OtherIpField;
    if (isBlInline(tmpId)) {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
        optionHtml +
        "</" +
        element +
        ">";
    } else {
      typeSelectHtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
        ? popupChatUserInput
        : SelectBoxIp(selectObject, event.data.tmpId) +
        optionHtml +
        "</" +
        element +
        ">" +
        OtherIpField;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    if (
      isSSB(event.data.tmpId) &&
      selectObject.QuestionDesc.toLowerCase() === "currency"
    ) {
      typeSelectHtmlObj["UserInput"] =
        "<div>" +
        typeSelectHtmlObj["UserInput"] +
        " <div class = 'mb-ertxt mb-mt10' id = 't" +
        event.data.tmpId +
        "_curr_err'> </div></div>";
    }
    return typeSelectHtmlObj;
  }
  /* ---------------------------------------------------TYPE : CheckBox ---------------------------------------------------- */
  
  function typeCheckBox(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "CHECKBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    var CheckboxObject = returnIsqHtmlObject(event, QuestionObject);
    // ReqObj.Form[event?.data?.tmpId].isNewImage=="1" && (CheckboxObject["lblClass"] = " be-lbl"); js error Unexpected token '.'
    isSet(ReqObj.Form[event.data.tmpId].isNewImage) &&
      ReqObj.Form[event.data.tmpId].isNewImage == "1" &&
      (CheckboxObject["lblClass"] = " be-lbl");
    var descriptionHtml = Tooltip(
      "check",
      event.data.IsqObj.IM_SPEC_MASTER_FULL_DESC
    );
    var type4HtmlObj = {
      OuterWrapper: "",
      Label: isSSB(event.data.tmpId)
        ? LabelForCheckAndRadio(
          CheckboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        )
        : "<div class='lbtool'>" +
        LabelForCheckAndRadio(
          CheckboxObject,
          descriptionHtml,
          event.data.tmpId,
          ""
        ) +
        "</div>",
      ClosingWrapper: "",
    };
    var closedivcls = isSSB(event.data.tmpId)
      ? isnewSSB(event.data.tmpId)
        ? "nb-flex nb-aic nb-flwp nb-mt10"
        : "mb-flex"
      : isBlInline(event.data.tmpId)
        ? "iwChk"
        : "bemgb15 nwDt";
    type4HtmlObj["UserInput"] = IsChatbl(event.data.tmpId)
      ? ""
      : "<div class='" + closedivcls + "'>";
    QuestionObject.optionSelector =
      "input[name='" +
      "t" +
      event.data.tmpId +
      "checkbox_name" +
      ReqObj.Form[event.data.tmpId].questionCount +
      "']";
    type4HtmlObj["UserInput"] += !IsChatbl(event.data.tmpId)
      ? ""
      : "<div class = 'cbl_radio'>";
  
    if (isSet(event.data.keys.option_desc)) {
      for (var i = 0; i < event.data.keys.option_desc.length; i++) {
        var indexofAns = -1;
        if (event.data.keys.prefilledAns.length > 0) {
          var optionDesc = event.data.keys.option_desc[i];
          if (isSet(optionDesc)) {
            optionDesc = trimVal(optionDesc);
          }
          indexofAns = $.inArray(optionDesc, event.data.keys.prefilledAns);
          if (indexofAns !== -1)
            event.data.keys.prefilledAns.splice(indexofAns, 1);
        }
  
        if (
          event.data.keys.option_desc[i].trim().toLowerCase() === "others" ||
          event.data.keys.option_desc[i].trim().toLowerCase() === "other"
        ) {
          QuestionObject["others"].push(
            "#" +
            "t" +
            event.data.tmpId +
            "other_checkbox_name" +
            ReqObj.Form[event.data.tmpId].questionCount +
            "_option" +
            (i + 1)
          );
          var OthersBoxObject = {
            divClass: isSSB(event.data.tmpId)
              ? isnewSSB(event.data.tmpId)
                ? "nb-pr15"
                : ""
              : "be-chckbox oth_bx other_check",
            optionId: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            inputName:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount,
            inputId:
              "t" +
              event.data.tmpId +
              "other_checkbox_name" +
              ReqObj.Form[event.data.tmpId].questionCount +
              "_option" +
              (i + 1),
            ans: "",
          };
          if (indexofAns === -1)
            OthersBoxObject["ans"] = event.data.keys.prefilledAns;
          type4HtmlObj["UserInput"] += OthersBox(
            OthersBoxObject,
            event.data.tmpId
          );
        } else {
          var CheckBoxObject = {
            option_id: event.data.keys.IsOptionIdEmpty
              ? event.data.keys.option_id[i]
              : "",
            templateId: "t" + event.data.tmpId,
            questionCount: ReqObj.Form[event.data.tmpId].questionCount,
            option_desc: event.data.keys.option_desc[i],
            i: i,
          };
          CheckBoxObject["inputClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_btn"
            : "bevT bedblk";
          CheckBoxObject["labelClass"] = IsChatbl(event.data.tmpId)
            ? "cbl_chekbx_label CheckboxClick"
            : isSSB(event.data.tmpId)
              ? "CheckboxClick"
              : "bepr CheckboxClick";
  
          if (indexofAns !== -1) {
            CheckBoxObject["divClass1"] = isOtherEnq(event.data.tmpId)
              ? "be-chckbox sl-box chksl eqchkbx"
              : "be-chckbox sl-box chksl";
            CheckBoxObject["divClass2"] = "betick-sl";
            CheckBoxObject["checked"] = "checked";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3 w-txt";
          } else {
            CheckBoxObject["divClass1"] = IsChatbl(event.data.tmpId)
              ? "cbl_chekbx cbl_df cbl_aic cbl_ml20"
              : isSSB(event.data.tmpId)
                ? isnewSSB(event.data.tmpId)
                  ? "nb-chk nb-pr nb-dib nb-pr15"
                  : "mb-chk mb-pr mb-dib"
                : isOtherEnq(event.data.tmpId)
                  ? "be-chckbox eqchkbx"
                  : (isInactiveBL(event.data.tmpId)) ? "be-chckbox cbl_br10" : "be-chckbox";
            CheckBoxObject["divClass2"] = "betick-sl bedsnone";
            CheckBoxObject["checked"] = "";
            CheckBoxObject["spanClass"] =
              IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId)
                ? ""
                : "bevT bedblk beisq3";
          }
          type4HtmlObj["UserInput"] += CheckBox(event.data.tmpId, CheckBoxObject);
        }
      }
    }
    type4HtmlObj["UserInput"] +=
      IsChatbl(event.data.tmpId) || isSSB(event.data.tmpId) ? "</div>" : "";
    // changes for ssb (single page)
    if (isSet(OthersBoxObject) && isSet(OthersBoxObject["inputId"])) {
      var html = "";
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_err",
        "texterr bedsnone",
        "",
        ""
      );
      html += returnContainer(
        OthersBoxObject["inputId"],
        "_errmsg",
        "",
        "content",
        ""
      );
      html += "</div>Please enter valid input</div>";
      type4HtmlObj["UserInput"] = type4HtmlObj["UserInput"] + "</div>" + html;
    }
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    return type4HtmlObj;
  }
  
/* -------------------------------------------- TYPE : Quantity & Unit ------------------------------------------------------- */

function typeQuantity(event) {
    var QuestionObject = returnIsqQuestionObject({
      data: {
        type: "TEXTBOX",
        questionText: event.data.IsqObj.IM_SPEC_MASTER_DESC,
        questionId: isSet(event.data.IsqObj.IM_SPEC_MASTER_ID)
          ? event.data.IsqObj.IM_SPEC_MASTER_ID
          : "",
        optionSelector: "",
        others: [],
      },
    });
    event.data.IsqObj.IM_SPEC_MASTER_DESC.toLowerCase() === "quantity unit"
      ? DescMapWithId(
        event.data.tmpId,
        event.data.keys.option_desc,
        event.data.keys.option_id
      )
      : "";
    if (event.data.keys.type === "ut") {
      ReqObj.Form[event.data.tmpId].qutAnswers =
        event.data.IsqObj.IM_SPEC_OPTIONS_DESC.split("##");
    }
    var firstqut =
      isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : false;
    if (
      (isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter > 0 &&
        isSet(ReqObj.Form[event.data.tmpId].isQtutShown) &&
        ReqObj.Form[event.data.tmpId].isQtutShown === true &&
        (event.data.keys.type === "ut" || event.data.keys.type === "qt")) ||
      (isSet(ReqObj.Form[event.data.tmpId].isBlQtutShown) &&
        ReqObj.Form[event.data.tmpId].isBlQtutShown)
    ) {
      event.data.tmpId.substr(0, 2) === "01" ||
        event.data.tmpId.substr(0, 2) === "04"
        ? (ReqObj.Form[event.data.tmpId].stopper += 1)
        : "";
      return returnEmptyObject();
    }
    var screen_no =
      event.data.tmpId.substr(0, 2) === "09" &&
        ReqObj.Form[event.data.tmpId].formType.toLowerCase() === "bl"
        ? ReqObj.Form[event.data.tmpId].FormSequence.StepCounter + 1
        : "";
    var iden_class =
      screen_no !== ""
        ? "qtut" + event.data.tmpId + "_" + screen_no
        : "qtut" + event.data.tmpId;
    var unsugg_class =
      screen_no !== ""
        ? "unsug" + event.data.tmpId + "_" + screen_no
        : "unsug" + event.data.tmpId;
  
    var brdlft = (isInactiveBL(event.data.tmpId)) ? " brdlft8" : "";
    var brdrgt = (isInactiveBL(event.data.tmpId)) ? " brdrgt8" : "";
  
    var textboxObject = {
      // to return html
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      optionId: event.data.keys.IsOptionIdEmpty
        ? event.data.keys.option_id[0]
        : false,
      QuestionDesc: QuestionObject.questionText,
      inputId:
        "t" +
        event.data.tmpId +
        "txtbx_option" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      inputName:
        "t" +
        event.data.tmpId +
        "text_name" +
        ReqObj.Form[event.data.tmpId].questionCount +
        screen_no,
      ans: event.data.keys.prefilledAns,
  
      placeholder: IsChatbl(event.data.tmpId)
        ? " Enter " + QuestionObject.questionText
        : isBlFirstfold(event.data.tmpId)
          ? QuestionObject.questionText
          : firstqut === true && event.data.keys.type === "qt"
            ? ""
            : "",
  
      // lblClass: (event.data.keys.type === "qt") ? (isSSB(event.data.tmpId)) ? ssbClass("label", event.data.tmpId) : "qt_lbl" : "",
  
      lblClass:
        event.data.keys.type === "qt"
          ? isSSB(event.data.tmpId)
            ? ssbClass("label", event.data.tmpId)
            : isBlFirstfold(event.data.tmpId)
              ? "be-lbl dn"
              : "qt_lbl"
          : "",
  
      divClass:
        event.data.keys.type === "qt" ? "bepr isq-st19" : "bedblk bepr be-w50",
      inputClass:
        event.data.keys.type === "qt"
          ? "be-input in_cus " + iden_class + brdlft
          : "be-input " + unsugg_class + " inut_cus" + brdrgt,
      maxlength: event.data.keys.type === "qt" ? "12" : "1000",
      type: event.data.keys.type,
    };
    textboxObject.inputClass +=
      IsChatbl(event.data.tmpId) && event.data.keys.type === "qt"
        ? " cbl_qtut"
        : "";
    textboxObject.ans =
      event.data.keys.type === "qt" && !isAllNumbers(textboxObject.ans[0])
        ? ""
        : textboxObject.ans;
    if (event.data.keys.type === "qt" && textboxObject.ans !== "") {
      updateQtKey(event.data.tmpId, "prefilled");
      textboxObject.ans = textboxObject.ans[0].substring(0, 12);
    }
    textboxObject["inputClass"] =
      event.data.keys.type === "qt" &&
        isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? textboxObject["inputClass"] + " imgoneqty"
        : textboxObject["inputClass"];
    QuestionObject.optionSelector =
      "input[name='" + textboxObject.inputName + "']";
    var addvalue = event.data.keys.type === "ut" ? true : false;
    if (event.data.IsqObj.IM_CAT_SPEC_CATEGORY_TYPE === "2") addvalue = false;
    textboxObject["optionId"] =
      addvalue && isSet(textboxObject.ans) && textboxObject.ans != ""
        ? getOptionId(event.data.tmpId, textboxObject.ans[0])
        : textboxObject["optionId"];
    var error_div =
      event.data.keys.type === "qt"
        ? screen_no !== ""
          ? '<div id="t' +
          event.data.tmpId +
          "_" +
          screen_no +
          '_validinev"' +
          screen_no +
          ' class="bedsnone" value=""></div>'
          : '<div id="t' +
          event.data.tmpId +
          '_validinev"' +
          screen_no +
          ' class="bedsnone" value=""></div>'
        : "";
    var typetextHtmlObj = {
      OuterWrapper: "<div class='" + textboxObject.divClass + "'>",
      beforeLabel: "",
      Label: "",
      beforeInput: "",
      UserInput: TextBoxIp(textboxObject, false, addvalue),
      ClosingWrapper: "</div>",
      qtuttype: event.data.keys.type === "ut" ? 6 : 5,
      error_div: error_div,
      label_div:
        firstqut === true
          ? ""
          : "<label id='" +
          textboxObject.labelId +
          "' class='" +
          textboxObject.lblClass +
          "'>" +
          textboxObject.QuestionDesc +
          "</label>",
    };
    ReqObj.Form[event.data.tmpId].Isq.Question.push(QuestionObject);
    ReqObj.Form[event.data.tmpId].isQtutShown =
      event.data.keys.type === "ut" &&
        isImageVidEnq(event.data.tmpId) &&
        ReqObj.Form[event.data.tmpId].FormSequence.StepCounter < 1
        ? true
        : ReqObj.Form[event.data.tmpId].isQtutShown;
    ReqObj.Form[event.data.tmpId].qtUtQuesPresent = true;
    if (
      (isBlInline(event.data.tmpId) || isBlFirstfold(event.data.tmpId)) &&
      event.data.keys.type === "ut"
    )
      ReqObj.Form[event.data.tmpId].isBlQtutShown = true;
    return typetextHtmlObj;
  }

/*--------------------------------------------------------------------------------------------------------------------- */
/*----------- City Suggester for location ISQ  -------------*/
function citySugg(tmpId, id) {
    var iso = currentISO();
    if (typeof Suggester === "undefined") {
      setTimeout(function () {
        citySugg(tmpId);
      }, 50);
    } else {
      if (typeof Suggester !== "undefined") {
        var CitySuggSuffix = "_citySugg";
        var row_num = BlAutoSuggRowNum(tmpId);
        var autocompleteClass = SetAutoCompleteClass(tmpId, CitySuggSuffix);
        if (IsChatBLInline(tmpId)) autocompleteClass += " smChtSg";
        main_city_sugg = new Suggester({
          element: id,
          onSelect: "",
          type: "city",
          fields: "std,state,id,stateid",
          minStringLengthToDisplaySuggestion: 1,
          rowsToDisplay: row_num,
          autocompleteClass: autocompleteClass,
          displayFields: "value,state",
          displaySeparator: " >> ",
          filters: "iso:" + iso,
          recentData: false,
          rowsToDisplay: IsChatBLInline(tmpId) ? 3 : "",
        });
      }
    }
  }
  function returnIsqQuestionObject(event) {
    return {
      type: event.data.type,
      questionText: event.data.questionText,
      questionId: event.data.questionId,
      optionSelector: event.data.optionSelector,
      others: event.data.others,
    };
  }
  
  function returnIsqHtmlObject(event, QuestionObject) {
    return {
      labelId:
        "t" +
        event.data.tmpId +
        "ques" +
        ReqObj.Form[event.data.tmpId].questionCount,
      questionId: QuestionObject.questionId,
      QuestionDesc: QuestionObject.questionText,
      type: QuestionObject.type,
    };
  }
  
  function handleSpecialQuotes(str) {
    if (typeof str !== "undefined" && str !== "") {
      if (str.indexOf("'") > 0) {
        str = str.replace(/'/g, "&#39");
      } else if (str.indexOf('"') > 0) {
        str = str.replace(/"/g, "&quot");
      }
      return str;
    }
    return "";
  }
  
  var webAddressLocation = location.hostname;
  var appsServerName = webAddressLocation.match(/^dev/)
    ? "//dev-apps.imimg.com/"
    : webAddressLocation.match(/^stg/)
      ? "//stg-apps.imimg.com/"
      : "//apps.imimg.com/";
  
  function notEmpty(val) {
    if (isSet(val) && val !== "") {
      return true;
    } else return false;
  }
  
  function isFirstImgVidCTA(tmpId) {
    return isImageVidEnq(tmpId) &&
      ((ReqObj.Form[tmpId].FormSequence.StepCounter < 1 && imeshExist() === "") ||
        (Enq09(tmpId) &&
          imeshExist() &&
          NEC() &&
          ReqObj.Form[tmpId].FormSequence._stepCounter < 1))
      ? true
      : false;
  }
  function isFirstImgVidCTAFR(tmpId) {
    return isImageVidEnq(tmpId) &&
      ReqObj.Form[tmpId].FormSequence.StepCounter < 1 &&
      (imeshExist() === "" || currentISO() !== "IN")
      ? true
      : false;
  }
  
  function returnSubmitInnerHtml(tmpId) {
    var html = returnContainer(
      "t" + tmpId,
      "_fBtn",
      "bepr eqClearfx",
      "",
      "",
      ""
    );
    html +=
      "<div class='backdiv bedsnone' id='t" +
      tmpId +
      "_backdiv'><input value='' class='be-backbtn' id='t" +
      tmpId +
      "_be-backbtn' type='submit'><div id='t" +
      tmpId +
      "_backarr'></div></div><div class='' id='t" +
      tmpId +
      "_submitdiv'><input value='Next' class='form-btn' id='t" +
      tmpId +
      "_submit' type='submit' style='background-color: #00a699'></div>";
    html += "</div>";
  
    if (isInactiveBL(tmpId)) {
      $("#t" + tmpId, "_fBtn").css({
        "margin-right": "25%",
      });
    }
    return html;
  }
  
  function getMcatImage(tmpId, cbObj, left) {
    if (
      isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
      isSet(ReqObj.Form[tmpId]) &&
      isSet(ReqObj.Form[tmpId].formType)
    ) {
      if (
        isSet(ReqObj.Form[tmpId].mcatId) &&
        parseInt(ReqObj.Form[tmpId].mcatId) > -1 &&
        isSet(modIdf) &&
        modIdf !== -1 &&
        modIdf !== ""
      ) {
        $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
        ReqObj.Form[tmpId].displayImage =
          isSet(ReqObj.Form[tmpId].displayImage) &&
            ReqObj.Form[tmpId].displayImage === ""
            ? ""
            : ReqObj.Form[tmpId].displayImage;
        ReqObj.Form[tmpId].zoomImage = "";
        ReqObj.mcatImage = "";
        ReqObj.mcatdtl.ping = true;
        fireAjaxRequest({
          data: {
            ga: {
              s: false,
              f: true,
              gatype: "McatDtl",
              source: "",
            },
            tmpId: tmpId,
            ajaxObj: {
              obj: "",
              s: {
                ss: 0,
                sf: {
                  af: 0,
                  pa: 0,
                },
                f: 0,
              },
              f: {
                f: 0,
              },
            },
            ajaxtimeout: 3000,
            ajaxdata: {
              modid: modIdf,
              mcatid: parseInt(ReqObj.Form[tmpId].mcatId),
            },
            hitfinserv: "",
            type: 9,
            key: {
              cbObj: cbObj,
              left: left,
            },
          },
        });
      }
    }
  }
  
  function ShowOtp(tmpId) {
    var imeshcookie = imeshExist();
    if (
      imeshcookie &&
      usercookie.getParameterValue(imeshcookie, "uv") !== "V" &&
      usercookie.getParameterValue(imeshcookie, "iso") === "IN"
    )
      return true;
    else return false;
  }
  function toAddSkipOtp(tmpId, message) {
    return checkblockedUser()
      ? false
      : (isEnq(tmpId) &&
        (isSecondEnq() === false || (message === "" && isSecondEnq()))) ||
        (isBl(tmpId) &&
          (isSecondBl() === false || (message === "" && isSecondBl())))
        ? true
        : false;
  }
  
function ObjectTrim(object) {
    var trimmedObject = {};
    for (var key in object) {
      if (typeof object[key] === "string") object[key] = object[key].trim();
      if (object[key] !== "") trimmedObject[key] = object[key];
    }
    return trimmedObject;
  }
  
/*
 * maybe class not required
 * Class     : LoginFlag
 * Usage     : returns the login flag.
 *
 * @function : returnLoginFlag - returns the login flag
 */
function LoginFlag() { }
LoginFlag.prototype.returnLoginFlag = function (todo) {
  if (todo === "glusrupdate" && todo !== "") return 2;
  if (todo === "verifyusr" && todo !== "") return 5;
  if (todo === "login" && todo !== "") return 1;
  if (todo === "blurlogin" && todo !== "") return 3;
};

/*
 * Class     : LoginMode
 * Usage     : returns the login mode
 *
 * @function : cookies      - read required cookies
 * @function : getLoginMode - return login mode
 */
function LoginMode() { }
LoginMode.prototype.getLoginMode = function () {
  var v4iilexCookie = usercookie.getCookie("v4iilex");
  var imissCookie = usercookie.getCookie("im_iss");
  var imEqGlCookie = usercookie.getCookie("imEqGl");
  var imeshCookie = imeshExist();
  var loginmode = 0;
  if (imeshCookie === "" && v4iilexCookie !== "") {
    usercookie.deleteCookie("v4iilex"); /* */
    v4iilexCookie = "";
  }
  if (imeshCookie === "" && imEqGlCookie !== "") {
    /* logout kiya user ne and for mozilla*/
    usercookie.deleteCookie("imEqGl");
  }

  if (isSet(imissCookie) && imissCookie !== "") {
    /* when v4iilex cookie is set */
    loginmode = 1;
  } else if (isSet(imeshCookie) && imeshCookie !== "") {
    /* when imesh cookie is set */
    loginmode = 2;
  } else loginmode = 3; //new user /* nothing is set */

  return loginmode;
};
/*
 * Usage : to check for European Countries
 *
 */

// function isEuroCountry(country_iso) {
//   var len = isSet(global_euroArr) ? global_euroArr.length : 0;
//   for (var i = 0; i < len; i++) {
//     if (global_euroArr[i] === country_iso)
//       return true;
//   }
//   return false;
// }
/*
 * Usage :
 */
function isSet(checkVar) {
  return typeof checkVar !== "undefined" && checkVar !== null ? true : false;
}
/*
 * Usage : To move to next fieldbfbfdbdfbdbd
 */
function movetoNext(event) {
  var tmpId = event.data.tmpId;
  if ($("#t" + tmpId + event.data.param1).val() !== "") {
    $("#t" + tmpId + event.data.param2).focus();
  }
}
/*
 * Usage : To move to previous field
 */
function movetoPrevious(event) {
  var tmpId = event.data.tmpId;
  if (event.keyCode == 8) {
    if ($("#t" + tmpId + event.data.param1).val() === "") {
      $("#t" + tmpId + event.data.param2).focus();
      $("#t" + tmpId + event.data.param2).html("");
    }
  }
}
/*
 * Usage : String to Key,Value pairs
 */
function stringToObject(query, seperator) /* a or b required ? */ {
  var query_arr = query.split(seperator);
  var len = isSet(query_arr) ? query_arr.length : 0;
  var obj = {};
  for (var i = 0; i < len; i++) {
    var sub_query_arr = query_arr[i].split("=");
    obj[sub_query_arr[0]] = sub_query_arr[1];
  }
  return obj;
}

/*
 *  Change and check tracking
 */

function MakeRefText(tmpId) {
  ReqObj.Form[tmpId].refText =
    "ctaName=" +
    (isSet(ReqObj.Form[tmpId].ctaName) ? ReqObj.Form[tmpId].ctaName : "");
  ReqObj.Form[tmpId].refText +=
    "|ctaType=" +
    (isSet(ReqObj.Form[tmpId].ctaType) ? ReqObj.Form[tmpId].ctaType : "");
  ReqObj.Form[tmpId].refText +=
    "|PT=" +
    (isSet(ReqObj.Form[tmpId].pageType) ? ReqObj.Form[tmpId].pageType : "");
  ReqObj.Form[tmpId].refText +=
    "|Section=" +
    (isSet(ReqObj.Form[tmpId].section) ? ReqObj.Form[tmpId].section : "");
  ReqObj.Form[tmpId].refText +=
    "|Position=" +
    (isSet(ReqObj.Form[tmpId].position) ? ReqObj.Form[tmpId].position : "");
  ReqObj.Form[tmpId].refText +=
    "|ScriptVer=" +
    (isSet(ReqObj.Form[tmpId].scriptVersion)
      ? ReqObj.Form[tmpId].scriptVersion
      : "");
  ReqObj.Form[tmpId].refText +=
    "|compRank=" +
    (isSet(ReqObj.Form[tmpId].FCPRank) ? ReqObj.Form[tmpId].FCPRank : "");
  ReqObj.Form[tmpId].refText +=
    "|searchTerm=" +
    (isSet(ReqObj.Form[tmpId].mcatName) ? ReqObj.Form[tmpId].mcatName : "");
}

function imInvokeRequestForGaCode(tmpId, eventAction) {
  //<!--google analytics async code start-->
  // var script = trackScript;
  // _gaq.push(['_trackPageview', script]);
  //<!--google analytics async code end-->
  // if(ReqObj.Form[tmpId].toFireGaTracking === true){
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var imeshcookie = imeshExist();

  var virtualPageURL =
    "/cgi/" +
    modIdf +
    "/" +
    form_type +
    "/" +
    getEventLabel();
  virtualPageURL += imeshcookie === "" ? "-new.mp" : ".mp";

  imgtm.push({
    event: "VirtualPageview",
    virtualPageURL: virtualPageURL,
    virtualPageTitle: "Send Enquiry -" + eventAction,
    CD_Additional_Data: ReqObj.Form[tmpId].refText,
  });
  ReqObj.Form[tmpId].pvTrackingFired = true;
  // }
}
//inactive changes
// isinteraactive==1 -> not interactive
// isinteraactive==0 ->  interactive

function blenqGATracking(eventCategory, eventAction, eventLabel, isinteraactive, tmpId) {
  if (isSet(ReqObj.Form[tmpId]) && (ReqObj.Form[tmpId].toFireGaTracking === true || ReqObj.Form[tmpId].noSampling === true || isinteraactive === 1 || ReqObj.Form[tmpId].inactiveBL)) {
    var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
    if (glmodid == "PRODDTL" && eventAction == "Redirect:ProductUrl") event_type = "IMEvent";
    var modid = eventCategory === "iploc" ? glmodid : modIdf;
    var CD_Additional_Data = tmpId === 0 ? modid : modid + "-" + ReqObj.Form[tmpId].refText;
    eventLabel = ReqObj.seller_cta && (ReqObj.su_cta == 0 || ReqObj.su_cta == 1) ? eventLabel + " |SA" : eventLabel;

    //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
    imgtm.push({
      event: event_type,
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      CD_Additional_Data: CD_Additional_Data,
    });
  }
}

function blenqGATrackingMisc(eventCategory, eventAction, eventLabel, isinteraactive, tmpId, refText) {
  // ReqObj.Form[tmpId].modId,  ReqObj.Form[tmpId].form_type
  var event_type = isinteraactive === 0 ? "IMEvent" : "IMEvent-NI";
  var modid = glmodid;
  var CD_Additional_Data = modid + "-" + refText;
  //_gaq.push(['_trackEvent', eventCategory, eventAction, eventLabel, 0, true]);
  imgtm.push({
    event: event_type,
    eventCategory: eventCategory,
    eventAction: eventAction,
    eventLabel: eventLabel,
    CD_Additional_Data: CD_Additional_Data,
  });
}

function labelNEC(iso) {
  var nec = "";
  if(isSet(ReqObj) && isSet(ReqObj.UserDetail)){
  if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn !== "") nec += "N";
  if (iso === "IN") {
    if (ReqObj.UserDetail.em !== "") nec += "E";
    if (ReqObj.UserDetail.ctid !== "") nec += "C";
    if (nec === "") nec = "NO-NEC";
  } else {
    if (ReqObj.UserDetail.mb1 !== "") nec += "M";
    if (nec === "") nec = "NO-NM";
  }
}
  return nec;
}

/* no idea about this */
function ServiceGATrack(TracName, TracEvent, FileName) {
    if (isSet(_gaq)) {
      _gaq.push(["_trackEvent", TracName, TracEvent, FileName, 0, true]);
    }
  }
  
  function addTemplates(templateid, template_array) {
    if ($.inArray(templateid, template_array) === -1) {
      template_array.push(templateid);
    }
  }
  
  function UpdateAfterLogin(key) {
    if (usercookie.getParameterValue(imeshExist(), key) !== "") {
      ReqObj.UserDetail[key] = setDetail(key);
    }
  }
  
  function isGDPRCountry() {
    var GdprCountries = [
      "AT",
      "BE",
      "BG",
      "HR",
      "CY",
      "CZ",
      "DK",
      "EE",
      "FI",
      "FR",
      "DE",
      "GR",
      "HU",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MT",
      "NL",
      "PL",
      "PT",
      "RO",
      "SK",
      "SI",
      "ES",
      "SE",
      "GB",
      "UK",
    ];
    if ($.inArray(currentISO(), GdprCountries) !== -1) return true;
    return false;
  }
  /*--------------------To show Tnc-------------------- */
  function toShowTnc(tmpId) {
    if (imeshExist() === "") {
      return isGDPRCountry() === true ? true : false;
    }
    return false;
  }
  /*--------------------Hov - onSubmit Tnc-------------------- */
  function onHovSub(tmpId) {
    var isGDPR = isGDPRCountry();
    if (currentISO() !== "IN") {
      if (isGDPR === true) {
        isSet(ReqObj.Form[tmpId].IsCheckboxChecked) &&
          ReqObj.Form[tmpId].IsCheckboxChecked === true
          ? $("#t" + tmpId + "_submit").addClass("hovsub")
          : $("#t" + tmpId + "_submit").removeClass("hovsub");
      } else $("#t" + tmpId + "_submit").addClass("hovsub");
    } else $("#t" + tmpId + "_submit").addClass("hovsub");
  }
  /*--------------------Checked Tnc-------------------- */
  function checkedTNC(tmpId) {
    if (isSet(tmpId) && isSet(ReqObj.Form[tmpId])) {
      if ($("#t" + tmpId + "_tCondCheckBox").prop("checked")) {
        ReqObj.Form[tmpId].IsCheckboxChecked = true;
        $("#t" + tmpId + "_error_tCond")
          .text("Please agree to the terms and conditions")
          .addClass("bedsnone");
        submitTncUI(tmpId, 1);
      } else {
        ReqObj.Form[tmpId].IsCheckboxChecked = false;
        submitTncUI(tmpId, 0);
      }
      onHovSub(tmpId);
    }
  }
  /*--------------------To show or hide-------------------- */
  function ShowHideTNC(tmpId) {
    toShowTnc() === true ? ShowTncBox(tmpId) : HideTncBox(tmpId);
  }
  /*--------------------To show-------------------- */
  function ShowTncBox(tmpId) {
    if (IsChatBLInline(tmpId)) {
      if (toShowTnc(tmpId) && $("#t" + tmpId + "verify_error").is(":visible"))
        $("#t" + tmpId + "_tCond").addClass("bt142");
    }
    $("#t" + tmpId + "_tCond").removeClass("bedsnone");
    if (Enq09(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("pd_b");
      if (direnqImage(tmpId)) {
        $("#t" + tmpId + "_tCond").addClass("pdtop");
      }
  
    }
    if (Bl01(tmpId)) $("#t" + tmpId + "_tCond").addClass("bemb5");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", false);
    if (isBlInlineFr(tmpId)) {
      $("#t" + tmpId + "_tCond").addClass("mar_bemb");
      $("#t" + tmpId + "_tCond").removeClass("bemt10");
    }
    submitTncUI(tmpId, 0);
  }
  /*--------------------To hide-------------------- */
  function HideTncBox(tmpId) {
    $("#t" + tmpId + "_tCond").addClass("bedsnone");
    $("#t" + tmpId + "_tCondCheckBox").prop("checked", true);
    submitTncUI(tmpId, 1);
  }
  /*--------------------UI- show/hide-------------------- */
  function submitTncUI(tmpId, todo) {
    var dv = isEcomProduct(tmpId) ? false : todo === 0 ? true : false;
    var dc = isEcomProduct(tmpId)
      ? "#00a699"
      : todo === 0
        ? "#b2b2b2"
        : "#00a699";
    $("#t" + tmpId + "_submit").prop("disabled", dv);
    if (isImageVidEnq(tmpId)) {
      isEcomProduct(tmpId)
        ? $("#t" + tmpId + "_submit").removeAttr("style")
        : todo === 0
          ? $("#t" + tmpId + "_submit")
            .prop("disabled", dv)
            .attr("style", "background:" + dc + "; box-shadow:none")
          : $("#t" + tmpId + "_submit").removeAttr("style");
    } else if (!IsChatbl(tmpId))
      (isSSB(tmpId) || (isGlIdEven(tmpId) && tmpId.substr(0, 2) === "01")) && !dv
        ? $("#t" + tmpId + "_submit")
          .prop("disabled", false)
          .attr("style", "")
        : $("#t" + tmpId + "_submit")
          .prop("disabled", false)
          .css("background-color", dc);
    else {
      if (todo === 1) $(".cbl_sbmt_btn").removeClass("cbl_dsbl");
      else {
        $(".cbl_error").addClass("cbl_frnerr"); // popup
        $(".cbl_sbmt_btn").addClass("cbl_dsbl");
      }
    }
  }
  
  function toShowOtpFlagCondition(tmpId) {
    if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" || IsChatbl(tmpId)) {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepbl) &&
        ReqObj.Form[tmpId].toShowOtpStepbl !== false
      );
    } else if (ReqObj.Form[tmpId].formType.toLowerCase() === "enq") {
      return (
        isSet(ReqObj.Form[tmpId].toShowOtpStepenq) &&
        ReqObj.Form[tmpId].toShowOtpStepenq !== false
      );
    }
  }
  
  function disableEnquiryButton(tmpId) {
    if (typeof ReqObj.Form[tmpId].enqSentCallBack === "function") {
      var value =
        isSet(ReqObj.Form[tmpId].enquiryDivID) &&
          ReqObj.Form[tmpId].enquiryDivID !== ""
          ? ReqObj.Form[tmpId].enquiryDivID
          : "dispid" + ReqObj.Form[tmpId].pDispId;
  
      var passVal = ReturntoProp(tmpId);
      ReqObj.Form[tmpId].enqSentCallBack(passVal);
    }
  }
  
  function appendImEqGlCookie(tmpId, createstep) {
    if (isSet(tmpId)) {
      ReqObj.Form[tmpId].toShowOtpStep =
        isSet(createstep) && createstep === "firsttimecreation" ? false : true;
      var value = "";
      if (
        isSet(ReqObj.Form[tmpId].formType) &&
        ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
      ) {
        value =
          isSet(ReqObj.Form[tmpId].enquiryDivID) &&
            ReqObj.Form[tmpId].enquiryDivID !== ""
            ? ReqObj.Form[tmpId].enquiryDivID
            : "dispid" + ReqObj.Form[tmpId].pDispId;
      } else {
        value = "BL" + usercookie.getParameterValue(imeshExist(), "glid");
      }
  
      if (isSet(value) && value !== "") {
        var imEqGlCookie = usercookie.getCookie("imEqGl");
        var len = usercookie.getCookie("imEqGl").length;
        if (len === 0) {
          usercookie.setCookie("imEqGl", value, "1", modIdf);
        } else {
          if (imEqGlCookie.substring(0, len - 2) === ",") {
            value = imEqGlCookie + value + ",";
          } else {
            value = imEqGlCookie + "," + value;
          }
  
          usercookie.setCookie("imEqGl", value, "1", modIdf);
        }
      }
      return value;
    }
    return "";
  }
  
  function RemoveValFromImEqGl(val) {
    if (isSet(val) && val !== "") {
      var imEqgl = usercookie.getCookie("imEqGl");
      if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
        var arr = imEqgl.split(",");
        for (var s = arr.length - 1; s >= 0; s--) {
          if (isSet(arr[s])) {
            if (arr[s] === val) arr.splice(s, 1);
          }
        }
      }
    }
  }
  
  function toShowBuyerInfo(tmpId, screen_name) {
    if (
      imeshExist() !== "" && 
      !isInactiveBL(tmpId) &&
      !pdpenqImage(tmpId) &&
      screen_name.toLowerCase() !== "userverification" &&
      screen_name.toLowerCase() !== "thankyou"
    ) {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
    } else {
      $("#t" + tmpId + "_byrinfo")
        .html(get_buyer_info(tmpId))
        .addClass("bedsnone");
    }
    // Not found BL
    if (Bl04(tmpId) && imeshExist() !== "")
      $("#t" + tmpId + "_byrinfoIn")
        .html(get_buyer_info(tmpId))
        .removeClass("bedsnone");
  }
  
  function get_buyer_info(tmpId) {
    var details = "";
    var imeshcookie = imeshExist();
    if (imeshcookie === "") return "";
    var sections = {};
    sections["main"] = "Your Contact Information :";
    sections["buyername"] =
      isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== ""
        ? ReqObj.UserDetail["fn"]
        : "";
    sections["buyermobile"] =
      isSet(ReqObj.UserDetail["mb1"]) && ReqObj.UserDetail["mb1"] !== ""
        ? "+" +
        usercookie.getParameterValue(imeshcookie, "phcc") +
        "-" +
        ReqObj.UserDetail["mb1"]
        : "";
    sections["buyeremail"] =
      isSet(ReqObj.UserDetail["em"]) && ReqObj.UserDetail["em"] !== ""
        ? ReqObj.UserDetail["em"]
        : "";
    var cls = isImageVidEnq(tmpId) ? "epUstxt" : "";
    var details = "<b class='" + cls + "'>" + sections["main"] + "</b><br/>";
    if (sections["buyername"] !== "") {
      details += sections["buyername"];
      details += pdpenqImage(tmpId)
        ? returnSpan("", "", "   |   ", "befwt", "")
        : "</br>";
    }
    if (isOtherEnq(tmpId)) {
      if (sections["buyermobile"] !== "" && sections["buyeremail"] !== "") {
        details +=
          sections["buyermobile"] +
          returnSpan("", "", "   |   ", "befwt", "") +
          sections["buyeremail"];
      } else if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"];
      } else if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"];
      }
    } else {
      if (sections["buyermobile"] !== "") {
        details += sections["buyermobile"] + "</br>";
      }
      if (sections["buyeremail"] !== "") {
        details += sections["buyeremail"] + "</br>";
      }
    }
  
    if (
      sections["buyername"] === "" &&
      sections["buyermobile"] === "" &&
      sections["buyeremail"] === ""
    )
      return "";
  
    if (details !== "" && !isInactiveBL(tmpId)) {
      $("#t" + tmpId + "_leftR").addClass("btPd");
    }
    return details;
  }
  
  function ReturntoProp(tmpId) {
    var returnValue = JSON.parse(JSON.stringify(ReqObj.Original[tmpId]));
    returnValue.IsqArray = ReqObj.Form[tmpId].IsqArray;
    returnValue.displayImage = ReqObj.Form[tmpId].displayImage;
    returnValue.prodName = ReqObj.Form[tmpId].prodName;
    returnValue.generationId = ReqObj.Form[tmpId].generationId;
    returnValue.mcatName = ReqObj.Form[tmpId].mcatName;
    return returnValue;
  }
  
  function changeProd(event) {
    if (isSet(event) && isSet(event.data)) {
      ReqObj.changeProdClick = true;
      var tmpId = event.data.tmpId;
      var todo = event.data.todo;
      if (imeshExist() === "") {
        addDetachedFlag();
        //detachFlag2(tmpId);
      }
      $(".be-prdimg").children("img").attr("src", "");
      if (todo === "prev" && isSet(ReqObj.Form[tmpId].prev)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].prev(returnObj);
      } else if (todo === "next" && isSet(ReqObj.Form[tmpId].next)) {
        ReqObj.ImageVideoIsqSeq = false;
        var returnObj = ReturntoProp(tmpId);
        ReqObj.Form[tmpId].next(returnObj);
      }
    }
  }
  
  function BlEnqGenerated(tmpId) {
    if (
      isSet(tmpId) &&
      isSet(ReqObj.Form[tmpId].generationId) &&
      parseInt(ReqObj.Form[tmpId].generationId) > 1
    )
      return true;
    else return false;
  }
  
  function ShowProdName(tmpId) {
    if (
      ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      !BlEnqGenerated(tmpId) &&
      (ReqObj.Form[tmpId].prodName === "" ||
        (ReqObj.Form[tmpId].prodName === "" && IsChatbl(tmpId)) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" &&
          (tmpId.substring(0, 2) === "09" || tmpId.substring(0, 2) === "04")) ||
        (ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
          (tmpId.substring(0, 2) === "04" || tmpId.substring(0, 2) === "01")))
    ) {
      ReqObj.Form[tmpId].flags.WasProdNamePresent = true;
      ReqObj.Form[tmpId].isproductshown = true;
      return true; //
    } else {
      return ReqObj.Form[tmpId].flags.WasProdNamePresent;
    }
  }
    
function isProdNamePresent(tmpId) {
    return ReqObj.Form[tmpId].modrefType.toLowerCase() === "product" &&
      ReqObj.Form[tmpId].prodName !== ""
      ? true
      : false;
  }
  
  //improve logic for this function
  function ShowReqBox(tmpId) {
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return false;
    }
    if (
      isBlInline(tmpId) &&
      currentISO() !== "IN" &&
      isNewInlineBl(tmpId) &&
      !showQuantityUnit(tmpId, ReqObj.Form[tmpId].IsqArray, 2)
    ) {
      return true;
    }
    if (isBlInline(tmpId) && isNewInlineBl(tmpId)) return false;
    if (ReqObj.Form[tmpId].flags.isDescDivShown === true) return false;
    else return true;
  }
  
  function GetPopUpHtml(tmpId) {
    loadOverlay();
    var regex = /0901/gi;
    return ReqObj.OverlayHtml.replace(regex, tmpId);
  }
  
  function loadOverlay() {
    if (
      isSet($("#t0901_bewrapper").html()) &&
      $("#t0901_bewrapper").html() !== ""
    ) {
      ReqObj.OverlayHtml = $("#t0901_bewrapper").html();
    }
  }
  /*-----------------new proposed seq---------------------- */
  function _makeExtraKey(_classArray, _fallback) {
    var extraKey = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      extraKey[count] = _extraKey(_classArray[ele], _fallback);
    }
    return extraKey;
  }
  function _extraKey(_className, _fallback) {
    switch (
    _className.toString().toLowerCase() // tr : toReplace, is:Service, hf:hasFallback, fObj : fallbackObj
    ) {
      case "enquirenow":
        return { tr: false, is: false, hf: true, fobj: null };
      case "userlogin":
        return { tr: true, is: false, hf: false, fobj: null };
      case "contactdetail":
        return { tr: false, is: false, hf: false, fobj: null };
      case "userverification":
        return { tr: false, is: false, hf: false, fobj: null };
      case "isq":
        return { tr: false, is: false, hf: true, fobj: _fallback };
      case "requirementdtl":
        return { tr: true, is: false, hf: false, fobj: null };
      case "moredetails":
        return { tr: true, is: false, hf: false, fobj: null };
      case "thankyou":
        return { tr: false, is: false, hf: false, fobj: null };
      case "productname":
        return { tr: true, is: false, hf: false, fobj: null };
      case "blstaticques":
        return { tr: true, is: false, hf: false, fobj: null };
    }
  }
  
  function _makeDataAndServiceArr(_classArray, attribute, type) {
    var array = {};
    var count = 0;
    for (var ele in _classArray) {
      count += 1;
      array[count] =
        type === 1 ||
          (type === 2 &&
            isSet(_classArray[ele]) &&
            _classArray[ele].toString().toLowerCase() === "contactdetail")
          ? attribute
          : [];
    }
    return array;
  }
/**-------------------new seq----------------------------- */
function _mandatDetailsFilled() {
    var ct = ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth ? true : false;
    return ct === true && isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn ? true : false; // if city and name not present return true else false
  }
  function userCity() {
    if (ReqObj.UserDetail.ctid === "" && ReqObj.UserDetail.cityname === "" && ReqObj.UserDetail.ctoth === "")
      return "";
    else return "notEmpty";
  }
  function _contactScreen(iso) {
    if (iso === "IN") {
      var ct = userCity();
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.em === "" || ct === "" ? true : false;
    } else {
      return (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn === "") || ReqObj.UserDetail.mb1 === "" ? true : false;
    }
  }
  
/**-------------------new seq----------------------------- */
function NEC() {
    if (isSet(ReqObj.UserDetail.fn) && ReqObj.UserDetail.fn) {
      if (currentISO() === "IN") {
        if (ReqObj.UserDetail.em && (ReqObj.UserDetail.ctid || ReqObj.UserDetail.cityname || ReqObj.UserDetail.ctoth))
          return false;
        else return true;
      } else {
        if (ReqObj.UserDetail.mb1) return false;
        else return true;
      }
    } else {
      return true;
    }
  }
  function ReturnCorrectVal(val, defaultvalue) {
    if (isSet(val) && val !== "") {
      return val;
    } else {
      return isSet(defaultvalue) ? (defaultvalue !== "" ? defaultvalue : "") : "";
    }
  }
  
  function setDetail(key) {
    return ReturnCorrectVal(
      usercookie.getParameterValue(imeshExist(), key),
      ReturnCorrectVal(ReqObj.UserDetail[key], "")
    );
  }
  
  function SetUserDetails(where) {
    createGlobalObject();
    var imeshcookie = imeshExist();
    ReqObj.UserDetail["fn"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "fn"),
          ReqObj.UserDetail["fn"]
        );
    ReqObj.UserDetail["em"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "em"),
          ReqObj.UserDetail["em"]
        );
    ReqObj.UserDetail["ctid"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "ctid"),
          ReqObj.UserDetail["ctid"]
        );
    ReqObj.UserDetail["mb1"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "mb1"),
          ReqObj.UserDetail["mb1"]
        );
    ReqObj.UserDetail["uv"] =
      isSet(where) && where == "changeflag"
        ? ""
        : ReturnCorrectVal(
          usercookie.getParameterValue(imeshcookie, "uv"),
          ReqObj.UserDetail["uv"]
        );
  }
  
  SetUserDetails();
  
  function setIPDetails(resp) {
    ReqObj.IPDetails["countryiso"] = resp.geoip_countryiso;
    ReqObj.IPDetails["countryname"] = resp.geoip_countryname;
    ReqObj.IPDetails["ipaddress"] = resp.geoip_ipaddress;
  }
  function currentISO() {
    var imeshiso = usercookie.getParameterValue(imeshExist(), "iso");
    var ipiso = usercookie.getParameterValue(
      usercookie.getCookie("iploc"),
      "gcniso"
    );
    var iso =
      imeshiso !== ""
        ? imeshiso
        : isSet(ReqObj) && ReqObj.changeUserIso !== ""
          ? ReqObj.changeUserIso
          : ipiso !== ""
            ? ipiso
            : "IN";
    return iso;
  }
  
function tofindindexfn(array, component, obj) {
    for (var i = 0; i < array.length; i++) {
      if (ConstructorName(array[i][obj]).toLowerCase() === component) {
        return i;
      }
    }
  
    return -1;
  }
  
  function ConstructorName(obj) {
    if (isSet(obj)) {
      if (obj.constructor.name) {
        return obj.constructor.name;
      } else {
        if (isSet(obj.className) && obj.className !== "") {
          return obj.className;
        } else {
          var regex = new RegExp(/s*function\s*(.*?)\s*\{/);
          var fun = obj.constructor.toString().match(regex)[1];
  
          var index = fun.indexOf("(");
          if (index !== -1) {
            return fun.substr(0, index);
          }
        }
      }
    }
  }
  function FormCloseButtons(tmpId) {
    $(document).off("keydown.BlEnqForm").on("keydown.BlEnqForm", function (event) {
        if (
          event.keyCode === 27 &&
          ReqObj.Form[tmpId].toFireEscTracking === true &&
          (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" ||
            ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ||
            IsChatBLOverlay(tmpId))
        ) {
          if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
          else FormCloseStep(tmpId, event);
        }
      });
    $("#t" + tmpId + "_cls")
      .off("click")
      .on("click", function (event) {
        removeYTLoader(tmpId);
        if (closeFormCond(tmpId)) FormCloseEnqBL(tmpId, event);
        else FormCloseStep(tmpId, event);
      });
  }
  
  function trimVal(val) {
    var trimmedVal = "";
    if (isSet(val) && typeof val === "string") trimmedVal = val.trim();
    return trimmedVal;
  }

$(document).ready(function () {
    var window_width1 = $(window).width();
    ReqObj[windowctrlscroll] = window_width1;
  });

function resumeBgScroll() {
    $("html").removeClass("scroll_layout");
    $(".gl-wrapper").css("width", 100 + "%");
  }
//all global variable should be in one place
loadOverlay();

function createGlobalObject() {
    /* USE ONLY IF OBJECTS CAN BE REINITIALIZED, WITH NO HARM ! */
    validation = new Validation();
    usercookie = new UserCookie();
  }

//this function takes object (strictly)
function isObjectEmpty(obj) {
    if (isSet(obj) && typeof obj === "object") {
      obj = ObjectTrim(obj);
      return !$.isEmptyObject(obj);
    } else return false;
  }
  
  function returnObjectSize(obj) {
    var count = 0;
  
    if (obj instanceof Object) {
      $.each(obj, function () {
        count = count + 1;
      });
    }
    return count;
  }

function HideSuggester() {
    $("ul.ui-autocomplete").each(function () {
      $(this).hide();
    });
    var ul = $("ul.ui-autocomplete");
    // ul.css("display", "none");
    ul.parent().css("display", "none");
    // $(".be-sugg").css("display")
  }
  
function callFlagSuggestor(tmpId, fromwhere) {
    if (
      $("#t" + tmpId + "flagdiv2").length == 0 ||
      $("#t" + tmpId + "country_dropd").html() === "" ||
      (isSet(ReqObj.setflag) && ReqObj.setflag)
    ) {
      if ($("#t" + tmpId + "flagdiv2").length == 0) {
        var ele = "<div id='t" + tmpId + "flagdiv2' class='bedsnone'></div>";
        $("#t" + tmpId + "flagdiv").after(ele);
        ReqObj.Form[tmpId]["flagcalling"] = 0;
      }
      ReqObj["showcountry"] = true;
      flagsugg.setFlagSuggestor(tmpId, fromwhere);
    }
  }
  
  function ipFlagSuggestor() {
    var len = template_array.length;
    for (var i = 0; i < len; i++) {
      callFlagSuggestor(template_array[i], "load");
    }
  }

function WrapperObj(outerHtml, closingHtml, suffix) {
    var wrapObj = {
      SuffixOuterHtml: outerHtml,
      SuffixClosingHtml: closingHtml,
      suffix: suffix,
    };
    return wrapObj;
  }
  function MakeWrapper(arrayofQues, tmpId, SuffixHtmlObj, type) {
    if (isSet(ReqObj.Form[tmpId].formType) && IsChatbl(tmpId)) {
      var Questext = IsChatbl(tmpId)
        ? "<div class = 'txt_area cbl_bg1'>"
        : "<div class='Question'>";
      var userInput = IsChatbl(tmpId)
        ? ""
        : "<div class='t" + tmpId + "_userInput' class='bewbg'>";
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
          Questext += arrayofQues[i][j].Label;
          // userInput += "<span class='bepr'>" + arrayofQues[i][j].UserInput + "</span>";
          userInput += arrayofQues[i][j].UserInput;
        }
      }
      Questext += "</div>";
      userInput += "</div>";
      var textToWrap = !IsChatbl(tmpId)
        ? Questext + userInput
        : type === "ques"
          ? Questext
          : userInput;
  
      var classtotest = chatBlClass(tmpId, "left");
      var leftright = IsChatbl(tmpId) ? SuffixHtmlObj.SuffixOuterHtml : "";
      return ConversationLeftWrapper(tmpId, textToWrap, {
        classtotest: classtotest,
        leftright: leftright,
      });
    } else {
      var normalHtml = SuffixHtmlObj.SuffixOuterHtml;
      var beRowHtml = "";
      var closingRowDiv = "";
      var ClearBothDiv = "";
  
      if (isSet(SuffixHtmlObj)) {
        if (isSet(SuffixHtmlObj.suffix) && SuffixHtmlObj.suffix !== "") {
          if (SuffixHtmlObj.suffix === "_isqBox" || SuffixHtmlObj.suffix === "_contactinfo" || SuffixHtmlObj.suffix === "_Prodname") {
            var clsName = currentISO() !== "IN" && SuffixHtmlObj.isPhone === true ? "eqflot eqIsf eqIsMn mt19"
              : "eqflot bepr";
  
            var wrapClass = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? " fmb15" : " idsf pfstrt mb20" : isInactiveBL(tmpId) ? SuffixHtmlObj.suffix === "_contactinfo" ? "" : " be-row2" : " be-row";
  
            beRowHtml += SuffixHtmlObj.suffix === "_contactinfo" && isOtherEnq(tmpId) ? "<div class='" + clsName + "'>" : "<div class='" + wrapClass + "'>"; closingRowDiv += "</div>";
          }
  
          if (SuffixHtmlObj.suffix === "_contactinfo") {
            if (isBlFirstfold(tmpId))
              ClearBothDiv += "<div class='beclr'></div>";
            else {
              if (currentISO() === "IN")
                ClearBothDiv += "<div class='beclr'></div>";
            }
          }
  
        }
      }
  
      if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3) {
        normalHtml += '<div class="NameEmail">';
      }
  
      for (var i = 0; i < arrayofQues.length; i++) {
        for (var j = 0; j < arrayofQues[i].length; j++) {
  
          if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + " " + arrayofQues[i][j].WrapClass + "'>";
  
          if (!isSSB(tmpId) || (isSSB(tmpId) && SuffixHtmlObj.suffix !== "_isqBox")) {
            if (isInactiveBL(tmpId) && SuffixHtmlObj.suffix === "_contactinfo" && arrayofQues.length == 3 && i == 2) {
              normalHtml += "</div>";
            }
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].WrapClass) && arrayofQues[i][j].WrapClass != "" && SuffixHtmlObj.suffix === "_isqBox")
            beRowHtml = "<div class='" + wrapClass + "'>";
  
          if (isSSB(tmpId) && SuffixHtmlObj.suffix === "_isqBox") {
            beRowHtml = (isSet(arrayofQues[i].clsNm) && arrayofQues[i].clsNm === false) || (isSet(arrayofQues[i][j].clsNm) && arrayofQues[i][j].clsNm === false)
              ? "<div class=''>"
              : "<div class='" + ssbClass("wrprClass", tmpId) + "'>";
            normalHtml += beRowHtml;
          }
  
          if (isSet(arrayofQues[i][j].isenquire) && arrayofQues[i][j].isenquire === true) {
            normalHtml = SuffixHtmlObj.SuffixOuterHtml + "<div class='eqmb5 eqmt20'>";
          }
  
          normalHtml +=
            arrayofQues[i][j].OuterWrapper +
            arrayofQues[i][j].Label +
            arrayofQues[i][j].UserInput +
            arrayofQues[i][j].ClosingWrapper;
        }
        normalHtml += closingRowDiv;
      }
  
      normalHtml += SuffixHtmlObj.SuffixClosingHtml;
      normalHtml += ClearBothDiv;
      return normalHtml;
    }
  }
  function checkdefaultIsq(tmpId, QuestionText, type, option) {
    if (
      isSet(ReqObj.Form[tmpId].defaultIsq) &&
      ReqObj.Form[tmpId].defaultIsq === "1" &&
      isSet(type) &&
      type.toLowerCase() === "radio"
    ) {
      QuestionText = QuestionText.toLowerCase();
      for (var isq in DefaultIsqAns)
        return (
          isSet(QuestionText.match(isq.toLowerCase())) &&
          option.toLowerCase() === DefaultIsqAns[isq].toLowerCase()
        );
    }
    return false;
  }
  function ChatBlMsgs(QuestionText, type) {
    if (isSet(QuestionText)) {
      var defaultmsg = "What is your preferred";
      if (isSet(type) && type.toLowerCase() === "radio") {
        defaultmsg = "Please select";
      }
      var QuestionTextMatch = trimVal(QuestionText.toLowerCase());
      if (QuestionTextMatch in ChatBlStaticMsg) {
        return ChatBlStaticMsg[QuestionTextMatch];
      } else {
        var splitting = defaultmsg.split(" ");
        var last_word = splitting[splitting.length - 1];
        splitting = QuestionText.split(" ");
        var first_word = splitting[0];
        if (QuestionText.toLowerCase().includes("sample order"))
          return "Is this a sample order" + QuestionEnding;
        if (first_word.toLocaleLowerCase() === last_word.toLocaleLowerCase()) {
          defaultmsg = defaultmsg.substr(0, defaultmsg.lastIndexOf(" ") + 1);
        }
        defaultmsg += " ";
        if (isSet(type) && type.toLowerCase() === "radio") {
          return defaultmsg + "<strong>" + QuestionText + "</strong>";
        }
        return (
          defaultmsg + "<strong>" + QuestionText + "</strong>" + QuestionEnding
        );
      }
    }
  }

function ConversationLeftWrapper(tmpId, message, classObj, name) {
    /* add attributes at end  */
    if (isSet(message) && message !== "") {
      if (IsChatbl(tmpId) && !isSet(name)) {
        return classObj.leftright + message + "</div>";
      }
      return (
        '<div class="' +
        classObj.leftright +
        '"><div class="' +
        classObj.classtotest +
        '">' +
        message +
        "</div></div>"
      );
    }
  }
  
  function ConversationRightWrapper(tmpId, message, classObj) {
    /* add attributes at end  */
    if (
      IsChatbl(tmpId) &&
      isSet(message) &&
      (message.toLowerCase() === "not answered" || message === "")
    ) {
      return "";
    }
    if (isSet(message) && message !== "") {
      var messagetoshow = IsChatbl(tmpId)
        ? "<div class='txt_area'>" + message + "</div>"
        : "";
  
      return IsChatbl(tmpId)
        ? '<div class="' + classObj.leftright + '">' + messagetoshow + "</div>"
        : '<div class="' +
        classObj.leftright +
        '"><div class="' +
        classObj.classtotest +
        '">' +
        messagetoshow +
        "</div></div>";
    }
  }

function getTimeStamp() {
    var date = new Date();
    var time = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
    return time % 10 === 0 ? true : false;
  }
  
  function returnIsoHtml(tmpId, isoclass, isovalue) {
    /* add attributes at end */
    if (!isSet(isovalue)) isovalue = "";
    return (
      '<input type="text" value="' +
      isovalue +
      '" readonly="" name="iso" id="t' +
      tmpId +
      '_iso" class="' +
      isoclass +
      '" tabindex="-1" disabled="disabled">'
    );
  }
  
  function returnInput(
    tmpId,
    element,
    type,
    name,
    placeholder,
    inputclass,
    value,
    inlinestyle,
    maxlength,
    attribute
  ) {
    /* add attributes at end  */
    return (
      '<input id="' +
      tmpId +
      element +
      '" type="' +
      type +
      '" name="' +
      name +
      '" value="' +
      value +
      '" class="' +
      inputclass +
      '" placeholder="' +
      placeholder +
      '" maxlength="' +
      maxlength +
      '" style="' +
      inlinestyle +
      '"' +
      attribute +
      '="">'
    );
  }
  
  function returnButton(tmpId, element, buttontext, buttonclass, bstyle) {
    /* add attributes at end  */
    return (
      '<button id="' +
      tmpId +
      element +
      '" class="' +
      buttonclass +
      '" style="' +
      bstyle +
      '">' +
      buttontext +
      "</button>"
    );
  }
  
  function returnContainer(
    tmpId,
    element,
    containerclass,
    datarole,
    divtext,
    style
  ) {
    /* add attributes at end  */
    if (!isSet(divtext)) divtext = "";
    return (
      '<div id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" data-role="' +
      datarole +
      '" style="' +
      style +
      '">' +
      divtext
    );
  }
  
  function returnTextarea(tmpId, element, containerclass, placeholder) {
    /* add attributes at end  */
    return (
      '<textarea id="' +
      tmpId +
      element +
      '" class="' +
      containerclass +
      '" placeholder="' +
      placeholder +
      '" />'
    );
  }
  
function returnSpan(tmpId, element, text, spanclass, style) {
    /* add attributes at end  */
    return ('<span id="' +tmpId +element +'" class="' +spanclass +'" style="' +style +'" >' +text +"</span>");
  }
  
  function returnLabel(tmpId, text, element, labelclass) {
    /* add attributes at end  */
    return (
      '<label id="' +
      tmpId +
      element +
      '" class="' +
      labelclass +
      '">' +
      text +
      "</label>"
    );
  }
  
  function returnDl(tmpId, element, dlclass, disabled) {
    /* add attributes at end  */
    return (
      '<dl id="' +
      tmpId +
      element +
      '" class="' +
      dlclass +
      '" disabled="' +
      disabled +
      '"></dl>'
    );
  }
  
function returnCustomElement(
    tmpId,
    element,
    customele,
    value,
    optionid,
    selected,
    optiontext
  ) {
    return (
      "<" +
      customele +
      ' value="' +
      value +
      '" optionid="' +
      optionid +
      '"' +
      selected +
      " >" +
      optiontext +
      "</" +
      customele +
      ">"
    );
  }
  
  function returnAnswer(tmpId, key) {
    return ReqObj.Form[tmpId].UserInputs[key];
  }
function addLine() {
    return '<div class="cbl_line"></div>';
  }
  
function ssbClass(type, tmpId) {
    if (type === "label") return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl";
    if (type === "reqBxLbl")
      return isnewSSB(tmpId) ? "nb-fmlbl" : "mb-lbl mb-mt10";
    if (type === "wrprClass")
      return isnewSSB(tmpId) ? "nb-frm nb-mt25" : "mb-flex mb-pdt15 mb-fxstrt";
    if (type === "radin") return isnewSSB(tmpId) ? "nb-radin" : "mb-radin";
    if (type === "radio")
      return isnewSSB(tmpId) ? "nb-rad radioClick" : "mb-rad radioClick";
    if (type === "radlbl") return isnewSSB(tmpId) ? "nb-radlbl" : "mb-radlbl";
    if (type === "otp")
      return isnewSSB(tmpId)
        ? "nb-flex nb-otpm "
        : "mb-wdIn mb-flex mb-otpm mb-otpHt";
    if (type === "skipotp") return isnewSSB(tmpId) ? "nb-crPnt" : "mb-crPnt";
    if (type === "resendotp")
      return isnewSSB(tmpId) ? "nb-rsd nb-crPnt" : "mb-rsd mb-crPnt";
    if (type === "errorotp")
      return isnewSSB(tmpId)
        ? "nb-ertxt nb-dib bedsnone"
        : "mb-ertxt mb-dib bedsnone";
    if (type === "verifyotp")
      return isnewSSB(tmpId) ? "nb-mbuTxt nb-lh18" : "mb-mbuTxt mb-lh18";
    if (type === "otplabel")
      return isnewSSB(tmpId) ? "nb-lbl nb-pdt10 nb-pdr10" : "mb-lbl";
    if (type === "otpwrap")
      return isnewSSB(tmpId)
        ? "nb-flex nb-pdt15 nb-fxstrt"
        : "mb-flex mb-pdt15 mb-fxstrt";
    if (type === "speccity")
      return isnewSSB(tmpId) ? "nb-w160 nb-Mr15" : "mb-w222 mb-Mr15";
    if (type === "html")
      return isnewSSB(tmpId)
        ? "nb-SbHd nb-hp nb-pr nb-pdt15 nb-crPnt"
        : "mb-SbHd mb-hp mb-pr mb-pdt15 mb-crPnt";
    if (type === "htmli") return isnewSSB(tmpId) ? "nb-SbHd" : "mb-SbHd";
    if (type === "disable") return isnewSSB(tmpId) ? "nb-inpDisb" : "mb-inpDisb";
  }
  
  function returnIsqHtmlObj(RecurOfQues, tmpId) {
    var imeshcookie = imeshExist();
  
    if (isSSB(tmpId)) return returnSSBIsqHtml(RecurOfQues, tmpId);
    // var qtcls = (isBlInline(tmpId)) ? "qut_cus iqutm" : "qut_cus";
    var qtcls = isBlInline(tmpId)
      ? "qut_cus iqutm"
      : isBlFirstfold(tmpId)
        ? imeshcookie == "" && currentISO() == "IN"
          ? "qut_cus qut_ffun qtmt"
          : "qut_cus qut_ffid qtmt"
        : "qut_cus";
    var blfrcls = isBlInlineFr(tmpId) ? " flx1" : "";
    var outrdiv = isBlInline(tmpId)
      ? RecurOfQues[0].label_div +
      "<div class='inW240" +
      blfrcls +
      "'>" +
      RecurOfQues[0].error_div +
      "<div id='t" +
      tmpId +
      "qut_id' class='" +
      qtcls +
      "'>"
      : RecurOfQues[0].error_div +
      RecurOfQues[0].label_div +
      "<div id='t" +
      tmpId +
      "qut_id' class='" +
      qtcls +
      "'>";
    return [
      {
        ClosingWrapper: isBlInline(tmpId) ? "</div></div>" : "</div>",
        Label: IsChatbl(tmpId) ? "<div>" + ChatBlMsgs("Quantity") + "</div>" : "",
        OuterWrapper: outrdiv,
        UserInput: RecurOfQues[0].UserInput + RecurOfQues[1].UserInput,
        beforeInput: "",
        beforeLabel: "",
        qtuttype: 6,
      },
    ];
  }
  
  //Scroll Bottom
  function scrollSmoothToBottom(id) {
    var scrollDiv = document.getElementById(id);
    if (isSet(scrollDiv)) {
      $("#" + id).animate(
        {
          scrollTop: scrollDiv.scrollHeight - scrollDiv.clientHeight,
        },
        500
      );
    }
  }
function CallGeneration(tmpId) {
    if (isSet(tmpId)) {
      if (
        parseInt(ReqObj.Form[tmpId].generationId, 10) <= 1 &&
        ExistsInArray(ReqObj.Form[tmpId].HitArray, "Generation") !== true &&
        ExistsInArray(ReqObj.Form[tmpId].ServiceSequence, "Generation") !== true
      )
        return true;
      else return false;
    } else {
    }
  }
  
  function SetAutoCompleteClass(tmpId, suffix) {
    var autocompleteClass = "be-sugg t" + tmpId + suffix;
    if (IsChatbl(tmpId)) {
      autocompleteClass += " bl-chat";
    } else if (isSSB(tmpId)) autocompleteClass += " mb-prod-sugg" + " suggz";
  
    return autocompleteClass;
  }
  
function ShowIsq(tmpId) {
    //|| (tmpId.substring(0, 2) === "09" && currentISO() !== "IN")
    if (
      parseInt(ReqObj.Form[tmpId].disableIsq) === 1 ||
      (currentISO() !== "IN" && ReqObj.Form[tmpId].Isq.HasHtmlCalled === true)
    )
      return false;
    else if (pdpenq(tmpId) && !ShowReqBox(tmpId)) {
      return false;
    }
    else if (
      ReqObj.Form[tmpId].IsqArray === "" ||
      ReqObj.Form[tmpId].prevCount < ReqObj.Form[tmpId].IsqLength
    )
      return true;
    else return false;
  }
  
  function showQuantityUnit(tmpId, arr, type) {
    var isq = arr;
    var isq_length = isSet(isq) ? isq.length : 0;
    for (var i = 0; i < isq_length; i++) {
      if (isq[i].length === 2) {
        var isqtype = [
          isq[i][0].IM_SPEC_MASTER_DESC.toLowerCase(),
          isq[i][1].IM_SPEC_MASTER_DESC.toLowerCase(),
        ];
        if (
          $.inArray("quantity", isqtype) ||
          $.inArray("quantity unit", isqtype)
        ) {
          ReqObj.Form[tmpId].quantityunit = isq[i];
          if (type === 1) {
            return ReqObj.Form[tmpId].quantityunit[0]
              .IM_CAT_SPEC_CATEGORY_TYPE === "2"
              ? false
              : true;
          }
          return true;
        }
        return false;
      }
    }
    return false;
  }
function GetObjectKeys(obj) {
    if (!Object.keys) {
      var keys = [];
  
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    } else {
      return Object.keys(obj);
    }
  }
  
  function updateChatWidgetGlobalVar(tmpId) {
    if (IsChatBLInline(tmpId) && tmpId.substring(0, 2) === "08") {
      isChatWidgetOpen = $("#t" + tmpId + "_chatBL").hasClass("cbl_vh")
        ? false
        : true;
    }
  }
  
  function BlAutoSuggRowNum(tmpId) {
    if (isSet(tmpId)) {
      var row_num = 5;
      if (tmpId === "202") row_num = 3;
      if (IsChatbl(tmpId)) row_num = 4;
      return row_num;
    }
    return 5;
  }
  
  function ReturnBlUserName(tmpId) {
    var BLname = "";
    var firstName = "";
    if (isSet(ReqObj.UserDetail["fn"]) && ReqObj.UserDetail["fn"] !== "")
      firstName = ReqObj.UserDetail["fn"];
    else firstName = usercookie.getParameterValue(imeshExist(), "fn");
    if (IsChatbl(tmpId) && isSet(firstName) && firstName !== "") {
      var classtotest = !IsChatbl(tmpId)
        ? chatBlClass(tmpId, "left")
        : "txt_area cbl_bg1";
      var leftright = IsChatbl(tmpId) ? "cbl_ques cbl_vh" : "";
      BLname = ConversationLeftWrapper(
        tmpId,
        "Welcome " + firstName,
        {
          classtotest: classtotest,
          leftright: leftright,
        },
        "name"
      );
    }
    return BLname;
  }
  
  function IsChatbl(tmpId) {
    return isSet(tmpId) && tmpId.substr(0, 2) === "08" ? true : false;
  }
  
  function IsChatBLInline(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl-inline"
      ? true
      : false;
  }
  
  function IsChatBLOverlay(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "chatbl" ? true : false;
  }
  
  function isSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" ? true : false;
  }
  
  function isnewSSB(tmpId) {
    return tmpId.substr(0, 2) === "06" &&
      isSet(ReqObj.Form[tmpId].isnewssb) &&
      ReqObj.Form[tmpId].isnewssb === "1"
      ? true
      : false;
  }
  
  function isBlInline(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isBlFirstfold(tmpId) {
    return ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "04" &&
      ReqObj.Form[tmpId].screenNumber < 0
      ? true
      : false;
  }
  
  function isScriptTag(name) {
    name = name.toLowerCase();
    if (
      name.includes("<script>") ||
      name.includes("</script>") ||
      name.includes("script&gt") ||
      name.includes("%3cscript") ||
      name.includes("script%253e") ||
      (name.includes("<") && name.includes(">"))
    )
      return true;
    else false;
  }
  
  function isBlInlineFlag(tmpId) {
    return isGlIdEven(tmpId) &&
      ReqObj.Form[tmpId].typeofform === "bl" &&
      tmpId.substr(0, 2) === "01"
      ? true
      : false;
  }
  
  function isGlIdEven(tmpId) {
    if (isSet(ReqObj.Form[tmpId].isNewUI) && ReqObj.Form[tmpId].isNewUI === "0") {
      return true;
    }
    return false;
  }
  function isBlInlineFr(tmpId) {
    if (
      ReqObj.Form[tmpId].screenNumber <= 0 &&
      ReqObj.Form[tmpId].FormSequence._stepCounter <= 0 &&
      isGlIdEven(tmpId) &&
      isSet(ReqObj.Form[tmpId].isFrInline) &&
      ReqObj.Form[tmpId].isFrInline === "1"
    ) {
      return true;
    }
    return false;
  }
  
function IsProduction() {
    var isProd = webAddressLocation.match(/^dev/)
      ? false
      : webAddressLocation.match(/^stg/)
        ? false
        : true;
    return isProd;
  }
  
  function CopyObject(Obj) {
    var CopyObj = Obj || {};
    var returnObj = {};
    for (var prop in CopyObj) {
      if (CopyObj.hasOwnProperty(prop)) {
        returnObj[prop] = CopyObj[prop];
      }
    }
    return returnObj;
  }
  
/**
for future if we need to replace all duplicate tracking fired
then replace numberToFind with number
*/
function binaryArraySearch(array, number) {
    if (isSet(array)) {
      var numberToFind = number;
      var start = 0,
        end = array.length - 1;
      while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (array[mid] === numberToFind) return mid;
        else if (array[mid] > numberToFind) {
          end = mid - 1;
        } else if (array[mid] < numberToFind) {
          start = mid + 1;
        }
      }
      return -1;
    }
    return -1;
  }
  
  function StaticQuesForeignUser(tmpId) {
    // if (currentISO() !== "IN" && (tmpId.substring(0, 2) === "09" || IsChatbl(tmpId))) return true;
    // else false;
  
    return false;
  }
  
  function updateEnrichShownKey(tmpId, isStatic, isAttachment) {
    ReqObj.Form[tmpId].flags.isEnrichShown.isStaticShown = isStatic;
    ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = isAttachment;
  
    //is showAttachment is 1 we need to show the attachment
    if (ReqObj.Form[tmpId].showAttachment === "1") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (ReqObj.Form[tmpId].showAttachment === "0") {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "bl"
    ) {
      if (StaticQuesForeignUser(tmpId)) {
        ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
      } else ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = false;
    } else if (
      ReqObj.Form[tmpId].showAttachment === "-1" &&
      ReqObj.Form[tmpId].formType.toLowerCase() === "enq"
    ) {
      ReqObj.Form[tmpId].flags.isEnrichShown.isAttachmentShown = true;
    }
  }
  
  
function ChatblfooterAns(tmpId) {
    $("#t" + tmpId + "_blchatfooter").hasClass("focus")
      ? ""
      : setTimeout(function () {
        $("#t" + tmpId + "_blchatfooter").addClass("focus");
      }, 1000);
    $("#t" + tmpId + "_typhere").hasClass("dn")
      ? ""
      : setTimeout(function () {
        $("#t" + tmpId + "_typhere").addClass("dn");
        $("#t" + tmpId + "_newblchatReply").removeClass("cbl_vh");
      }, 1099);
  }
  
function isSecondEnq() {
    var imEqgl = usercookie.getCookie("imEqGl");
    if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
      var arr = imEqgl.split(",");
      for (var s = 0; s < arr.length; s++) {
        if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
          if (arr[s].substring(0, 6) === "dispid") return true;
        }
      }
      return false;
    } else return false;
  }
  
  function isSecondBl() {
    var imEqgl = usercookie.getCookie("imEqGl");
    if (isSet(imEqgl) && trimVal(imEqgl) !== "" && imEqgl !== "undef") {
      var arr = imEqgl.split(",");
      for (var s = 0; s < arr.length; s++) {
        if (isSet(arr[s]) && trimVal(arr[s]) !== "") {
          if (arr[s].substring(0, 2) === "BL") return true;
        }
      }
      return false;
    } else return false;
  }
  
  function isSecondBlEnq(tmpId) {
    if (isSet(tmpId)) {
      if (isSet(ReqObj.Form[tmpId].formType)) {
        if (ReqObj.Form[tmpId].formType.toLowerCase() === "bl" && isSecondBl())
          return true;
        else if (
          ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
          isSecondEnq()
        )
          return true;
        return false;
      } else {
        return false;
      }
    } else return false;
  }
/*
 *
 * To maintain mcatId and related image
 *
 */

function pushImage(mcatID, dispImgUrl, zoomImgUrl) {
    ReqObj.ImageKey[mcatID] =
      isSet(dispImgUrl) && dispImgUrl !== ""
        ? dispImgUrl
        : isSet(zoomImgUrl) && zoomImgUrl !== ""
          ? zoomImgUrl
          : "";
  }

function isOtherEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" ? true : false;
  }
  
  function isImageEnqDIR(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      isSet(ReqObj.Form[tmpId].typeofform) &&
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
      ? true
      : false;
  }
  
  function isImageVidEnq(tmpId) {
    return ReqObj.Form[tmpId].formType.toLowerCase() === "enq" &&
      isSet(ReqObj.Form[tmpId].typeofform) &&
      (ReqObj.Form[tmpId].typeofform.toLowerCase() === "image" ||
        ReqObj.Form[tmpId].typeofform.toLowerCase() === "video")
      ? true
      : false;
  }
function isAllNumbers(str) {
    var exp = /^[0-9]*$/;
    return exp.test(str);
  }

function setIplocCookie(tmpId) {
    if (!(Enq04(tmpId) || Bl04(tmpId) || Bl01(tmpId) || isSSB(tmpId))) {
      var imcoockie = usercookie.getCookie("ImeshVisitor");
      var ipcookie = usercookie.getCookie("iploc");
      if (imcoockie == "" && ipcookie == "") new IpLoc(tmpId);
    }
  }
  
  function flagsugcall(tmpId, ctname, ciso) {
    if (ctname != "India" && ctname !== ReqObj.Form[tmpId].ctn) {
      $("#t" + tmpId + "country_dropd").html("");
      ReqObj.changeUserIso = ciso;
      ReqObj.setflag = 1;
      flagsugg.setFlagSuggestor(tmpId, "load");
    }
  }
  
function IpLoc(tmpId) {
    var tempipLoc = usercookie.getCookie("iploc");
    if (
      (tempipLoc === "" ||
        (tempipLoc !== "" &&
          usercookie.getParameterValue(tempipLoc, "gip") === "")) &&
      !navigator.userAgent.match(/googlebot|mediapartners/)
    ) {
      this.getIp(tmpId);
    } else {
      this.captureDetailsOfIploc();
    }
  }
IpLoc.prototype.getIp = function (tmpId) {
    var that = this;
    //var form_type = ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    var appSName = location.hostname.match(/^dev/)
      ? "//geoip.imimg.com/"
      : location.hostname.match(/^stg/)
        ? "//geoip.imimg.com/"
        : "//geoip.imimg.com/";
    if (typeof glmodid !== "undefined" && glmodid !== null && glmodid !== "") {
      $.ajax({
        cache: false,
        url: appSName + "api/location.php",
        //url: 'https://geoip.imimg.com/api/location.php',
        timeout: 3000,
        data: {
          modid: glmodid,
          token: "imobile@15061981",
        },
        type: "POST",
        dataType: "json",
        success: function (s) {
          ReqObj.ipLoc.response = true;
          if (isSet(s) && isSet(s.Response)) {
            if (
              isSet(s.Response.Code) &&
              parseInt(s.Response.Code) === 200 &&
              isSet(s.Response.Status) &&
              s.Response.Status === "Success"
            ) {
              //s={"Response":{"Data":{"geoip_countryiso":"JP","geoip_countryname":"Japan","geoip_stateiso":"13","geoip_statename":"Tokyo","geoip_accuracy":1000,"geoip_ipaddress":"84.17.34.18"},"Code":200,"Status":"Success","Message":"Successfully returning data"}};
              var resp = s.Response.Data;
              if (isSet(resp)) {
                ReqObj.IPDetails = [];
                resp.geoip_cityname = isSet(resp.geoip_cityname)
                  ? resp.geoip_cityname
                  : "";
                resp.geoip_cityid = isSet(resp.geoip_cityid)
                  ? resp.geoip_cityid
                  : "";
                resp.geoip_countryiso = isSet(resp.geoip_countryiso)
                  ? resp.geoip_countryiso
                  : "";
                resp.geoip_countryname = isSet(resp.geoip_countryname)
                  ? resp.geoip_countryname
                  : "";
                resp.geoip_accuracy = isSet(resp.geoip_accuracy)
                  ? resp.geoip_accuracy
                  : "";
                resp.geoip_ipaddress = isSet(resp.geoip_ipaddress)
                  ? resp.geoip_ipaddress
                  : "";
                resp.geoip_statename = isSet(resp.geoip_statename)
                  ? resp.geoip_statename
                  : "";
                that.setIpLoc(resp, glmodid, tmpId);
                setIPDetails(resp);
                if (isSet(tmpId))
                  setTimeout(function () {
                    flagsugcall(
                      tmpId,
                      resp.geoip_countryname,
                      resp.geoip_countryiso
                    );
                  }, 1000);
              }
            } else {
              blenqGATracking("iploc", "service:location:failure", s.Response, 1, 0);
              ReqObj.ipLoc.isFailed = true;
              that.failSafe();
            } /* last parameter = 0 denotes ip req */
          } else {
            blenqGATracking("iploc", "service:location:failure", "response undefined", 1, 0);
            ReqObj.ipLoc.isFailed = true;
            that.failSafe();
          }
        },
        error: function (res) {
          ReqObj.ipLoc.response = true;
          ReqObj.ipLoc.isFailed = true;
          that.failSafe();
          res = isSet(res) ? res : "response undefined";
          blenqGATracking("iploc", "service:location:failure", JSON.stringify(res), 1, 0);
        },
      });
    }
  };
  /*
  this method makes iploc cookie using setCookie() method of UserCookie class
  */
  IpLoc.prototype.setIpLoc = function (resp, glmodid, tmpId) {
    var tempipLoc =
      "gcniso=" +
      resp.geoip_countryiso +
      "|gcnnm=" +
      resp.geoip_countryname +
      "|gctnm=" +
      resp.geoip_cityname +
      "|gctid=" +
      resp.geoip_cityid +
      "|gacrcy=" +
      resp.geoip_accuracy +
      "|gip=" +
      resp.geoip_ipaddress +
      "|gstnm=" +
      resp.geoip_statename;
    usercookie.setCookie("iploc", tempipLoc, 0.125, glmodid); /* glmodid */
    this.captureDetailsOfIploc(tmpId);
  };
IpLoc.prototype.captureDetailsOfIploc = function (tmpId) {
    var iploccookie = usercookie.getCookie("iploc");
    ReqObj.UserDetail["ipctid"] = usercookie.getParameterValue(
      iploccookie,
      "gctid"
    );
    ReqObj.UserDetail["ipcityname"] = usercookie.getParameterValue(
      iploccookie,
      "lg_ct"
    );
    if (!isSet(ReqObj.IPDetails)) {
      ReqObj.IPDetails = [];
      ReqObj.IPDetails["countryiso"] = usercookie.getParameterValue(
        iploccookie,
        "gcniso"
      );
      ReqObj.IPDetails["countryname"] = usercookie.getParameterValue(
        iploccookie,
        "gcnnm"
      );
      ReqObj.IPDetails["ipaddress"] = usercookie.getParameterValue(
        iploccookie,
        "gip"
      );
    }
    if (
      usercookie.getParameterValue(iploccookie, "gcniso") !== "IN" ||
      (usercookie.getParameterValue(iploccookie, "gcniso") === "IN" &&
        ReqObj.ipLoc.zoneISO === "OTHER")
    ) {
      if (!isSet(tmpId)) {
        ipFlagSuggestor();
      }
    }
    ReqObj.UserDetail["suggesCity"] = {
      geoloc: [
        usercookie.getParameterValue(iploccookie, "lg_ct"),
        usercookie.getParameterValue(iploccookie, "lg_ctid"),
      ],
      hdcity: [
        usercookie.getParameterValue(usercookie.getCookie("xnHist"), "city"),
        "",
      ],
      iploc: [
        usercookie.getParameterValue(iploccookie, "gctnm"),
        usercookie.getParameterValue(iploccookie, "gctid"),
      ],
    };
  };
  IpLoc.prototype.failSafe = function () {
    if (ReqObj.ipLoc.zoneISO !== "IN") {
      ReqObj.ipLoc.callIpFlagSugg = true;
      ipFlagSuggestor();
    }
  };
  new IpLoc();
  ReqObj.ipLoc.pinged = true;
/*--------------------------------------- Pass mcat id to get image if available---------------------------------------------- */
function getImage(key) {
    return ReqObj.ImageKey[key];
  }

function toCallMiniDetails(tmpId) {
    // cname
    //if(currentISO() === "IN") { // check
    if (
      (!isSet(ReqObj.CNSerCalled) || !ReqObj.CNSerCalled) &&
      (imeshExist() !== "" || (isSet(ReqObj.glid) && ReqObj.glid != ""))
    ) {
      ReqObj.CNSerCalled = true;
      miniDetailService(tmpId);
    } else ReqObj.Form[tmpId].cName.toask = false;
    //}
  }
  
function toAskCname(tmpId) {
    return typeof ReqObj.UserDetail.cName === "undefined" ||
      (isSet(ReqObj.UserDetail.cName) && ReqObj.UserDetail.cName === "")
      ? true
      : false;
  }
  
function RadioClick(tmpId) {
    $(".radioClick")
      .off("click")
      .on("click", function (event) {
        var tempId = event.target.id;
        tempId = tempId.substr(1, 4);
        var imeshcookie = imeshExist();
        if (IsChatbl(tmpId))
          $("#t" + tmpId + "_submitNo2") //chat bl bug
            .parent()
            .addClass("dn");
        var curEl = this;
        var name = $(this).attr("name");
        var isSelected = $(curEl).hasClass("waschecked");
  
        $("input[name='" + name + "']").each(function () {
          $(this).prop("checked", false).removeClass("waschecked");
          $(this).parent().removeClass("sl-box chksl");
          $(this).siblings("label").children(".bechk-in").children().hide();
        });
        var crb = false;
        if (!isSelected) {
          if (
            $("#t" + tmpId + "ques" + name.charAt(name.length - 1))
              .text()
              .toLowerCase() === "why do you need this"
          )
            crb = true;
          if (
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for reselling" ||
            $("#" + curEl.id)
              .val()
              .toLowerCase() === "for business use"
          ) {
            ReqObj.Form[tempId].cName.rb = true;
          } else {
            ReqObj.Form[tempId].cName.rb = false;
          }
          $(curEl).prop("checked", true).addClass("waschecked");
          $(curEl).parent().siblings(".oth_bx").children("input").val("");
          IsChatbl(tempId) || isSSB(tempId)
            ? ""
            : $(curEl).parent().addClass("sl-box chksl");
          $(curEl).siblings("label").children(".bechk-in").children().show();
          if (crb === true && !isEnq(tmpId)) onCName(tmpId, true);
        } else if (!IsChatbl(tmpId) && crb === true && !isEnq(tmpId)) {
          ReqObj.Form[tempId].cName.rb = false;
          onCName(tmpId, true);
        }
      });
  }

//This will be available as global variable
var webAddressLocation = location.hostname;
var appsServerName = webAddressLocation.match(/^dev/)
  ? "//dev-apps.imimg.com/"
  : webAddressLocation.match(/^stg/)
    ? "//stg-apps.imimg.com/"
    : "//apps.imimg.com/";

function ProductName(tmpId, from) {
  this.ProductNameHTML = "";
  this.onselect = 0;
  this.tmpId = "";
  ReqObj.Form[tmpId].productObject = this;
  if (
    !isSSB(tmpId) &&
    !(tmpId.substr(0, 2) === "01" && isGlIdEven(tmpId)) &&
    from !== "enter"
  )
    $("#t" + tmpId + "_prodtitle").html("");
  this.className = "ProductName";
  this.isProdNameChanged = false;
  this.ProductNameHtmlObj = {
    Label: "",
    UserInput: "",
    OuterWrapper: "",
    ClosingWrapper: "",
  };
  this.ProductNameHtmlObjArray = [];
}

ProductName.prototype.addHtmlObjToArray = function (htmlObj) {
  this.ProductNameHtmlObjArray.push(htmlObj);
};

ProductName.prototype.displayAnswer = function (tmpId) {
  var classtotest = chatBlClass(tmpId, "right");
  var leftright = IsChatbl(tmpId) ? "cbl_ansr" : "";
  return [
    ConversationRightWrapper(tmpId, returnAnswer(tmpId, "ProductName"), {
      classtotest: classtotest,
      leftright: leftright,
    }),
  ];
};

ProductName.prototype.hasHtml = function (ProductNameObj) {
  if (isSet(ProductNameObj)) {
    this.tmpId = ProductNameObj.tmpId;
    var tmpId = ProductNameObj.tmpId;
    // if (isSet(ReqObj.UserHtml[tmpId])) {
    // ReqObj.UserHtml[tmpId]["ProductSugg"] = true;
    this.addHtmlObjToArray(this.getProductHtml(tmpId));
    // var ProductNameSuffixObj = {
    //   "suffix": "_prodtitle",
    //   "class": ""
    // };
    if (!IsChatbl(tmpId)) {
      var clasnm = isSSB(tmpId) ? ssbClass("wrprClass", tmpId) : isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fmb15" : "idsf pfstrt mb20" : isInactiveBL(tmpId) ? "porlt bemb5":"porlt";
      var ProductNameSuffixOuterHtml = "<div  id='t" + tmpId + "_prodtitle' class='" + clasnm + "'>";
      var ProductNameSuffixClosingHtml = "</div>";
      var ProductNameSuffixHtmlObj = {
        SuffixOuterHtml: ProductNameSuffixOuterHtml,
        SuffixClosingHtml: ProductNameSuffixClosingHtml,
        suffix: "_prodtitle",
      };

      this.ProductNameHTML = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        ProductNameSuffixHtmlObj,
        ""
      );
    } else {
      this.ProductNameHTMLQues = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div  id='t" + tmpId + "_prodtitle' class = 'cbl_ques cbl_vh'>",
          "</div>",
          "_prodtitle"
        ),
        "ques"
      );

      this.ProductNameHTMLInput = MakeWrapper(
        [this.ProductNameHtmlObjArray],
        tmpId,
        WrapperObj(
          "<div class = 'cbl_dtls cbl_prdchng cbl_df t" +
          tmpId +
          "_userInput cbl_br10 dn'>",
          "</div>",
          "_prodtitle"
        ),
        "input"
      );

      this.ProductNameHTML =
        this.ProductNameHTMLQues + this.ProductNameHTMLInput;
    }
    // var ProdNameHtml = this.ProductNameHTML;
    // ReqObj.UserHtml[tmpId] = {
    //   "ProductSugg": true,
    //   "ProductName": ProdNameHtml
    // };
    // }
    // else {
    //   ReqObj.UserHtml[tmpId]["ProductSugg"] = false;

    //   this.ProductNameHTML = ReqObj.UserHtml[tmpId]["ProductName"];
    // }
    if (this.ProductNameHTML !== "") {
      ReqObj.Form[tmpId].currentclassCount++;
      this.ifHtmlPresent(ProductNameObj, tmpId);
    } else {
      this.ifHtmlNotPresent(ProductNameObj, tmpId);
    }
  }
};

ProductName.prototype.ifHtmlPresent = function (ProductNameObj, tmpId) {
  ProductNameObj.that.NumberofClassCalled -= 1;
  AttachObject(ProductNameObj.object, tmpId);
  if (isSet(ProductNameObj.AfterService)) {
    for (var i = 0; i < ProductNameObj.AfterService.length; i++) {
      ProductNameObj.that.MakeSeq(ProductNameObj.AfterService[i], tmpId);
    }
  }
  if (ProductNameObj.that.NumberofClassCalled === 0) {
    makeFinalSeq(ProductNameObj, tmpId);
  }
};

ProductName.prototype.ifHtmlNotPresent = function (ProductNameObj, tmpId) {
  if (ProductNameObj.hasFallback) {
    CreateSeq(ProductNameObj.FallbackObj);
  } else ProductNameObj.that.NumberofClassCalled -= 1;
};

ProductName.prototype.returnProductInput = function (tmpId, inputclass) {
  var placehold = "Enter Product / Service name";
  var html = '<input templateId="' + tmpId + '" class="' + inputclass + '" type="text" name="q_title" id="t' + tmpId + 'prodtitle" onblur="" maxlength="100" placeholder="' + placehold + '" autocomplete="off" spellcheck="true" role="textbox" aria-autocomplete="list" aria-haspopup="true">';
  if (isSSB(tmpId) && !isnewSSB(tmpId)) return '<div class="mb-InCon">' + html;
  return html;
};

ProductName.prototype.returnProductError = function (tmpId,formType,errorclass) {
  var div = '<div class="' + errorclass + '" id="t' + tmpId + '_error_title"><div data-role="content"';
  div += isSSB(tmpId) ? 'class="mb-ertxt mb-mt10">Enter product/service name</div>' : ">Enter product/service name</div>";
  return div;
};

ProductName.prototype.getInput = function (tmpId, formType) {
  this.ProductNameHtmlObj["UserInput"] = IsChatbl(tmpId) ? this.returnProductInput(tmpId, "") + "</div>" : this.getBlEnqInputHtml(tmpId, formType);
};

ProductName.prototype.getBlEnqInputHtml = function (tmpId, formType) {
  var html = "";
  html += isSSB(tmpId) || isBlInline(tmpId) ? this.returnProductInput(tmpId, "") : !isInactiveBL(tmpId) ? this.returnProductInput(tmpId, "be-slbox inpt_errorbx be-row") : this.returnProductInput( tmpId, "be-slbox inpt_errorbx be-row bed_input cpNm wid_600" );
  var errorcls = isSSB(tmpId) ? "" : "beerrp4 bedsnone be-erbx";
  html += this.returnProductError(tmpId, formType, errorcls);
  html += isSSB(tmpId) ? isnewSSB(tmpId) ? "</div>" : "</div></div>" : '<a class="be-erarw" data-role="arrow"></a></div>';
  if (isBlInline(tmpId)) {
    var cls = isBlInlineFr(tmpId) ? "flx1" : "pr pflx1";
    html = "<div class = '" + cls + "'>" + html + "</div>";
  }
  return html;
};

ProductName.prototype.getLabel = function (tmpId, formType) {
  var cls = isBlInline(tmpId) ? isBlInlineFr(tmpId) ? "fs0 wf" : "fs15 cl11" : "be-lbl";
  if (isInactiveBL(tmpId)) {
    cls = "be-lbl";
  }
  var label = isBlInline(tmpId) || (isSSB(tmpId) && isnewSSB(tmpId)) ? "I want quotes for" : isSSB(tmpId) ? "Product/Service name" : (isInactiveBL(tmpId)) ? "Enter Product/Service name <span class='redc'>*</span>" : "Enter Product/Service name";
  this.ProductNameHtmlObj["Label"] = IsChatbl(tmpId) ? returnLabel("t" + tmpId, "Please enter Product/Service name", "_name-l", "") : isSSB(tmpId) ? returnLabel("t" + tmpId, label, "_name-l", ssbClass("label", tmpId)) : returnLabel("t" + tmpId, label, "_name-l", cls);
};

ProductName.prototype.getProductHtml = function (tmpId) {
  this.getLabel(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.getInput(tmpId, ReqObj.Form[tmpId].formType.toLowerCase());
  this.ProductNameHtmlObj["ClosingWrapper"] = "";
  this.ProductNameHtmlObj["OuterWrapper"] = "";
  return this.ProductNameHtmlObj;
};

ProductName.prototype.displayHtml = function () {
  return IsChatbl(this.tmpId)
    ? [this.ProductNameHTMLQues, this.ProductNameHTMLInput]
    : [this.ProductNameHTML];
};

ProductName.prototype.handleUI = function (event) {
  var tmpId = event.data.tmpId;
  var todo = event.data.todo;
  if (todo === "default") {
    // if (ReqObj.UserHtml[tmpId]["ProductSugg"])
    this.setTitleSuggester(tmpId);
    $("#t" + tmpId + "_error_title").addClass("bedsnone");
    isSSB(tmpId)
      ? $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd")
      : $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
    $("#t" + tmpId + "_name-l").removeClass("redc");
    this.showMcatFilled(tmpId);
  }
};

ProductName.prototype.handleHeading = function (tmpId) {
  if (isOtherEnq(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

ProductName.prototype.defaultEvents = function (tmpId) {
  this.handleUI({
    data: {
      tmpId: tmpId,
      todo: "default",
    },
  });
  this.handleEvents(tmpId);
  $(document)
    .off("click.prodName keypress.prodName keydown.prodName")
    .on(
      "click.prodName keypress.prodName keydown.prodName",
      ".inpt_errorbx",
      function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("highlight-err");
        $("#t" + tmpId + "_name-l").removeClass("redc");
      }
    );

  isSSB(tmpId)
    ? $("#t" + tmpId + "prodtitle")
      .off("keyup")
      .on("keyup", function () {
        $("#t" + tmpId + "_error_title").addClass("bedsnone");
        $("#t" + tmpId + "prodtitle").removeClass("mb-erbrd nb-erbrd");
      })
    : "";
};

ProductName.prototype.handleButton = function (tmpId) {
  if (Bl04(tmpId)) ButtonNameUI(ReqObj.Form[tmpId].currentScreen, tmpId);
};

function Callblur(event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (
    keycode === 13 &&
    event.target.id === "t" + event.data.param1 + "prodtitle"
  ) {
    if (isSet($("#t" + event.data.param1 + "prodtitle")[0])) {
      var EventArray = $._data(
        $("#t" + event.data.param1 + "prodtitle")[0],
        "events"
      );
      var BLurEvent = isSet(EventArray.blur) ? EventArray.blur : [];
      for (var b = 0; b < BLurEvent.length; b++) {
        BLurEvent[b].handler(BLurEvent[b]);
      }
      HideSuggester();
    }
  }
}

ProductName.prototype.AddBlur = function (tmpId) {
  var that = this;
  $("#t" + tmpId + "prodtitle")
    .off("blur.blEnqProdNameBlur")
    .on(
      "blur.blEnqProdNameBlur",
      {
        param1: tmpId,
        param2: "blur",
        pnObject: that,
      },
      that.checkMcatIDJquery
    );
};

ProductName.prototype.RemoveBlur = function (tmpId) {
  $("#t" + tmpId + "prodtitle").off("blur.blEnqProdNameBlur");
};

ProductName.prototype.handleEvents = function (tmpId) {
  this.IsEnterPressed = false;
  var that = this;
  var BLurEvents = [];
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    ChatblfooterAns(tmpId);

    if (ReqObj.Form[tmpId].flags.autofocusPName) {
      $("#t" + tmpId + "prodtitle").focus();
    }
    if (IsChatbl(tmpId)) {
      setTimeout(function () {
        $("#t" + tmpId + "prodtitle").focus();
      }, 1800);
    } else {
      that.AddBlur(tmpId);

      // $('#t' + tmpId + 'prodtitle').off("blur.BlEnqEvent").on("blur.BlEnqEvent", { param1: tmpId, param2: "blur", pnObject: that }, that.checkMcatIDJquery);

      $("#t" + tmpId + "prodtitle")
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", function () {
          $("#t" + tmpId + "_cls").each(function () {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              $(this)
                .off("mouseenter.BlEnqEvent")
                .on("mouseenter.BlEnqEvent", function (event) {
                  that.RemoveBlur(tmpId);
                });
              $(this)
                .off("mouseleave.BlEnqEvent")
                .on("mouseleave.BlEnqEvent", function () {
                  that.AddBlur(tmpId);
                });
            }
          });
        });

      $(document)
        .off("mouseenter.BlEnqEvent")
        .on(
          "mouseenter.BlEnqEvent",
          ".t" + tmpId + "_prodName",
          function (event) {
            if (
              $(this).css("display") === "block" ||
              $(this).css("display") === "inline-block"
            ) {
              that.RemoveBlur(tmpId);
            }
          }
        );

      $(document)
        .off("mouseleave.BlEnqEvent")
        .on("mouseleave.BlEnqEvent", ".t" + tmpId + "_prodName", function () {
          if (
            $(this).css("display") === "block" ||
            $(this).css("display") === "inline-block"
          ) {
            that.AddBlur(tmpId);
          }
        });

      var SubmitDisplay = $("#t" + tmpId + "_submit").css("display");
      if (SubmitDisplay === "block" || SubmitDisplay === "inline-block") {
        $("#t" + tmpId + "_submit")
          .off("mouseenter.BlEnqEvent")
          .on("mouseenter.BlEnqEvent", function () {
            that.RemoveBlur(tmpId);
          });

        $("#t" + tmpId + "_submit")
          .off("mouseleave.SubmitBtn")
          .on("mouseleave.SubmitBtn", function () {
            that.AddBlur(tmpId);
          });
      }
    }

    $("#t" + tmpId + "prodtitle")
      .off("keypress.BlEnqEvent")
      .on("keypress.BlEnqEvent", function (event) {
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 13) {
          // if (that.isProdNameChanged)
          //   // RefactorFormArrays(tmpId);
          if (!$("#t" + tmpId + "_submit").is(":disabled")) {
            that.IsEnterPressed = true;
            $("#t" + tmpId + "prodtitle").off("blur");
            HideSuggester();
          }
        }
      });
  }
};

ProductName.prototype.setTitleSuggester = function (tmpId) {
  // $("#t" + tmpId + "prodtitle").html("");
  var that = this;
  var title_sugg = "sugg_title_" + tmpId;

  var title_count = setInterval(function () {
    if (typeof Suggester !== "undefined") {
      var ProductNameSuffix = "_prodName";
      //remove all existing product name suggestor
      $(".t" + tmpId + ProductNameSuffix).each(function () {
        $(this).remove();
      });
      //upto here
      var autocompleteClass = SetAutoCompleteClass(tmpId, ProductNameSuffix);
      var row_num = BlAutoSuggRowNum(tmpId);
      window[title_sugg] = new Suggester({
        element: "t" + tmpId + "prodtitle",
        getQuotation: false,
        onSelect: that.selectTitle,
        fields: "",
        type: "product",
        module: "BL-FORM",
        rowsToDisplay: row_num,
        recentData: 1,
        autocompleteClass: autocompleteClass,
      });
      if (JSON.stringify(title_sugg)) {
        if (
          isSet(tmpId) && isSet(ReqObj) && isSet(ReqObj.Form) &&
          isSet(ReqObj.Form[tmpId]) &&
          isSet(ReqObj.Form[tmpId].flags)
        )
          ReqObj.Form[tmpId].flags.isTitleSuggSet = true;
        clearInterval(title_count);
      }
    }
  }, 1000);
};

ProductName.prototype.selectTitle = function (event, ui) {
  var that = ReqObj.Form[$(this).attr("templateId")].productObject;
  if (isSet(that)) {
    if (isSSB(that.tmpId) && IsBlEnqProdNameChanged(that.tmpId))
      ReqObj.Form[that.tmpId].url.html = false;
    if (
      // $("#t" + that.tmpId + "prodtitle").length &&
      ReqObj.Form[that.tmpId].prodName !==
      $("#t" + that.tmpId + "prodtitle").val()
    ) {
      if (isSet(ui) && isSet(ui.item)) {
        if (ui.item.value) {
          $("#t" + that.tmpId + "prodtitle").val(ui.item.value);
          if (IsChatbl(that.tmpId))
            ReqObj.Form[that.tmpId].UserInputs["ProductName"] = ui.item.value;
          ReqObj.Form[that.tmpId].prodName = ui.item.value;
          ReqObj.Form[that.tmpId].prodDispName = "";
          ReqObj.Form[that.tmpId].mcatName = "";
        }
        if (
          isSet(ui.item.mcat_id) &&
          isSet(ui.item.mcat_id[0]) &&
          isSet(ui.item.cat_id) &&
          isSet(ui.item.cat_id[0])
        ) {
          ReqObj.Form[that.tmpId].mcatId = ui.item.mcat_id[0];
          ReqObj.Form[that.tmpId].catId = ui.item.cat_id[0];
          ReqObj.Form[that.tmpId].callLeftSide = false;
          that.getMcatImage(that.tmpId, "select");
          if (isSet(that.tmpId) && that.tmpId.substring(0, 2) === "09")
            AfterFormDefaults(that.tmpId);
          $("#t" + that.tmpId + "prodtitle").focus();
        } else {
          ReqObj.Form[that.tmpId].IsProdNameChanged = true;
          that.getMcatDetail(
            $("#t" + that.tmpId + "prodtitle").val(),
            that.tmpId,
            "select"
          );
        }
      } else {
        ReqObj.Form[that.tmpId].IsProdNameChanged = true;
        that.getMcatDetail(
          $("#t" + that.tmpId + "prodtitle").val(),
          that.tmpId,
          "select"
        );
      }
    }
  }
};

ProductName.prototype.SaveDetails = function (tmpId, event) {
  if (IsChatbl(tmpId)) {
    ReqObj.Form[tmpId].UserInputs["ProductName"] = $(
      "#t" + tmpId + "prodtitle"
    ).val(); /* for chat bl*/
  }
  //
};

ProductName.prototype.getMcatImage = function (tmpId) {
  if (
    isSet(tmpId) &&
    isSet(ReqObj.Form[tmpId]) &&
    isSet(ReqObj.Form[tmpId].formType)
  ) {
    //POPUPCHATBL
    var form_type =
      ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
    $("#t" + tmpId + "_imglodr").removeClass("bedsnone");
    ReqObj.Form[tmpId].mcatImage = "";
    if (
      !isSSB(tmpId) &&
      isSet(ReqObj.Form[tmpId].mcatId) &&
      parseInt(ReqObj.Form[tmpId].mcatId) !== -1
    ) {
      getMcatImage(tmpId, "", 1);
    } else if (parseInt(ReqObj.Form[tmpId].mcatId, 10) === -1) {
      ReqObj.Form[tmpId].displayImage = "";
      ReqObj.Form[tmpId].zoomImage = "";
      $("#t" + tmpId + "_imglodr").addClass("bedsnone");
      leftSideTransition(0, tmpId);
    }
  }
};
/***
 * Function ID - 2
 *
 * Usage: Function to fetch mcat detail
 *
 * Output: It will set Mcat-ID, Cat-ID, Type in global object
 ***/
ProductName.prototype.getMcatDetail = function (
  mcatMatch,
  tmpId,
  eventName,
  prdnmObj,
  from
) {
  var that = this;
  // /var submit_url = appsServerName + 'models/mcatid-suggestion.php?search_param=' + encodeURIComponent(mcatMatch);
  if (isSet(ReqObj.Form[tmpId].isBlQtutShown)) {
    ReqObj.Form[tmpId].isBlQtutShown = false;
  }
  if (isSet(mcatMatch) && mcatMatch !== "") {
    var submit_url =
      "//apps.imimg.com/models/mcatid-suggestion.php?search_param=" +
      encodeURIComponent(mcatMatch);
    addBlLoader(tmpId, "center");
    ReqObj.Form[tmpId].mcatId = -2;
    if (IsChatbl(tmpId)) {
      $("#t" + tmpId + "prodtitle")
        .prop("disabled", true)
        .addClass("chatblur");
      $("#t" + tmpId + "_submit")
        .prop("disabled", true)
        .addClass("chatblur");
    }
    $.ajax({
      cache: false,
      url: submit_url,
      type: "GET",
      //timeout: 3000,
      dataType: "json",
      success: function (data) {
        if (isSet(data) && data !== "") {
          ReqObj.Form[tmpId].mcatId = isSet(data["mcatid"])
            ? data["mcatid"]
            : -1;
          ReqObj.Form[tmpId].catId = isSet(data["catid"]) ? data["catid"] : -1;
          ReqObj.Form[tmpId].mcatType = isSet(data["type"]) ? data["type"] : "";
          ReqObj.Form[tmpId].prodDispName = "";
          ReqObj.Form[tmpId].mcatName = "";
        } else {
          ReqObj.Form[tmpId].mcatId = -1;
          ReqObj.Form[tmpId].catId = -1;
          ReqObj.Form[tmpId].mcatType = "";
        }
      },
      error: function (o, st, e) {
        ReqObj.Form[tmpId].mcatId = -1;
        ReqObj.Form[tmpId].catId = -1;
        ReqObj.Form[tmpId].mcatType = "";
        return;
      },
      complete: function (res) {
        //this is the case for enter functionality of the form
        ReqObj.Form[tmpId].isProdNameChanged = true;
        addDetachedFlag(tmpId);
        //detachFlag2(tmpId);
        ReqObj.Form[tmpId].cName.prodServ = ReqObj.Form[tmpId].mcatType;
        if (IsChatbl(tmpId)) {
          $("#t" + tmpId + "prodtitle")
            .prop("disabled", false)
            .removeClass("chatblur");
          $("#t" + tmpId + "_submit")
            .prop("disabled", false)
            .removeClass("chatblur");
        }
        if (StaticQuesForeignUser(tmpId)) {
          if (ReqObj.Form[tmpId].mcatType.toLowerCase() === "p")
            ReqObj.Form[tmpId].modrefType = "product";
          else ReqObj.Form[tmpId].modrefType = "company";
        }
        removeBLLoader(tmpId, "center");
        if (isBl(tmpId) || isSSB(tmpId)) {
          savenem(tmpId);
          if (isSet(ReqObj.Form[tmpId].ReqDtlBox))
            ReqObj.Form[tmpId].ReqDtlBox = "";
          if (
            isSet(ReqObj.Form[tmpId].userFilledIsq) &&
            ReqObj.Form[tmpId].userFilledIsq.length
          )
            ReqObj.Form[tmpId].userFilledIsq = [];
          if (isSSB(tmpId) && currentISO() == "IN") savemc(tmpId);
        }
        if (that.isProdNameChanged) {
          DirectSubmitWithoutBlur(tmpId);
        }
        ReqObj.Form[tmpId].prodName = mcatMatch;
        ReqObj.Form[tmpId].callLeftSide = false;
        if (IsChatbl(tmpId)) {
          "" !== ReqObj.Form[tmpId].mcatName
            ? updateChatBlProdName(tmpId)
            : $(".productname").text(ReqObj.Form[tmpId].prodName); //
        }

        that.getMcatImage(tmpId);
        if(IsChatBLInline(tmpId)){     // new chat bl
        var chatblInterval = setInterval(function(){
          if(isSet(ReqObj.Form[tmpId].IsqComplete) && ReqObj.Form[tmpId].IsqComplete){
            clearInterval(chatblInterval);
            if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
          }
        },100);
      }
      else{
        if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
      }

        if (
          isSet(eventName) &&
          (eventName === "blur" || eventName === "select")
        ) {
          ReqObj.Form[tmpId].flags.autofocusPName = true;
          if (
            $("#t" + tmpId + "prodtitle").length > 0 &&
            $("#t" + tmpId + "prodtitle").val() === mcatMatch
          ) {
            if (!IsChatbl(tmpId)) {
              if (isBl(tmpId) && NEC()) {
                ReqObj.Form[tmpId].flags.isNECShown = false;
              }
              AfterFormDefaults(tmpId);
              // if (tmpId.substring(0, 2) === "09")

              // // OpenForm(ReqObj.Form[tmpId]);
              // else InlineForm(ReqObj.Form[tmpId]);
            } else {
              GetIsqFromService(tmpId);
            }
          }

          // if (!IsChatbl(tmpId)) $('#t' + that.tmpId + 'prodtitle').focus();
          // $('#t' + that.tmpId + 'prodtitle').focus();

          if (IsChatbl(tmpId)) {
            // $('#t' + that.tmpId + 'prodtitle').off("focus");
            // $('#t' + that.tmpId + 'prodtitle').focus();
            // that.setTitleSuggester(that.tmpId);
          }
        }

        //}
      },
    });
  }
};

ProductName.prototype.showMcatFilled = function (tmpId) {
  var name = "";
  if (ReqObj.Form[tmpId].prodName !== "") {
    if (
      typeof ReqObj.Form[tmpId].prodServ !== "undefined" &&
      ReqObj.Form[tmpId].prodServ !== "C"
    ) {
      name = ReqObj.Form[tmpId].prodName;
    } else if (
      ReqObj.Form[tmpId].prodServ === "C" &&
      ReqObj.Form[tmpId].formType === "BL"
    )
      name = ReqObj.Form[tmpId].prodName;
  }
  if (!IsChatbl(tmpId))
    if (isSSB(tmpId) && ReqObj.Form[tmpId].flags.prodSecNochange) {
      ReqObj.Form[tmpId].flags.prodSecNochange = false;
    } else {
      $("#t" + tmpId + "prodtitle").val(name);
      /*if(isSSB(tmpId) && isnewSSB(tmpId) && $('#t' + tmpId + 'prodtitle').val() !== "")
      $('#t' + tmpId + 'prodtitle').parent().addClass("focused");*/
    }
};

ProductName.prototype.onSubmit = function (tmpId) {
  var that = this;
  var prdnmObj = PreAjax("ProductName", tmpId);
  if (IsBlEnqProdNameChanged(tmpId)) {
    this.isProdNameChanged = true;
  }
  if (isInactiveBL(tmpId)) {
    $("#recommendProd").css({
      display: "none",
    });
    $("#t" + tmpId + "_helpQuest").css({
      display: "block",
    });
    $("#blheading").css({
      display: "none",
    });
  }

  this.checkMcatID(
    {
      param1: tmpId,
      param2: "submit",
    },
    prdnmObj
  );
};

ProductName.prototype.validate = function (tmpId, event) {
  var form_type =
    ReqObj.Form[tmpId].formType === "Enq" ? "Send Enquiry" : "Post Buy Leads";
  var productName = $("#t" + tmpId + "prodtitle").val();
  if (!isSet(validation)) createGlobalObject();
  var isProductNameValid = validation.isProductNameValid(productName);
  var StepNumber = ReqObj.Form[tmpId].FormSequence.StepCounter + 1;
  if (isProductNameValid["type"] === false) {
    blenqGATracking(form_type, "Validation_Error_Prd_Title|" + StepNumber + "|ProductName", getEventLabel(), 1, tmpId);
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, isProductNameValid.error);
    } else {
      var errorcls = isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-erbrd"
          : "mb-erbrd"
        : "highlight-err";
      $("#t" + tmpId + "_error_title")
        .removeClass("bedsnone")
        .focus();
      var prderrm = isProductNameValid["specialcase"]
        ? "Enter valid product/service name"
        : "Enter product/service name";
      $("#t" + tmpId + "_error_title")
        .children("div")
        .first()
        .text(prderrm);
      $("#t" + tmpId + "prodtitle").addClass(errorcls);
      isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
    }
    if (!isSSB(tmpId) && !IsChatbl(tmpId))
      $("#t" + tmpId + "_name-l").addClass("redc");
    ReqObj.Form[tmpId].validateArray.push("t" + tmpId + "prodtitle");
    return false;
  } else {
    // var isMandatory = true;
    // return IsTNCChecked(tmpId, isMandatory, usercookie.getParameterValue(imeshExist(), "fn"));
    return true;
  }
};

ProductName.prototype.checkMcatIDJquery = function (event) {
  event.data.pnObject.checkMcatID(event.data);
};

ProductName.prototype.checkMcatID = function (eventData, prdnmObj) {
  var tmpId = eventData.param1;
  var eventName = eventData.param2;
  if (isScriptTag($("#t" + tmpId + "prodtitle").val())) {
    if (IsChatbl(tmpId)) {
      addChatblError(tmpId, isProductNameValid.error);
    } else {
      var errorcls = isSSB(tmpId)
        ? isnewSSB(tmpId)
          ? "nb-erbrd"
          : "mb-erbrd"
        : "highlight-err";
      $("#t" + tmpId + "_error_title")
        .removeClass("bedsnone")
        .focus();
      var prderrm = "Enter valid product/service name";
      $("#t" + tmpId + "_error_title")
        .children("div")
        .first()
        .text(prderrm);
      $("#t" + tmpId + "prodtitle").addClass(errorcls);
      isSSB(tmpId) ? $("#t" + tmpId + "prodtitle").focus() : "";
    }
    if (!isSSB(tmpId) && !IsChatbl(tmpId))
      $("#t" + tmpId + "_name-l").addClass("redc");

    return;
  }

  if (IsBlEnqProdNameChanged(tmpId)) {
    this.getMcatDetail(
      $("#t" + tmpId + "prodtitle").val(),
      tmpId,
      eventName,
      prdnmObj
    );
  } else {
    if (isSet(prdnmObj)) PostAjax(prdnmObj, tmpId);
  }
};

function IsBlEnqProdNameChanged(tmpId) {
  if (isSet(tmpId)) {
    if (
      $("#t" + tmpId + "prodtitle").length &&
      $("#t" + tmpId + "prodtitle").val() !== "" &&
      $("#t" + tmpId + "prodtitle").val() !== "Enter product/service name" &&
      ReqObj.Form[tmpId].prodName !== $("#t" + tmpId + "prodtitle").val()
    ) {
      ReqObj.Form[tmpId].populate = false;
      return true;
    } else {
      ReqObj.Form[tmpId].populate = true;
      return false;
    }
  }
}
